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
        barHeight: Config.sreenW * 0.1,
        iconBarSize: Config.sreenW * 0.06,
        iconBarMargin: Config.sreenW * 0.04,
        infoCoverW:Config.sreenW * 0.3,
        infoCoverH:Config.sreenW * 0.42,
        infoMargin:Config.sreenW * 0.04,
        introMargin:Config.sreenW * 0.04,
        readTextW:Config.sreenW * 0.4,
        readTextH:Config.sreenW * 0.08,
        detailTitleFont: Config.sreenW * 0.04,
        detailSubTitleFont: Config.sreenW * 0.03,
        btnWidth: Config.sreenW * 0.6,
        btnHeight: Config.sreenW * 0.08,
        chapterTextW: Config.sreenW * 0.18,
        chapterTextH: Config.sreenW * 0.08,
        chapterTextMargin: Config.sreenW * 0.016,
    },
    ios: {
        titleFont: Config.sreenW * 0.034,
        subTitleFont: Config.sreenW * 0.028,
        clickNumFont: Config.sreenW * 0.022,
        marginTop: Config.sreenW * 0.02,
        subMarginTop: Config.sreenW * 0.01,
        barHeight: Config.sreenW * 0.1,
        iconBarSize: Config.sreenW * 0.06,
        iconBarMargin: Config.sreenW * 0.04,
        infoCoverW:Config.sreenW * 0.3,
        infoCoverH:Config.sreenW * 0.42,
        infoMargin:Config.sreenW * 0.04,
        introMargin:Config.sreenW * 0.04,
        readTextW:Config.sreenW * 0.4,
        readTextH:Config.sreenW * 0.08,
        detailTitleFont: Config.sreenW * 0.04,
        detailSubTitleFont: Config.sreenW * 0.03,
        btnWidth: Config.sreenW * 0.6,
        btnHeight: Config.sreenW * 0.08,
        chapterTextW: Config.sreenW * 0.18,
        chapterTextH: Config.sreenW * 0.08,
        chapterTextMargin: Config.sreenW * 0.016,
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
    listView:{
        marginTop: Platform.OS === 'ios' ? Config.sreenW * 0.06 : 0
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
        margin:Platform.OS === 'ios' ? dimensions.ios.introMargin : dimensions.android.introMargin,
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color:Config.gray,
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
    chapterHeadView:{
        alignItems:'center',
        flexDirection:'row',
        width:Config.sreenW,
        height:Platform.OS === 'ios' ? dimensions.ios.barHeight : dimensions.android.barHeight,
    },
    chapterViews:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    moreTextView:{
        marginTop: Platform.OS === 'ios' ? dimensions.ios.infoMargin : dimensions.android.infoMargin
    },
    moreText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color:Config.gray,
        borderColor:Config.gray,
        borderWidth: 0.4,
        borderRadius: 20,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        width: Platform.OS === 'ios' ? dimensions.ios.btnWidth : dimensions.android.btnWidth,
        height: Platform.OS === 'ios' ? dimensions.ios.btnHeight : dimensions.android.btnHeight,
    },
    updateView:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        position:'absolute',
        right:Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin

    },
    stateView:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        position:'absolute',
        left:Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
        fontWeight:'bold'
    },
    chapterTitle:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.titleFont : dimensions.android.titleFont,
        color:Config.normalTextColor,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.introMargin : dimensions.android.introMargin,
    },
    chapterDetailText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color:Config.gray,
        borderRadius: 6,
        borderWidth: 0.4,
        borderColor: Config.gray,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        margin: Platform.OS === 'ios' ? dimensions.ios.chapterTextMargin : dimensions.android.chapterTextMargin,
        width: Platform.OS === 'ios' ? dimensions.ios.chapterTextW : dimensions.android.chapterTextW,
        height: Platform.OS === 'ios' ? dimensions.ios.chapterTextH : dimensions.android.chapterTextH,
    }
})

export default {dimensions, styles}
