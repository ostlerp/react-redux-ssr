require('babel-register');
require.extensions['.scss'] = function() {
  return;
};
require.extensions['.css'] = function() {
  return;
};
require('babel-polyfill');
require('./server/index');
