/**
 * @date : 8/13/18
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :网易漫画首页
 */

import React, {Component} from 'react'
import {View} from 'react-native'
import Config from '../constant/Config'
import CommonStyle from '../constant/CommonStyle'
import NetUtil from '../util/NetUtil'
import ServerApi from '../constant/ServerApi'
import CommicItem from './ComicItem'
import FlatListView from '../widget/FlatListView'
import FooterState from '../widget/FooterState'

let numColumns = 3 // 3列
let cellW = Config.sreenW / numColumns // 单个item的宽度

class NeteasePage extends Component<Props> {

    constructor(props) {
        super(props)
        this.lastNum= 0 //上一次的数据个数
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
       this.getFreeComicList()
    }

    /**
     * 获取免费漫画列表
     */
    getFreeComicList(){
        NetUtil.post(ServerApi.netease.getComic, null, (result) => {
            this.setState({
                data: result,
            })
            this.endRefresh(result)
        }, (error) => {
            if(this.listView){
                let footerState = FooterState.Failure;
                this.listView.endRefreshing(footerState)
            }
            console.log(error)
        })
    }

    /**
     * 获取更多免费漫画列表
     */
    getListMore(){
        NetUtil.post(ServerApi.netease.getComicMore, null, (result) => {
            Array.prototype.push.apply(this.state.data, result)
            this.endRefresh(result)
        }, (error) => {
            if(this.listView){
                let footerState = FooterState.Failure;
                this.listView.endRefreshing(footerState)
            }
            console.log(error)
        })
    }

    endRefresh(result){
        // 结束刷新
        if(this.listView){
            let footerState
            // 如果当前的数据量小于上一次
            if (result.length < this.lastNum){
                footerState = FooterState.NoMoreData;
            }else {
                footerState = FooterState.CanLoadMore;
            }
            this.listView.endRefreshing(footerState)
        }
    }

    render() {
        return (
            <View style={CommonStyle.styles.container}>
                {this.state.data ?
                    <FlatListView ref={(ref) => {this.listView = ref}}
                                  data={this.state.data}
                                  showsVerticalScrollIndicator = {false}
                                  renderItem={({item}) => (
                                      <CommicItem size={cellW} data={item}/>
                                  )}
                                  keyExtractor={item => item.id}
                                  numColumns={numColumns}
                                  onRefresh={() => this.onRefresh()}
                                  onLoadMore={() => this.onLoadMore()}
                    />:  null}
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
}


export default NeteasePage