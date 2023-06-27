const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// route for getting all of the events
router.get('/', rejectUnauthenticated, (req, res) => {
    const sortBy = req.params;
        const queryText = `SELECT "event_calendar"."id", "event_calendar"."user_id", "user"."username", "user"."first_name", "user"."last_name", 
                            "event_calendar"."title", "event_calendar"."description", "event_calendar"."start", "event_calendar"."end"
                            FROM "event_calendar"
                            JOIN "user" ON "event_calendar"."user_id" = "user"."id";`;

        pool.query(queryText)
            .then(result => {
                console.log('Success GETing events');
                res.send(result.rows);
            }).catch(err => {
                console.log('Error getting calendar events', err);
                res.sendStatus(500);
            })
})

// router.get('/:sortBy', rejectUnauthenticated, (req, res) => { // stretch
//     const sortBy = req.params;
//     console.log('req params: ', sortBy);
//     const queryText = `SELECT "event_calendar"."id", "event_calendar"."user_id", "user"."username", "user"."first_name", "user"."last_name", 
//                         "event_calendar"."title", "event_calendar"."description", "event_calendar"."start", "event_calendar"."end"
//                         FROM "event_calendar"
//                         JOIN "user" ON "event_calendar"."user_id" = "user"."id"
//                         ORDER BY $1;`;

//     pool.query(queryText, [sortBy])
//         .then(result => {
//             console.log('Success GETing events sorted by: ', sortBy);
//             res.send(result.rows);
//         }).catch(err => {
//             console.log('Error getting calendar events', err);
//             res.sendStatus(500);
//         })
// })

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
    const query = `UPDATE "event_calendar" SET "description" = $1, "title" = $2, "start" = $3, "end" = $4 
                    WHERE "id" = $5 AND "user_id" = $6;`;

    pool.query(query, [description, title, start, end, eventId, req.user.id])
        .then(res.sendStatus(200))
        .catch(err => {
            console.log('Error updating an event', err);
        })
});

// route for deleting an event that was created by the logged in user
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    const eventId = req.params.id
    const query = `DELETE FROM "event_calendar" WHERE "id" = $1 AND "user_id" = $2;`;

    pool.query(query, [eventId, req.user.id])
        .then(res.sendStatus(200))
        .catch(err => {
            console.log('Error deleting event', err);
        })
});

module.exports = router;
