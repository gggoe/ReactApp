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