const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let newGameId = 0;

/**
 * GET route template
 */
router.get('/faction', (req, res) => {

    //checks to see if the user has an account in the database;
    //if they don't, a forbidden message is displayed and he or she
    //will not have access to the results from the following query
    if(req.isAuthenticated()){

        //brings in all factions from the faction table and puts them
        //in alphabetical order
        const queryText = `SELECT * FROM "faction" ORDER BY "name" ASC;`

        //sends query text to database; takes the result from the database
        //and sends it back to the fetchFaction generator function from factionSaga that 
        //requested it
        pool.query(queryText).then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log('Error in getting factions: ', error);
            
        })
    }else{
        res.sendStatus(403);
    }
});

router.get('/mygames', (req, res) => {
    
})

router.post('/gameinfo', (req, res) => {

    //see router.get('/faction') for explanation of req.isAuthenticated()
    if(req.isAuthenticated()){
        console.log('req.body: ', req.body);

        //game is the newInput object from state in GameInfo.js
        const game = req.body;

        (async () => {
            //client does not allow the program to proceed until it is connected to the database
            const client = await pool.connect();

            try{
                await client.query('BEGIN');

                //creates an entry in the game table in the database
                let queryText = `INSERT INTO "game" DEFAULT VALUES RETURNING "id";`;
                const gameResult = await client.query(queryText);

                //the id of the game that was created in gameResult
                const gameId = gameResult.rows[0].id
                newGameId = gameId

                //text for posting gameinfo to the database
                queryText = `INSERT INTO "user_game" ("user_id", "game_id", "player_name",
                "faction1", "faction2", "points", "rank", "bases", "comments", "admin") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

                //takes user id, game id, and the property values from the variable game
                //and inputs them into the VALUES ($1, $2, $3,...) of the queryText
                //client.query then posts the info to the database
                const result = await client.query(queryText, [req.user.id, gameId, game.playerName,
                game.factionArray[0], game.factionArray[1], game.points, game.rank, game.bases,
                game.comments, req.user.id])
                await client.query('COMMIT');
                res.sendStatus(201);

            } catch (e) {

                //checks for errors at any point within the try block; if errors are found,
                //all the data is cleared to prevent data corruption
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {

                //allows res.sendStatus(201) to be sent
                client.release();
            }

            //if an error occurs in posting the game info to the database, the error will
            //appear in the console log
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        })
        
    }else {
        //if req.isAuthenticated() is false, the forbidden error will appear
        //on the webpage
        res.sendStatus(403);
    }
});

router.post('/gameinfowid', (req, res) => {

    //see router.get('/faction') for explanation of req.isAuthenticated()
    if(req.isAuthenticated()){
        const game = req.body;

        //text for posting game info to database
        const queryText = `INSERT INTO "user_game" ("user_id", "game_id", "player_name",
        "faction1", "faction2", "points", "rank", "bases", "comments", "admin") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`

        //takes user id, game id, and the property values from the variable game
        //and inputs them into the VALUES ($1, $2, $3,...) of the queryText
        //pool.query then posts the info to the database
        pool.query(queryText, [req.user.id, newGameId, game.playerName, game.factionArray[0], 
            game.factionArray[1], game.points, game.rank, game.bases, game.comments, 
            req.user.id]).then((response) => {
                res.sendStatus(201)
            
            //if an error occurs in posting the game info to the database, the error will
            //appear in the console log
            }).catch((error) => {
                console.log('Error in posting game info: ', error);
            })
    }else {

        //if req.isAuthenticated() is false, the forbidden error will appear
        //on the webpage
        res.sendStatus(403)
    }
})

module.exports = router;