/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 详情信息
 */
import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import ExpandableText from '../widget/ExpandableText'
import CommonStyle from "../common/CommonStyle"
import TencentStyle from './Style'

class DetailInfo extends Component<Props> {
    static propTypes = {
        data: PropTypes.object, // 数据源,
    }

    static defaultProps = {
        data: null,
    }

    render() {
        return (
            <View style={CommonStyle.styles.detailView}>
                <View style={CommonStyle.styles.infoView}>
                    <Image source={{uri: this.props.data.cover}} style={CommonStyle.styles.infoCover}/>
                    <View style={CommonStyle.styles.infoRightView}>
                        <View style={CommonStyle.styles.infoTextView}>
                            <View style={TencentStyle.styles.detailRowView}>
                                <Text numberOfLines={1}
                                      style={CommonStyle.styles.titleText}>{this.props.data.title}</Text>
                                <Text numberOfLines={1} style={TencentStyle.styles.score}>{this.props.data.score}</Text>
                            </View>
                            <Text numberOfLines={1}
                                  style={CommonStyle.styles.firstSubText}>{this.props.data.tags}</Text>
                            <Text numberOfLines={1}
                                  style={CommonStyle.styles.subText}>{this.props.data.author}</Text>
                            <View style={TencentStyle.styles.detailRowView}>
                                <Text style={CommonStyle.styles.subText}>人气：</Text>
                                <Text numberOfLines={1}
                                      style={[CommonStyle.styles.subText,{color:'yellow'}]}>{this.props.data.hot}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{position: 'absolute', bottom: 0,}} onPress={() => {
                            console.log('点击了')
                        }}>
                            <Text style={CommonStyle.styles.readText}>观看第一话</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ExpandableText numberOfLines={2} expandTextStyle={CommonStyle.styles.expandText}
                                style={CommonStyle.styles.introText}>{this.props.data.summary}</ExpandableText>

            </View>
        )
    }

}

export default DetailInfo