const path = require('path')

module.exports = {
  entry: './src/js/script.js',
  devServer: {
    static: './dist'
  },
  mode: 'development',
  devtool: 'source-map',
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
