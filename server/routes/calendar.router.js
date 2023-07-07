const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// This router manages all of the request pertaining to community events

// route for getting all of the events
router.get('/', rejectUnauthenticated, (req, res) => {
    // Joins the calendar_event and user table to get all the relevant data to the front about each event and who created it
        const queryText = `SELECT "event_calendar"."id", "event_calendar"."user_id", "user"."username", "user"."first_name", "user"."last_name", 
                            "event_calendar"."title", "event_calendar"."description", "event_calendar"."start", "event_calendar"."end"
                            FROM "event_calendar"
                            JOIN "user" ON "event_calendar"."user_id" = "user"."id";`;

        pool.query(queryText)
            .then(result => {
                // console.log('Success GETing events');
                res.status(200).send(result.rows);
            }).catch(err => {
                // console.log('Error getting calendar events', err);
                res.sendStatus(500);
            })
})

// route for posting a new event to the calendar
router.post('/create-event', rejectUnauthenticated, (req, res) => {
    // destructuring the relevant information out of the body of the request
    const { title, description, start, end } = req.body;
    const queryText = `INSERT INTO "event_calendar" ( "title", "description", "start", "end", "user_id")
    VALUES ($1, $2, $3, $4, $5);`

    pool.query(queryText, [title, description, start, end, req.user.id])
        .then(result => {
            // console.log(`Successful POST of event: ${title} for ${req.user.username}`);
            res.sendStatus(201)}
        ).catch(err => {
            // console.log('Error posting event', err);
            res.sendStatus(500);
        })
})

// route for updating the values of an event that the logged-in user created
router.put('/update/:id', rejectUnauthenticated, (req, res) => {
    // grab the event's id from the url parameters
    const eventId = req.params.id;
    // destructuring the relevant information out of the body of the request
    const { description, title, start, end } = req.body;
    const query = `UPDATE "event_calendar" SET "description" = $1, "title" = $2, "start" = $3, "end" = $4 
                    WHERE "id" = $5 AND "user_id" = $6;`;

    pool.query(query, [description, title, start, end, eventId, req.user.id])
        .then(result => {
            // console.log(`Successful PUT of event at id: ${eventId} for ${req.user.username}`);
            res.sendStatus(200)}
        ).catch(err => {
            // console.log('Error updating an event', err);
            res.sendStatus(500);
        })
});

// route for deleting an event that was created by the logged in user
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    // grab the event's id from the url parameters
    const eventId = req.params.id
    const query = `DELETE FROM "event_calendar" WHERE "id" = $1 AND "user_id" = $2;`;

    pool.query(query, [eventId, req.user.id])
        .then(result => {
            // console.log(`Successful delete of event at id: ${eventId} for ${req.user.username}`);
            res.sendStatus(200)}
        ).catch(err => {
            // console.log('Error deleting event', err);
            res.sendStatus(500);
        })
});

module.exports = router;
