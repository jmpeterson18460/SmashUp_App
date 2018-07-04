const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let newGameId = 0;

router.get('/faction', (req, res) => {

    //checks to see if the user has an account in the database;
    //if they don't, a forbidden message is displayed and he or she
    //will not have access to the results from the following query
    if(req.isAuthenticated()){

        //queryText brings in all factions from the faction table and puts them
        //in alphabetical order
        const queryText = `SELECT * FROM "faction" ORDER BY "name" ASC;`

        //sends query text to database; takes the result from the database
        //and sends it back to the fetchFaction generator function from factionSaga that 
        //requested it
        pool.query(queryText).then((result) => {
            res.send(result.rows)
        
        //if there was an error in getting the factions from the database,
        //the error will be displayed in the console log
        }).catch((error) => {
            console.log('Error in getting factions: ', error);
            
        })
    } else{

        //if req.isAuthenticated() is false, the forbidden error will appear
        //on the webpage
        res.sendStatus(403);
    }
});

router.get('/gameid', (req, res) => {

    //see router.get('/faction') for explanation of req.isAuthenticated()
    if(req.isAuthenticated()){

        //queryText returns all of the game ids from the game table
        const queryText =`SELECT "id" FROM "game" ORDER BY "id" DESC;`

        //sends query text to database; takes the result from the database
        //and sends it back to the fetchGameId generator function from factionSaga that 
        //requested it
        pool.query(queryText).then((result) => {
            res.send(result.rows)

        //if there was an error in getting the factions from the database,
        //the error will be displayed in the console log 
        }).catch((error) => {
            console.log('Error in getting game ids: ',error);
            
        })
    } else{

        //if req.isAuthenticated() is false, the forbidden error will appear
        //on the webpage
        res.sendStatus(403)
    }
})

router.get('/mygames', (req, res) => {

    //see router.get('/faction') for explanation of req.isAuthenticated()
    if(req.isAuthenticated()){

        //queryText returns all the games entered by the user based on
        //their user id
        const queryText = `SELECT * FROM "user_game" WHERE "user_id" = $1;`

        //sends queryText to database; takes the result from the database
        //and sends it back to the fetchMyGames generator function from factionSaga that 
        //requested it
        pool.query(queryText, [req.user.id]).then((result) => {
            res.send(result.rows)

        //if there was an error in getting the factions from the database,
        //the error will be displayed in the console log
        }).catch((error) => {
            console.log('Error in getting my games: ', error);
            
        })
    } else{

        //if req.isAuthenticated() is false, the forbidden error will appear
        //on the webpage
        res.sendStatus(403)
    }
})

//gets a single game from the database
router.get('/singlegame', (req, res) => {
    if(req.isAuthenticated){

        //queryText returns the game with the given user_id and game_id
        const queryText = `SELECT * FROM "user_game" WHERE ("user_id" = $1 AND "game_id" = $2);`

        //sends queryText to the database and returns the game with the given
        //user_id and game_id and sends those back to the fetchGameId generator function
        //from factionSaga that requested it
        pool.query(queryText, [req.user.id, req.query.id]).then((result) => {
            res.send(result.rows)
        }).catch((error) => {

            //if there was an error in getting the single game from the database,
            //the error will be displayed in the console log
            console.log('Error in getting game: ', error);
        })
    }else{

        //if req.isAuthenticated() is false, the forbidden error will appear
        //on the webpage
        res.sendStatus(403)
    }
})

//gets the top five factions according to win percentage
router.get('/factionrank', (req, res) => {

    //see router.get('/faction') for explanation of req.isAuthenticated()
    if(req.isAuthenticated()){

        (async () => {
            //client does not allow the program to proceed until it is connected to the database
            const client = await pool.connect();

            try{
                await client.query('BEGIN');

                //selects all factions
                const queryText = `SELECT * FROM "faction" ORDER BY "name" ASC;`;
                const factions = await client.query(queryText);

                //FactionsArray is an array whose elements are objects where
                //each object has properties of faction id and faction name
                const FactionsArray = factions.rows
                console.log('FACTIONS: ', FactionsArray);

                let winArray = [];

                //gets number of wins for each faction
                for(faction of FactionsArray){
                    let numberOfWinsQueryText = `SELECT count(*) FROM "user_game" WHERE 
                    (("faction1" = $1 OR "faction2" = $2) AND ("rank" = '1st'));`;
                    let factionRank = await client.query(numberOfWinsQueryText, [faction.name, faction.name]);
                    let numberOfFirsts = factionRank.rows[0];
                    
                    let totalGamesPlayedQueryText = `SELECT count(*) FROM "user_game" WHERE 
                    ("faction1" = $1 OR "faction2" = $2);`;
                    let numberOfGames = await client.query(totalGamesPlayedQueryText, [faction.name, faction.name]);
                    let totalGamesPlayed = numberOfGames.rows[0];

                    let winPercentage = Number(((numberOfFirsts.count/totalGamesPlayed.count)*100).toFixed(1))
                    if(isNaN(winPercentage)){
                        winPercentage = 0
                    }

                    // let winPercentageQueryText = `UPDATE "faction" SET "win_percentage" = $1 WHERE "name" = $2;`;
                    // await client.query(winPercentageQueryText, [winPercentage, faction.name])

                    winArray.push({id: faction.id, name: faction.name, wins: winPercentage})
                }
                
                //sorts the winArray faction from highest to lowest based on win percentage
                //this way the reducer will be able to easily pull the top five factions from this
                //array as it will just take the first five elements
                res.send(winArray.sort((a,b) => b.wins - a.wins));

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
        
    } else{
        //if req.isAuthenticated() is false, the forbidden error will appear
        //on the webpage
        res.sendStatus(403);
    }
});

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
        
    } else{
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

router.put('/editgame', (req, res) => {
    if(req.isAuthenticated()){
        const game = req.body
        const queryText = `UPDATE "user_game" SET "player_name" = $1, "faction1" = $2,
        "faction2" = $3, "points" = $4, "rank" = $5, "bases" = $6, "comments" = $7
        WHERE ("game_id" = $8 AND "player_name" = $9);`

        pool.query(queryText, [game.playerName, game.factionArray[0], game.factionArray[1],
        game.points, game.rank, game.bases, game.comments, game.game_id, game.playerName]).then((response) => {
            res.sendStatus(201)
        }).catch((error) => {
            console.log('Error in updating game: ', error);
            res.sendStatus(500)
        })
    } else{
        res.sendStatus(403)
    }
})

router.delete('/delgame/:id', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `DELETE FROM "user_game" WHERE ("user_id" = $1 AND "game_id" = $2);`
        pool.query(queryText, [req.user.id, req.params.id]).then((response) => {
            res.sendStatus(200)
        }).catch((error) => {
            res.sendStatus(500)
        })
    } else{
        res.sendStatus(403)
    }
})

router.delete('/delgameid/:id', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `DELETE FROM "game" WHERE "id" = $1;`
        pool.query(queryText, [req.params.id]).then((response) => {
            res.sendStatus(200)
        }).catch((error) => {
            res.sendStatus(500)
        })
    }else{
        res.sendStatus(403)
    }
})

module.exports = router;