import {Platform, StyleSheet} from "react-native"
import Config from './Config'
/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 统一样式定义
 */
const dimensions = {
    android:{
        tabBarImageSize: Config.sreenW * 0.08,
        tabBarHeight: Config.sreenW * 0.15
    },
    ios:{
        tabBarImageSize: Config.sreenW * 0.08,
        tabBarHeight: Config.sreenW * 0.15
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
    }
})


export default {dimensions,styles}