import {Platform, StyleSheet} from "react-native"
import Config from '../constant/Config'
/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 统一样式定义
 */
const dimensions = {
    android:{
        tabBarImageSize: Config.sreenW * 0.08,
        tabBarHeight: Config.sreenW * 0.15,
        controlBtnW: Config.sreenW * 0.04,
        controlBtnH: Config.sreenW * 0.06,
        controlBtnR: Config.sreenW * 0.1,
        controlBtnB: Config.sreenW * 0.1,
        controlBtnBg: Config.sreenW * 0.12,
        barHeight: Config.sreenW * 0.1,
        iconBarMargin: Config.sreenW * 0.04,
        iconBarSize: Config.sreenW * 0.06,
        titleFont: Config.sreenW * 0.034,
        subTitleFont: Config.sreenW * 0.028,
        chapterTextW: Config.sreenW * 0.18,
        chapterTextH: Config.sreenW * 0.08,
        chapterTextMargin: Config.sreenW * 0.016,
        btnWidth: Config.sreenW * 0.6,
        btnHeight: Config.sreenW * 0.08,
        introMargin:Config.sreenW * 0.08,
        infoCoverW:Config.sreenW * 0.3,
        infoCoverH:Config.sreenW * 0.42,
        infoMargin:Config.sreenW * 0.04,
        readTextW:Config.sreenW * 0.4,
        readTextH:Config.sreenW * 0.08,
        detailTitleFont: Config.sreenW * 0.04,
        detailSubTitleFont: Config.sreenW * 0.03,
        marginTop: Config.sreenW * 0.01,
    },
    ios:{
        tabBarImageSize: Config.sreenW * 0.08,
        tabBarHeight: Config.sreenW * 0.15,
        controlBtnW: Config.sreenW * 0.04,
        controlBtnH: Config.sreenW * 0.06,
        controlBtnR: Config.sreenW * 0.1,
        controlBtnB: Config.sreenW * 0.1,
        controlBtnBg: Config.sreenW * 0.12,
        barHeight: Config.sreenW * 0.1,
        iconBarMargin: Config.sreenW * 0.04,
        iconBarSize: Config.sreenW * 0.06,
        titleFont: Config.sreenW * 0.034,
        subTitleFont: Config.sreenW * 0.028,
        chapterTextW: Config.sreenW * 0.18,
        chapterTextH: Config.sreenW * 0.08,
        chapterTextMargin: Config.sreenW * 0.016,
        btnWidth: Config.sreenW * 0.6,
        btnHeight: Config.sreenW * 0.08,
        introMargin:Config.sreenW * 0.08,
        infoCoverW:Config.sreenW * 0.3,
        infoCoverH:Config.sreenW * 0.42,
        infoMargin:Config.sreenW * 0.04,
        readTextW:Config.sreenW * 0.4,
        readTextH:Config.sreenW * 0.08,
        detailTitleFont: Config.sreenW * 0.04,
        detailSubTitleFont: Config.sreenW * 0.03,
        marginTop: Config.sreenW * 0.01,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    tabBarImage: {
        width: Platform.OS === 'ios' ? dimensions.ios.tabBarImageSize: dimensions.android.tabBarImageSize,
        height: Platform.OS === 'ios' ? dimensions.ios.tabBarImageSize: dimensions.android.tabBarImageSize,
    },
　　tabBarView:{
      backgroundColor:Config.backgroundColor,
      height: Platform.OS === 'ios' ? dimensions.ios.tabBarHeight : dimensions.android.tabBarHeight,
      padding: 4
    },
    controlBtn:{
        width: Platform.OS === 'ios' ? dimensions.ios.controlBtnW : dimensions.android.controlBtnW,
        height: Platform.OS === 'ios' ? dimensions.ios.controlBtnH : dimensions.android.controlBtnH
    },
    controlBtnView:{
        position:'absolute',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        borderColor: Config.themeColor,
        borderWidth:1,
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
        width: Config.sreenW,
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
    chapterViews:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    chapterTitle:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.titleFont : dimensions.android.titleFont,
        color:Config.normalTextColor,
        marginTop: Platform.OS === 'ios' ? dimensions.ios.infoMargin / 2 : dimensions.android.infoMargin / 2,
    },
    chapterHeadView:{
        alignItems:'center',
        flexDirection:'row',
        width:Config.sreenW,
        height:Platform.OS === 'ios' ? dimensions.ios.barHeight : dimensions.android.barHeight,
    },
    stateView:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        position:'absolute',
        left:Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
        fontWeight:'bold'
    },
    updateView:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        position:'absolute',
        right:Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin
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
    },
    introText:{
        marginTop:Platform.OS === 'ios' ? dimensions.ios.introMargin : dimensions.android.introMargin,
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color:Config.gray,
    },
    expandText:{
        marginTop:0,
        color:Config.normalTextColor,
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        alignSelf:'flex-end'
    },
    detailListView:{
        marginTop: Platform.OS === 'ios' ? dimensions.ios.infoMargin : dimensions.android.infoMargin
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
    detailView:{
        padding: Platform.OS === 'ios' ? dimensions.ios.iconBarMargin : dimensions.android.iconBarMargin,
    },
    infoView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
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
    titleText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailTitleFont : dimensions.android.detailTitleFont,
        color: 'white',
        fontWeight: 'bold',
    },
    firstSubText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: 'white',
        marginTop: Platform.OS === 'ios' ? dimensions.ios. marginTop * 4: dimensions.android.marginTop * 4,
    },
    subText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.detailSubTitleFont : dimensions.android.detailSubTitleFont,
        color: 'white',
        marginTop: Platform.OS === 'ios' ? dimensions.ios. marginTop: dimensions.android.marginTop,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: Config.sreenW,
        height: Config.sreenW * 0.44
    },
    listView:{
        marginTop: Platform.OS === 'ios' ? Config.sreenW * 0.06 : 0
    },
})


export default {dimensions,styles}