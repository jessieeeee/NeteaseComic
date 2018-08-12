/**
 * @date :2018/8/12
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 欢迎界面
 */

import React,{Component} from 'react'
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

class Launch extends Component<Props>{

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Button title={"跳转"} onPress={()=>{
                    this.props.navigation.navigate('Main')
                }}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})
export default Launch