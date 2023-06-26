const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/users' , rejectUnauthenticated, (req,res) => {
    const queryText = `Select "id", "username", "first_name", "last_name", "phone_number", "email", "street_address", "city", "state", "is_admin"
                        FROM "user"
                        ORDER BY "is_admin" DESC;`;
    pool.query(queryText)
    .then(result => {
        console.log('Success GETing users');
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
        .then(res.sendStatus(200))
        .catch(err => {
          console.log('Error removing user', err);
        })
    } else {
        console.log('Unauthorized delete request. Must be an Admin to remove a user');
    }
})

router.delete('/prop-delete/:id', rejectUnauthenticated, (req,res) => {
    const propId = req.params;
    const queryText = `DELETE FROM "proposal" WHERE "id" = $1;`;

    if(req.user.is_admin){
        pool.query(queryText, [propId])
        .then(res.sendStatus(200))
        .catch(err => {
          console.log('Error deleting proposal', err);
        })
    } else {
        console.log('Unauthorized delete request. Not an Admin or the user who created the proposal');
    }
})

router.delete('/event-delete/:id', rejectUnauthenticated, (req,res) => {
    const userId = req.params;
    const queryText = `DELETE FROM "event_calendar" WHERE "id" = $1;`;

    if(req.user.is_admin){
        pool.query(queryText, [userId])
        .then(res.sendStatus(200))
        .catch(err => {
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
        .then(res.sendStatus(200))
        .catch(err => {
          console.log(`Error updating user level for user at id: ${userId}`, err);
        })
    } else {
        console.log('Unauthorized update request. Need to be an admin to update someone\'s user level');
    }
})

module.exports = router;