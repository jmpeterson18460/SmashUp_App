import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'

function* fetchFaction(action) {
    try{

        //factionResponse sends get request to router '/api/smashup/faction' and 
        //receives back all of the faction names and ids and stores them in factionResponse.data
        const factionResponse = yield call(axios.get, '/api/smashup/faction')

        //sends faction names and ids to factionName reducer via action 'SET_FACTION'
        //and payload factionResponse.data
        yield put({
            type: 'SET_FACTION',
            payload: factionResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    } catch (error) {
        console.log('Error in getting factions: ', error);
        
    }
}

function* fetchMyGames(action){
    try{

        //myGames sends get request to router '/api/smashup/faction' and receives
        //back all of the games the user has submitted and stores them in myGames.data
        
        const myGames = yield call(axios.get, '/api/smashup/mygames')
        

        //sets state of myGames reducer with all of the user's submitted games 
        //via action 'SET_MY_GAMES' and payload myGames.data
        yield put({
            type: 'SET_MY_GAMES',
            payload: myGames.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    } catch(error) {
        console.log('Error in getting my games: ', error);
        
    }
}

function* fetchGame(action){
    try{
        const game = yield call(axios.get, '/api/smashup/singlegame?id=' + action.payload.game_id)
        yield put({
            type: 'SET_MY_GAME',
            payload: game.data
        })
    }catch(error){
        console.log('Error in getting game: ', error);
        
    }
}

function* fetchGameId(action) {
    try{

        //gameId contains all of the game ids from the game table in the database
        const gameId = yield call(axios.get, '/api/smashup/gameid')

        //sets state of gameId reducer with all of the game ids via 'SET_GAME_ID'
        //and payload gameId.data
        yield put({
            type: 'SET_GAME_ID',
            payload: gameId.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting game id: ', error);
        
    }
}

function* postGameInfo(action) {

    //sends game info to router '/api/smashup/gameinfo' for a brand new game
    try{
        yield call(axios.post, '/api/smashup/gameinfo', action.payload)
    
    //if there is an error in sending post request to router, the error
    //will display in the console log
    } catch (error){
        console.log('Error in posting game info: ', error);
        
    }
}

function* postGameInfoWGameId(action){

    //sends game info to router '/api/smashup/gameinfowid' to add the game information
    //of other players to the game that was created from postGameInfo
    try{
        yield call(axios.post, '/api/smashup/gameinfowid', action.payload)
    
    //if there is an error in sending post request to router, the error
    //will display in the console log
    } catch(error){
        console.log('Error in posting game info: ', error);
        
    }
}

function* editGame(action){
    try{
        yield call(axios.put, '/api/smashup/editgame', action.payload)
        // yield put({
        //     type: 'FETCH_MY_GAMES'
        // })
    }catch(error){
        console.log('Error in editing game: ', error);
        
    }
}

function* delGame(action){

    //sends the game id of the game to be deleted to router '/api/smashup/delgame/' in order
    //for the info of that game to be deleted from the user_game table in the database
    try{
        yield call(axios.delete, '/api/smashup/delgame/' + action.payload)

        //sends the same game id as above to the delGameId generator function
        yield put({
            type: 'DEL_GAME_ID',
            payload: action.payload
        })

        //updates state of myGames reducer without the game that was deleted
        yield put({
            type: 'FETCH_MY_GAMES'
        })

    //if there is an error in sending delete request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in deleting game: ', error);
        
    }
}

function* delGameId(action){

    //sends the game id of the game to be deleted to router '/api/smashup/delgameid/' 
    //and deletes the game id of the game to be deleted
    try{
        yield call(axios.delete, '/api/smashup/delgameid/' + action.payload)

        //updates state of gameId reducer without the deleted game id
        yield put({
            type: 'FETCH_GAME_ID'
        })

    //if there is an error in sending delete request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in deleting game id: ', error);
        
    }
}


function* factionSaga() {
    yield takeLatest('FETCH_FACTION', fetchFaction)
    yield takeLatest('FETCH_MY_GAMES', fetchMyGames)
    yield takeLatest('FETCH_GAME', fetchGame)
    yield takeLatest('FETCH_GAME_ID', fetchGameId)
    yield takeLatest('POST_GAME_INFO', postGameInfo)
    yield takeLatest('POST_GAME_INFO_W_GAME_ID', postGameInfoWGameId)
    yield takeLatest('EDIT_GAME', editGame)
    yield takeLatest('DEL_GAME', delGame)
    yield takeLatest('DEL_GAME_ID', delGameId)
  }

  export default factionSaga;