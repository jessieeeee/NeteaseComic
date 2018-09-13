/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 渲染欢迎界面
 */
import React, {Component} from "react"
import {View, Image, } from "react-native"
import Config from "../constant/Config"
import CommonStyle from "../common/CommonStyle"
import MainStyle from './Style'
let iconLogo = require('../img/ic_logo.png')
let iconLogoGirl = require('../img/ic_logo_girl.png')


class Welcome extends Component<Props> {
    render() {
        return (
            <View style={[CommonStyle.styles.container,{position:'absolute',top:0,left:0,bottom:0,right:0}]}>
                <View style={{alignItems: 'center', marginTop: Config.screenW * 0.24}}>
                    <Image source={iconLogoGirl} style={MainStyle.styles.iconLogoGirl}/>
                    <Image source={iconLogo} style={MainStyle.styles.iconLogo}/>
                </View>
            </View>
        )
    }
}

export default Welcome