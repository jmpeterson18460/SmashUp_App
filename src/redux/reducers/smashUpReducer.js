import { combineReducers } from 'redux';

const factionName = (state = [], action) => {

    //sets state of factionName to an array of objects where
    //each object contains faction id and faction name
    if (action.type === 'SET_FACTION'){
        return action.payload
    }
    return state
}

const numOfPlayers = (state = 0, action) => {

    //sets state of numOfPlayers to the number of players
    //the user selected on NumberOfPlayers.js
    if(action.type === 'SET_NUM_OF_PLAYERS'){
        return action.payload
    }
    return state
}

const myGames = (state = [], action) => {

    if(action.type === 'SET_MY_GAMES'){
        return action.payload
    }
    return state
}

const gameId = (state = [], action) => {
    if(action.type === 'SET_GAME_ID'){
        return action.payload
    }
    return state
}

export default combineReducers({
    factionName,
    numOfPlayers,
    myGames,
    gameId
})