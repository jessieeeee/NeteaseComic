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
        barHeight: Config.sreenW * 0.14,
        iconBarSize: Config.sreenW * 0.06,
        iconBarMargin: Config.sreenW * 0.04,
        infoCoverW:Config.sreenW * 0.3,
        infoCoverH:Config.sreenW * 0.5,
        infoMargin:Config.sreenW * 0.04,
        introMargin:Config.sreenW * 0.06,
        readTextW:Config.sreenW * 0.4,
        readTextH:Config.sreenW * 0.08,
        detailTitleFont: Config.sreenW * 0.04,
        detailSubTitleFont: Config.sreenW * 0.03,
    },
    ios: {
        titleFont: Config.sreenW * 0.034,
        subTitleFont: Config.sreenW * 0.028,
        clickNumFont: Config.sreenW * 0.022,
        marginTop: Config.sreenW * 0.01,
        subMarginTop: Config.sreenW * 0.002,
        barHeight: Config.sreenW * 0.14,
        iconBarSize: Config.sreenW * 0.06,
        iconBarMargin: Config.sreenW * 0.04,
        infoCoverW:Config.sreenW * 0.3,
        infoCoverH:Config.sreenW * 0.5,
        infoMargin:Config.sreenW * 0.02,
        introMargin:Config.sreenW * 0.06,
        readTextW:Config.sreenW * 0.4,
        readTextH:Config.sreenW * 0.08,
        detailTitleFont: Config.sreenW * 0.04,
        detailSubTitleFont: Config.sreenW * 0.03,
    }
}
const styles = StyleSheet.create({
    itemView: {
        flex: 1,
        margin: Platform.OS === 'ios' ? 4 : 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Config.backgroundColor
    },
    title: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.titleFont : dimensions.android.titleFont,
        color: Config.normalTextColor,
        fontWeight: 'bold',
        marginTop: Platform.OS === 'ios' ? dimensions.ios.subMarginTop : dimensions.android.subMarginTop
    },
    chapter: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.marginTop : dimensions.android.marginTop
    },
    clickNum: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.clickNumFont : dimensions.android.clickNumFont,
        color: Config.gray,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.subMarginTop : dimensions.android.subMarginTop
    },
    detailHeader: {
        width: Config.sreenW,
        height: Platform.OS === 'ios' ? dimensions.ios.barHeight : dimensions.android.barHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        width: Platform.OS === 'ios' ? dimensions.ios.iconBarSize : dimensions.android.iconBarSize,
        height: Platform.OS === 'ios' ? dimensions.ios.iconBarSize : dimensions.android.iconBarSize,
    },
    headerIconLeftView: {
        position: 'absolute',
        left: Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
    },
    headerIconRightView: {
        position: 'absolute',
        right: Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
    },
    infoView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    infoCover:{
        width:Platform.OS === 'ios' ? dimensions.ios.infoCoverW : dimensions.android.infoCoverW,
        height:Platform.OS === 'ios' ? dimensions.ios.infoCoverH : dimensions.android.infoCoverH,
        margin:Platform.OS === 'ios' ? dimensions.ios.infoMargin : dimensions.android.infoMargin,
    },
    infoTextView:{
        justifyContent:'center',
        margin:Platform.OS === 'ios' ? dimensions.ios.infoMargin : dimensions.android.infoMargin,
        height:Platform.OS === 'ios' ? dimensions.ios.infoCoverH : dimensions.android.infoCoverH,
        width:Platform.OS === 'ios' ? dimensions.ios.readTextW : dimensions.android.readTextW,
    },
    titleText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailTitleFont : dimensions.android.detailTitleFont,
        color: Config.normalTextColor,
        fontWeight: 'bold',
    },
    subText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: Config.gray,
    },
    introText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: Config.gray,
        margin:Platform.OS === 'ios' ? dimensions.ios.introMargin : dimensions.android.introMargin
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
        position:'absolute',
        bottom:0,
        borderRadius:2
    },
    chapterTitle:{
        flexDirection:'row',
        width:Config.sreenW,
        height:Platform.OS === 'ios' ? dimensions.ios.barHeight : dimensions.android.barHeight,
    },
    chapterViews:{
        flex:1
    },
    moreText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color:Config.gray,
        borderColor:Config.gray,
    }
})

export default {dimensions, styles}
