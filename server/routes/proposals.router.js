const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// route for getting all of the proposals
router.get('/main', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "proposal"."id", "proposal"."description", "proposal"."created_date", "proposal"."status", "user"."first_name", "user"."last_name", "user"."username" FROM "proposal"
    JOIN "user" ON "proposal"."user_id" = "user"."id";`;

    pool.query(queryText)
        .then(result => {
            console.log(`Successful GETing all proposals`);
            res.send(result.rows)
        }).catch(err => {
            console.log('Error GETing proposals', err);
            res.sendStatus(500);
        })
});

// post route for adding a proposal to the proposal table
router.post('/add', rejectUnauthenticated, (req, res) => {
    const { description } = req.body;
    const queryText = `INSERT INTO "proposal" ( "description", "user_id" )
                            VALUES ( $1, $2 );`;

    pool.query(queryText, [description, req.user.id])
        .then(result => {
            console.log(`Successfully added proposal for user: ${req.user.username}`);
            res.status(201).send(result.rows);
        }).catch(err => {
            console.log('Error POSTing proposal', err);
            res.sendStatus(500);
        })
});

// route for getting all proposals associated with the logged in user
router.get('/user', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT * FROM "proposal" WHERE "user_id" = $1;`;
    console.log('user', req.user);

    pool.query(queryText, [req.user.id])
        .then(result => {
            console.log(`Success GETing proposals for user: ${req.user.username}`);
            res.send(result.rows)
        }).catch(err => {
            console.log('Error GETing proposals', err);
            res.sendStatus(500);
        })
});

// post route for submiting a logged-in user's vote on a specific proposal
router.post('/vote/', rejectUnauthenticated, (req, res) => {
    const { proposal_id , vote } = req.body
    const queryText = `INSERT INTO "proposal_vote" ("proposal_id", "user_id", "vote")
                        VALUES ($1, $2, $3);`;

    pool.query(queryText, [proposal_id, req.user.id, vote])
        .then(result => {
            console.log(`Successful vote cast on proposal id: ${proposal_id} for user: ${req.user.username}`);
            res.status(201).send(result.rows);
        }).catch(err => {
            console.log(`Error casting vote on proposal id: ${proposal_id} for user: ${req.user.username}`, err);
            res.sendStatus(500);
        })
})

// delete route for removing a specified proposal that the logged in user posted
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    const proposalId = req.params.id
    const query = `DELETE FROM "proposal" WHERE "id" = $1 AND "user_id" = $2;`;

    pool.query(query, [proposalId, req.user.id])
        .then(res.sendStatus(200))
        .catch(err => {
            console.log('Error deleting proposal', err);
        })
});

// route for getting all of the user's votes associated with the different proposal ids
router.get('/user-votes', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "proposal_id", "vote" FROM "proposal_vote" WHERE "user_id" = $1;`;

    pool.query(queryText [req.user.id])
        .then(result => {
            console.log(`Successful GETing user's proposal votes`);
            res.send(result.rows)
        }).catch(err => {
            console.log(`Error GETing user's proposal votes`, err);
            res.sendStatus(500);
        })
});

module.exports = router;


// Example of a PostgreSQL transaction --- DELETE LATER!!!
// router.delete('/delete/:id', rejectUnauthenticated, async (req, res) => {
//     const proposalId = req.params.id;

//     try {
//         // Start a transaction
//         await pool.query('BEGIN');

//         // Delete from the "proposal_vote" table
//         await pool.query('DELETE FROM "proposal_vote" WHERE "proposal_id" = $1', [proposalId]);

//         // Delete from the "proposal" table
//         await pool.query('DELETE FROM "proposal" WHERE "id" = $1 AND "user_id" = $2', [proposalId, req.user.id]);

//         // Commit the transaction
//         await pool.query('COMMIT');

//         res.sendStatus(200);
//     } catch (err) {
//         // Rollback the transaction if an error occurs
//         await pool.query('ROLLBACK');
//         console.log('Error deleting proposal', err);
//         res.sendStatus(500);
//     }
// });