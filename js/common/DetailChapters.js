/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 详情章节
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, FlatList, Text} from 'react-native'
import PropTypes from 'prop-types'
import CommonStyle from "./CommonStyle"

class DetailChapters extends Component<Props> {

    static propTypes = {
        data: PropTypes.object, // 数据源,
        onClick: PropTypes.func, //　点击回调
        onMore: PropTypes.func, // 更多回调
        loadMore: PropTypes.bool, //加载更多按钮显示
        refresh: PropTypes.bool, // 是否刷新
        state: PropTypes.object, //父组件state状态
    }

    static defaultProps = {
        data: null,
        loadMore: false,
        refresh: false
    }

    render() {
        // console.log('刷新了'+this.props.data.length)
        return (
            <View style={CommonStyle.styles.chapterViews}>
                <Text style={CommonStyle.styles.chapterTitle}>目录</Text>
                {this.props.data.state || this.props.data.updateTime ?
                    <View style={CommonStyle.styles.chapterHeadView}>
                        <Text style={CommonStyle.styles.stateView}>{this.props.data.state}</Text>
                        <Text style={CommonStyle.styles.updateView}>{this.props.data.updateTime}</Text>
                    </View> : null
                }

                <FlatList ref={(ref) => {
                    this.listView = ref
                }}
                          data={this.props.data.data}
                          refreshing={this.props.refresh}
                          onRefresh={this.onRefresh}
                          showsVerticalScrollIndicator={false}
                          extraData={this.props.state}
                          renderItem={({item,index}) => (
                              <TouchableOpacity onPress={() => {
                                  if (this.props.onClick) {
                                      this.props.onClick(item,index)
                                  }
                              }}>
                                  <Text style={CommonStyle.styles.chapterDetailText}>
                                      {item.order}
                                  </Text>
                              </TouchableOpacity>
                          )}
                          keyExtractor={item => item.link}
                          numColumns={4}
                          style={CommonStyle.styles.detailListView}
                />

                {this.props.loadMore ?
                    <TouchableOpacity style={CommonStyle.styles.moreTextView} onPress={() => {
                        if (this.props.onMore) {
                            this.props.onMore()
                        }
                    }}>
                        <Text style={CommonStyle.styles.moreText}>戳我看更多目录(￣▽￣)</Text>
                    </TouchableOpacity>
                    : null}
            </View>
        )
    }

    onRefresh = () => {

    }
}

export default DetailChapters