/**
 * @date : 8/29/18
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 我的界面
 */

import React, {Component} from 'react'
import {ScrollView, View, AsyncStorage,DeviceEventEmitter} from 'react-native'
import MineStyle from './Style'
import Items from './Items'
import Header from './Header'
import NavigationService from '../navigator/NavigationService'
let ic_about = require('../img/icon_mine_about.png')
let ic_clean = require('../img/icon_mine_clean.png')
let ic_download = require('../img/icon_mine_download.png')
let ic_star = require('../img/icon_mine_star.png')
let items = [{name: '我的收藏', icon: ic_star}, {name: '本地漫画', icon: ic_download}, {
    name: '清除缓存',
    icon: ic_clean
}, {name: '关于', icon: ic_about}]

class Mine extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: null,
        }
    }

    componentDidMount(){
        let that = this
        AsyncStorage.getItem('userInfo', function (error, result) {
            if (error) {
                console.log('读取失败')
            }else {
                console.log(result)
                that.setState({
                    userInfo: JSON.parse(result),
                })
            }
        })
        this.subscription = DeviceEventEmitter.addListener('userInfo', (userInfo) => {
            that.setState({
                userInfo:userInfo
            })

        })
    }

    componentWillUnmount(){
        this.subscription.remove();
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                {this.renderInfo()}
                <View style={MineStyle.styles.divider}/>
                {this.renderItems()}
            </ScrollView>
        )
    }


    /**
     * 渲染我的信息
     */
    renderInfo() {
        return (
            <Header userInfo={this.state.userInfo}
                    onLogin={() => {
                        NavigationService.navigate('Login')
                    }}
                    onClickAvatar={() => {
                        console.log('点击了头像')
                    }}/>
        )
    }

    /**
     * 渲染选项列表
     * @returns {Array}
     */
    renderItems() {
        let itemViews = []
        for (let index in items) {
            itemViews.push(
                <Items key={index}
                       itemIcon={items[index].icon}
                       itemText={items[index].name}
                       onClick={(text) => {
                           console.log('点击了' + text)
                           switch (text) {
                               case  '我的收藏':
                                   NavigationService.navigate('MyFollow')
                                   break
                           }
                       }}/>
            )
        }
        return itemViews
    }
}


export default Mine