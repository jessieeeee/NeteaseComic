import Config from "../constant/Config"
import {Platform, StyleSheet} from "react-native"

/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :腾讯分页样式统一定义
 */
const dimensions = {
    android: {
        titleFont: Config.sreenW * 0.04,
        subTitleFont: Config.sreenW * 0.03,
        marginTop: Config.sreenW * 0.02,
        subMarginTop: Config.sreenW * 0.01,
        labelMargin: Config.sreenW * 0.014,
        labelPadding: Config.sreenW * 0.004,
    },
    ios: {
        titleFont: Config.sreenW * 0.04,
        subTitleFont: Config.sreenW * 0.03,
        marginTop: Config.sreenW * 0.02,
        subMarginTop: Config.sreenW * 0.01,
        labelMargin: Config.sreenW * 0.014,
        labelPadding: Config.sreenW * 0.004,
    }
}

const styles = StyleSheet.create({
    itemView: {
        flex: 1,
        padding: Platform.OS === 'ios' ? 4 : 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Config.backgroundColor
    },
    listView:{
        marginTop: Platform.OS === 'ios' ? Config.sreenW * 0.06 : 0
    },
    textView: {
        flex: 1,
        margin: Platform.OS === 'ios' ? 10 : 10,
        justifyContent: 'center',
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelView: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: 'white',
        marginLeft: Platform.OS === 'ios' ? dimensions.ios.labelMargin : dimensions.android.labelMargin,
        padding: Platform.OS === 'ios' ? dimensions.ios.labelPadding : dimensions.android.labelPadding
    },
    title: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.titleFont : dimensions.android.titleFont,
        color: Config.normalTextColor,
        fontWeight: 'bold',
    },
    chapter: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.marginTop : dimensions.android.marginTop
    },
    clickNum: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.subMarginTop : dimensions.android.subMarginTop
    },
    category: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.subMarginTop : dimensions.android.subMarginTop
    },
    intro: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.subMarginTop : dimensions.android.subMarginTop
    },
})

export default {dimensions, styles}