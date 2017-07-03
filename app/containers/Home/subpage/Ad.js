import React, {Component} from 'react';
import {getAd} from '../../../fetch/home'
import './index.less'

export default class Ad extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    render() {
        return (
            <div className="ad">
                <h4>超级特惠</h4>
                {this.state.data.length ?
                    this.state.data.map((item, index) => (
                        <a href={item.link} key={index}>
                            <img src={item.img} title={item.title}/>
                        </a>
                    )) :
                    <div>正在加载</div>
                }
            </div>
        )
    }

    /* 页面加载前执行 */
    componentDidMount() {
        /* 调用封装的方法获取数据并保存到this.state */
        getAd().then(res => res.json().then(data => {
            console.log(data);
            this.setState({
                data
            })
        }))
    }
}