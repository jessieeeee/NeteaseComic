/**
 * @date :2018/8/12
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 欢迎界面
 */

import React, {Component} from 'react'
import {Image, View, StyleSheet, Platform} from 'react-native';
import CommonStyle from './constant/CommonStyle'
import Config from './constant/Config'
let iconLogo = require('./img/ic_logo.png')
let iconLogoGirl = require('./img/ic_logo_girl.png')

class Launch extends Component<Props> {

    componentDidMount() {
        // ２秒后跳转
        setTimeout(() => {
            this.props.navigation.navigate('Main')
        }, 2000)
    }

    render() {
        return (
            <View style={CommonStyle.styles.container}>
                  <View style={{alignItems:'center',marginTop:Config.sreenW*0.24}}>
                    <Image source={iconLogoGirl} style={styles.iconLogoGirl}/>
                    <Image source={iconLogo} style={styles.iconLogo}/>
                  </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconLogoGirl: {
        width: Platform.OS === 'ios' ? CommonStyle.dimensions.ios.iconLogoGirlW : CommonStyle.dimensions.android.iconLogoGirlW,
        height: Platform.OS === 'ios' ? CommonStyle.dimensions.ios.iconLogoGirlH : CommonStyle.dimensions.android.iconLogoGirlH,
        resizeMode:'contain'
    },
    iconLogo: {
        width: Platform.OS === 'ios' ? CommonStyle.dimensions.ios.iconLogoW : CommonStyle.dimensions.android.iconLogoW,
        height: Platform.OS === 'ios' ? CommonStyle.dimensions.ios.iconLogoH : CommonStyle.dimensions.android.iconLogoH,
        resizeMode:'contain'
    }
})
export default Launch