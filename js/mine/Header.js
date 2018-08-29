/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 头部信息界面
 */
import React, {Component} from 'react'
import {Text, View, Image, findNodeHandle, TouchableOpacity} from 'react-native'
import MineStyle from './Style'
import PropTypes from 'prop-types'
import CommonStyle from "../common/CommonStyle"
import {BlurView} from 'react-native-blur'

let defaultAvatar = require('../img/ic_default_avatar.png')

class Header extends Component<Props> {
    static propTypes = {
        userName: PropTypes.string, // 数据源,
        userId: PropTypes.string, // 图标
        avatar: PropTypes.string, // 文字
        isLogin: PropTypes.bool, //是否登录
        onLogin: PropTypes.func, // 点击登录
        onClickAvatar: PropTypes.func, //点击头像
    }

    static defaultProps = {
        avatar: '', // 默认为空
        userName: '', // 默认为空
        userId: '', // 默认为空
        isLogin: false
    }

    constructor(props) {
        super(props)
        this.state = {
            viewRef: null
        }
    }

    componentWillMount(){
        // 如果登录了且设置了头像
        if (this.props.isLogin && this.props.avatar) {
            this.avatar = {uri: this.props.avatar}
        } else {
            this.avatar = defaultAvatar
        }
    }
    /**
     * 图片加载完成回调
     */
    imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.cover)});
    }

    render() {
        return (
            <View style={MineStyle.styles.headerView}>
                <Image
                    ref={(img) => {
                        this.cover = img
                    }}
                    source={this.avatar}
                    style={CommonStyle.styles.absolute}
                    onLoadEnd={this.imageLoaded.bind(this)}
                />

                {this.state.viewRef ?
                    <BlurView
                        style={CommonStyle.styles.absolute}
                        viewRef={this.state.viewRef}
                        blurType="dark"
                        blurAmount={2}
                    /> : null}
                {this.renderAvatar()}
                {this.renderText()}
            </View>
        )
    }

    /**
     * 渲染头像
     * @returns {*}
     */
    renderAvatar() {
        return (
            <TouchableOpacity onPress = {() => {
                if(this.props.onClickAvatar){
                    this.props.onClickAvatar()
                }
            }}>
                <Image
                    ref={(img) => {
                        this.cover = img
                    }}
                    onLoadEnd={this.imageLoaded.bind(this)}
                    source={this.avatar}
                    style={MineStyle.styles.avatarImg}/>
            </TouchableOpacity>
        )
    }

    /**
     * 渲染文本
     */
    renderText() {
        return (
            <View>
                {this.props.isLogin ? <Text style={MineStyle.styles.infoText}>{this.props.userName}</Text> :
                    <TouchableOpacity style = {MineStyle.styles.loginView} onPress={() => {
                        if (this.props.onLogin){
                            this.props.onLogin()
                        }
                    }}>
                        <Text style={MineStyle.styles.loginText}>点击登录</Text>
                    </TouchableOpacity>}
                {this.props.isLogin ? <Text style={MineStyle.styles.infoText}>{this.props.userId}</Text> : null}
            </View>
        )
    }
}

export default Header