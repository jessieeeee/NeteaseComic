/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 网易漫画单个item
 */
import React, {Component} from 'react'
import {Text, View, Image} from 'react-native'
import PropTypes from 'prop-types'
import NeteaseStyle from './Style'

class ComicItem extends Component<Props> {

    static propTypes = {
        data: PropTypes.object.isRequired, // 数据源,
        size: PropTypes.number, // 大小
    };

    static defaultProps = {
        data: null, // 默认数据源为空
        size: 40, // 默认大小
    }

    render() {
        return (
            <View style={{width: this.props.size*0.97, height: this.props.size * 1.8}}>
                <View style={NeteaseStyle.styles.itemView}>
                    <Image source={{uri: this.props.data.cover}} style={{
                        width: this.props.size*0.97,
                        height: this.props.size*1.3
                    }}/>
                    <Text style={NeteaseStyle.styles.title}>{this.props.data.title}</Text>
                    <Text style={NeteaseStyle.styles.chapter}>{this.props.data.chapter}</Text>
                    <Text style={NeteaseStyle.styles.clickNum}>{this.props.data.clickNum}</Text>
                </View>
            </View>
        )
    }
}


export default ComicItem
