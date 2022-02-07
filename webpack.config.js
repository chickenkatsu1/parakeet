const path = require('path')
const Snoowrap = require('snoowrap')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
      fallback: {
          path: require.resolve("snoowrap")
      }
  }
}