const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// route for getting all of the proposals
router.get('/main', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT * FROM "proposal";`;

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
router.post('/add-proposal', rejectUnauthenticated, (req, res) => {
    const { description } = req.body;
    const queryText = `INSERT INTO "proposal ( "description", "user_id" )
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

    pool.query(queryText, [req.user.id])
        .then(result => {
            console.log(`Success GETing proposals for user: ${user.username}`);
            res.send(result.rows)
        }).catch(err => {
            console.log('Error GETing proposals', err);
            res.sendStatus(500);
        })
});

// post route for submiting a logged-in user's vote on a specific proposal

router.post('/proposal-vote/:id' ,rejectUnauthenticated, (req, res) => {
    const proposalId = req.params.id;
    const { vote } = req.body
    const queryText = `INSERT INTO "proposal_vote" ("proposal_id", "user_id", "vote")
                        VALUES ($1, $2, $3);`;

    pool.query(queryText, [proposalId, req.user.id, vote])
    .then(result => {
        console.log(`Successful vote cast on proposal id: ${proposalId} for user: ${req.user.username}`);
        res.status(201).send(result.rows);
    }).catch(err => {
        console.log(`Error casting vote on proposal id: ${proposalId} for user: ${req.user.username}`, err);
        res.sendStatus(500);
    })
})

module.exports = router;