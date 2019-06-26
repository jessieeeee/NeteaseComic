/**
 * @date :2019/6/26
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 登录界面
 */
import React, {Component} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import CommonStyle from '../common/CommonStyle'
import MineStyle from './Style'
import Config from '../constant/Config'

class Login extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password: ''
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
                <View style={[MineStyle.styles.LoginItem, {
                    borderRadius: 2,
                    borderWidth: 0.4,
                    borderColor: Config.gray,
                    marginTop: Config.screenW * 0.12
                }]}>
                    <Text style={MineStyle.styles.LoginText}>手机号</Text>
                </View>
                <View style={[MineStyle.styles.LoginItem, {
                    borderRadius: 2,
                    borderWidth: 0.4,
                    borderColor: Config.gray,
                }]}>
                    <Text style={MineStyle.styles.LoginText}>密码</Text>
                </View>
                <View style={[MineStyle.styles.LoginItem, {marginTop: 0}]}>
                    <Text style={{position: 'absolute', right: 0, color: Config.normalTextColor}}>忘记密码？</Text>
                </View>
                <Text style={MineStyle.styles.LoginBtn}>登录</Text>
                <View style={[MineStyle.styles.LoginItem, {justifyContent: 'center'}]}>
                    <Text style={{color: Config.normalTextColor}}>手机号快速注册</Text>
                </View>
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

export default Login