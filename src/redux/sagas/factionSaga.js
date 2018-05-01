import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'

function* getFaction(action) {
    try{
        const factions = yield call(axios.get, '/api/smashup')
        yield put({
            type: 'SET_FACTION'
        })
    } catch (error) {
        console.log('Error in getting factions: ', error);
        
    }
}