/**
 * @date : 8/29/18
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 我的界面
 */

import React, {Component} from 'react'
import {ScrollView, View} from 'react-native'
import CommonStyle from '../common/CommonStyle'
import MineStyle from './Style'
import Items from './Items'
import Header from './Header'

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
            isLogin: false,
            userName: null,
            userId: null,
            avatar: null,

        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                <View>
                    {this.renderInfo()}
                    <View style={MineStyle.styles.divider}/>
                    {this.renderItems()}
                </View>
            </ScrollView>
        )
    }




    /**
     * 渲染我的信息
     */
    renderInfo() {
        return (
            <Header isLogin={this.state.isLogin}
                    userName={this.state.userName}
                    userId={this.state.userId}
                    avatar={this.state.avatar}
                    onLogin={() => {
                        console.log('点击了登录')
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
                       onClick={() => {
                           console.log('点击了')
                       }}/>
            )
        }
        return itemViews
    }
}


export default Mine