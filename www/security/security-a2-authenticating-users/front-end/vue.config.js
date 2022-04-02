module.exports = {
  publicPath: '',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5090',
      },
    },
  },
};
