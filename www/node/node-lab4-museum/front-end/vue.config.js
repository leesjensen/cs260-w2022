module.exports = {
  configureWebpack: {
    devtool: 'eval-source-map',
  },
  devServer: {
    proxy: 'http://localhost:3000',
  },
};
