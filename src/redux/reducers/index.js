import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import faction from './smashUpReducer'

const store = combineReducers({
  user,
  login,
  faction
});

export default store;
