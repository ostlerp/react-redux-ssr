
# Webpack
webpack --config webpack.tests.config.js

# Start the dev server and unit test server
trap 'kill %1' SIGINT
nodemon index.js & webpack-dev-server --config webpack.tests.config.js  --content-base unit-tests/ --inline --watch
