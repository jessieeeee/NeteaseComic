/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 漫画详情展示
 */
import React, {Component} from 'react'
import {Text, View, Image, ScrollView, TouchableOpacity ,FlatList} from 'react-native'
import CommonStyle from '../constant/CommonStyle'
import NeteaseStyle from './Style'
import ServerApi from "../constant/ServerApi"
import NetUtil from "../util/NetUtil"

let icBack = require('../img/ic_back.png')
let icFollow = require('../img/ic_follow.png')
let icUnFollow = require('../img/ic_unfollow.png')


class ComicDetail extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            btnFollow: icUnFollow,
            data: null,
            loadMore: false,
            refresh: false
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('link', ''))
        this.getDetail()
    }

    /**
     * 获取详情
     */
    getDetail() {
        let params = {
            link: this.props.navigation.getParam('link', '')
        }
        NetUtil.post(ServerApi.netease.getDetail, params, (result) => {
            this.setState({
                data: result,
                loadMore: result.loadMore
            })
        }, (error) => {
            console.log(error)
        })
    }

    /**
     * 获取更多详情
     */
    getDetailMore() {
        let params = {
            link: this.props.navigation.getParam('link', '')
        }
        this.setState({
            loadMore: false,
            refresh: true
        })
        NetUtil.post(ServerApi.netease.getDetailMore, params, (result) => {
           if (result.length !== 0 ){
               Array.prototype.push.apply(this.state.data.data, result)
               this.setState({
                   ['data.data']: this.state.data.data,
                   refresh: false
               })
           } else {
               this.setState({
                   refresh: false
               })
           }
        }, (error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={CommonStyle.styles.container}>
                    {this.renderHeader()}
                    {this.renderInfo()}
                    {this.renderChapterView()}
                </View>
            </ScrollView>
        )
    }

    /**
     * 渲染头部
     * @returns {*}
     */
    renderHeader() {
        return (
            <View style={NeteaseStyle.styles.detailHeader}>
                <TouchableOpacity style={NeteaseStyle.styles.headerIconLeftView}
                                  onPress={() => this.props.navigation.goBack()}>
                    <Image source={icBack} style={NeteaseStyle.styles.headerIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={NeteaseStyle.styles.headerIconRightView}
                                  onPress={() => {
                                      this.setState({
                                          btnFollow: icFollow
                                      })
                                  }}>
                    <Image source={this.state.btnFollow} style={NeteaseStyle.styles.headerIcon}/>
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * 渲染漫画信息
     * @returns {*}
     */
    renderInfo() {
        if (this.state.data) {
            return (
                <View>
                    <View style={NeteaseStyle.styles.infoView}>
                        <Image source={{uri: this.state.data.cover}} style={NeteaseStyle.styles.infoCover}/>
                        <View style={NeteaseStyle.styles.infoTextView}>
                            <View style={{position: 'absolute', top: 0}}>
                                <Text numberOfLines={1}
                                      style={NeteaseStyle.styles.titleText}>{this.state.data.title}</Text>
                                <Text numberOfLines={1}
                                      style={NeteaseStyle.styles.subText}>{'作者：' + this.state.data.author}</Text>
                                <Text numberOfLines={1}
                                      style={NeteaseStyle.styles.subText}>{'类别：' + this.state.data.category}</Text>
                            </View>
                            <TouchableOpacity style={{position: 'absolute', bottom: 0,}} onPress={() => {
                                console.log('点击了')
                            }}>
                                <Text style={NeteaseStyle.styles.readText}>观看第一话</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={NeteaseStyle.styles.introText}>{this.state.data.intro}</Text>

                </View>
            )
        }
    }


    /**
     * 渲染章节
     * @returns {*}
     */
    renderChapterView() {
        if (this.state.data) {
            console.log('刷新了'+this.state.data.data.length)
            return (
                <View style={NeteaseStyle.styles.chapterViews}>
                    <Text style={NeteaseStyle.styles.chapterTitle}>目录</Text>
                    <View style={NeteaseStyle.styles.chapterHeadView}>
                        <Text style={NeteaseStyle.styles.stateView}>{this.state.data.state}</Text>
                        <Text style={NeteaseStyle.styles.updateView}>{this.state.data.updateTime}</Text>
                    </View>
                    <FlatList ref={(ref) => {this.listView = ref}}
                                  data={this.state.data.data}
                                  refreshing={this.state.refresh}
                              　　onRefresh={this.onRefresh}
                                  showsVerticalScrollIndicator = {false}
                              　　extraData={this.state}
                                  renderItem={({item}) => (
                                      <TouchableOpacity onPress={() => {
                                          console.log('点击了')
                                      }}>
                                          <Text style={NeteaseStyle.styles.chapterDetailText}>
                                              {item.order}
                                          </Text>
                                      </TouchableOpacity>
                                  )}
                                  keyExtractor={item => item.link}
                                  numColumns={4}
                                  style={NeteaseStyle.styles.listView}
                    />

                    {this.state.loadMore ?
                        <TouchableOpacity style={NeteaseStyle.styles.moreTextView} onPress={() => {
                            this.getDetailMore()
                        }}>
                            <Text style={NeteaseStyle.styles.moreText}>戳我看更多目录(￣▽￣)</Text>
                        </TouchableOpacity>
                        : null}
                </View>
            )
        }
    }
    onRefresh = () => {

    }
}

export default ComicDetail