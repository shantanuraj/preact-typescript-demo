/**
 * Webpack configuration to build the project
 */

'use strict';

const { resolve }         = require('path');
const webpack             = require('webpack');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const CopyWebpackPlugin   = require('copy-webpack-plugin');
const { version }         = require('./package.json');

module.exports = (env) => {
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const removeEmpty = plugins => plugins.filter(plugin => !!plugin);
  const ifProd = plugin => addPlugin(env.prod, plugin);

  const output = {
    path: resolve(process.cwd(), 'dist'),
    filename: '[name].js',
  };

  if (env.prod) {
    Object.assign(output, {
      filename: '[name].[chunkhash].js',
      publicPath: 'https://static.gamezop.io/peach/',
    });
  }

  return {
    entry: {
      'vendor': ['preact'],
      'app': './src/index.tsx',
    },
    output,
    context: resolve(__dirname),
    devtool: env.prod ? 'source-map' : 'eval',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    },
    plugins: removeEmpty([
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: env.prod ? '"production"' : '"development"',
        },
        '_app': {
          version: `'${version}'`,
        },
      }),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
      })),
      new HtmlWebpackPlugin({ template: './public/index.html' }),
    ]),
    module: {
        rules: [{
          test: /\.tsx?$/,
          use: [
            'babel-loader',
            'ts-loader',
          ]
        }]
    }
  };
}