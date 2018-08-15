/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :列表尾部加载更多视图
 */
import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import FooterState from './FooterState';
import PropTypes from 'prop-types';

export default class Footer extends Component {

    static propTypes = {
        onLoadMore: PropTypes.func,     // 加载更多回调
        onRetryLoading: PropTypes.func, // 重新加载回调
    };

    /**
     * 文字提示
     * @type {{footerRefreshingText: string, footerLoadMoreText: string, footerFailureText: string, footerNoMoreDataText: string}}
     */
    static defaultProps = {
        footerRefreshingText: "努力加载中",
        footerLoadMoreText: "上拉加载更多",
        footerFailureText: "点击重新加载",
        footerNoMoreDataText: "已全部加载完毕"
    };

    /**
     * 根据加载更多状态展示
     * @returns {*}
     */
    render() {
        let {state} = this.props;
        let footer = null;
        switch (state) {
            case FooterState.Idle:
                // 不显示尾部组件
                break;
            case FooterState.Loading:
                footer =
                    <View style={styles.loadingView}>
                        <ActivityIndicator size="small"/>
                        <Text style={styles.refreshingText}>{this.props.footerRefreshingText}</Text>
                    </View>;
                break;
            case FooterState.CanLoadMore:
                footer =
                    <View style={styles.loadingView}>
                        <Text style={styles.footerText}>{this.props.footerLoadMoreText}</Text>
                    </View>;
                break;
            case FooterState.NoMoreData:
                footer =
                    <View style={styles.loadingView}>
                        <Text style={styles.footerText}>{this.props.footerNoMoreDataText}</Text>
                    </View>;
                break;
            case FooterState.Failure:
                footer =
                    <TouchableOpacity style={styles.loadingView} onPress={()=>{
                        this.props.onRetryLoading && this.props.onRetryLoading();
                    }}>
                        <Text style={styles.footerText}>{this.props.footerFailureText}</Text>
                    </TouchableOpacity>;
                break;
        }
        return footer;
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    refreshingText: {
        fontSize: 12,
        color: "#666666",
        paddingLeft: 10,
    },
    footerText: {
        fontSize: 12,
        color: "#666666"
    }
});