/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 浏览漫画界面
 */
import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity, AsyncStorage} from 'react-native'
import ComicContentListItem from './ComicContentListItem'
import CommonStyle from "./CommonStyle"
import ServerApi from "../constant/ServerApi"
import Config from '../constant/Config'
import StatusManager from "../util/StatusManager"
import {BaseComponent} from "./BaseComponent"
import {observer} from "mobx-react/native"
import Status from "../util/Status"
import LoadMoreState from "../widget/LoadMoreState"
import NetUtil from "../util/NetUtil"
const USER_ID = "USER_ID"
@observer
class ComicContent extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = { loadingState: LoadMoreState.state.tip} //默认显示加载更多提示
        this.statusManager = new StatusManager()
        this.onRefresh = this.onRefresh.bind(this)
        this.onLoadMore = this.onLoadMore.bind(this)

        // 获取用户id
        AsyncStorage.getItem(USER_ID)
            .then((userId) => {
                // 本地没有用户id
                if (!userId) {
                    AsyncStorage.setItem(USER_ID, userId);
                    this.setState({ userId });
                }
            })
            .catch((e) => alert(e));

    }

    componentDidMount() {
        console.log('link',this.props.navigation.getParam('link', ''))
        console.log('platform',this.props.navigation.getParam('platform', ''))
        this.isMount = true
        this.getComicContent()

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
                this.setState({
                    data:result
                })
                console.log('render2 --> ' + JSON.stringify( this.state))
            }
        }, (error) => {
            console.log(error)
        },true)
    }

    render() {
        return (
            <View style={CommonStyle.styles.container}>
                {this.state.data != null ?this.renderNormal(): null}
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
        console.log('render --> ' + JSON.stringify( this.state))
        return (
             <ComicContentListItem
                data={this.state.data}
                onRefresh={this.onRefresh}
                onLoadMore={this.onLoadMore}
                loadingState={this.state.loadingState}
            />
        )
    }

    onLoadMore(){
        // 展示加载更多
        this.setState({
            loadingState: LoadMoreState.state.loading
        })
        let url
        if (this.props.navigation.getParam('platform', '') === Config.platformNetease) {
            url = ServerApi.netease.getComicContentMore
        }
        else if (this.props.navigation.getParam('platform', '') === Config.platformTencent) {
            url = ServerApi.tencent.getComicContentMore
        }
        NetUtil.post(url, null, (result) => {
            this.loadMore = result.loadMore.toString() === 'true'
            this.endRefresh()
            console.log('加载更多1'+result.loadMore)
            // 避免重复添加，比较最后一个数据
            if (result.loadMore.toString() === 'true'){
                console.log('加载更多2')
                Array.prototype.push.apply(this.state.data.data, result.data)
            }
        }, (error) => {
            // 加载更多错误
            this.setState({
                loadingState: LoadMoreState.state.error
            })
            console.log(error)
        })
    }

    endRefresh() {
        // 如果当前的数据量小于上一次
        if (this.loadMore) {
            // 没有更多了
            this.setState({
                loadingState: LoadMoreState.state.tip
            })
        } else {
            // 继续加载更多提示
            this.setState({
                loadingState: LoadMoreState.state.noMore
            })
        }
    }
}

export default BaseComponent(ComicContent)