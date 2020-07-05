const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/easycoffeeathome.jsx',
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
//    new HtmlWebpackPlugin({
//      title: 'Production',
//    }),
  ],
  output: {
    filename: './easycoffeeathome.bundle.js',
    path: path.resolve(__dirname, 'htdocs/js'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};

