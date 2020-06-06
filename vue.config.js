module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/echarts-demo/dist/'
      : '/'
  }