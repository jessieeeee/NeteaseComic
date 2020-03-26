/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 评论信息
 */
import React, {Component} from 'react'
import {Text, View, FlatList,Image, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import CommonStyle from "../common/CommonStyle"
import MineStyle from "../mine/Style"

class ComicComment extends Component<Props> {

    static propTypes = {
        data: PropTypes.object, // 数据源
    }

    static defaultProps = {
        data: null,
    }

    render() {
        return (
            <View style={CommonStyle.styles.detailView}>
                <FlatList ref={(ref) => {
                    this.listView = ref
                }}
                          data={this.props.data}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          renderItem={({item,index}) => (
                              <TouchableOpacity style={CommonStyle.styles.commentView} onPress={() => {
                                  if (this.props.onClick) {
                                      this.props.onClick(item,index)
                                  }
                              }}>
                                  <View style={CommonStyle.styles.userHeader}>
                                      <Image source={this.props.itemIcon} style={MineStyle.styles.itemIcon}/>
                                      <Text style={MineStyle.styles.itemText}>{this.props.itemText}</Text>
                                  </View>

                                  <Text style={CommonStyle.styles.introText}>
                                      这是内容
                                  </Text>
                              </TouchableOpacity>
                          )}
                          keyExtractor={item => item.link}
                          style={CommonStyle.styles.detailListView}
                />
            </View>
        )
    }
}

export default ComicComment