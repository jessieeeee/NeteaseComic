import React,{Component} from 'react'
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
class TencentPage extends Component<Props> {

    render(){
        return (
            <View style={styles.container}>
                <Text> 腾讯漫画 </Text>
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

export default TencentPage