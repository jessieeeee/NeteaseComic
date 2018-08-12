import React,{Component} from 'react'
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
class NeteasePage extends Component<Props> {

    render(){
        return (
            <View style={styles.container}>
                <Text> 网易漫画 </Text>
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
})

export default NeteasePage