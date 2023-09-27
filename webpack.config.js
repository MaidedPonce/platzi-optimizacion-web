const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development'

  const plugins = []
  if (argv.analyze) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
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
}
