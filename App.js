/**
 * @date :2018/8/12
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 导航注册
 */

import React from 'react'
import {AppRegistry} from 'react-native'
import NavigationService from './js/navigator/NavigationService'
import NavigatorApp from './js/navigator/StackNavigator'

import Config from './js/constant/Config'
export default class App extends React.Component {
    render() {
        // return <NavigatorApp/>;
        return (
            <NavigatorApp
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        )
    }
}
//是否关闭log日志
if(!Config.DEBUG){
    console.log = function() {}
}
AppRegistry.registerComponent('App', () => App);