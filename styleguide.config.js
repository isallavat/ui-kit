const fs = require('fs')

module.exports = {
  components: 'src/**/[A-Z]*.js',
  styleguideDir: 'docs',
  getExampleFilename (componentPath) {
    const exampleFile = componentPath.replace(/\.jsx?$/, '.md')

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
  }
}
