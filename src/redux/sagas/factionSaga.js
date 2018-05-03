import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'

function* fetchFaction(action) {
    try{
        const factionResponse = yield call(axios.get, '/api/smashup/faction')
        yield put({
            type: 'SET_FACTION',
            payload: factionResponse.data
        })
    } catch (error) {
        console.log('Error in getting factions: ', error);
        
    }
}

function* postNumOfPlayers(action) {
    try{
        yield call(axios.post, '/api/smashup/numofplayers', action.payload)
    }catch (error) {
        console.log('Error in posting number of players: ', error);
        
    }
}

function* factionSaga() {
    yield takeLatest('FETCH_FACTION', fetchFaction);
    yield takeLatest('SET_NUM_OF_PLAYERS', postNumOfPlayers)
  }

  export default factionSaga;