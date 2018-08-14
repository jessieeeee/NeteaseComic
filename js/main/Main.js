/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 主界面
 */
import React, {Component} from "react"
import {View, Image, } from "react-native"
import Config from "../constant/Config"
import CommonStyle from "../constant/CommonStyle"
import MainStyle from './Style'
let iconLogo = require('../img/ic_logo.png')
let iconLogoGirl = require('../img/ic_logo_girl.png')

import TabNavigator from '../navigator/TabNavigator'
class Main extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            welcome: true
        }
    }

    componentDidMount() {
        // ２秒后移除欢迎界面
        setTimeout(() => {
            this.setState({
                welcome: false
            })
        }, 2000)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TabNavigator/>
                {this.renderWelcome()}
            </View>
        )
    }

    /**
     * 渲染欢迎界面
     * @returns {*}
     */
    renderWelcome() {
        if (this.state.welcome) {
            return (
                <View style={[CommonStyle.styles.container,{position:'absolute',top:0,left:0,bottom:0,right:0}]}>
                    <View style={{alignItems: 'center', marginTop: Config.sreenW * 0.24}}>
                        <Image source={iconLogoGirl} style={MainStyle.styles.iconLogoGirl}/>
                        <Image source={iconLogo} style={MainStyle.styles.iconLogo}/>
                    </View>
                </View>
            )
        }
    }
}

export default Main