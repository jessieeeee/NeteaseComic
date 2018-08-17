/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 漫画详情展示
 */
import React, {Component} from 'react'
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
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
            data: null
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
                data: result
            })
        }, (error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={CommonStyle.styles.container}>
                    {this.renderHeader()}
                    {this.renderInfo()}
                    {this.renderChapters()}
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
                            <View style={{position:'absolute',top:0}}>
                                <Text numberOfLines={1} style={NeteaseStyle.styles.titleText}>{this.state.data.title}</Text>
                                <Text numberOfLines={1} style={NeteaseStyle.styles.subText}>{'作者：'+this.state.data.author}</Text>
                                <Text numberOfLines={1} style={NeteaseStyle.styles.subText}>{'类别：'+this.state.data.category}</Text>
                            </View>
                            <Text style={NeteaseStyle.styles.readText}>观看第一话</Text>
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
    renderChapters() {
        return (
            <View style={NeteaseStyle.styles.chapterViews}>
                <View style={NeteaseStyle.styles.chapterTitle}>
                    <Text>{this.state.data.state}</Text>
                    <Text>{this.state.data.updateTime}</Text>
                </View>
                <Text style={NeteaseStyle.styles.moreText}>戳我看更多目录(￣▽￣)</Text>
            </View>
        )
    }
}

export default ComicDetail