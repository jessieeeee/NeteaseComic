/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 浏览漫画图片列表
 */
import React, {Component} from 'react'
import CommonStyle from "./CommonStyle"
import PropTypes from 'prop-types'
import ComicContentListItem from './ComicContentListItem'
import {View, ScrollView, TouchableOpacity, Text} from 'react-native'
import Config from '../constant/Config'

class ComicContentList extends Component<props> {
    static propTypes = {
        page: PropTypes.number, //当前的页数
        count: PropTypes.number, // 总页数
        backward: PropTypes.func.isRequired, //向后翻页
        forward: PropTypes.func.isRequired, //向前翻页
        onRefresh: PropTypes.func.isRequired,
    }

    static defaultProps = {
        page: 0,
        count: 0
    }

    constructor(props) {
        super(props)
        // 重置数据
        this.reset()
        this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this)
    }

    reset(){
        this.itemPageArr = []
        this.leftIndex = this.props.page
        this.rightIndex = this.props.page
        this.curPage = this.props.page
        this.state = {
            data: []
        }
    }


    renderEmpty(key) {
        return (
            <View key={key} style={CommonStyle.styles.emptyView}>
            </View>
        )
    }


    renderPage(data,key) {

        return (
            <ComicContentListItem
                key={key}
                data={data}
                onRefresh={this.props.onRefresh}
                />
        )
    }


    initPage(Data) {
        this.reset()
        // 清空重置
        this.itemPageArr.splice(0,this.itemPageArr.length)
        // 添加内容界面
        this.itemPageArr.push(
            this.renderPage(Data, this.props.page)
        )
        if (this.rightIndex + 1 <= this.props.count) {
            this.rightIndex ++
            this.addEmptyView(true)
        }
        if (this.leftIndex - 1 >= 0) {
            this.leftIndex --
            this.addEmptyView(false)
            setTimeout( () => this.content.scrollTo({x: Config.screenW,animation:false}),100)
        } else {
            setTimeout( () => this.content.scrollTo({x: 0,animation:false}),100)
        }

        this.setState({})
    }

    // 添加内容页面
    addPage(end, Data) {
        let key = end ? this.rightIndex : this.leftIndex
        if (end) {
            console.log('添加右边内容')
            // 把空白界面删除
            this.itemPageArr.pop()
            // 添加内容界面
            this.itemPageArr.push(this.renderPage(Data, key))
            // 添加下一个空界面并刷新
            this.addRight()
        }
        else {
            console.log('添加左边内容')
            // 把空白界面删除
            this.itemPageArr.shift()
            // 添加内容界面
            this.itemPageArr.unshift(this.renderPage(Data, key))
            // 添加下一个空界面并刷新
            this.addLeft()
        }
    }

    /**
     * 添加右边界面
     */
    addRight() {
        if (this.rightIndex + 1 <= this.props.count) {
            this.rightIndex ++
            this.addEmptyView(true)
            setTimeout( () => this.content.scrollTo({x: Config.screenW * (this.itemPageArr.length - 2), animation:false}),100)
            console.log('添加了右边空白页' + this.rightIndex)
        }else{
            setTimeout( () => this.content.scrollTo({x: Config.screenW * (this.itemPageArr.length - 1), animation:false}),100)

        }
    }

    /**
     * 添加左边界面
     */
    addLeft() {
        console.log('count',this.props.count)
        console.log('leftIndex',this.leftIndex)
        if (this.leftIndex - 1 >= 0) {
            this.leftIndex --
            this.addEmptyView(false)
            setTimeout( () => this.content.scrollTo({x: Config.screenW, animation:false}),100)
            console.log('添加了左边空白页' + this.leftIndex)
        }else{
            setTimeout( () => this.content.scrollTo({x: 0, animation:false}),100)
        }


    }

    /**
     * 添加空白界面到最后或者最前
     */
    addEmptyView(end) {
        if (end) {
            console.log('添加右边空白页')
        } else {
            console.log('添加左边空白页')
        }
        let key = end ? this.rightIndex : this.leftIndex
        if (end) {
            // 插入到最后一个元素
            this.itemPageArr.push(this.renderEmpty(key))
        } else {
            // 插入到第一个元素
            this.itemPageArr.unshift(this.renderEmpty(key))
        }

    }

    render() {
        return (
            <ScrollView
                ref={(c) => {this.content = c}}
                style={{flex: 1, width: Config.screenW, height: Config.screenH}}
                horizontal={true}
                pagingEnabled={true}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={this.onMomentumScrollEnd}>
                {/*渲染分页*/}
                {this.itemPageArr}


            </ScrollView>

        )
    }

    /**
     * 滚动回调
     * @private
     */
    onMomentumScrollEnd(e) {
        //水平方向偏移量
        let offset = e.nativeEvent.contentOffset.x
        console.log(':' + offset + '宽度' + Config.screenW)
        //当前页数
        let currentPage = Math.round(offset / Config.screenW)
        console.log(':' + currentPage + '上次页数' + this.curPage)
        //往后翻
        if (currentPage > this.curPage) {
            console.log('向右滑动' + 'rightIndex:' +this.rightIndex + 'page:' + this.props.page + 'currentPage:' + currentPage)
            // 如果当前页数大于右边缓存页数
            if(currentPage >= this.rightIndex && this.props.page !== currentPage) {
                console.log('向右滑动有效')
                this.props.backward && this.props.backward(currentPage)
            }
        }
        else if (currentPage < this.curPage) {
            console.log('向左滑动' + 'leftIndex:' +this.leftIndex + 'page:' + this.props.page + 'currentPage:' + currentPage)
            // 如果当前页数小于左边缓存页数
            if(currentPage <= this.leftIndex && this.props.page !== currentPage){
                console.log('向左滑动有效')
                this.props.forward && this.props.forward(currentPage)
            }
        }
        this.curPage = currentPage
    }


}

export default ComicContentList