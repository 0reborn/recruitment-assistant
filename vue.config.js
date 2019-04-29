const path = require('path')
const webpack = require('webpack')

module.exports = {
   pages: {
      index: {
         // page 的入口
         entry: 'src/pages/home/index.js',
         // 模板来源
         template: 'public/index.html',
         // 在 dist/index.html 的输出
         filename: 'index.html',
         // 当使用 title 选项时，
         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
         title: 'Home Page'
      },
   },

   // webpack配置
   configureWebpack: {

      plugins: [

         new webpack.ProvidePlugin({

            $: "jquery",

            jQuery: "jquery",

            "windows.jQuery": "jquery"

         })

      ]

   },

   chainWebpack: config => {
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
      types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
   },
}

function addStyleResource(rule) {
   rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
         patterns: [
            path.resolve(__dirname, './src/common/less/*'),
         ],
      })
}