import React, {Component} from 'react';
// 引入HomeHeader 组件
import HomeHeader from '../../components/HomeHeader/index'

export default class Home extends Component {
    render() {
        return (
            <div>
                <HomeHeader cityName="北京"/>
            </div>
        )
    }
}