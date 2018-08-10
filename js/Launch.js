import {Component} from "react"
import {
    StackNavigator,
} from 'react-navigation'
import {Platform, StyleSheet, Text, View} from 'react-native';
/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 欢迎界面
 */


class Launch extends Component<Props>{
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
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