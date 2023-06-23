const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// route for getting all of the events
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "event_calendar";`

    pool.query(queryText)
        .then(result => {
            console.log('Success GETing events');
            res.send(result.rows);
        }).catch(err => {
            console.log('Error getting calendar events', err);
            res.sendStatus(500);
        })
})

// route for posting a new event to the calendar
router.post('/create-event', rejectUnauthenticated, (req, res) => {
    const { title, description, start, end } = req.body;
    const queryText = `INSERT INTO "event_calendar" ( "title", "description", "start", "end", "user_id")
    VALUES ($1, $2, $3, $4, $5);`

    pool.query(queryText, [title, description, start, end, req.user.id])
        .then(res.sendStatus(201))
        .catch(err => {
            console.log('Error posting event', err);
            res.sendStatus(500);
        })
})

// route for updating the values of an event that the logged-in user created
router.put('/update/:id', rejectUnauthenticated, (req, res) => {
    const eventId = req.params.id;
    const { description, title, start, end } = req.body;
    const query = `UPDATE "calendar_event" SET "description" = $1, "title" = $2, "start" = $3, "end" = $4 
                    "WHERE "id" = $5 AND "user_id" = $6;`;

    pool.query(query, [description, title, start, end, eventId, req.user.id])
        .then(res.sendStatus(200))
        .catch(err => {
            console.log('Error deleting event', err);
        })
});

// route for deleting an event that was created by the logged in user
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    const eventId = req.params.id
    const query = `DELETE FROM "calendar_event" WHERE "id" = $1 AND "user_id" = $2;`;

    pool.query(query, [eventId, req.user.id])
        .then(res.sendStatus(200))
        .catch(err => {
            console.log('Error deleting event', err);
        })
});

module.exports = router;
