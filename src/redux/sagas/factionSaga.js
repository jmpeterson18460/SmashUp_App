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

function* factionSaga() {
    yield takeLatest('FETCH_FACTION', fetchFaction);
  }

  export default factionSaga;