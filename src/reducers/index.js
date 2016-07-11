import CombineReducers from './combineReducers';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { AuthActions } from '../actions';
import { auth } from './auth/';

const appReducer = CombineReducers({
  form,
  auth
});

const rootReducer = (state, action) => {
  if(action.type === AuthActions.LOGOUT) {
    state = null;
  }

  return appReducer(state, action);
}

export default rootReducer;
