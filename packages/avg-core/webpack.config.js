const path = require('path');
const webpack = require('webpack');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');

const packageInfo = require('./package.json');

const fs = require('fs');
const babelOptions = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));

const license = `/*!
 * @file        AVG.js library
 * @author      Icemic Jia <bingfeng.web@gmail.com>
 * @copyright   2015-2017 Icemic Jia
 * @link        https://www.avgjs.org
 * @license     Apache License 2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
`;

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
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(packageInfo.version),
        'process.env': {
          NODE_ENV: JSON.stringify(env.release ? 'production' : 'development'),
        },
      }),
      ...uglifyPlugin,
      new webpack.BannerPlugin({ banner: license, raw: true }),
      new BitBarWebpackProgressPlugin(),
    ]
  };
};
