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
import NetUtil from '../util/NetUtil'
import ServerApi from '../constant/ServerApi'
import ComicItem from './ComicItem'
import Welcome from '../welcome/Welcome'
import FlatListView from '../widget/FlatListView'
import FooterState from '../widget/FooterState'
import ControlBtn from '../widget/ControlBtn'
import {BaseComponent} from '../common/BaseComponent'
import {DeviceEventEmitter} from 'react-native'
import StatusManager from '../util/StatusManager'
import Status from "../util/Status"
import {observer} from "mobx-react/native"
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
        }
        this.statusManager = new StatusManager(this.retry)
    }

    componentDidMount() {
        this.getFreeComicList()
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
    renderNormal(){
        return (
            <View>
                {this.state.data ?
                    <FlatListView ref={(ref) => {
                        this.listView = ref
                    }}
                                  data={this.state.data}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item}) => (
                                      <ComicItem size={cellW} data={item}/>
                                  )}
                                  keyExtractor={item => item.id}
                                  numColumns={numColumns}
                                  onRefresh={() => this.onRefresh()}
                                  onLoadMore={() => this.onLoadMore()}
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
                                  style={CommonStyle.styles.listView}
                    /> : null}
                {this.state.btnState === ControlBtn.States.Default ?  null : <ControlBtn btnState={this.state.btnState} callback={() => this.scrollTopBottom()}/>}
            </View>
        )
    }

    /**
     * 重试回调
     */
    retry(){
        this.getFreeComicList()
    }
    /**
     * 获取免费漫画列表
     */
    getFreeComicList() {
        this.props.request(ServerApi.netease.getComic,null,this.statusManager,(result) => {
            this.setState({
                data: result,
            })
            this.endRefresh(result)
        }, (error) => {
            if (this.listView) {
                let footerState = FooterState.Failure;
                this.listView.endRefreshing(footerState)
            }
            console.log(error)
        })
    }

    /**
     * 获取更多免费漫画列表
     */
    getListMore() {
        NetUtil.post(ServerApi.netease.getComicMore, null, (result) => {
            Array.prototype.push.apply(this.state.data, result)
            this.endRefresh(result)
        }, (error) => {
            if (this.listView) {
                let footerState = FooterState.Failure;
                this.listView.endRefreshing(footerState)
            }
            console.log(error)
        })
    }

    endRefresh(result) {
        // 结束刷新
        if (this.listView) {
            let footerState
            // 如果当前的数据量小于上一次
            if (result.length < this.lastNum) {
                footerState = FooterState.NoMoreData;
            } else {
                footerState = FooterState.CanLoadMore;
            }
            this.listView.endRefreshing(footerState)
        }
    }

    render() {
        return (
            <View style={CommonStyle.styles.container}>
                {this.statusManager.Status === Status.Normal ?  this.renderNormal() :null}
                {this.props.displayStatus(this.statusManager)}
                {this.state.welcome ? <Welcome/> : null}
            </View>
        )
    }

    /**
     * 下拉刷新回调
     */
    onRefresh() {
        this.getFreeComicList()
    }

    /**
     * 加载更多回调
     */
    onLoadMore() {
        this.getListMore()
    }

    /**
     * 滚动到顶部
     */
    scrollTopBottom() {
        if (this.state.btnState === ControlBtn.States.Up && this.listView){
            this.listView.scrollToEnd()
        }
        else if (this.state.btnState === ControlBtn.States.Down && this.listView){
            this.listView.scrollToIndex({ viewPosition: 0, index: 0 })
        }
    }
}

export default BaseComponent(NeteasePage)