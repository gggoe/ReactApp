# 搭建环境

## react技术栈

- react react-router4 redux react-redux

## 初始化 package.json
```
npm init -y
```


## webpack
```
# webpack 打包 webpack-dev-server 起本地服务
npm install webpack webpack-dev-server
```

## babel
```
# bable 解析
npm install babel-core babel-loader babel-preset-es2015 babel-preset-stage-0 babel-preset-react css-loader style-loader less less-loader html-webpack-plugin -D
```

## react
```
npm install react redux react-redux react-router-dom react-dom -S
```

## fetch
```
# fetch 获取数据 基于promise
# whatwg-retch 如果fetch 不兼容 自动降低为原生ajax
npm install es6-promise whatwg-fetch -D
```

## express
```
# 构建后台
npm install express -S
```

## scripts
```
# reogress 显示进度条 colors 显示颜色
"start","webpack-dev-server --port 3002 --open --progress --colors"
# webpack 打包压缩代码
"build","webpack -p"
```

## 配置webpack
在根目录创建一个webpack.config.js 文件
```
let path = require('path'); // 解析路径 入口只支持绝对路径
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: './app/index.js',
    // 出口
    output: {
        filename: "bundle.js", // 打包后文件
        path: path.resolve('dist')
    },
    // 规则
    module: {
        rules: [
            // 解析 .js 文件 使用babel-loader 排除node_modules 文件
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            // 解析 .less 文件 先使用 less-loader 解析成css 再使用css-loader 解析 最后用style-loader 放到style 里 顺序不能写错
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
        ]
    },
    // 插件
    plugins: [
        new htmlWebpackPlugin({
            template: './app/index.html'
        })
    ],
    // 错误时可以提示源码错误, 不会光显示bundle.js 错误
    devtool: 'source-map',
    // 配置代理
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
};
```

## 创建源文件目录

在根目录创建一个app 文件夹用来存放源文件

在app 下创建一个index.js 和 index.html 文件

在根目录创建.babelrc 文件 .babelrc 文件中不能书写注释
```
{
  "presets": ["stage-0","es2015","react"]
}
```

在package.json 文件中加入规则
```
  "scripts": {
    "start": "webpack-dev-server --port 3002 --open --progress --colors",
    "build": "webpack -p"
  },
```

在index.html 中
```
# 移动端适配
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

<div id="root"></div>
```

在index.js 中 测试配置
```
import React from 'react';
import {render} from 'react-dom';

render(
    <h1>Hello world</h1>,
    document.getElementById('root')
);

```


















