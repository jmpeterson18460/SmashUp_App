import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'

function* fetchFaction(action) {
    try{

        //factionResponse sends get request to server and receives back all of the
        //faction names and ids and stores them in factionResponse.data
        const factionResponse = yield call(axios.get, '/api/smashup/faction')

        //sends faction names and ids to factionName reducer via action 'SET_FACTION'
        //and payload factionResponse.data
        yield put({
            type: 'SET_FACTION',
            payload: factionResponse.data
        })
    } catch (error) {
        console.log('Error in getting factions: ', error);
        
    }
}

function* postGameInfo(action) {
    try{
        yield call(axios.post, '/api/smashup/gameinfo', action.payload)
    } catch (error){
        console.log('Error in posting factions: ', error);
        
    }
}


function* factionSaga() {
    yield takeLatest('FETCH_FACTION', fetchFaction)
    yield takeLatest('POST_GAME_INFO', postGameInfo)
  }

  export default factionSaga;