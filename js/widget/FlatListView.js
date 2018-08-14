/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : flatlist的二次封装
 */
import React, {Component} from 'react';
import {FlatList,ActivityIndicator,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import State from './State';
import Footer from './Footer';

export default class FlatListView extends Component {

    static propTypes = {
        onRefresh: PropTypes.func, // 下拉刷新回调
        onLoadMore: PropTypes.func, // 上拉加载回调
        renderEmptyView: PropTypes.func, // 空界面渲染
        renderRefresh: PropTypes.func, //　头部渲染
        renderLoadMore: PropTypes.func, // 尾部渲染
    };

    constructor(props) {
        super(props);
        this.state = {
            refresh: false,  // 头部是否正在刷新
            loadmore: false,  // 尾部是否正在加载更多
            footerState: State.Idle, // 列表尾部状态，默认不显示控件
        }
    }

    render() {
        return (
            <FlatList
                {...this.props}
                onRefresh={()=>{ this.beginRefresh() }}
                refreshing={this.state.refresh}
                onEndReached={() => { this.beginLoadMore() }}
                onEndReachedThreshold={0.1}  // 距离内容最底部还有多远时触发onEndReached回调
                ListFooterComponent={this.renderFooter}
                ListEmptyComponent={this.props.renderEmptyView == null ? this.renderEmptyView : this.props.renderEmptyView()}
                onHeaderRefresh={this.props.renderRefresh == null ? null : this.props.renderRefresh()}
                onFooterRefresh={this.props.renderLoadMore == null ? null : this.props.renderLoadMore()}
            />
        )
    }

    renderEmptyView = () => {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>当前没有数据</Text>
            </View>
        )
    }

    renderFooter = () => {
        return (
            <Footer
                state={this.state.footerState}
                onRetryLoading={()=>{
                    this.beginLoadMore()
                }}
            />
        )
    };

    // 尾部组件的状态，供外部调用
    footerState() {
        return this.state.footerState;
    }

    // 开始下拉刷新
    beginRefresh() {
        if (this.shouldRefresh()) {
            this.startRefresh()
        }
    }

    // 开始加载更多
    beginLoadMore() {
        if (this.shouldLoadMore()) {
            this.startLoadMore()
        }
    }

    //　下拉刷新，设置刷新状态，调用刷新回调
    startRefresh() {
        this.setState(
            {
                refresh: true
            },
            () => {
                this.props.onRefresh && this.props.onRefresh()
            }
        )
    }

    // 加载更多，设置加载更多状态，调用加载更多回调
    startLoadMore() {
        this.setState(
            {
                footerState: State.Loading,
                loadmore: true
            },
            () => {
                this.props.onLoadMore && this.props.onLoadMore();
            }
        )
    }

    /***
     * 当前是否可以下拉刷新
     * @returns {boolean}
     */
    shouldRefresh() {
        // 如果列表尾部正在执行加载更多，如果当前正在下拉刷新返回false
        if (this.state.footerState === State.Loading ||
            this.state.refresh ||
            this.state.loadmore) {
            return false;
        }
        return true;
    }

    /***
     * 当前是否可以加载更多
     * @returns {boolean}
     */
    shouldLoadMore() {
        // 如果已经在加载更多，如果没有更多数据了，如果当前列表为空，如果在下拉刷新，如果在加载更多返回false
        if (this.state.footerState === State.Loading ||
            this.state.footerState === State.NoMoreData ||
            this.props.data.length === 0 ||
            this.state.refresh ||
            this.state.loadmore) {
            return false;
        }
        return true;
    }

    /**
     * 刷新完成
     * @param footerState
     *
     * 如果刷新完成，当前列表是空的，不显示尾部组件了。
     */
    endRefreshing(footerState: State) {
        let footerRefreshState = footerState;
        if (this.props.data.length === 0) {
            footerRefreshState = State.Idle;
        }
        this.setState({
            footerState: footerRefreshState,
            refresh: false,
            loadmore: false
        })
    }
}