const { runtime } = require("./jest.config.cjs");

module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
      ['@babel/preset-react', {targets: {node: 'current'}, runtime: 'automatic'}],
    ],
  }