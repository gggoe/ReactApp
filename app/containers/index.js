import React, {Component} from 'react';
import RouterMap from '../routes/index'

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
        this.setState(
            {done: true}
        );
        // 测试加载效果
        // setTimeout(() => {
        //     this.setState({done: true})
        // }, 3000);
    }
}