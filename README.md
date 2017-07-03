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

# 配置路由

## 目录结构
- components 组件 木偶组件

- containers 页面组件 或者自己的subpage目录下
    - Home
        - subpage 智能组件
        - index.js

- index.js 用来控制显示哪一个页面

在app 目录下创建containers 和components 文件夹

在containers 目录下创建Home 文件夹 和index.js 文件

在Home 目录下创建index.js 文件

在Home 目录下创建subpage 文件夹

在containers 目录下的index.js 中
```
import React, {Component} from 'react';
export default class App extends Component {
    render() {
        return (
            <div>
                App
            </div>
        )
    }
}
```

在app 目录下的index.js 中
```
# 导入containers 目录中的App组件
import App from './containers/index'

render(
    <App/>,
    document.getElementById('root')
);
```

在http://localhost:3002 中查看组件是否导出
```
# 在页面查看效果
npm start
```

在app 目录下创建routes 文件夹

在routes 目录下创建index.js 文件
```
import React, {Component} from 'react';
// 路由的两种类型 hashRouter BrowserRouter
// 取出HashRouter 并取一个为Router 的别名 取出Route
import {
    HashRouter as Router,
    Route
} from 'react-router-dom';
import Home from '../containers/Home';

export default class RouterMap extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route path="/" component={Home}/>
                    </div>
                </Router>
            </div>
        )
    }
}
```

在containers 目录下的index.js 中
```
# 导入路由规则
import RouterMap from '../routes/index'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 如果当路径为/ RouterMap 就会变成Home 组件 */}
                <RouterMap/>
            </div>
        )
    }
}
```

在Home 目录下的index.js 中
```
import React, {Component} from 'react';

export default class Home extends Component {
    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}
```

在http://localhost:3002/#/ 中查看组件是否导出

在containers 目录下的index.js 中给组件定义状态
```
export default class App extends Component {
    // state 给组件定义状态
    constructor() {
        // 调用super 方法后才有this
        super();
        this.state = {
            // done 加载 false 未完成
            done: false
        }
    }

    render() {
        return (
            <div>
                {/* 如果当路径为/ RouterMap 就会变成Home 组件 */}
                {this.state.done ? <RouterMap/> : <div>正在加载</div>}
            </div>
        )
    }

    // 组件加载完成后执行
    componentDidMount() {
        // 加载完成后修改加载状态为true
        // this.setState(
        //     {done: true}
        // );
        // 测试加载效果
        setTimeout(() => {
            this.setState({done: true})
        }, 3000);
    }
}
```

# 首页头部

在components 目录下创建一个HomeHeader 文件夹

在HomeHeader 目录下创建一个index.js 文件
```
import React, {Component} from 'react';
// 主页头部组件
export default class HomeHeader extends Component {
    render() {
        return (
            <div>
                HomeHeader
            </div>
        )
    }
}
```

在Home 目录下的index.js 中
```
// 导入HomeHeader 组件
import HomeHeader from '../../components/HomeHeader/index'

export default class Home extends Component {
    render() {
        return (
            <div>
                <HomeHeader/>
            </div>
        )
    }
}
```

把城市名作为参数传递给子组件
```
<HomeHeader cityName="北京"/>
```

在HomeHeader 目录下的index.js 文件中
```
render() {
    return (
        <div>
            {this.props.cityName}
        </div>
    )
}
```

在index.html 中
```
# 导入阿里的在线字体图标库
<link rel="stylesheet" href="http://at.alicdn.com/t/font_mvsk6fvxnm31sjor.css">
```

在HomeHeader 目录下的index.js 文件中
```
# 搭建头部基本结构
render() {
    return (
        <div>
            <div>
                <div>
                    {this.props.cityName}
                    <i className="iconfont icon-xiangxia2"></i>
                </div>
                <div>
                    <i className="iconfont icon-sousuo-xianxing"></i>
                    <input type="text"/>
                </div>
                <div>
                    <i className="iconfont icon-yonghufill"></i>
                </div>
            </div>
        </div>
    )
}
```

在app 目录下创建assets 文件夹存放公共样式

在assets 目录下创建index.less
```
* {
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei UI";
}

ul li {
  list-style: none;
}

a {
  text-decoration: none;
}

input {
  outline: none;
}

.back {
  background: #e9203d;
}

.font {
  color: #e9203d;
}
```

在app 目录下的index.js 中导入
```
import './assets/index.less'
```

在HomeHeader 目录下创建一个index.less 文件存放组件私有样式
```
.home-header {
  height: 48px;
  display: flex;
  align-items: center;
  color: #fff;
  text-align: center;
  .city {
    flex: 1;
  }
  .search {
    flex: 4;
    background: #fff;
    border-radius: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    i {
      color: #666;
      flex: 1
    }
    input {
      border: none;
      flex: 6;
      margin-right: 10px;
    }
  }
  .profile {
    flex: 0.5;
  }
}
```

在HomeHeader 目录下的index.js 文件中导入
```
import './index.less'
```

# 首页轮播

## swiper
```
# 下载轮播图插件
npm install swiper-js-iso react-swipe
```

在components 目录下新建一个Slider 文件夹用来存放轮播图

在Slider 目录下新建一个index.js 和index.less 文件

在index.js 中 测试轮播图插件
```
import React, {Component} from 'react';
# 导入轮播图插件
import ReactSwipe from 'react-swipe';
# 导入less 样式
import './index.less';

export default class Slider extends Component {
    render() {
        return (
            <div>
                <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
                    <div>PANE 1</div>
                    <div>PANE 2</div>
                    <div>PANE 3</div>
                </ReactSwipe>
            </div>
        )
    }
}
```

在Slider 目录下的index.js 文件中
```
# 导入组件样式
import './index.less'

# 搭建轮播图结构
<div>
    # swipeOptions 轮播图插件的方法
    <ReactSwipe className="carousel" swipeOptions={opts}>
        <div>
            <ul>
                <li>
                    <i className="iconfont icon-coupons"></i>
                    <span>美食</span>
                </li>
                ...
            </ul>
        </div>
        ...
    </ReactSwipe>
    <ul className="dots">
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
```

给dots 下的li 轮播图小圆点动态添加选中样式
```
# 存储当前应该选中的索引
constructor() {
    super();
    this.state = {
        index: 0
    }
}

# 调取插件的方法 用回调函数改变选中的索引
let opts = {
    continuous: false,
    callback: index => {
        this.setState({
            index
        })
    }
};

# 如果当前记录的索引等于自身索引则表示选中状态
<ul className="dots">
    <li className={this.state.index == 0 ? "active" : ""}></li>
    <li className={this.state.index == 1 ? "active" : ""}></li>
    <li className={this.state.index == 2 ? "active" : ""}></li>
</ul>
```

# 广告组件

在根目录创建一个mock 文件夹 用来存放接口和数据

在mock 目录下创建一个home 文件夹 用来存放主页数据

创建一个server.js 文件 配置接口
```
# 导入express 模块
let express = require('express');
let app = express();
# 导入数据
let ad = require('./home/ad');

// 如果访问这个接口就返回相应的数据
app.get('/api/ad', (req, res) => {
    res.send(ad);
});

app.listen(3000, () => {
    console.log('监听3000端口')
});
```

在mock 目录下的home 文件夹中新建ad.js 和list.js 存放数据
```
# 导出数据
module.exports = [
    {
        title: '非常大牌',
        img: '//gw.alicdn.com/tps/TB1u_5AKVXXXXaGXFXXXXXXXXXX-432-330.jpg_q50.jpg',
        link: 'https://ju.taobao.com/m/jusp/nv/fcdpwap/mtp.htm?scm=2027.4.1.2&jhsstyle=fcdp&spm=a215s.7406091.specialcard1.1&locate=SpecialCard1-1'
    }
    ...
];
```

在app 目录下 创建一个fetch文件夹 用来接收数据

在fetch 目录下新建一个index.js 文件
```
# 导入whatwg-fetch 和es6-promise插件
import 'whatwg-fetch';
import 'es6-promise'

# 导出一个get 方法 形参是接口地址
# 方法的返回值是一个fetch函数
export function get(url) {
    return fetch(url, {
        Accept: 'application/json'
    })
}
```

在fetch 目录下创建一个home 文件夹用来接收主页的数据

在fetch 目录下的home 文件中创建一个index.js 文件
```
# 导入父级目录中的index.js 文件中的get 方法
import {get} from '../index'
# 导出一个getAd 方法 返回值是执行get 方法并传入接口地址
export function getAd() {
    return get('/api/ad')
}
```

在containers 目录下的Home 文件夹中的subpage目录下新建一个Ad.js 组件和index.less 样式表

在Ad.js 文件中
```
# 导入getAd 方法 获取数据的方法
import {getAd} from '../../../fetch/home'
# 导入样式
import './index.less'

# 设置初始数据
constructor() {
    super();
    this.state = {
        data: []
    }
}
# 页面加载前执行 调取getAd方法获取初始数据 并保存到this.state
componentDidMount() {
    getAd().then(res => res.json().then(data => {
        console.log(data);
        this.setState({
            data
        })
    }))
}

render() {
    return (
        <div className="ad">
            <h4 className="font">超实惠</h4>
            {this.state.data.length ?
                # 如果有数据
                # 循环获取的数据 有多少条数据创建多少个a标签
                # item 每条数据 index每条数据的索引
                this.state.data.map((item, index) => (
                    <a href={item.link} key={index}>
                        <img src={item.img} title={item.title}/>
                    </a>
                )) :
                # 没有数据
                <div>正在加载</div>
            }
        </div>
    )
}
```

在containers 目录下的Home 文件夹中的index.js 中
```
# 导入Ad 组件
import Ad from './subpage/Ad'

return (
    <div>
        <HomeHeader cityName="北京"/>
        <Slider/>
        <Ad/>
    </div>
)
```







