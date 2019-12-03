/**
 * @date :2019/6/26
 * @author :JessieKate
 * @email :lyj1246505807@gmail.com
 * @description : 我的收藏界面
 */
import React, {Component} from 'react'
import {TouchableOpacity, Text, View, TextInput, AsyncStorage} from 'react-native'
import CommonStyle from '../common/CommonStyle'
import MineStyle from './Style'
import Config from '../constant/Config'
import NavigationService from '../navigator/NavigationService'
import {BaseComponent} from "../common/BaseComponent"
import ServerApi from "../constant/ServerApi"
import StatusManager from '../util/StatusManager'
import PullFlatList from "../widget/PullFlatList"
import FollowComicItem from './FollowComicItem'
let cellW = Config.screenW // 单个item的宽度
class MyFollow extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            follows: null //收藏列表数据
        }
        this.statusManager = new StatusManager()
        this.onRefresh = this.onRefresh.bind(this)

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {this.renderHeader()}
                {this.renderContent()}
            </View>
        )
    }

    componentDidMount() {
        this.isMount = true
        let that = this
        AsyncStorage.getItem('userInfo', function (error, result) {
            if (error) {
                console.log('读取失败')
            }else {
                console.log(result)
                that.setState({
                    userInfo: JSON.parse(result),
                })
                that.getMyFollows(JSON.parse(result))
            }
        })
    }

    componentWillUnmount() {
        this.isMount = false
    }

    /**
     * 我的收藏请求
     */
    getMyFollows(userInfo){
        let params = {
            follower: userInfo,
        }
        let that = this
        this.props.request(ServerApi.mine.getAllFollow, params, this.statusManager, (result) => {
            if (this.isMount) {
                if (result.data){
                    this.setState({
                        follows: result.data
                    })

                }else{
                    console.log('获取收藏列表失败')
                }
            }

        }, (error) => {
            console.log(error)
        }, false)
    }

    /**
     * 渲染内容
     * @returns {XML}
     */
    renderContent() {
        return (
            <View>
                {this.state.follows ?
                    <PullFlatList ref={(ref) => {
                        this.listView = ref
                    }}
                                  data={this.state.follows}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item}) => (
                                      <FollowComicItem size={cellW} data={item}/>
                                  )}
                                  onUp={() => {
                                  }}
                                  onDown={() => {
                                  }}
                                  keyExtractor={item => item.id}
                                  numColumns={1}
                                  onPullRelease={this.onRefresh}
                                  style={CommonStyle.styles.listView}
                    /> : null}
            </View>
        )
    }

    /**
     * 下拉刷新回调
     */
    onRefresh(resolve) {
        this.getMyFollows(this.state.userInfo)
        setTimeout(() => {
            resolve()
        }, 3000)
    }
    /**
     * 渲染顶部bar
     * @returns {XML}
     */
    renderHeader() {
        return (
            <View style={MineStyle.styles.loginHeader}>
                <TouchableOpacity style={MineStyle.styles.LoginBack} onPress={() => {
                    this.props.navigation.goBack()
                }}>
                    <Text style={MineStyle.styles.LoginBackText}>返回</Text>
                </TouchableOpacity>

                <Text style={MineStyle.styles.LoginTitle}>我的收藏</Text>
            </View>
        )
    }
}

export default BaseComponent(MyFollow)