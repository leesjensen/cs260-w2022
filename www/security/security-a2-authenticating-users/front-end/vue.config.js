module.exports = {
  publicPath: '',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
      },
    },
  },
};
