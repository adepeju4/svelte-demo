const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const IMAGE_TYPES = /\.(png|jpe?g|gif|svg)$/i;

const mode = process.env.mode || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    index: './src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  stats: {
    all: false,
    errors: true,
    builtAt: true,
    assets: true,
    excludeAssets: [IMAGE_TYPES],
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [
      // Help webpack in understanding CSS files imported in .js files
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      },
      // Check for images imported in .js files and
      {
        test: IMAGE_TYPES,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name].[ext]',
          },
        }, ],
      },
      //Allows use of svelte
      {
        test: /\.(svelte)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
          },
        },
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.svelte'],
  },
  plugins: [
    // Clean build folder
    new CleanWebpackPlugin(),
    // // Copy static assets from `public` folder to `build` folder
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: '**/*',
    //     context: 'public',
    //     filter: (resourcePath) => {
    //       if (
    //         resourcePath.slice(resourcePath.lastIndexOf(
    //         '.html')) === '.html'
    //       )
    //         return false;
    //       return true;
    //     },
    //   }, ],
    // }),
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      chunks: ['index'],
      filename: 'index.html',
      inject: true,
    }),
    new Dotenv(),
  ],
};