/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 收藏漫画单个item
 */
import React, {Component} from 'react'
import {Text, View, Image,TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import NavigationService from '../navigator/NavigationService'
import NeteaseStyle from './Style'

class FollowComicItem extends Component<Props> {

    static propTypes = {
        data: PropTypes.object.isRequired, // 数据源,
        size: PropTypes.number, // 大小
    }

    static defaultProps = {
        data: null, // 默认数据源为空
        size: 40, // 默认大小
    }

    render() {
        return (
            <View style={{width: this.props.size * 0.9, height: this.props.size * 0.4}}>
                <TouchableOpacity style={NeteaseStyle.styles.itemView} onPress={() => {
                    NavigationService.navigate('NeteaseDetail',{link:this.props.data.link})
                }}>
                    <Image source={{uri: this.props.data.cover}} style={{
                        width: this.props.size * 0.4,
                        height: this.props.size * 0.5
                    }}/>
                    <Text numberOfLines={1} style={NeteaseStyle.styles.title}>{this.props.data.title}</Text>
                    <Text numberOfLines={1} style={NeteaseStyle.styles.chapter}>{'最新:' + this.props.data.chapter}</Text>
                    <Text numberOfLines={1} style={NeteaseStyle.styles.clickNum}>{this.props.data.clickNum}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default FollowComicItem
