module.exports = {
  API_PATH: 'http://localhost:3000',
  WEBPACK: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ],
    devtool: 'source-map'
  }
};
