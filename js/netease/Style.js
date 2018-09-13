import {Platform, StyleSheet} from "react-native"
import Config from "../constant/Config"

/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 网易分页样式统一定义
 */
const dimensions = {
    android: {
        titleFont: Config.screenW * 0.034,
        subTitleFont: Config.screenW * 0.028,
        clickNumFont: Config.screenW * 0.022,
        marginTop: Config.screenW * 0.01,
        subMarginTop: Config.screenW * 0.002,
        iconBarMargin: Config.screenW * 0.04,
    },
    ios: {
        titleFont: Config.screenW * 0.034,
        subTitleFont: Config.screenW * 0.028,
        clickNumFont: Config.screenW * 0.022,
        marginTop: Config.screenW * 0.01,
        subMarginTop: Config.screenW * 0.01,
        iconBarMargin: Config.screenW * 0.04,

    }
}
const styles = StyleSheet.create({
    itemView: {
        flex: 1,
        padding: Platform.OS === 'ios' ? 4 : 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Config.backgroundColor
    },

    title: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.titleFont : dimensions.android.titleFont,
        color: Config.normalTextColor,
        fontWeight: 'bold',
        marginTop: Platform.OS === 'ios' ? dimensions.ios.marginTop : dimensions.android.marginTop
    },
    chapter: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.subMarginTop : dimensions.android.subMarginTop
    },
    clickNum: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.clickNumFont : dimensions.android.clickNumFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.subMarginTop : dimensions.android.subMarginTop
    },
})

export default {dimensions, styles}
