const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// getting all images
router.get('/', rejectUnauthenticated, (req,res) => {
    const queryText = `Select * FROM "gallery";`;

    pool.query(queryText)
    .then(result => {
        // console.log('Success GETing gallery images');
        res.status(200).send(result.rows);
    }).catch(err => {
        console.log('Error getting gallery images', err);
        res.sendStatus(500);
    })
})

// adding an image
router.post('/add', rejectUnauthenticated, (req, res) => {
    const {url, title, description} = req.body;
    const queryText =  `INSERT INTO "gallery" ("user_id", "url", "title", "description")
                        VALUES ($1, $2, $3, $4);`;

    pool.query(queryText, [req.user.id, url, title, description])
        .then(result => {
            res.sendStatus(201)
        }).catch(err => {
            console.log('Error adding image to db', err);
            res.sendStatus(500)
        })
})

// liking an image
router.put('/like/:imageId', rejectUnauthenticated, (req, res) => {
    const imageId = req.params.imageId;
    const queryText = `UPDATE "gallery" SET "likes" +1 WHERE "id" = $1;`;

    pool.query(queryText, [imageId])
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(`Error liking image: ${imageId}`, err);
            res.sendStatus(500);
        })
})

// deleting image
router.delete('/delete/:imageId', rejectUnauthenticated, (req, res) => {
    const imageId = req.paramas.imageId;
    const queryText = 'DELETE FROM "gallery" WHERE "id" = $1;';

    pool.query(queryText, [imageId])
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(`Error deleting image ${imageId}`, err)
            res.sendStatus(500);
        })
})

module.exports = router;