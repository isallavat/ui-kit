const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  devServer: {
    host: '0.0.0.0',
    https: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      fix: true
    })
  ]
}
