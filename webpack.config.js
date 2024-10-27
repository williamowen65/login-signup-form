// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');


const isProduction = process.env.NODE_ENV == 'production';
const isNPM_Production = process.env.NODE_ENV == 'npm';
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

    devtool: 'source-map', // Add this line to enable source maps
  
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
   

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

const productionConfig = {
    entry: {
        main: './src/index.ts',
        welcome: './src/pages/welcome/index.ts',
        ...entryPoints
    },
    output: {
        path: path.resolve(__dirname, 'login-signup-form'),
        filename: '[name]/bundle.js',
        clean: true,
    },
    plugins: [
        new Dotenv(),
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
            ...config.module.rules,
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ]
    }
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        Object.assign(config, productionConfig)
        
    } else if (isNPM_Production) {
        config.mode = 'npm_production';
        Object.assign(config, {
            entry: {
                main: './src/index.npm.ts',
                // Don't include the welcome page in the entry points
                // ...Object.values(entryPoints).filter( el => /welcome/.test(el) ? -1 : 1)
            },
            output: {
                path: path.resolve(__dirname, 'npm-deployment'),
                filename: '[name]/bundle.js',
                clean: true,
            },
            plugins: [
                new Dotenv()       
            ],
            module: {
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                        use: 'null-loader'
                    }
                ]
            }
        })
 
    }
    return config;
};
