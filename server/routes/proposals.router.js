const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// This router manages all requests pertaining to proposals

// route for getting all of the proposals
router.get('/main', rejectUnauthenticated, (req, res) => {
  queryText = `SELECT "proposal"."id", "proposal"."description", "proposal"."created_date", "proposal"."status", "proposal"."status_updated_date", "user"."first_name", "user"."last_name", "user"."username" FROM "proposal"
    JOIN "user" ON "proposal"."user_id" = "user"."id";`;

  pool.query(queryText)
    .then(result => {
      // console.log(`Successful GETing all proposals`);
      res.send(result.rows)
    }).catch(err => {
      // console.log('Error GETing proposals', err);
      res.sendStatus(500);
    })
});

// post route for adding a proposal to the proposal table
router.post('/add', rejectUnauthenticated, (req, res) => {
  //destructure the description from the body of the request
  const { description } = req.body;
  const queryText = `INSERT INTO "proposal" ( "description", "user_id" )
                            VALUES ( $1, $2 );`;

  pool.query(queryText, [description, req.user.id])
    .then(result => {
      // console.log(`Successfully added proposal for user: ${req.user.username}`);
      res.status(201).send(result.rows);
    }).catch(err => {
      // console.log('Error POSTing proposal', err);
      res.sendStatus(500);
    })
});

// route for getting all proposals associated with the logged in user
router.get('/user', rejectUnauthenticated, (req, res) => {
  queryText = `SELECT * FROM "proposal" WHERE "user_id" = $1;`;

  pool.query(queryText, [req.user.id])
    .then(result => {
      // console.log(`Success GETing proposals for user: ${req.user.username}`);
      res.send(result.rows)
    }).catch(err => {
      // console.log('Error GETing proposals', err);
      res.sendStatus(500);
    })
});

// route for posting a user's vote
router.post('/vote/', rejectUnauthenticated, (req, res) => {
  // destructing of the vote and proposal_id from the body of the request
  const { proposal_id, vote } = req.body;

  // Insert the vote into the proposal_vote table
  const insertQuery = `INSERT INTO "proposal_vote" ("proposal_id", "user_id", "vote")
  VALUES ($1, $2, $3);`;

  pool.query(insertQuery, [proposal_id, req.user.id, vote])
    .then(() => {
      // Get the vote counts for the proposal
      const countQuery = `SELECT COUNT(*) FILTER (WHERE "vote" = TRUE) AS "true_votes",
    COUNT(*) FILTER (WHERE "vote" = FALSE) AS "false_votes"
    FROM "proposal_vote"
    WHERE "proposal_id" = $1;`;

      pool.query(countQuery, [proposal_id])
        .then(result => {
          // destructure the true and false votes from the result of the vote count select query
          const { true_votes, false_votes } = result.rows[0];
          // console.log(`Successful vote cast on proposal id: ${proposal_id} for user: ${req.user.username}`);

          // Check if the number of true or false votes surpasses the specified thresholds
          if (true_votes > 20) {
            updateProposalStatus(proposal_id, 'Passed');
          } else if (false_votes > 5) {
            updateProposalStatus(proposal_id, 'Vetoed');
          }

          res.sendStatus(201);
        }).catch(err => {
          // console.log(`Error retrieving vote counts for proposal id: ${proposal_id}`, err);
          res.sendStatus(500);
        });
    }).catch(err => {
      // console.log(`Error casting vote on proposal id: ${proposal_id} for user: ${req.user.username}`, err);
      res.sendStatus(500);
    });
});

// delete route for removing a specified proposal that the logged in user posted
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  // grab the proposal id from the url parameters
  const proposalId = req.params.id
  const query = `DELETE FROM "proposal" WHERE "id" = $1 AND "user_id" = $2;`;

  pool.query(query, [proposalId, req.user.id])
    .then(result => {
      // console.log(`Successful delete of proposal at id: ${proposalId} for ${req.user.username}`);
      res.sendStatus(200)
    })
    .catch(err => {
      // console.log('Error deleting proposal', err);
      res.sendStatus(500);
    })
});

// route for getting all of the user's votes associated with the different proposal ids
router.get('/user-vote', rejectUnauthenticated, (req, res) => {
  queryText = `SELECT "proposal_id", "vote" FROM "proposal_vote" WHERE "user_id" = $1;`;

  pool.query(queryText, [req.user.id])
    .then(result => {
      // console.log(`Successful GETing user's proposal votes`);
      res.send(result.rows)
    }).catch(err => {
      // console.log(`Error GETing user's proposal votes`, err);
      res.sendStatus(500);
    })
});

// route for updating the user's votes
router.put('/update-vote', rejectUnauthenticated, (req, res) => {
  // destructure the vote and proposal id from the body of the request
  const { proposal_id, vote } = req.body;

  // Update the vote in the proposal_vote table
  const updateQuery = `UPDATE "proposal_vote" SET "vote" = $1 
  WHERE "proposal_id" = $2 AND "user_id" = $3;`;

  pool.query(updateQuery, [vote, proposal_id, req.user.id])
    .then(() => {
      // Get the vote counts for the proposal
      const countQuery = `SELECT COUNT(*) FILTER (WHERE "vote" = TRUE) AS "true_votes",
                        COUNT(*) FILTER (WHERE "vote" = FALSE) AS "false_votes"
                        FROM "proposal_vote"
                        WHERE "proposal_id" = $1;`;

      pool.query(countQuery, [proposal_id])
        .then(result => {
          // destructure the true and false votes from the result
          const { true_votes, false_votes } = result.rows[0];
          // console.log(`Successfully update vote for proposal id: ${proposal_id}`);

          // Check if the number of true or false votes surpasses the specified thresholds
          if (true_votes > 20) {
            updateProposalStatus(proposal_id, 'Passed');
          } else if (false_votes > 5) {
            updateProposalStatus(proposal_id, 'Vetoed');
          }

          res.sendStatus(201);
        }).catch(err => {
          // console.log(`Error retrieving vote counts for proposal id: ${proposal_id}`, err);
          res.sendStatus(500);
        });
    }).catch(err => {
      // console.log(`Error updating vote at proposal id: ${proposal_id}`, err);
      res.sendStatus(500);
    });
});

// function that triggers when a proposal's votes meets the threshold for either pass or veto
// and then updates the proposal's status to the corresponding final value. 
// Also sets a timestamp of the current time and date that the vote status was changed.
function updateProposalStatus(proposalId, status) {
  // variable to hold the current timestamp that this function is triggered
  const currentDate = new Date();
  const queryText = `UPDATE "proposal" SET "status" = $1, "status_updated_date" = $2 WHERE "id" = $3;`;

  pool.query(queryText, [status, currentDate, proposalId])
    .then(() => {
      // console.log(`Successfully updated status of proposal id ${proposalId} to ${status}`);
      res.sendStatus(201);
    }).catch(err => {
      // console.log(`Error updating status of proposal id ${proposalId} to ${status}`, err);
      res.sendStatus(500);
    });
}

module.exports = router;
