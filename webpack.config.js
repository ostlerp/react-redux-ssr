var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var currentEnvironment = process.env.NODE_ENV || 'local';
var config = require('./config/' + currentEnvironment);
var ManifestPlugin = require('webpack-manifest-plugin');
var autoprefixer = require('autoprefixer');

var webpackConfig = {
  resolve: {
   extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: config.WEBPACK.preLoaders,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?' + JSON.stringify({
            presets:['react', 'es2015']
          })
        ]
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.eot$|\.woff2$|\.ttf$/,
        loader: 'file?name=images/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: currentEnvironment === 'local' ? 'style!css' : ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: currentEnvironment === 'local' ? 'style!css?sourceMap!postcss!sass?sourceMap' : ExtractTextPlugin.extract('style-loader', 'css!postcss!sass')
      },
    ],
  },
  postcss: function () {
      return [autoprefixer];
  },

  plugins: [
    new webpack.DefinePlugin({
      'window.API_PATH': '"' + config.API_PATH + '"',
      'process.env.NODE_ENV': '"' + currentEnvironment + '"',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      'fetch': 'exports?self.fetch!whatwg-fetch'
    })
  ],

  output: {
    filename: 'app' + (currentEnvironment !== 'local' ? '.[hash]' : '') + '.js',
    path: __dirname + '/dist',
    publicPath: '/dist/'
  }
};

if(currentEnvironment === 'local') {
  var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
  webpackConfig.entry = ['webpack-hot-middleware/client', 'webpack/hot/only-dev-server', './src/app.js'];
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  webpackConfig.entry = './src/app.js';
  webpackConfig.plugins.push(new ExtractTextPlugin("app.min.[hash].css"));
  webpackConfig.plugins.push(new OptimizeCssAssetsPlugin());
  webpackConfig.plugins.push(new ManifestPlugin());
}
if (currentEnvironment === 'production') {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
module.exports = webpackConfig;
