require('./node_modules/babel-core/register');
module.exports = require('./development');

//const webpack = require("webpack");

// module.exports = {
//   context: __dirname + '/src',
//
//   entry: {
//     js: "./js/entry.js"
//   },
//
//   output: {
//     path: __dirname + '/dist',
//     filename: "./js/app.js"
//   },
//
//   plugins: [
//     new webpack.optimize.UglifyJsPlugin()
//   ],
//
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['es2015']
//         }
//       }
//     ]
//   }
// }
