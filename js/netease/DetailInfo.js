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
                            <Text numberOfLines={1}
                                  style={CommonStyle.styles.titleText}>{this.props.data.title}</Text>
                            <Text numberOfLines={1}
                                  style={CommonStyle.styles.firstSubText}>{'作者：' + this.props.data.author}</Text>
                            <Text numberOfLines={1}
                                  style={CommonStyle.styles.subText}>{'类别：' + this.props.data.category}</Text>
                        </View>
                        <TouchableOpacity style={{position: 'absolute', bottom: 0,}} onPress={() => {
                            console.log('点击了')
                        }}>
                            <Text style={CommonStyle.styles.readText}>观看第一话</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ExpandableText numberOfLines={2} expandTextStyle={CommonStyle.styles.expandText}
                                style={CommonStyle.styles.introText}>{this.props.data.intro}</ExpandableText>

            </View>
        )
    }
}

export default DetailInfo