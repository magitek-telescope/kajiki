const webpack = require("webpack");

module.exports = {
  entry: [
	  './js/index.js',
  ],
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
	    },
      {
        test: /\.svg$/,
        loader: 'url-loader?mimetype=image/svg+xml'
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', [
      'electron',
      'fs',
      'aws-sdk'
    ])
  ],
  vue: {
    loaders: {
      js: 'babel'
    }
  }
}
