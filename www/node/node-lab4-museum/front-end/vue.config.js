module.exports = {
  configureWebpack: {
    devtool: 'eval-source-map',
  },
  devServer: {
    proxy: 'http://localhost:5400',
  },
};
