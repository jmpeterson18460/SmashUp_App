const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/faction', (req, res) => {
    const queryText = `SELECT * FROM "faction" ORDER BY "name" ASC;`
    pool.query(queryText).then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('Error in getting factions: ', error);
        
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;