import {Platform, StyleSheet} from "react-native"
import Config from "../constant/Config"

/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 网易分页样式统一定义
 */
const dimensions = {
    android: {
        titleFont: Config.sreenW * 0.03,
        subTitleFont: Config.sreenW * 0.024,
    },
    ios: {
        titleFont: Config.sreenW * 0.03,
        subTitleFont: Config.sreenW * 0.024,
    }
}
const styles = StyleSheet.create({
    itemView: {
        flex: 1,
        margin: Platform.OS === 'ios' ? 4 :　4,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Config.backgroundColor
    },
    title: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.titleFont : dimensions.android.titleFont,
        color: Config.normalTextColor,
        fontWeight:'bold',
    },
    chapter: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: Config.gray
    },
    clickNum: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: Config.gray
    }
})

export default {dimensions, styles}
