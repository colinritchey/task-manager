const path = require('path')

module.exports = {
  entry: "./index.js",
  output: {
    filename: "./bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
        include: path.join(__dirname, './public/images')
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx" ]
  }
};
