const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production', 
  entry: './server.js',
  externals: ['express'],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Additional configuration goes here
};