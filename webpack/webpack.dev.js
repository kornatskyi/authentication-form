const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const Dotenv = require('dotenv-webpack')
require('dotenv').config({ path: './config/env/.env.dev' })

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {

    hot: true,
    // open: true,
    port: process.env.PORT || 8080,
    //binds to all hosts set 0.0.0.0
    host: process.env.HOST,
    historyApiFallback: {
      disableDotRule: true //allows contain dots "." in url
    }, //makes browser keep components after refresh when using react router
    clientLogLevel: 'none',
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Bohdan'),
    }),
    new Dotenv({
      path: './config/env/.env.dev',
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
    }),
  ],
}
