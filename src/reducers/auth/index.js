import { AuthActions } from '../../actions';

const defaultState = {
  authenticated: false
}

export function auth(state = defaultState, action) {
  switch (action.type) {
    case AuthActions.RECEIVE_LOGIN:
      return Object.assign({}, state, {
        username: action.username,
        token: action.token,
        role: action.role,
        authenticated: true
      });
    case AuthActions.LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
