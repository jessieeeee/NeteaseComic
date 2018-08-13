/**
 * @date : 8/13/18
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :网易漫画首页
 */

import React,{Component} from 'react'
import {Platform, StyleSheet, Text, View, Button} from 'react-native'
import NetUtil from '../util/NetUtil'
import ServerApi from '../constant/ServerApi'
class NeteasePage extends Component<Props> {

    componentDidMount(){
        NetUtil.get(ServerApi.netease.getComic,null,(result)=>{
            console.log('123'+JSON.stringify(result))
        },(error)=>{
            console.log(error)
        })
    }
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