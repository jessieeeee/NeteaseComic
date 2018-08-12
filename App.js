/**
 * @date :2018/8/12
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 导航注册
 */

import React from 'react'
import {AppRegistry, StyleSheet, Text, View, Button,} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import Launch from './js/Launch'
import Main from './js/Main'
const SimpleApp = createStackNavigator({
        Launch: {screen: Launch, navigationOptions:{header: null}},
        Main: {screen: Main,  navigationOptions: {
            header: null
        }},
    });

export default class App extends React.Component {
    render() {
        return <SimpleApp/>;
    }
}

AppRegistry.registerComponent('SimpleApp', () => App);