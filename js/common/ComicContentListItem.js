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
        refCallback: PropTypes.func, //实例回调
        onRefresh: PropTypes.func.isRequired, //刷新回调
    }

    constructor(props){
        super(props)
        this.state = {
            data: [],
            statusManager: null
        }
    }

    componentDidMount(){
        this.isMount = true
        // 暴露this给父组件
        this.props.refCallback(this)
    }

    componentWillUnmount(){
        this.isMount = false
    }
    /**
     * 刷新数据
     * @param Data
     */
    update(Data){
        if(this.isMount){
            this.setState({
                data: Data
            })
        }
    }


    render(){
        return(

            <PullFlatList
                data={this.state.data.data}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.space}
                renderItem={({item, index}) => (
                    <ComicImg imgUrl={item} index={index}/>
                )}
                keyExtractor={item => item}
                numColumns={1}
                onPullRelease={this.props.onRefresh}
                style={[CommonStyle.styles.listView,{width: Config.screenW,height:Config.screenH}]}
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