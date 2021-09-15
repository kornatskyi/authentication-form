const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
require('dotenv').config({ path: './config/env/.env.production' })
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('ReactTSBoilerplate'),
    }),
    new Dotenv({
      path: './config/env/.env.production',
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
    }),
  ],
}
