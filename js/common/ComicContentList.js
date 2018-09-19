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
        this.itemPageArr = []
        this.items = [] // 内容界面数组
        this.leftIndex = 0 //左边下标
        this.rightIndex = 0 //右边下标
        this.curPage = 0 //当前页数
        this.state = {
            data: []
        }
        this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this)
    }

    componentDidMount() {
        this.leftIndex = this.props.page
        this.rightIndex = this.props.page
    }

    renderEmpty(key) {
        return (
            <View key={key} style={CommonStyle.styles.emptyView}>
            </View>
        )
    }


    /**
     * 刷新当页数据
     * @param Data
     * @param end 是否是最后一个
     */
    updatePage(end, Data) {
        this.setState({})
        if(end){
            this.items[this.items.length -1].update(Data)
            setTimeout( () => this.content.scrollTo({x: Config.screenW * (this.itemPageArr.length-2),animation:false}),100)
        }
        else{
            this.items[0].update(Data)
            setTimeout( () => this.content.scrollTo({x: Config.screenW,animation:false}),100)
        }
        this.setState({})

    }

    renderPage(end,key) {

        return (
            <ComicContentListItem
                key={key}
                onRefresh={this.props.onRefresh}
                refCallback={(ref) => {
                    if (end) {
                        this.items.push(ref)
                    }
                    else {
                        this.items.unshift(ref)
                    }
                }}/>
        )
    }


    initPage(Data) {
        // 清空重置
        this.itemPageArr.splice(0,this.itemPageArr.length)
        // 添加内容界面
        this.itemPageArr.push(
            this.renderPage(true, this.props.page)
        )
        this.addRight(Data)
        this.addLeft(Data)

    }

    // 添加内容页面
    addPage(end, Data) {
        let key = end ? this.rightIndex : this.leftIndex
        if (end) {
            console.log('添加右边内容')
            // 把空白界面删除
            this.itemPageArr.pop()
            // 添加内容界面
            this.itemPageArr.push(this.renderPage(end, key))
            this.addRight(Data)
        }
        else {
            console.log('添加左边内容')
            // 把空白界面删除
            this.itemPageArr.shift()
            // 添加内容界面
            this.itemPageArr.unshift(this.renderPage(end, key))
            this.addLeft(Data)
        }
    }

    /**
     * 添加右边界面
     */
    addRight(Data) {
        console.log('count',this.props.count)
        console.log('rightIndex',this.rightIndex)
        if (this.rightIndex + 1 <= this.props.count) {
            this.rightIndex ++
            this.addEmptyView(true)
            this.updatePage(true, Data)
        }
    }

    /**
     * 添加左边界面
     */
    addLeft(Data) {
        console.log('count',this.props.count)
        console.log('leftIndex',this.leftIndex)
        if (this.leftIndex - 1 >= 0) {
            this.leftIndex --
            this.addEmptyView(false)
            this.updatePage(false,Data)
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

        //往后翻
        if (currentPage > this.curPage) {
            // 如果当前页数大于右边缓存页数
            if(currentPage >= this.rightIndex && this.props.page !== currentPage) {
                this.props.backward && this.props.backward(currentPage)
            }
        }
        else if (currentPage < this.curPage) {
            // 如果当前页数小于左边缓存页数
            if(currentPage <= this.leftIndex && this.props.page !== currentPage){
                this.props.forward && this.props.forward(currentPage)
            }
        }
        this.curPage = currentPage
    }


}

export default ComicContentList