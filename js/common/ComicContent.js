/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 浏览漫画界面
 */
import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import FlatListView from '../widget/FlatListView'
import ComicImg from './ComicImg'
import FooterState from '../widget/FooterState'
import CommonStyle from "./CommonStyle"
import NetUtil from "../util/NetUtil"
import ServerApi from "../constant/ServerApi"
import Config from '../constant/Config'
class ComicContent extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('link', ''))
        console.log(this.props.navigation.getParam('platform', ''))
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
        if (this.props.navigation.getParam('platform', '') === Config.platformNetease){
            url = ServerApi.netease.getComicContent
        }
        else if(this.props.navigation.getParam('platform', '') === Config.platformTencent){
            url = ServerApi.tencent.getComicContent
        }
        NetUtil.post(url, params, (result) => {
            this.setState({
                data:  result,
            })
            this.endRefresh(true)
        }, (error) => {
            if (this.listView) {
                let footerState = FooterState.Failure
                this.listView.endRefreshing(footerState)
            }
            console.log(error)
        })
    }

    endRefresh(next) {
        // 结束刷新
        if (this.listView && next) {
            let footerState
            if (this.state.data.loadMore) {
                footerState = FooterState.CanLoadMore;
            } else {
                footerState = FooterState.NoMoreData;
            }
            console.log('下一页加载完成')
            this.listView.endRefreshing(footerState)
        } else {
            console.log('上一页加载完成')
            this.listView.endRefreshing()
        }
    }

    space(){
        return(<View style={CommonStyle.styles.divider}/>)
    }

    render() {
        return (
            <View style={CommonStyle.styles.container}>
                {this.state.data ?
                    <FlatListView ref={(ref) => {
                        this.listView = ref
                    }}
                                  data={this.state.data.data}
                                  showsVerticalScrollIndicator={false}
                                  ItemSeparatorComponent={this.space}
                                  renderItem={({item,index}) => (
                                      <ComicImg imgUrl={item.src} index={index} />
                                  )}

                                  keyExtractor={item => item.src}
                                  numColumns={1}
                                  onRefresh={() => this.onRefresh()}
                                  onLoadMore={() => this.onLoadMore()}
                                  style={CommonStyle.styles.listView}
                    /> : null}
            </View>
        )
    }

    onRefresh(){
        this.getContentMore(false)
    }

    onLoadMore(){
       this.getContentMore(true)
    }

    /**
     * 加载更多
     * @param next
     */
    getContentMore(next){
        console.log(next ? '加载下一页' : '加载上一页')
        let params = {
            next: next
        }
        let url
        if (this.props.navigation.getParam('platform', '') === Config.platformNetease){
            url = ServerApi.netease.getComicContentLastOrNext
        }
        else if(this.props.navigation.getParam('platform', '') === Config.platformTencent){
            url = ServerApi.tencent.getComicContentLastOrNext
        }
        NetUtil.post(url, params, (result) => {
            // 加载下一页,数据拼接在末尾
            if (next && result.data.toString() !== this.state.data.data.toString()){
                Array.prototype.push.apply(this.state.data.data, result.data)
                this.setState({
                    ['data.loadMore']:result.loadMore
                })
            }
            // 加载上一页,数据添加在头部
            else {
                if (result.data.toString() !== this.state.data.data.toString()){
                    this.state.data.data.splice(0,0,result.data)
                }
            }

            this.endRefresh(next)
        }, (error) => {
            if (this.listView) {
                let footerState = FooterState.Failure
                this.listView.endRefreshing(footerState)
            }
            console.log(error)
        })
    }
}

export default ComicContent