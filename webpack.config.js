const path = require('path')

module.exports = {
  entry: './src/js/script.js',
  mode: 'development',
  devServer: {
    static: './dist'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
