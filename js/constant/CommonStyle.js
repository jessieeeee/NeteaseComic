import {Platform, StyleSheet} from "react-native"
import Config from './Config'
/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 统一样式定义
 */
const dimensions = {
    android:{
        tabBarImageSize: Config.sreenW*0.08,
        iconLogoGirlW:Config.sreenW*0.6,
        iconLogoGirlH:Config.sreenW,
        iconLogoW:Config.sreenW*1,
        iconLogoH:Config.sreenW*0.3,
    },
    ios:{
        tabBarImageSize: Config.sreenW*0.08,
        iconLogoGirlW:Config.sreenW*0.6,
        iconLogoGirlH:Config.sreenW,
        iconLogoW:Config.sreenW*1,
        iconLogoH:Config.sreenW*0.3,

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    tabBarImage: {
        width: Platform.OS === 'ios' ? dimensions.android.tabBarImageSize: dimensions.ios.tabBarImageSize,
        height: Platform.OS === 'ios' ? dimensions.android.tabBarImageSize: dimensions.ios.tabBarImageSize,
    },
　　
})


export default {dimensions,styles}