const px2rem = require('postcss-px2rem')
const postcss = px2rem({
    remUnit: 37.5   // 设计稿10等分之后的值
})

module.exports = {
    //runtimeCompiler: true
    lintOnSave: false,
    productionSourceMap: false,  // 关闭build生成source map文件
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },
    devServer: {
        proxy: {
          '/api': {  // 以 /api 识别需要代理
            target: 'http://localhost:4000',
            ws: true,
            changeOrigin: true,
            pathRewrite: {        // 重写路径，真正请求路径不需要/api
                '^/api': ''       //将/api替换为空字符
            }
          }
        }
    }
}