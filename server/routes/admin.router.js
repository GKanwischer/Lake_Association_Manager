const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/users' , rejectUnauthenticated, (req,res) => {
    const queryText = `SELECT "id", "username", "first_name", "last_name", "phone_number", "email", "street_address", "city", "state", "is_admin"
                        FROM "user"
                        ORDER BY "is_admin" DESC;`;
    pool.query(queryText)
    .then(result => {
        console.log(`Success GETing users for admin ${req.user.username}`);
        res.send(result.rows);
    }).catch(err => {
        console.log('Error GETing users', err);
        res.sendStatus(500);
    })
})

router.delete('/user-delete/:id', rejectUnauthenticated, (req,res) => {
    const userId = Number(req.params.id);
    console.log('Server side user id for admin delete: ', userId);
    const queryText = `DELETE FROM "user" WHERE "id" = $1;`;

    if(req.user.is_admin){
        pool.query(queryText, [userId])
        .then(result => {
            console.log(`Successful DELETE of user at id: ${userId}, by admin ${req.user.username}`);
            res.sendStatus(200)}
        ).catch(err => {
          console.log('Error removing user', err);
        })
    } else {
        console.log('Unauthorized delete request. Must be an Admin to remove a user');
    }
})

router.get('/props' , rejectUnauthenticated, (req,res) => {
    const queryText = `SELECT "proposal"."id", "proposal"."description", "proposal"."status", "proposal"."created_date", "user"."username", "user"."first_name", "user"."last_name",
                        COUNT("proposal_vote"."vote") FILTER (WHERE "proposal_vote"."vote" = true) AS true_votes,
                        COUNT("proposal_vote"."vote") FILTER (WHERE "proposal_vote"."vote" = false) AS false_votes
                        FROM"proposal"
                        JOIN "user" ON "proposal"."user_id" = "user"."id"
                        LEFT JOIN "proposal_vote" ON "proposal"."id" = "proposal_vote"."proposal_id"
                        GROUP BY "proposal"."id", "proposal"."created_date", "user"."first_name", "user"."last_name", "user"."username"
                        ORDER BY  "proposal"."created_date" ASC;`;
    pool.query(queryText)
    .then(result => {
        console.log('Success GETing proposals for Admin');
        res.send(result.rows);
    }).catch(err => {
        console.log('Error GETing proposals for Admin', err);
        res.sendStatus(500);
    })
})

router.delete('/prop-delete/:id', rejectUnauthenticated, (req,res) => {
    const propId = Number(req.params.id);
    const queryText = `DELETE FROM "proposal" WHERE "id" = $1;`;

    if(req.user.is_admin){
        pool.query(queryText, [propId])
        .then(result => {
            console.log(`Successful DELETE of proposal at id: ${propId}, by admin ${req.user.username}`);
            res.sendStatus(200)}
        ).catch(err => {
          console.log('Error deleting proposal', err);
        })
    } else {
        console.log('Unauthorized delete request. Not an Admin or the user who created the proposal');
    }
})

router.delete('/event-delete/:id', rejectUnauthenticated, (req,res) => {
    const eventId = Number(req.params.id);
    const queryText = `DELETE FROM "event_calendar" WHERE "id" = $1;`;

    if(req.user.is_admin){
        pool.query(queryText, [eventId])
        .then(result => {
            console.log(`Successful DELETE of event at id: ${eventId}, by admin ${req.user.username}`);
            res.sendStatus(200)}
        ).catch(err => {
          console.log('Error deleting event', err);
        })
    } else {
        console.log('Unauthorized delete request. Not an Admin or the user who created the event');
    }
})

router.put('/user_level/:id', (req,res) => {
    const userId = req.params.id;
    const queryText = `UPDATE "user" SET "is_admin" = NOT "is_admin" WHERE "id" = $1;`;

    if(req.user.is_admin){
        pool.query(queryText, [userId])
        .then(result => {
            console.log(`Successful user level UPDATE for id: ${userId}, by admin ${req.user.username}`);
            res.sendStatus(200)}
        ).catch(err => {
          console.log(`Error updating user level for user at id: ${userId}`, err);
        })
    } else {
        console.log('Unauthorized update request. Need to be an admin to update someone\'s user level');
    }
})

module.exports = router;