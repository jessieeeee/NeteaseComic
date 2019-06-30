/**
 * @date :2019/6/26
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 登录界面
 */
import React, {Component} from 'react'
import {TouchableOpacity, Text, View, TextInput} from 'react-native'
import CommonStyle from '../common/CommonStyle'
import MineStyle from './Style'
import Config from '../constant/Config'
import {BaseComponent} from "../common/BaseComponent"
import ServerApi from "../constant/ServerApi"
class RegistAndFind extends Component<Props> {
    static typeRegist = 0
    static typeFind = 1

    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            vertifyCode: '',
            password:'',
            newPassword:'', //新密码
            sendMsg: false, //是否发送短信
            time: 0  //倒计时
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {this.renderHeader()}
                {this.renderContent()}
            </View>
        )
    }

    /**
     * 渲染内容
     * @returns {XML}
     */
    renderContent() {
        return (
            <View style={CommonStyle.styles.container}>
                <Text
                    style={[MineStyle.styles.LoginItem, {marginTop: Config.screenW * 0.12}]}>{this.state.sendMsg ? '已经向手机号' + this.state.phoneNumber + '发送验证短信' : '手机号注册需要验证你的手机号，该号码不会对其他人公开'}</Text>

                {this.renderFillContent()}

                <TouchableOpacity style={[MineStyle.styles.LoginBtnView, {backgroundColor: Config.lightGray}]} onPress={() => {
                    if (!this.state.sendMsg){
                        this.setState({
                            sendMsg: true
                        })
                    }else{
                        this.regist()
                    }
                }}>
                    <Text style={{color:'white'}}>下一步</Text>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        this.isMount = true
    }

    componentWillUnmount() {
        this.isMount = false
    }

    regist(){
        let params = {
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
        }
        this.props.request(ServerApi.mine.regist, params, this.statusManager, (result) => {
            if (this.isMount) {
                if (result.success){

                }else{
                    console.log(result.msg)
                }
            }

        }, (error) => {
            console.log(error)
        }, false)
    }

    update(){
        let params = {
            phoneNumber: this.state.phoneNumber,
            oldPassword: this.state.password,
            updateInfo: {password:this.state.newPassword}
        }
        this.props.request(ServerApi.mine.update, params, this.statusManager, (result) => {
            if (this.isMount) {
                if (result.success){

                }else{
                    console.log(result.msg)
                }
            }

        }, (error) => {
            console.log(error)
        }, false)
    }
    updateVertifyCode(text){
       this.setState({
           vertifyCode:text
       })
    }

    updatePhoneNumber(text){
        this.setState({
            phoneNumber:text
        })
    }
    updatePassword(text){
        this.setState({
            password:text
        })
    }
    renderFillContent() {
        if (this.state.sendMsg) {
            return (
                <View>
                    <View style={[MineStyle.styles.LoginItem, {
                        borderRadius: 2,
                        borderWidth: 0.4,
                        borderColor: Config.gray,
                    }]}>
                        <TextInput
                            autoCapitalize="none"
                            placeholder="输入验证码"
                            keyboardType='numeric'
                            autoCorrect={false}
                            onChange={(event) => this.updateVertifyCode(
                                event.nativeEvent.text
                            )}
                            style={MineStyle.styles.LoginText}
                        />
                        <Text style={MineStyle.styles.LoginRightText}>{this.state.time}秒后可重发</Text>

                    </View>
                    <View style={[MineStyle.styles.LoginItem, {
                        borderRadius: 2,
                        borderWidth: 0.4,
                        borderColor: Config.gray,
                    }]}>
                        <TextInput
                            autoCapitalize="none"
                            placeholder="设置一个密码，最少6位"
                            keyboardType="email-address"
                            autoCorrect={false}
                            onChange={(event) => this.updatePassword(
                                event.nativeEvent.text
                            )}
                            style={MineStyle.styles.LoginText}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[MineStyle.styles.LoginItem, {
                    borderRadius: 2,
                    borderWidth: 0.4,
                    borderColor: Config.gray,
                }]}>
                    <Text style={MineStyle.styles.code}>+86</Text>

                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='numeric'
                        onChange={(event) => this.updatePhoneNumber(
                            event.nativeEvent.text
                        )}
                        style={{position:'relative',left:0, width:Config.screenW * 0.5, height: Config.screenW * 0.1}}
                    />
                </View>
            )
        }
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
                <Text
                    style={MineStyle.styles.LoginTitle}>{this.props.navigation.getParam('type', RegistAndFind.typeRegist) == RegistAndFind.typeRegist ? '注册' : '找回密码'}</Text>
            </View>
        )
    }
}

export default BaseComponent(RegistAndFind)