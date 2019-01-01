/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 浏览漫画界面
 */
import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import ComicContentList from './ComicContentList'
import CommonStyle from "./CommonStyle"
import ServerApi from "../constant/ServerApi"
import Config from '../constant/Config'
import StatusManager from "../util/StatusManager"
import {BaseComponent} from "./BaseComponent"
import {observer} from "mobx-react/native"
import SocketIOClient from 'socket.io-client';
@observer
class ComicContent extends Component<Props> {

    constructor(props) {
        super(props)
        this.data = null
        this.statusManager = new StatusManager()
        this.onRefresh = this.onRefresh.bind(this)
        this.backward = this.backward.bind(this)
        this.forward = this.forward.bind(this)

        this.socket = SocketIOClient(ServerApi.server); // 设置服务端的地址和端口号
        this.socket.on('imgUrl', (url) => {
           console.log('图片url:' + url)
        })
    }

    componentDidMount() {
        this.isMount = true
        console.log('link',this.props.navigation.getParam('link', ''))
        console.log('platform',this.props.navigation.getParam('platform', ''))
        console.log('page',this.props.navigation.getParam('page', 0))
        console.log('count',this.props.navigation.getParam('count', 0))
        this.getComicContent()
    }

    componentWillUnmount() {
        this.isMount = false
    }

    /**
     * 重试回调
     */
    retry() {
        this.getComicContent()
    }

    /**
     * 获取免费漫画图片
     */
    getComicContent() {
        let params = {
            link: this.props.navigation.getParam('link', '')
        }
        let url
        if (this.props.navigation.getParam('platform', '') === Config.platformNetease) {
            url = ServerApi.netease.getComicContent
        }
        else if (this.props.navigation.getParam('platform', '') === Config.platformTencent) {
            url = ServerApi.tencent.getComicContent
        }
        this.props.request(url, params, this.statusManager, (result) => {
            if (this.isMount) {
                this.data = result
                this.content.initPage(this.data)
            }
        }, (error) => {
            console.log(error)
        },true)
    }

    render() {
        return (
            <View style={CommonStyle.styles.container}>
                {this.renderNormal()}
                {/*/!*渲染状态界面*!/*/}
                {this.props.displayStatus(this.statusManager)}
            </View>
        )
    }

    onRefresh(resolve) {
        setTimeout(() => {
            resolve()
        }, 3000)
    }


    /**
     * 渲染正常界面
     * @returns {*}
     */
    renderNormal() {
        return (
            <ComicContentList
                ref={(c) => {this.content = c}}
                onRefresh={this.onRefresh}
                page={this.props.navigation.getParam('page', 0)}
                count={this.props.navigation.getParam('count',0)}
                backward={this.backward}
                forward={this.forward}
            />
        )
    }


    /**
     * 向后翻页
     */
    backward(){
        this.getContentMore(true)
    }

    /**
     * 向前翻页
     */
    forward(){
        this.getContentMore(false)
    }
    /**
     * 加载更多
     * @param next
     */
    getContentMore(next) {
        console.log(next ? '加载下一页' : '加载上一页')
        let params = {
            next: next
        }
        let url
        if (this.props.navigation.getParam('platform', '') === Config.platformNetease) {
            url = ServerApi.netease.getComicContentLastOrNext
        }
        else if (this.props.navigation.getParam('platform', '') === Config.platformTencent) {
            url = ServerApi.tencent.getComicContentLastOrNext
        }

        this.props.request(url, params, this.statusManager, (result) => {
           if(this.isMount){
               // 加载下一页,数据与最后一条数据不同，拼接在末尾
               if (next && JSON.stringify(result.data[result.data.length - 1]) !== JSON.stringify(this.data.data[this.data.data.length - 1])) {
                   console.log('加载下一页成功')
                   this.data = result
                   this.content.addPage(true,this.data)
               }
               // 加载上一页,数据与第一条数据不同，数据添加在头部
               else if (!next && JSON.stringify(result.data[0]) !== JSON.stringify(this.data.data[0])) {
                   console.log('加载上一页成功')
                   this.data = result
                   this.content.addPage(false,this.data)
               }
           }
        }, (error) => {
            console.log(error)
        },true)
    }
}

export default BaseComponent(ComicContent)