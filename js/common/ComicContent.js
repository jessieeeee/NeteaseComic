/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 浏览漫画界面
 */
import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import PullFlatList from '../widget/PullFlatList'
import ComicImg from './ComicImg'
import CommonStyle from "./CommonStyle"
import NetUtil from "../util/NetUtil"
import ServerApi from "../constant/ServerApi"
import Config from '../constant/Config'
import StatusManager from "../util/StatusManager"
import Status from "../util/Status"
import {BaseComponent} from "./BaseComponent"
import LoadMoreState from "../widget/LoadMoreState"

class ComicContent extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
        this.statusManager = new StatusManager()
        this.onRefresh = this.onRefresh.bind(this)
    }

    componentDidMount() {
        this.isMount = true
        console.log(this.props.navigation.getParam('link', ''))
        console.log(this.props.navigation.getParam('platform', ''))
        this.getComicContent()
    }

    componentWillUnmount(){
        this.isMount = false
    }
    /**
     * 重试回调
     */
    retry(){
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
        this.props.request(url,params,this.statusManager,(result) => {
            if (this.isMount){
                this.setState({
                    data: result
                })
            }
        }, (error) => {
            if (this.isMount){
                this.setState({
                    loadingState: LoadMoreState.state.error
                })
            }
            console.log(error)
        })
    }

    endRefresh(next) {
        // 结束刷新
        if (next) {
            if (this.isMount && this.loadMore) {
                this.setState({
                    loadingState: LoadMoreState.state.tip
                })
            } else if (this.isMount){
                    this.setState({
                        loadingState: LoadMoreState.state.noMore
                    })
            }
        }
    }

    space() {
        return (<View style={CommonStyle.styles.divider}/>)
    }

    /**
     * 正常显示渲染
     * @returns {*}
     */
    renderNormal(){
        return(
            <View>
                {this.state.data ?
                    <PullFlatList ref={(ref) => {
                        this.listView = ref
                    }}
                                  data={this.state.data.data}
                                  showsVerticalScrollIndicator={false}
                                  ItemSeparatorComponent={this.space}
                                  renderItem={({item, index}) => (
                                      <ComicImg imgUrl={item} index={index}/>
                                  )}
                                  keyExtractor={item => item}
                                  numColumns={1}
                                  onPullRelease={this.onRefresh}
                                  loadMoreState={this.state.loadingState}
                                  onLoadMore={() => this.onLoadMore()}
                                  style={CommonStyle.styles.listView}
                    /> : null}
            </View>
        )
    }
    render() {
        return (
            <View style={CommonStyle.styles.container}>
                {/*渲染正常界面*/}
                {this.statusManager.Status === Status.Normal ?  this.renderNormal() :null}
                {/*渲染状态界面*/}
                {this.props.displayStatus(this.statusManager)}
            </View>
        )
    }

    onRefresh(resolve) {
        this.getContentMore(false)
        setTimeout(() => {
            resolve()
        }, 3000)
    }

    onLoadMore() {
        this.getContentMore(true)
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
        NetUtil.post(url, params, (result) => {
            // 没有下一页了
            if (!result.data) {
                this.loadMore = false
                return
            }

            // 加载下一页,数据与最后一条数据不同，拼接在末尾
            if (next && JSON.stringify(result.data[result.data.length - 1]) !== JSON.stringify(this.state.data.data[this.state.data.data.length - 1])) {
                Array.prototype.push.apply(this.state.data.data, result.data)
                console.log(this.state.data.data)
                this.loadMore = result.loadMore
            }
            // 加载上一页,数据与第一条数据不同，数据添加在头部
            else if (!next && JSON.stringify(result.data[0]) !== JSON.stringify(this.state.data.data[0])) {
                result.data.unshift(0, 0)
                Array.prototype.splice.apply(this.state.data.data, result.data)
            }
            this.endRefresh(next)
        }, (error) => {
            if (this.isMount){
                this.setState({
                    loadingState: LoadMoreState.state.error
                })
            }

            console.log(error)
        })
    }
}


export default BaseComponent(ComicContent)