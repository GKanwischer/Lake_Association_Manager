const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/main', (req, res) => {
  // GET route code here
  queryText = `SELECT * FROM "proposal;`;

  pool.query(queryText)
  .then(result => {
    res.send(result.rows)
  }).catch(err => {
    console.log(err);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;