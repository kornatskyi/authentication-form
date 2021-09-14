const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devServer: {
        historyApiFallback: true, //makes browser keep components after refresh when using react router
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        port: 3001,
        //binds to all hosts
        host: "0.0.0.0"
    },
    // output: {
    //     "filename": "[name].js",
    //     path: path.resolve(__dirname, 'dist'),
    //     sourceMapFilename: "[name].js.map",
    // },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",

                ],
            },
            {
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                ],
            },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            //removed svg from regex , for some reason url-loader brokes svg import
            { test: /\.(png|jpg|jpeg|gif)$/, loader: "url-loader" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html', minify: false }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/assets', to: 'assets' }],
        }),
        new Dotenv({
            path: "./.env",
            safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            // silent: true, // hide any errors
            defaults: false // load '.env.defaults' as the default values if empty.
        }),

    ],


};
