import React,{Component} from 'react'
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
class Mine extends Component<Props> {

    render(){
        return (
            <View style={styles.container}>
                <Text> 我的界面 </Text>
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

export default Mine