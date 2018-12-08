/**
 * @date :2018/12/8
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 刘海屏ui适配
 */

import {Dimensions,Platform} from 'react-native';

// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

// screen
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

//判断是否为iphoneX或Xs
function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||
            (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
    )
}

//判断是否为iphoneXR或XsMAX
function isIphoneXR() {
    return (
        Platform.OS === 'ios' &&
        ((SCREEN_HEIGHT === XR_HEIGHT && SCREEN_WIDTH === XR_WIDTH) ||
            (SCREEN_HEIGHT === XR_WIDTH && SCREEN_WIDTH === XR_HEIGHT))
    )
}
export default {isIphoneX,isIphoneXR}