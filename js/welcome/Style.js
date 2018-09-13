import {Platform, StyleSheet} from "react-native"
import Config from "../constant/Config"

/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 主界面样式统一定义
 */
const dimensions = {
    android:{
        iconLogoGirlW:Config.screenW*0.6,
        iconLogoGirlH:Config.screenW,
        iconLogoW:Config.screenW*1,
        iconLogoH:Config.screenW*0.3,
    },
    ios:{
        iconLogoGirlW:Config.screenW*0.6,
        iconLogoGirlH:Config.screenW,
        iconLogoW:Config.screenW*1,
        iconLogoH:Config.screenW*0.3,
    }
}
const styles = StyleSheet.create({
    iconLogoGirl: {
        width: Platform.OS === 'ios' ? dimensions.ios.iconLogoGirlW : dimensions.android.iconLogoGirlW,
        height: Platform.OS === 'ios' ? dimensions.ios.iconLogoGirlH : dimensions.android.iconLogoGirlH,
        resizeMode: 'contain'
    },
    iconLogo: {
        width: Platform.OS === 'ios' ? dimensions.ios.iconLogoW : dimensions.android.iconLogoW,
        height: Platform.OS === 'ios' ? dimensions.ios.iconLogoH : dimensions.android.iconLogoH,
        resizeMode: 'contain'
    }
})
export default {dimensions,styles}
