/**
 * @date :2019/6/26
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 登录界面
 */
import React, {Component} from 'react'
import {TouchableOpacity, Text, View, TextInput, AsyncStorage, DeviceEventEmitter} from 'react-native'
import CommonStyle from '../common/CommonStyle'
import MineStyle from './Style'
import Config from '../constant/Config'
import NavigationService from '../navigator/NavigationService'
import RegistAndFind from "./RegistAndFind"
import {BaseComponent} from "../common/BaseComponent"
import ServerApi from "../constant/ServerApi"
import StatusManager from '../util/StatusManager'
class Login extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password: ''
        }
        this.statusManager = new StatusManager()
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {this.renderHeader()}
                {this.renderContent()}
            </View>
        )
    }

    updatePassword(text){
        this.setState({
            password: text
        })
    }
    updatePhoneNumber(text){
        this.setState({
            phoneNumber: text
        })
    }

    componentDidMount() {
        this.isMount = true
    }

    componentWillUnmount() {
        this.isMount = false
    }
    /**
     * 登录请求
     */
    login(){
        let params = {
            phoneNumber: this.state.phoneNumber,
            password: this.state.password
        }
        let that = this;
        this.props.request(ServerApi.mine.login, params, this.statusManager, (result) => {
            if (this.isMount) {
                if (result.data){
                    //存储
                    AsyncStorage.setItem('userInfo', JSON.stringify(result.data), function (error) {
                        if (error) {
                            console.log('存储失败')
                        }else {
                            DeviceEventEmitter.emit("userInfo",result.data)
                            that.props.navigation.goBack();
                        }
                    })

                }else{
                    console.log('登录失败')
                }
            }

        }, (error) => {
            console.log(error)
        }, false)
    }
    /**
     * 渲染内容
     * @returns {XML}
     */
    renderContent() {
        return (
            <View style={CommonStyle.styles.container}>
                <View style={[MineStyle.styles.LoginItem, {
                    borderRadius: 2,
                    borderWidth: 0.4,
                    borderColor: Config.gray,
                    marginTop: Config.screenW * 0.12
                }]}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="手机号"
                        keyboardType='numeric'
                        autoCorrect={false}
                        onChange={(event) => this.updatePhoneNumber(
                            event.nativeEvent.text
                        )}
                        style={MineStyle.styles.LoginText}
                    />
                </View>
                <View style={[MineStyle.styles.LoginItem, {
                    borderRadius: 2,
                    borderWidth: 0.4,
                    borderColor: Config.gray,
                }]}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="密码"
                        keyboardType="email-address"
                        autoCorrect={false}
                        onChange={(event) => this.updatePassword(
                            event.nativeEvent.text
                        )}
                        style={MineStyle.styles.LoginText}
                    />
                </View>
                <TouchableOpacity style={[MineStyle.styles.LoginItem, {marginTop: 0}]} onPress={() => {
                    NavigationService.navigate('RegistAndFind', {type: RegistAndFind.typeFind})
                }}>
                    <Text style={{position: 'absolute', right: 0, color: Config.normalTextColor}}>忘记密码？</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[MineStyle.styles.LoginBtnView, {backgroundColor: Config.themeColor}]} onPress={() => {
                    console.log('点击了登录')
                    this.login()
                }}>
                    <Text style={{color:'white'}}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[MineStyle.styles.LoginItem, {justifyContent: 'center'}]} onPress={() => {
                    NavigationService.navigate('RegistAndFind', {type: RegistAndFind.typeRegist})
                }}>
                    <Text style={{color: Config.normalTextColor}}>手机号快速注册</Text>
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * 渲染顶部bar
     * @returns {XML}
     */
    renderHeader() {
        return (
            <View style={MineStyle.styles.loginHeader}>
                <TouchableOpacity style={MineStyle.styles.LoginBack} onPress={() => {
                    this.props.navigation.goBack()
                }}>
                    <Text style={MineStyle.styles.LoginBackText}>返回</Text>
                </TouchableOpacity>

                <Text style={MineStyle.styles.LoginTitle}>登录</Text>
            </View>
        )
    }
}

export default BaseComponent(Login)