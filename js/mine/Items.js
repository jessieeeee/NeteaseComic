/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 我的界面设置项
 */
import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import MineStyle from './Style'
import PropTypes from 'prop-types'
let ic_arrow_right = require('../img/icon_arrow_right.png')

class Items extends Component<Props> {
    static propTypes = {
        onClick: PropTypes.func, // 数据源,
        itemIcon: PropTypes.number, // 图标
        itemText: PropTypes.string.isRequired, // 文字
    }

    static defaultProps = {
        itemIcon: 0, // 默认为空
        itemText: '', // 默认大小
    }

    render() {
        return (
            <TouchableOpacity style={MineStyle.styles.itemView} onPress={() => {
                if (this.props.onClick){
                    this.props.onClick()
                }
            }}>
                <View style={MineStyle.styles.leftView}>
                    <Image source={this.props.itemIcon} style={MineStyle.styles.itemIcon}/>
                    <Text style={MineStyle.styles.itemText}>{this.props.itemText}</Text>
                </View>
                <Image source={ic_arrow_right} style={MineStyle.styles.itemArrow}/>
            </TouchableOpacity>
        )
    }
}

export default Items
