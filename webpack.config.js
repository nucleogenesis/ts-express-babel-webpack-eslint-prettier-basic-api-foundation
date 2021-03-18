require('dotenv-expand')(
    require('dotenv').config({
        path: path.join(__dirname, ".env")
    })
);

const nodeExternals = require('webpack-node-externals');
const webpack = require("webpack");
const path = require('path');

const { NODE_ENV } = process.env;

const ENETO = /^ENETO_/i;

function vars () {
    const raw = Object.keys(process.env)
        .filter(key => ENETO.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];

                return env;
            },
            {
                // if we want to add some of our on env variables do it here.
                NODE_ENV,
                PUBLIC_URL: "/",
                PORT: 5000
            }
        );
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);

            return env;
        }, {})
    };

    return { raw, stringified };
}

const  { stringified } = vars();

module.exports = {
    target: 'node',
    node: {
        __filename: false,
        __dirname: false
    },
    externals: [nodeExternals()],
    entry: "./src/index.ts",
    mode: NODE_ENV,
    devtool: 'source-map',
    output: {
        filename: '[name]-bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, './dist-webpack'),
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '_',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                include: /src/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(stringified)
    ]
};
