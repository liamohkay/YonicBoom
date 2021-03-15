const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/');
const DIST_DIR = path.join(__dirname, '/dist/');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  }
};
