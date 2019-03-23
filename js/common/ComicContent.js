/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 浏览漫画界面
 */
import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity, AsyncStorage} from 'react-native'
import ComicContentList from './ComicContentList'
import CommonStyle from "./CommonStyle"
import ServerApi from "../constant/ServerApi"
import Config from '../constant/Config'
import StatusManager from "../util/StatusManager"
import {BaseComponent} from "./BaseComponent"
import {observer} from "mobx-react/native"
import SocketIOClient from 'socket.io-client';
const USER_ID = "USER_ID"
@observer
class ComicContent extends Component<Props> {

    constructor(props) {
        super(props)
        this.statusManager = new StatusManager()
        this.onRefresh = this.onRefresh.bind(this)
        this.backward = this.backward.bind(this)
        this.forward = this.forward.bind(this)

        this.socket = SocketIOClient(ServerApi.server); // 设置服务端的地址和端口号
        // 获取用户id
        AsyncStorage.getItem(USER_ID)
            .then((userId) => {
                // 本地没有用户id
                if (!userId) {
                    // 发送空的用户id
                    this.socket.emit('userJoined', null);
                    // 监听userJoined消息，保存服务端给的用户id
                    this.socket.on('userJoined', (userId) => {
                        AsyncStorage.setItem(USER_ID, userId);
                        this.setState({ userId });
                    });
                } else {
                    // 发送本地保存的用户id
                    this.socket.emit('userJoined', userId);
                }
            })
            .catch((e) => alert(e));

        this.socket.on('catch', (item) => {
            console.log('当前抓取进度:' + '(' +item.index +'/' + item.length + ')' )
            this.props.updateLoading('当前抓取进度:' + '(' +item.index +'/' + item.length + ')\n请耐心等待~')
        })
        this.socket.on('comment',(item) => {
            console.log('收到弹幕:' + item.toString())
        })
    }

    componentDidMount() {
        console.log('link',this.props.navigation.getParam('link', ''))
        console.log('platform',this.props.navigation.getParam('platform', ''))
        console.log('page',this.props.navigation.getParam('page', 0))
        console.log('count',this.props.navigation.getParam('count', 0))
        this.isMount = true
        this.getComicContent()
        // this.getComments()
    }

    componentWillUnmount(){
        this.isMount = false
    }

    /**
     * 重试回调
     */
    retry() {
        // 重置
        this.content && this.content.reset()
        this.getComicContent()
        this.getComments()
    }

    getComments(){
        let params = {
            link: this.props.navigation.getParam('link', ''),
            index: 1
        }
        let url
        if (this.props.navigation.getParam('platform', '') === Config.platformNetease) {
            url = ServerApi.netease.getComicComment
        }
        else if (this.props.navigation.getParam('platform', '') === Config.platformTencent) {
            url = ServerApi.tencent.getComicComment
        }
        this.props.request(url, params, this.statusManager, (result) => {
            console.log('请求成功' + result)
        }, (error) => {
            console.log(error)
        },true)
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
                this.content.initPage(result)
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
               if (next) {
                   console.log('加载下一页成功')
                   this.content.addPage(true,result)
               }
               else {
                   console.log('加载上一页成功')
                   this.content.addPage(false,result)
               }
           }
        }, (error) => {
            console.log(error)
        },true)
    }
}

export default BaseComponent(ComicContent)