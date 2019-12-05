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
import Config from "../constant/Config"
import TencentStyle from "../tencent/Style"

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
        console.log('渲染item'+'宽度'+this.props.size + JSON.stringify(this.props.data))
        return (
            <TouchableOpacity style={{width: this.props.size * 0.9, height: this.props.size * 0.5,alignItems:'center',flexDirection:'row'}} onPress={() => {
                NavigationService.navigate('NeteaseDetail',{link:this.props.data.link})
            }}>
                    <Image source={{uri: this.props.data.cover}} style={{
                        width: this.props.size * 0.3,
                        height: this.props.size * 0.42
                    }}/>
                    <View style={{marginLeft: Config.screenW * 0.1,alignItems:'center',justifyContent:'center'}}>
                    <Text numberOfLines={1} style={TencentStyle.styles.title}>{this.props.data.title}</Text>
                    <Text numberOfLines={1} style={TencentStyle.styles.author}>{this.props.data.author}</Text>
                    <Text numberOfLines={1} style={TencentStyle.styles.category}>{this.props.data.category}</Text>
                    </View>

            </TouchableOpacity>
        )
    }
}


export default FollowComicItem
