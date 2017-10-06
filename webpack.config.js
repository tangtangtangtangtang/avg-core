const path = require('path');
const webpack = require('webpack');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');

const packageInfo = require('./package.json');

const fs = require('fs');
const babelOptions = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));

/* eslint-disable */

module.exports = function (env) {

  let uglifyPlugin;

  env = env || {};

  if (env.minimize) {
    uglifyPlugin = [new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true,
      compress: {
        warnings: false
      }
    })];
  } else {
    uglifyPlugin = [];
  }

  return {
    cache: true,
    entry: ['whatwg-fetch', './src/avg.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `avg${env.minimize ? '.min' : ''}.js`,
      libraryTarget: 'umd',
      library: 'AVG',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['src', 'node_modules'],
    },
    module: {
      rules: [
        { test: /\/yoga-layout\/.*entry-.*\.js$/, loader: 'babel-loader', query: { compact: true, cacheDirectory: true, babelrc: false, ...babelOptions } },
        { test: /\.js$/, exclude: /node_modules\/(?!(koa-compose|avg-.*|pixi-richtext|huozi))/, loader: 'babel-loader', query: { compact: true, cacheDirectory: true } },
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: { compact: true, cacheDirectory: true } },
        { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
      ],
    },
    externals: {
      'pixi.js': 'PIXI'
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(packageInfo.version),
        'process.env': {
          NODE_ENV: JSON.stringify(env.release ? 'production' : 'development'),
        },
      }),
      ...uglifyPlugin,
      new BitBarWebpackProgressPlugin(),
    ]
  };
};
