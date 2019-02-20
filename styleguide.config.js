var fs = require('fs')

module.exports = {
  components: 'src/**/[A-Z]*.js',
  styleguideDir: 'docs',
  getExampleFilename (componentPath) {
    var exampleFile = componentPath.replace(/\.jsx?$/, '.md')

    if (fs.existsSync(exampleFile)) {
      return exampleFile
    }

    return false
  },
  styles: {
    StyleGuide: {
      '@global body': {
        color: '#17364D',
        fontFamily: [
          'BlinkMacSystemFont',
          '-apple-system',
          '"Segoe UI"',
          '"Roboto"',
          '"Oxygen"',
          '"Ubuntu"',
          '"Cantarell"',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif'
        ].join(',')
      }
    }
  },
  webpackConfig: {
    devServer: {
      host: '0.0.0.0',
      https: false
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: 'pre',
          options: {
            fix: true
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(scss|css)/,
          loader: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(jpe?g|png|gif|svg|ttf|otf|eot|woff|woff2)$/,
          loader: 'file-loader'
        }
      ]
    }
  }
}
