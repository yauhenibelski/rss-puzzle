/**
 * @type {import('webpack').Configuration}
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ develop }) => ({
    mode: develop ? 'development' : 'production',
    devtool: develop ? 'inline-source-map' : false,

    context: path.resolve(__dirname, 'src'),
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        clean: true,
    },
    devServer: {
        port: 4000,
    },
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/img/[name][ext]',
                },
            },
            {
                test: /\.(mp3)$/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/mp3/[name][ext]',
                },
            },
            {
                test: /\.(ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/fonts/[name][ext]',
                },
            },
            {
                test: /\.[tj]s$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@utils': path.resolve(__dirname, './src/utils/'),
            '@pages': path.resolve(__dirname, '/src/app/pages/'),
            '@style': path.resolve(__dirname, './src/style/'),
            '@interfaces': path.resolve(__dirname, './src/app/interfaces/'),      
            '@assets': path.resolve(__dirname, './src/assets/'),
          },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Rss puzzle'
        }),
    ],
});
