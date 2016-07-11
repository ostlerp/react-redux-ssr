import { auth } from './index';

import { AuthActions } from '../../actions';

import expect from 'expect';

describe('auth reducers', () => {
  it('should receive a login profile and mark a user as authenticated', () => {
    var actionObject = {
      type: AuthActions.RECEIVE_LOGIN,
      username: 'testy@test.org',
      role: 1,
      token: 'JWT asdkfjaasdfkasdfjlasdkfjalskdfj'
    };
    var state = auth(null, actionObject);
    expect(state.username).toBe(actionObject.username, 'Invalid email');
    expect(state.authenticated).toBe(true, 'Invalid authentication status');
  });

  it('should log a user out', () => {
    var actionObject = {
      type: AuthActions.RECEIVE_LOGIN,
      username: 'testy@test.org',
      role: 1,
      token: 'JWT asdkfjaasdfkasdfjlasdkfjalskdfj'
    };
    var state = auth(null, actionObject);
    expect(state.username).toBe(actionObject.username, 'Invalid email');
    expect(state.authenticated).toBe(true, 'Invalid authentication status');

    // Now log them out
    state = auth(null, {type: AuthActions.LOGOUT});
    expect(state.username).toBe(undefined, 'Invalid email');
    expect(state.token).toBe(undefined, 'Invalid profile');
    expect(state.authenticated).toBe(false, 'Invalid status');
  });
});
