const withImages = require('next-images');
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

const withLess = require('./next.with-less');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './static/styles/antd.custom.less'), 'utf8')
)


const styleLoaderConf = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: process.env.NODE_ENV === 'production' ? "[hash:base64:5]" : "[local]___[hash:base64:5]",
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables,
  },
};

module.exports = withImages(withLess(styleLoaderConf));
