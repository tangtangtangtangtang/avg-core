const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: ['react-hot-loader/patch', './demo/index.js'],
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
  },
  externals: {  // 指定采用外部 CDN 依赖的资源，不被webpack打包
    'pixi.js': 'PIXI',
    'avg-core': 'AVG',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules\/(?!(koa-compose|avg-.*|pixi-richtext|huozi))/, loader: 'babel-loader', query: { compact: true, cacheDirectory: true } },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    }),
  ],
  devServer: {
    contentBase: './',
    host: '127.0.0.1',
    // public: '192.168.199.161:6600',
    port: 6600,
    hot: true,
    // inline: true,
    // progress: true,
    /* uncomment it to load assets from your cdn */
    // proxy: {
    //   '/assets/': {
    //     target: '<your cdn domain>',
    //     secure: false
    //   }
    // }
  },
};
