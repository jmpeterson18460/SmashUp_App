import { combineReducers } from 'redux';
import { LOGIN_ACTIONS } from '../actions/loginActions';

// let state be an object, put error messages inside. Also put payload inside
// const initialState = {
//   errorMessage: '',
//   payload: undefined
// }
// ^ more maintainable

const message = (state = '', action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.CLEAR_LOGIN_ERROR:
      return '';
    case LOGIN_ACTIONS.LOGIN_FAILED:
      return 'Ooops! The username and password didn\'t match. Try again!';
    case LOGIN_ACTIONS.LOGIN_FAILED_NO_CODE:
      return 'Ooops! Something went wrong! Is the server running?';
    case LOGIN_ACTIONS.INPUT_ERROR:
      return action.payload;
    default:
      return state;
  }
};
// initialState here too
const isLoading = (state = false, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.REQUEST_START:
      return true;
    case LOGIN_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isLoading,
  message,
});

