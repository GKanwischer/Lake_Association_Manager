const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/contact-info/', rejectUnauthenticated, (req, res) => {
  const { first_name, last_name, phone_number, email, street_address, city, state, profile_pic } = req.body;
  const queryText = `UPDATE "user" SET "first_name" = $1, "last_name" = $2, "phone_number" = $3,
                     "email" = $4, "street_address" = $5, "city" = $6, "state" = $7, "profile_pic" = $8 WHERE "id" = $9;`;

  pool.query(queryText, [first_name, last_name, phone_number, email, street_address, city, state, profile_pic, req.user.id])
    .then((result) => {
      console.log(`Successfully updated user contact info for ${req.user.username}`);
      res.sendStatus(201);
    }).catch((err) => {
      console.log('Error updating contact info', err);
      res.sendStatus(500);
    })
})

module.exports = router;
