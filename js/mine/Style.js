import {Platform, StyleSheet} from "react-native"
import Config from "../constant/Config"

/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 我的界面分页样式统一定义
 */
const dimensions = {
    android: {
        itemHeight: Config.sreenW * 0.16,
        iconSize: Config.sreenW * 0.08,
        itemFontSize: Config.sreenW * 0.4,
        avatarSize: Config.sreenW * 0.2,
        infoHeight: Config.sreenW * 0.5,
        infoFontSize: Config.sreenW * 0.04,
        loginFontSize: Config.sreenW * 0.06,
        arrowSize: Config.sreenW * 0.03,
        itemMargin: Config.sreenW * 0.06,
        textMargin: Config.sreenW * 0.04,
        dividerHeight: Config.sreenW * 0.06,
    },
    ios: {
        itemHeight: Config.sreenW * 0.16,
        iconSize: Config.sreenW * 0.08,
        itemFontSize: Config.sreenW * 0.4,
        avatarSize: Config.sreenW * 0.2,
        infoHeight: Config.sreenW * 0.5,
        infoFontSize: Config.sreenW * 0.04,
        loginFontSize: Config.sreenW * 0.06,
        arrowSize: Config.sreenW * 0.03,
        itemMargin: Config.sreenW * 0.06,
        textMargin: Config.sreenW * 0.04,
        dividerHeight: Config.sreenW * 0.06,
    }
}
const styles = StyleSheet.create({
    itemView: {
        width: Config.sreenW,
        height: Platform.OS === 'ios' ? dimensions.ios.itemHeight :dimensions.android.itemHeight,
        borderBottomColor: Config.dividerColor,
        borderBottomWidth: 0.2,
        flexDirection:'row',
        alignItems:'center'
    },
    leftView:{
        flexDirection:'row',
        position:'absolute',
        left: Platform.OS === 'ios' ? dimensions.ios.itemMargin : dimensions.android.itemMargin,
        alignItems:'center'
    },
    itemIcon: {
        width: Platform.OS === 'ios' ? dimensions.ios.iconSize : dimensions.android.iconSize,
        height: Platform.OS === 'ios' ? dimensions.ios.iconSize : dimensions.android.iconSize,
    },
    itemText: {
        fontSize: Platform.OS === 'ios' ? dimensions.ios.fontSize : dimensions.android.fontSize,
        color: Config.normalTextColor,
        marginLeft: Platform.OS === 'ios' ? dimensions.ios.textMargin : dimensions.android.textMargin,
    },
    itemArrow:{
        width: Platform.OS === 'ios' ? dimensions.ios.arrowSize : dimensions.android.arrowSize,
        height: Platform.OS === 'ios' ? dimensions.ios.arrowSize * 1.4 : dimensions.android.arrowSize * 1.6,
        position:'absolute',
        right: Platform.OS === 'ios' ? dimensions.ios.itemMargin : dimensions.android.itemMargin
    },
    avatarImg: {
        width: Platform.OS === 'ios' ? dimensions.ios.avatarSize : dimensions.android.avatarSize,
        height: Platform.OS === 'ios' ? dimensions.ios.avatarSize : dimensions.android.avatarSize,
    },
    headerView:{
        width: Config.width,
        height: Platform.OS === 'ios' ? dimensions.ios.infoHeight : dimensions.android.infoHeight,
        flexDirection:'row',
        alignItems:'center',
        padding:Platform.OS === 'ios' ? dimensions.ios.itemMargin : dimensions.android.itemMargin,
        backgroundColor: Config.bgGray,
    },
    infoText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.infoFontSize : dimensions.android.infoFontSize,
        color: Config.normalTextColor,
        marginLeft: Platform.OS === 'ios' ? dimensions.ios.textMargin : dimensions.android.textMargin
    },
    loginView:{
        marginLeft: Platform.OS === 'ios' ? dimensions.ios.textMargin : dimensions.android.textMargin
    },
    loginText:{
        fontSize: Platform.OS === 'ios' ? dimensions.ios.loginFontSize : dimensions.android.loginFontSize,
        color: 'white',
        fontWeight:'bold',
    },
    divider:{
        height: Platform.OS === 'ios' ? dimensions.ios.dividerHeight : dimensions.android.dividerHeight,
        width: Config.sreenW,
        backgroundColor: Config.dividerColor
    }
})
export default {dimensions,styles}