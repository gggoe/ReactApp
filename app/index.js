import React from 'react';
import {render} from 'react-dom';
// App 负责选择哪一个页面
import App from './containers/index'
import './assets/index.less'
render(
    <App/>,
    document.getElementById('root')
);
