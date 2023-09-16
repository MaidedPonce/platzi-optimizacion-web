const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')
const shouldAnalize = process.argv.includes('--analyze')
const plugins = []

if (shouldAnalize) {
  plugins.push(new BundleAnalyzerPlugin())
}

const nodeEnv = process.env.NODE_ENV || 'development'

const config = {
  mode: nodeEnv,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: '.',
  },
  plugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

module.exports = config
