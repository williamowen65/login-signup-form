// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;



// Function to get entry points from pages directory
const getEntryPoints = (dir) => {
    const entries = {};
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            entries[file] = path.join(fullPath, 'index.ts');
        }
    });
    return entries;
};

const entryPoints = getEntryPoints(path.resolve(__dirname, 'src/pages'));

const config = {
    entry: {
        main: './src/index.ts',
        welcome: './src/pages/welcome/index.ts',
        ...entryPoints
    },
    devtool: 'source-map', // Add this line to enable source maps
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/bundle.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            filename: 'welcome.html',
            template: './src/pages/welcome/index.html',
            chunks: ['welcome'],
        }),
        new MiniCssExtractPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
