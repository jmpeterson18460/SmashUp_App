import { combineReducers } from 'redux';

const factionName = (state = [], action) => {
    if (action.type === 'SET_FACTION'){
        return action.payload
    }
    return state
}

export default combineReducers({
    factionName
})