import React,{Component} from 'react'
import {View} from 'react-native'
import CommonStyle from '../common/CommonStyle'
import LoadMoreState from '../widget/LoadMoreState'
import PullFlatList from '../widget/PullFlatList'
import ServerApi from '../constant/ServerApi'
import CommicItem from './ComicItem'
import ControlBtn from '../widget/ControlBtn'
import StatusManager from '../util/StatusManager'
import {observer} from "mobx-react/native"
import {BaseComponent} from "../common/BaseComponent"
import Status from "../util/Status"
@observer
class TencentPage extends Component<Props> {

    constructor(props){
        super(props)
        this.lastNum = 0 //上一次的数据个数
        this.pageNo = 1 //当前页数
        this.state = {
            data: null,
            btnState: ControlBtn.States.Default,
            loadingState: LoadMoreState.state.tip //默认显示加载更多的提示
        }
        // 初始化状态界面管理器
        this.statusManager = new StatusManager()
        this.onRefresh = this.onRefresh.bind(this)
    }

    componentDidMount() {
        this.getFreeComicList(true)
    }

    retry(){
        this.getFreeComicList(true)
    }
    /**
     * 获取免费漫画列表
     */
    getFreeComicList(showLoading){
        let params = {
            pageNo: this.pageNo
        }
        this.props.request(ServerApi.tencent.getComic,params,this.statusManager,(result) => {
            console.log('data----->'+'当前第'+this.pageNo+ '页')
            if(this.pageNo === 1){
                this.setState({
                    data: result,
                })
            }else{
                // 避免重复添加，比较最后一个数据
                if (JSON.stringify(this.state.data[this.state.data.length - 1]) !== JSON.stringify(result[result.length-1])){
                    Array.prototype.push.apply(this.state.data, result)
                }
            }
            this.endRefresh(result)
        }, (error) => {
            console.log(error)
            if (!showLoading){
                this.setState({
                    loadingState: LoadMoreState.state.error
                })
            }
        },showLoading)

    }

    endRefresh(result){
        // 如果当前的数据量小于上一次
        if (result.length < this.lastNum){
            // 没有更多了
            this.setState({
                loadingState: LoadMoreState.state.noMore
            })
        }else {
            // 继续提示加载更多
            this.setState({
                loadingState: LoadMoreState.state.tip
            })
            this.pageNo ++
        }
    }

    renderNormal(){
        return (
            <View>
                {this.state.data ?
                    <PullFlatList ref={(ref) => {this.listView = ref}}
                                  data={this.state.data}
                                  showsVerticalScrollIndicator = {false}
                                  renderItem={({item}) => (
                                      <CommicItem data={item}/>
                                  )}
                                  keyExtractor={item => item.id}
                                  onPullRelease={this.onRefresh}
                                  loadMoreState={this.state.loadingState}
                                  onLoadMore={() => this.onLoadMore()}
                                  onRetry={() => this.onLoadMore()}
                                  style={CommonStyle.styles.listView}
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
                    />:  null}
                {/*渲染返回顶部底部按钮*/}
                {this.state.btnState === ControlBtn.States.Default ?  null : <ControlBtn btnState={this.state.btnState} callback={() => this.scrollTopBottom()}/>}
            </View>
        )
    }
    render(){
        return (
            <View style={CommonStyle.styles.container}>
                {/*渲染正常界面*/}
                {this.statusManager.Status === Status.Normal ?  this.renderNormal() :null}
                {/*渲染状态界面*/}
                {this.props.displayStatus(this.statusManager)}
            </View>
        )
    }

    /**
     * 下拉刷新回调
     */
    onRefresh(resolve) {
        this.pageNo = 1
        this.getFreeComicList(false)
        setTimeout(() => {
            resolve()
        }, 3000)
    }

    /**
     * 加载更多回调
     */
    onLoadMore() {
        this.setState({
            loadingState: LoadMoreState.state.loading
        })
        this.getFreeComicList(false)
    }

    /**
     * 滚动到底部顶部
     */
    scrollTopBottom() {
        if (this.state.btnState === ControlBtn.States.Up && this.listView){
            this.listView.scrollToEnd()
        }
        else if (this.state.btnState === ControlBtn.States.Down && this.listView){
            this.listView.scrollToTop()
        }
    }
}

export default BaseComponent(TencentPage)