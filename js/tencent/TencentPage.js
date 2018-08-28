import React,{Component} from 'react'
import {View} from 'react-native'
import CommonStyle from '../common/CommonStyle'
import NetUtil from '../util/NetUtil'
import ServerApi from '../constant/ServerApi'
import CommicItem from './ComicItem'
import FlatListView from '../widget/FlatListView'
import FooterState from '../widget/FooterState'
import ControlBtn from '../widget/ControlBtn'

class TencentPage extends Component<Props> {

    constructor(props){
        super(props)
        this.lastNum = 0 //上一次的数据个数
        this.pageNo = 1 //当前页数
        this.state = {
            data: null,
            btnState: ControlBtn.States.Default,
        }
    }

    componentDidMount() {
        this.getFreeComicList()
    }

    /**
     * 获取免费漫画列表
     */
    getFreeComicList(){
        let params = {
            pageNo: this.pageNo
        }
        NetUtil.post(ServerApi.tencent.getComic, params, (result) => {
            console.log('data----->'+'当前第'+this.pageNo+ '页')
            if(this.pageNo === 1){
                this.setState({
                    data: result,
                })
            }else{
                Array.prototype.push.apply(this.state.data, result)
            }
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
                this.pageNo ++
            }
            this.listView.endRefreshing(footerState)
        }
    }

    render(){
        return (
            <View style={CommonStyle.styles.container}>
                {this.state.data ?
                    <FlatListView ref={(ref) => {this.listView = ref}}
                                  data={this.state.data}
                                  showsVerticalScrollIndicator = {false}
                                  renderItem={({item}) => (
                                      <CommicItem data={item}/>
                                  )}
                                  keyExtractor={item => item.id}
                                  onRefresh={() => this.onRefresh()}
                                  onLoadMore={() => this.onLoadMore()}
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
                {this.state.btnState === ControlBtn.States.Default ?  null : <ControlBtn btnState={this.state.btnState} callback={() => this.scrollTopBottom()}/>}
            </View>
        )
    }

    /**
     * 下拉刷新回调
     */
    onRefresh() {
        this.pageNo = 1
        this.getFreeComicList()
    }

    /**
     * 加载更多回调
     */
    onLoadMore() {
        this.getFreeComicList()
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

export default TencentPage