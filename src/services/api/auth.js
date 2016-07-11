import { APIConstants } from '../../constants';
import { HandleResponse } from './index';
import * as Cookie from 'cookie';

function getAuthToken() {
  let cookie = Cookie.parse(document.cookie);
  if(cookie.auth) {
    return JSON.parse(cookie.auth).token;
  }
  return null;
}

export function getAuthorizationHeaders() {
  let headers = APIConstants.HEADERS;
  headers['Authorization'] = getAuthToken();
  return headers;
}

/**
 * Logs into the system
 * @param email
 * @param password
 * @returns {Promise}
 */
export function login(username, password) {
  return new Promise(
    (resolve, reject) => {
      var url = APIConstants.SERVER() + APIConstants.ROUTES.AUTH.LOGIN;
      fetch(url, {
        method: 'POST',
        headers: APIConstants.HEADERS,
        body: JSON.stringify({
          username: username,
          password: password
        })
      }).then((response) => {
        HandleResponse(response, resolve, reject);
      }).catch((error) => {
        reject(error);
      })
    }
  );
}

export function getByInviteCode(code) {
  return new Promise(
    (resolve, reject) => {
      var url = APIConstants.SERVER() + APIConstants.ROUTES.AUTH.INVITE + code;
      fetch(url, {
        method: 'GET',
        headers: APIConstants.HEADERS
      }).then((response) => {
        HandleResponse(response, resolve, reject);
      }).catch(reject)
    }
  );
}

export function getByResetCode(code) {
  return new Promise(
    (resolve, reject) => {
      var url = APIConstants.SERVER() + APIConstants.ROUTES.AUTH.RESET_PASSWORD + code;
      fetch(url, {
        method: 'GET',
        headers: APIConstants.HEADERS
      }).then((response) => {
        HandleResponse(response, resolve, reject);
      }).catch(reject)
    }
  );
}

export function acceptInvite(values) {
  let {username, password, passwordCheck, invite_code, first, last} = values;
  return new Promise(
    (resolve, reject) => {
      var url = APIConstants.SERVER() + APIConstants.ROUTES.AUTH.INVITE + invite_code;
      fetch(url, {
        method: 'POST',
        headers: APIConstants.HEADERS,
        body: JSON.stringify({
          username: username,
          password: password,
          passwordCheck: passwordCheck,
          first: first,
          last: last
        })
      }).then((response) => {
        HandleResponse(response, resolve, reject);
      }).catch(reject)
    }
  );
}

export function resetPassword(username, password, passwordCheck, code) {
  return new Promise(
    (resolve, reject) => {
      var url = APIConstants.SERVER() + APIConstants.ROUTES.AUTH.RESET_PASSWORD + code;
      fetch(url, {
        method: 'POST',
        headers: APIConstants.HEADERS,
        body: JSON.stringify({
          username: username,
          password: password,
          passwordCheck: passwordCheck
        })
      }).then((response) => {
        HandleResponse(response, resolve, reject);
      }).catch(reject)
    }
  );
}

export function forgotPassword(email) {
  return new Promise(
    (resolve, reject) => {
      var url = APIConstants.SERVER() + APIConstants.ROUTES.AUTH.FORGOT_PASSWORD;
      fetch(url, {
        method: 'POST',
        headers: APIConstants.HEADERS,
        body: JSON.stringify({
          email: email
        })
      }).then((response) => {
        HandleResponse(response, resolve, reject);
      }).catch(reject)
    }
  );
}

export function impersonate(userId) {
  return new Promise(
    (resolve, reject) => {
      var url = APIConstants.SERVER() + APIConstants.ROUTES.AUTH.IMPERSONATE;
      fetch(url + userId, {
        method: 'GET',
        headers: this.getAuthorizationHeaders()
      }).then((response) => {
        HandleResponse(response, resolve, reject);
      }).catch(reject)
    }
  );
}
