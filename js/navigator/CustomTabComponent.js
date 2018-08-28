/**
 * @date :2018/8/19
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 自定义底部导航栏
 */

import React from 'react';
import { BottomTabBar } from 'react-navigation-tabs'
import {DeviceEventEmitter} from 'react-native'

export default class CustomTabComponent extends React.Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            showBar : false
        }
    }
    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('showBar', ()=>{
            this.setState({
                showBar : true
            })
        })
    }

    componentWillUnmount(){
        this.subscription.remove();
    }

    render() {
        return this.state.showBar && <BottomTabBar {...this.props} />;
    }
}
