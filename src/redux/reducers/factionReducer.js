export const factionName = (state = [], action) => {
    if (action.type === 'SET_FACTION'){
        return action.payload
    }
    return state
}