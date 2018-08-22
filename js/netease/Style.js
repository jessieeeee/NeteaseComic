import {Platform, StyleSheet} from "react-native"
import Config from "../constant/Config"

/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 网易分页样式统一定义
 */
const dimensions = {
    android: {
        titleFont: Config.sreenW * 0.034,
        subTitleFont: Config.sreenW * 0.028,
        clickNumFont: Config.sreenW * 0.022,
        marginTop: Config.sreenW * 0.01,
        subMarginTop: Config.sreenW * 0.002,
        infoCoverW:Config.sreenW * 0.3,
        infoCoverH:Config.sreenW * 0.42,
        infoMargin:Config.sreenW * 0.04,
        readTextW:Config.sreenW * 0.4,
        readTextH:Config.sreenW * 0.08,
        detailTitleFont: Config.sreenW * 0.04,
        detailSubTitleFont: Config.sreenW * 0.03,
        iconBarMargin: Config.sreenW * 0.04,

    },
    ios: {
        titleFont: Config.sreenW * 0.034,
        subTitleFont: Config.sreenW * 0.028,
        clickNumFont: Config.sreenW * 0.022,
        marginTop: Config.sreenW * 0.01,
        subMarginTop: Config.sreenW * 0.01,
        infoCoverW:Config.sreenW * 0.3,
        infoCoverH:Config.sreenW * 0.42,
        infoMargin:Config.sreenW * 0.04,
        readTextW:Config.sreenW * 0.4,
        readTextH:Config.sreenW * 0.08,
        detailTitleFont: Config.sreenW * 0.04,
        detailSubTitleFont: Config.sreenW * 0.03,
        iconBarMargin: Config.sreenW * 0.04,

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

    infoView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    detailView:{
        padding: Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
    },
    infoCover:{
        width:Platform.OS === 'ios' ? dimensions.ios.infoCoverW : dimensions.android.infoCoverW,
        height:Platform.OS === 'ios' ? dimensions.ios.infoCoverH : dimensions.android.infoCoverH,
        marginRight:Platform.OS === 'ios' ? dimensions.ios.infoMargin*2 : dimensions.android.infoMargin*2,
    },
    infoRightView:{
        justifyContent:'center',
        height:Platform.OS === 'ios' ? dimensions.ios.infoCoverH : dimensions.android.infoCoverH,
        width:Platform.OS === 'ios' ? dimensions.ios.readTextW : dimensions.android.readTextW,
    },
    infoTextView:{
        position: 'absolute',
        top: 0,
        width:Platform.OS === 'ios' ? dimensions.ios.readTextW : dimensions.android.readTextW,
    },
    titleText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailTitleFont : dimensions.android.detailTitleFont,
        color: Config.normalTextColor,
        fontWeight: 'bold',
    },
    firstSubText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios. marginTop * 4: dimensions.android.marginTop * 4,
    },
    subText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios. marginTop: dimensions.android.marginTop,
    },

    readText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color:'white',
        backgroundColor:Config.redText,
        width:Platform.OS === 'ios' ? dimensions.ios.readTextW : dimensions.android.readTextW,
        height:Platform.OS === 'ios' ? dimensions.ios.readTextH : dimensions.android.readTextH,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        borderRadius:2
    },




})

export default {dimensions, styles}
