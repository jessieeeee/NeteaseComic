/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 详情顶部
 */
import React, {Component} from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import CommonStyle from "./CommonStyle"
import PropTypes from 'prop-types'
let icBack = require('../img/ic_back.png')
let icFollow = require('../img/ic_follow.png')
let icUnFollow = require('../img/ic_unfollow.png')
class DetailHeader extends Component<Props> {
    static propTypes = {
        onBack: PropTypes.func, // 返回回调,
        onFollow: PropTypes.func, // 收藏回调
        follow: PropTypes.bool
    }

    static defaultProps = {
        follow: false //默认不收藏
    }

    render(){
        return (
            <View style={CommonStyle.styles.detailHeader}>
                <TouchableOpacity style={CommonStyle.styles.headerIconLeftView}
                                  onPress={() => {
                                      if(this.props.onBack){
                                          this.props.onBack()
                                      }
                                  }}>
                    <Image source={icBack} style={CommonStyle.styles.headerIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={CommonStyle.styles.headerIconRightView}
                                  onPress={() => {
                                     if(this.props.onFollow){
                                         this.props.onFollow()
                                     }
                                  }}>
                    <Image source={this.props.follow ? icFollow : icUnFollow} style={CommonStyle.styles.headerIcon}/>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DetailHeader