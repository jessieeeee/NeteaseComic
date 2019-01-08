/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 默认界面展示
 */
import React, {Component} from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import CommonStyle from "../common/CommonStyle"

let tipBg = require('../img/tip_bg.png')
import Status from '../util/Status'

class DefaultDisplay extends Component<Props> {

    constructor(props){
        super(props)
        this.state = {
            status: props.status,
            loadingText: '正在加载中.....'
        }
    }

    static propTypes = {
        status: PropTypes.number, // 展示状态,
    }

    static defaultProps = {
        status: Status.Loading, // 默认加载状态
    }

    componentDidMount(){
       this.props.refCallback(this)
    }

    render() {
        return (
            <View style={[CommonStyle.styles.container, {
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }]}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={tipBg} style={CommonStyle.styles.tipView}/>
                    {this.renderStatus()}
                    {
                        this.state.status !== Status.Loading ?
                            <TouchableOpacity onPress={() =>
                            {
                                this.props.onRetry()
                                this.setState({
                                    status: Status.Loading
                                })
                            }}>
                                <Text style={CommonStyle.styles.retryText}>重新加载</Text>
                            </TouchableOpacity> : null
                    }
                </View>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status
        })
    }

    renderStatus() {
        console.log('当前状态',this.state.status)
        switch (this.state.status) {
            case Status.Loading:
                return this.renderLoading()
            case Status.Empty:
                return this.renderEmpty()
            case Status.Error:
                return this.renderError()
        }
    }

    /**
     * 渲染空界面
     */
    renderEmpty() {
        return (
            <Text style={CommonStyle.styles.tipText}>咦？这里是空的？</Text>
        )
    }

    /**
     * 渲染错误界面
     */
    renderError() {
        return (
            <Text style={CommonStyle.styles.tipText}>咦？出错了吗？</Text>
        )
    }

    /**
     * 渲染加载界面
     */
    renderLoading() {
        return (
            <Text style={CommonStyle.styles.tipText}>{this.state.loadingText}</Text>
        )
    }

    /**
     * 刷新加载文本
     * @param loadingText
     */
    updateLoading(loadingText){
        this.setState({
            loadingText: loadingText
        })
    }
}

export default DefaultDisplay