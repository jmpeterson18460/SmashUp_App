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
router.post('/gameinfo', (req, res) => {
    if(req.isAuthenticated()){
        console.log('req.body: ', req.body);
        const game = req.body;

        (async () => {
            //client does not allow the program to proceed until it is connected to the database
            const client = await pool.connect();

            try{
                await client.query('BEGIN');
                let queryText = `INSERT INTO "game" DEFAULT VALUES RETURNING "id";`;
                const gameResult = await client.query(queryText);
                const gameId = gameResult.rows[0].id

                queryText = `INSERT INTO "user_game" ("user_id", "game_id", "player_name",
                "faction1", "faction2", "points", "rank", "bases", "comments", "admin") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
                const result = await client.query(queryText, [req.user.id, gameId, game.playerName,
                game.factionArray[0], game.factionArray[1], game.points, game.rank, game.bases,
                game.comments, req.user.id])
                await client.query('COMMIT');
                res.sendStatus(201);
            } catch (e) {
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        })
        
    }
});

module.exports = router;