/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 漫画详情展示
 */

import React, {Component} from 'react'
import {View, Image, findNodeHandle} from 'react-native'
import Status from "../util/Status"
import StatusManager from "../util/StatusManager"
import CommonStyle from '../common/CommonStyle'
import ServerApi from "../constant/ServerApi"
import NetUtil from "../util/NetUtil"
import DetailHeader from '../common/DetailHeader'
import DetailChapters from '../common/DetailChapters'
import DetailInfo from './DetailInfo'
import {BlurView} from 'react-native-blur'
import NavigationService from "../navigator/NavigationService"
import Config from "../constant/Config"
import PullScrollView from '../widget/PullScrollView'
class ComicDetail extends Component<Props>{
    constructor(props) {
        super(props)
        this.state = {
            follow: false,
            data: null,
            loadMore: false, // 是否有更多章节
            refresh: false, // 是否正在刷新章节
            viewRef: null
        }
        this.onPullRelease = this.onPullRelease.bind(this)
        this.statusManager = new StatusManager()
    }

    componentDidMount() {
        this.isMount = true
        console.log(this.props.navigation.getParam('id', ''))
        this.getDetail(false)
    }

    /**
     * 重试回调
     */
    retry(){
        this.getDetail(true)
    }

    componentWillUnmount(){
        this.isMount = false
    }

    /**
     * 获取详情
     */
    getDetail(showLoading) {
        let params = {
            id: this.props.navigation.getParam('id', '')
        }
        this.props.request(ServerApi.netease.getDetail,params,this.statusManager,(result) => {
            if(this.isMount){
                this.setState({
                    data: result,
                    loadMore: result.loadMore
                })
            }

        }, (error) => {
            console.log(error)
        },showLoading)
    }

    /**
     * 获取更多详情
     */
    getDetailMore() {
        let params = {
            id: this.props.navigation.getParam('id', '')
        }
        this.setState({
            loadMore: false,
            refresh: true
        })
        NetUtil.post(ServerApi.tencent.getDetailMore, params, (result) => {
            if (this.isMount && result.length !== 0) {
                Array.prototype.push.apply(this.state.data.data, result)
                this.setState({
                    ['data.data']: this.state.data.data,
                    refresh: false
                })
            } else {
                if (this.isMount){
                    this.setState({
                        refresh: false
                    })
                }
            }
        }, (error) => {
            console.log(error)
        })
    }

    /**
     * 图片加载完成回调
     */
    imageLoaded() {
        if(this.isMount){
            this.setState({viewRef: findNodeHandle(this.cover)});
        }
    }

    onPullRelease(resolve){
        this.getDetail(true)
        setTimeout(() => {
            resolve()
        }, 3000)
    }

    renderNormal(){
        return (
            <PullScrollView style={{flex: 1, backgroundColor: 'white'}}
                            onPullRelease={this.onPullRelease}>
                {/*渲染模糊背景*/}
                {this.state.data ?
                    <Image
                        ref={(img) => {
                            this.cover = img
                        }}
                        source={{uri: this.state.data.cover}}
                        style={CommonStyle.styles.detailAbsolute}
                        onLoadEnd={this.imageLoaded.bind(this)}
                    /> : null }
                {this.state.viewRef ?
                    <BlurView
                        style={CommonStyle.styles.detailAbsolute}
                        viewRef={this.state.viewRef}
                        blurType="dark"
                        blurAmount={2}
                    /> : null}
                {/*渲染头部*/}
                <DetailHeader follow={this.state.follow} onBack={() => {
                    this.props.navigation.goBack()
                }} onFollow={() => {
                    this.setState({
                        follow: true
                    })
                }}/>
                {/*渲染漫画信息*/}
                {this.state.data ? <DetailInfo data={this.state.data} /> : null}
                {/*渲染可看漫画章节*/}
                {this.state.data ?
                    <DetailChapters data={this.state.data}
                                    refresh={this.state.refresh}
                                    state={this.state}
                                    loadMore={this.state.loadMore} onClick={(item) => {
                        NavigationService.navigate('ComicContent',{link:this.getLink(item.link), platform:Config.platformTencent})
                    }} onMore={() => {
                        this.getDetailMore()
                    }}/> : null}
            </PullScrollView>
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

    getLink(link){
        let start = link.lastIndexOf('index')
        let result = link.substring(start,link.length)
        console.log(result)
        return result
    }

}

export default ComicDetail