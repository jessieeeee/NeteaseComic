/**
 * @date :2018/8/12
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 导航注册
 */

import React from 'react'
import {AppRegistry, DeviceEventEmitter} from 'react-native'
import NavigationService from './js/navigator/NavigationService'
import NavigatorApp from './js/navigator/StackNavigator'

import Config from './js/constant/Config'
export default class App extends React.Component {
    render() {
        // return <NavigatorApp/>;
        return (
            <NavigatorApp
                ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}
                onNavigationStateChange = {(prevState, currentState) => {
                    const currentScreen = getCurrentRouteName(currentState);
                    const prevScreen = getCurrentRouteName(prevState);
                    if (prevScreen !== currentScreen) {
                        console.log("当前屏幕切换到了:" + currentScreen);
                        if (currentScreen === 'Netease'){
                            DeviceEventEmitter.emit("Netease", null)
                        }
                        else  if (currentScreen === 'Tencent'){
                            DeviceEventEmitter.emit("Tencent", null)
                        }
                    }
                }}
            />
        )
    }
}

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

//是否关闭log日志
if(!Config.DEBUG){
    console.log = function() {}
}
AppRegistry.registerComponent('App', () => App);