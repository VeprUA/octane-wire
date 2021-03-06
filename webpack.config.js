const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    bundle: ['./src/ui/root.js']
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte']
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  mode,
  plugins: [
    new webpack.DefinePlugin({}),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin([
      { from: 'public', to: './' }
    ], { writeToDisk: true })
  ],
  devtool: prod ? false : 'source-map'
};