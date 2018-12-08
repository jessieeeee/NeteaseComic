import {Platform, StyleSheet} from "react-native"
import Config from '../constant/Config'

/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 统一样式定义
 */
const dimensions = {
    android: {
        tabBarImageSize: Config.screenW * 0.08,
        tabBarHeight: Config.screenW * 0.15,
        controlBtnW: Config.screenW * 0.04,
        controlBtnH: Config.screenW * 0.06,
        controlBtnR: Config.screenW * 0.1,
        controlBtnB: Config.screenW * 0.1,
        controlBtnBg: Config.screenW * 0.12,
        barHeight: Config.screenW * 0.1,
        iconBarMargin: Config.screenW * 0.04,
        iconBarSize: Config.screenW * 0.06,
        titleFont: Config.screenW * 0.034,
        subTitleFont: Config.screenW * 0.028,
        chapterTextW: Config.screenW * 0.18,
        chapterTextH: Config.screenW * 0.08,
        chapterTextMargin: Config.screenW * 0.016,
        btnWidth: Config.screenW * 0.6,
        btnHeight: Config.screenW * 0.08,
        introMargin: Config.screenW * 0.08,
        infoCoverW: Config.screenW * 0.3,
        infoCoverH: Config.screenW * 0.42,
        infoMargin: Config.screenW * 0.04,
        readTextW: Config.screenW * 0.4,
        readTextH: Config.screenW * 0.08,
        detailTitleFont: Config.screenW * 0.04,
        detailSubTitleFont: Config.screenW * 0.03,
        marginTop: Config.screenW * 0.01,
    },
    ios: {
        tabBarImageSize: Config.screenW * 0.08,
        tabBarHeight: Config.screenW * 0.15,
        controlBtnW: Config.screenW * 0.04,
        controlBtnH: Config.screenW * 0.06,
        controlBtnR: Config.screenW * 0.1,
        controlBtnB: Config.screenW * 0.1,
        controlBtnBg: Config.screenW * 0.12,
        barHeight: Config.screenW * 0.1,
        iconBarMargin: Config.screenW * 0.04,
        iconBarSize: Config.screenW * 0.06,
        titleFont: Config.screenW * 0.034,
        subTitleFont: Config.screenW * 0.028,
        chapterTextW: Config.screenW * 0.18,
        chapterTextH: Config.screenW * 0.08,
        chapterTextMargin: Config.screenW * 0.016,
        btnWidth: Config.screenW * 0.6,
        btnHeight: Config.screenW * 0.08,
        introMargin: Config.screenW * 0.08,
        infoCoverW: Config.screenW * 0.3,
        infoCoverH: Config.screenW * 0.42,
        infoMargin: Config.screenW * 0.04,
        readTextW: Config.screenW * 0.4,
        readTextH: Config.screenW * 0.08,
        detailTitleFont: Config.screenW * 0.04,
        detailSubTitleFont: Config.screenW * 0.03,
        marginTop: Config.screenW * 0.01,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    tabBarImage: {
        width: Platform.OS === 'ios' ? dimensions.ios.tabBarImageSize : dimensions.android.tabBarImageSize,
        height: Platform.OS === 'ios' ? dimensions.ios.tabBarImageSize : dimensions.android.tabBarImageSize,
    },
    tabBarView: {
        backgroundColor: Config.backgroundColor,
        height: Platform.OS === 'ios' ? dimensions.ios.tabBarHeight : dimensions.android.tabBarHeight,
        padding: 4
    },
    controlBtn: {
        width: Platform.OS === 'ios' ? dimensions.ios.controlBtnW : dimensions.android.controlBtnW,
        height: Platform.OS === 'ios' ? dimensions.ios.controlBtnH : dimensions.android.controlBtnH
    },
    controlBtnView: {
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderColor: Config.themeColor,
        borderWidth: 1,
        elevation: 10,
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 50,
        shadowColor: Config.gray,
        zIndex: Platform.OS === 'ios' ? 1 : 0,
        width: Platform.OS === 'ios' ? dimensions.ios.controlBtnBg : dimensions.android.controlBtnBg,
        height: Platform.OS === 'ios' ? dimensions.ios.controlBtnBg : dimensions.android.controlBtnBg,
        right: Platform.OS === 'ios' ? dimensions.ios.controlBtnR : dimensions.android.controlBtnR,
        bottom: Platform.OS === 'ios' ? dimensions.ios.controlBtnB : dimensions.android.controlBtnB,
    },
    detailHeader: {
        width: Config.screenW,
        height: Platform.OS === 'ios' ? dimensions.ios.barHeight : dimensions.android.barHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIconLeftView: {
        position: 'absolute',
        left: Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
    },
    headerIcon: {
        width: Platform.OS === 'ios' ? dimensions.ios.iconBarSize : dimensions.android.iconBarSize,
        height: Platform.OS === 'ios' ? dimensions.ios.iconBarSize : dimensions.android.iconBarSize,
    },
    headerIconRightView: {
        position: 'absolute',
        right: Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
    },
    chapterViews: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chapterTitle: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.titleFont : dimensions.android.titleFont,
        color: Config.normalTextColor,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.infoMargin / 2 : dimensions.android.infoMargin / 2,
    },
    chapterHeadView: {
        alignItems: 'center',
        flexDirection: 'row',
        width: Config.screenW,
        height: Platform.OS === 'ios' ? dimensions.ios.barHeight : dimensions.android.barHeight,
    },
    stateView: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        position: 'absolute',
        left: Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
        fontWeight: 'bold'
    },
    updateView: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        position: 'absolute',
        right: Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin
    },
    chapterDetailText: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: Config.gray,
        borderRadius: 6,
        borderWidth: 0.4,
        borderColor: Config.gray,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        margin: Platform.OS === 'ios' ? dimensions.ios.chapterTextMargin : dimensions.android.chapterTextMargin,
        width: Platform.OS === 'ios' ? dimensions.ios.chapterTextW : dimensions.android.chapterTextW,
        lineHeight: Platform.OS === 'ios' ? dimensions.ios.chapterTextH : dimensions.android.chapterTextH,
        height: Platform.OS === 'ios' ? dimensions.ios.chapterTextH : dimensions.android.chapterTextH,
    },
    introText: {
        marginTop: Platform.OS === 'ios' ? dimensions.ios.introMargin : dimensions.android.introMargin,
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: Config.gray,
    },
    expandText: {
        marginTop: 0,
        color: Config.normalTextColor,
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        alignSelf: 'flex-end'
    },
    detailListView: {
        marginTop: Platform.OS === 'ios' ? dimensions.ios.infoMargin : dimensions.android.infoMargin
    },
    moreTextView: {
        marginTop: Platform.OS === 'ios' ? dimensions.ios.infoMargin : dimensions.android.infoMargin
    },
    moreText: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: Config.gray,
        borderColor: Config.gray,
        borderWidth: 0.4,
        borderRadius: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        lineHeight: Platform.OS === 'ios' ? dimensions.ios.btnHeight : dimensions.android.btnHeight,
        width: Platform.OS === 'ios' ? dimensions.ios.btnWidth : dimensions.android.btnWidth,
        height: Platform.OS === 'ios' ? dimensions.ios.btnHeight : dimensions.android.btnHeight,
    },
    detailView: {
        padding: Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
    },
    infoView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoCover: {
        width: Platform.OS === 'ios' ? dimensions.ios.infoCoverW : dimensions.android.infoCoverW,
        height: Platform.OS === 'ios' ? dimensions.ios.infoCoverH : dimensions.android.infoCoverH,
        marginRight: Platform.OS === 'ios' ? dimensions.ios.infoMargin * 2 : dimensions.android.infoMargin * 2,
    },
    infoRightView: {
        justifyContent: 'center',
        height: Platform.OS === 'ios' ? dimensions.ios.infoCoverH : dimensions.android.infoCoverH,
        width: Platform.OS === 'ios' ? dimensions.ios.readTextW : dimensions.android.readTextW,
    },
    infoTextView: {
        position: 'absolute',
        top: 0,
        width: Platform.OS === 'ios' ? dimensions.ios.readTextW : dimensions.android.readTextW,
    },
    readText: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.subTitleFont : dimensions.android.subTitleFont,
        color: 'white',
        backgroundColor: Config.redText,
        width: Platform.OS === 'ios' ? dimensions.ios.readTextW : dimensions.android.readTextW,
        height: Platform.OS === 'ios' ? dimensions.ios.readTextH : dimensions.android.readTextH,
        textAlign: 'center',
        alignItems: 'center',
        lineHeight: Platform.OS === 'ios' ? dimensions.ios.readTextH : dimensions.android.readTextH,
        justifyContent: 'center',
        textAlignVertical: 'center',
        borderRadius: 2
    },
    titleText: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailTitleFont : dimensions.android.detailTitleFont,
        color: 'white',
        fontWeight: 'bold',
    },
    firstSubText: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: 'white',
        marginTop: Platform.OS === 'ios' ? dimensions.ios.marginTop * 4 : dimensions.android.marginTop * 4,
    },
    subText: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: 'white',
        marginTop: Platform.OS === 'ios' ? dimensions.ios.marginTop : dimensions.android.marginTop,
    },
    detailAbsolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: Config.screenW,
        height: Config.screenW * 0.44
    },

    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: Config.screenW,
        height: Config.screenW * 0.5,

    },
    listView: {
        marginTop: Platform.OS === 'ios' ? Config.screenW * 0.06 : 0,
        flex:1,
    },
    imgPlaceholder: {
        width: Config.screenW,
        height: Config.screenW * 1.2,
        backgroundColor: Config.normalTextColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgPlaceholderText: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailTitleFont * 2 : dimensions.android.detailTitleFont * 2,
    },
    divider: {
        height: 2,
        width: Config.screenW,
        backgroundColor: Config.dividerColor
    },
    tipView: {
        width: Config.screenW * 0.68,
        height: Config.screenW * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    tipText: {
        color: Config.lightGray,
        fontSize: Platform.OS === 'ios' ? dimensions.ios.titleFont : dimensions.android.titleFont,
        position: 'absolute',
        top: Config.screenW * 0.3 * 0.66
    },
    retryText: {
        marginTop: Platform.OS === 'ios' ? dimensions.ios.infoMargin : dimensions.android.infoMargin,
        color: Config.themeColor,
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailTitleFont : dimensions.android.detailTitleFont,
    },
    emptyView:{
        width: Config.screenW,
        height: Config.screenH,
        backgroundColor: 'white'
    }
})


export default {dimensions, styles}