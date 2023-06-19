const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/main', (req, res) => {
    // GET route code here
    queryText = `SELECT * FROM "proposal";`;

    pool.query(queryText)
        .then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log('Error GETing proposals', err);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/add-proposal', (req, res) => {
    // POST route code here
    
        const { description } = req.body;
        const queryText = `INSERT INTO "proposal ( "description", "user_id" )
                            VALUES ( $1, $2 );`;

        pool.query(queryText, [ description, req.user.id ])
            .then( res.sendStatus(201) 
            ).catch(err => {
                console.log('Error POSTing event', err);
                res.sendStatus(500);
            })
});

module.exports = router;