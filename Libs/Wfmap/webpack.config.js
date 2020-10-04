var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    "main": path.resolve(__dirname, 'src') + '/main.js',
    "wfmap": path.resolve(__dirname, 'src') + '/wfmap.js'
  },
  output:  {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: "wfmap",
    libraryTarget: 'umd',
    globalObject  : 'this'
  },
  // externals: {
  //   d3: 'd3'
  // },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [ { loader: 'babel-loader' } ],
        exclude: /node_modules/
      }
    ]
  }
};
