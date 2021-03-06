import Config from "../constant/Config"
import {Platform, StyleSheet} from "react-native"

/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :腾讯分页样式统一定义
 */
const dimensions = {
    android: {
        titleFont: Config.screenW * 0.04,
        subTitleFont: Config.screenW * 0.03,
        marginTop: Config.screenW * 0.02,
        subMarginTop: Config.screenW * 0.01,
        labelMargin: Config.screenW * 0.014,
        labelPadding: Config.screenW * 0.004,

    },
    ios: {
        titleFont: Config.screenW * 0.04,
        subTitleFont: Config.screenW * 0.03,
        marginTop: Config.screenW * 0.02,
        subMarginTop: Config.screenW * 0.01,
        labelMargin: Config.screenW * 0.014,
        labelPadding: Config.screenW * 0.004,

    }
}

const styles = StyleSheet.create({
    itemView: {
        flex: 1,
        padding: Platform.OS === 'ios' ? 4 : 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Config.backgroundColor,
        width: Config.screenW,
        height: Config.screenW * 0.44
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
    author: {
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
    detailRowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    score: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont * 0.8 : dimensions.android.subTitleFont * 0.8,
        backgroundColor: Config.orange,
        borderRadius: 20,
        padding: Platform.OS === 'ios' ? dimensions.ios.labelPadding*2 : dimensions.android.labelPadding*2,
        marginLeft: Platform.OS === 'ios' ? dimensions.ios.labelMargin : dimensions.android.labelMargin,
    }
})

export default {dimensions, styles}