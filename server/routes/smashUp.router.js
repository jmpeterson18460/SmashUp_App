const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/faction', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `SELECT * FROM "faction" ORDER BY "name" ASC;`
        pool.query(queryText).then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log('Error in getting factions: ', error);
            
        })
    }else{
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/numofplayers', (req, res) => {
    if(req.isAuthenticated()){
        const queryText =  `INSERT INTO "user_game" ("points") VALUES ($1);`
    }
});

module.exports = router;