/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 漫画内容页-水平方向上单个item
 */
import React, {Component} from 'react'
import {View} from 'react-native'
import Config from "../constant/Config"
import CommonStyle from "./CommonStyle"
import PullFlatList from '../widget/PullFlatList'
import ComicImg from './ComicImg'
import PropTypes from 'prop-types'
class ComicContentListItem extends Component{
    static propTypes = {
        onRefresh: PropTypes.func.isRequired, //刷新回调
        data :PropTypes.object.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        loadingState: PropTypes.number.isRequired
    }

    render(){
        console.log('content --->' + JSON.stringify(this.props.data))
        return(

            <PullFlatList
                data={this.props.data.data}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.space}
                renderItem={({item, index}) => (
                    <ComicImg imgUrl={item} imgWidth = {this.props.data.imgWidth} imgHeight = {this.props.data.imgHeight} index={index}/>
                )}
                keyExtractor={item => item}
                numColumns={1}
                onPullRelease={this.props.onRefresh}
                style={[CommonStyle.styles.listView,{width: Config.screenW,height:Config.screenH}]}
                onLoadMore={() => this.props.onLoadMore && this.props.onLoadMore()}
                loadMoreState={this.props.loadingState}
            />

        )
    }

    /**
     * 分割线
     * @returns {*}
     */
    space() {
        return (<View style={CommonStyle.styles.divider}/>)
    }
}
export default ComicContentListItem