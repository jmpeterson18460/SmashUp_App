import { combineReducers } from 'redux';

const factionName = (state = [], action) => {
    if (action.type === 'SET_FACTION'){
        return action.payload
    }
    return state
}

const numOfPlayers = (state = 0, action) => {
    if(action.type === 'SET_NUM_OF_PLAYERS'){
        return action.payload
    }
    return state
}

export default combineReducers({
    factionName,
    numOfPlayers,
})