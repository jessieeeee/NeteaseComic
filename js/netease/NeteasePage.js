/**
 * @date : 8/13/18
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :网易漫画首页
 */

import React, {Component} from 'react'
import {View} from 'react-native'
import Config from '../constant/Config'
import CommonStyle from '../common/CommonStyle'
import ServerApi from '../constant/ServerApi'
import ComicItem from './ComicItem'
import Welcome from '../welcome/Welcome'
import PullFlatList from '../widget/PullFlatList'
import LoadMoreState from '../widget/LoadMoreState'
import ControlBtn from '../widget/ControlBtn'
import {BaseComponent} from '../common/BaseComponent'
import {DeviceEventEmitter} from 'react-native'
import StatusManager from '../util/StatusManager'
import Status from "../util/Status"
import {observer} from "mobx-react/native"
import NetUtil from '../util/NetUtil'
let numColumns = 3 // 3列
let cellW = Config.sreenW / numColumns // 单个item的宽度
@observer
class NeteasePage extends Component<Props> {

    constructor(props) {
        super(props)
        this.lastNum = 0 //上一次的数据个数
        this.state = {
            data: null,
            welcome: true,
            btnState: ControlBtn.States.Default,
            loadingState: LoadMoreState.state.tip //默认显示加载更多提示
        }
        // 初始化状态界面管理器
        this.statusManager = new StatusManager()
        this.onRefresh = this.onRefresh.bind(this)
    }

    componentDidMount() {
        this.getFreeComicList(true)
        // ２秒后移除欢迎界面
        setTimeout(() => {
            this.setState({
                welcome: false
            })
            //调用事件通知
            DeviceEventEmitter.emit('showBar', null);
        }, 2000)
    }

    /**
     * 正常显示渲染
     * @returns {*}
     */
    renderNormal() {
        return (
            <View>
                {this.state.data ?
                    <PullFlatList ref={(ref) => {
                        this.listView = ref
                    }}
                                  data={this.state.data}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item}) => (
                                      <ComicItem size={cellW} data={item}/>
                                  )}
                                  onUp={() => {
                                      this.setState({
                                          btnState: ControlBtn.States.Up
                                      })
                                  }}
                                  onDown={() => {
                                      this.setState({
                                          btnState: ControlBtn.States.Down
                                      })
                                  }}
                                  keyExtractor={item => item.id}
                                  numColumns={numColumns}
                                  onPullRelease={this.onRefresh}
                                  onLoadMore={() => this.onLoadMore()}
                                  loadMoreState={this.state.loadingState}
                                  onRetry={() => this.onLoadMore()}
                                  style={CommonStyle.styles.listView}
                    /> : null}
                    {/*渲染返回顶部底部按钮*/}
                {this.state.btnState === ControlBtn.States.Default ? null :
                    <ControlBtn btnState={this.state.btnState} callback={() => this.scrollTopBottom()}/>}
            </View>
        )
    }


    /**
     * 重试回调
     */
    retry() {
        this.getFreeComicList(true)
    }

    /**
     * 获取免费漫画列表
     */
    getFreeComicList(showLoading) {
        this.props.request(ServerApi.netease.getComic, null, this.statusManager, (result) => {
            this.setState({
                data: result,
            })
            this.endRefresh(result)
        }, (error) => {
            console.log(error)
        }, showLoading)
    }

    /**
     * 获取更多免费漫画列表
     */
    getListMore() {
        // 展示加载更多
        this.setState({
            loadingState: LoadMoreState.state.loading
        })
        NetUtil.post(ServerApi.netease.getComicMore, null, (result) => {
            Array.prototype.push.apply(this.state.data, result)
            this.endRefresh(result)
        }, (error) => {
            // 加载更多错误
            this.setState({
                loadingState: LoadMoreState.state.error
            })
            console.log(error)
        })
    }

    endRefresh(result) {
        // 如果当前的数据量小于上一次
        if (result.length < this.lastNum) {
            // 没有更多了
            this.setState({
                loadingState: LoadMoreState.state.noMore
            })
        } else {
            // 继续加载更多提示
            this.setState({
                loadingState: LoadMoreState.state.tip
            })
        }
    }

    render() {
        return (
            <View style={CommonStyle.styles.container}>
                {/*渲染正常界面*/}
                {this.statusManager.Status === Status.Normal ? this.renderNormal() : null}
                {/*渲染状态界面*/}
                {this.props.displayStatus(this.statusManager)}
                {/*渲染欢迎界面*/}
                {this.state.welcome ? <Welcome/> : null}
            </View>
        )
    }

    /**
     * 下拉刷新回调
     */
    onRefresh(resolve) {
        this.getFreeComicList(false)
        setTimeout(() => {
            resolve()
        }, 3000)
    }

    /**
     * 加载更多回调
     */
    onLoadMore() {
        this.getListMore()
    }

    /**
     * 滚动到底部顶部
     */
    scrollTopBottom() {
        if (this.state.btnState === ControlBtn.States.Up && this.listView) {
            this.listView.scrollToEnd()
        }
        else if (this.state.btnState === ControlBtn.States.Down && this.listView) {
            this.listView.scrollToTop()
        }
    }
}

export default BaseComponent(NeteasePage)