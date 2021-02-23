const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false, // 是否开启 esLint
  runtimeCompiler:true,
  productionSourceMap: false, // 默认是开启的，关闭后打包的代码易读易线上调式，也可加快打包速度
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  publicPath:
    './', // 项目根目录
  devServer: {
    port: 8080,
    https: true,
  },
  configureWebpack: {
    devtool: 'source-map',
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000
      // 只给出 js 文件的性能提示
      // assetFilter: function(assetFilename) {
      //   return assetFilename.endsWith(".js");
      // }
    }
  }

}
