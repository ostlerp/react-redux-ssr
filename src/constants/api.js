export let SERVER = () => {
  return window.API_PATH;
};

let namespace = '/v1';

export let ROUTES = {
  AUTH: {
    LOGIN: `${namespace}/auth/login`,
    INVITE: `${namespace}/auth/invite/`,
    FORGOT_PASSWORD: `${namespace}/auth/forgot`,
    RESET_PASSWORD: `${namespace}/auth/reset/`,
    IMPERSONATE: `${namespace}/auth/impersonate/`
  }
};

export let HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
