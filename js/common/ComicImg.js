/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 漫画图片
 */
import React, {Component} from 'react'
import {Image, View, Text} from 'react-native'
import Config from '../constant/Config'
import PropTypes from 'prop-types'
import CommonStyle from './CommonStyle'
class ComicImg extends Component<Props> {

    static propTypes = {
        imgUrl: PropTypes.string.isRequired, // 数据源,
    }

    static defaultProps = {
        imgUrl: '', // 默认数据源为空
    }

    constructor(props){
        super(props)

        this.state = {
            originalW: 0
        }

    }
    componentWillMount() {
        this.meaureImg()
    }

    render() {
        return (

            this.state.originalW ?
                <Image source={{uri: this.props.imgUrl}} style={{width: Config.sreenW, height: this.getHeight()}}/> :
                <View style={CommonStyle.styles.imgPlaceholder}>
                   <Text style={CommonStyle.styles.imgPlaceholderText}>
                       {this.props.index}
                   </Text>
                </View>
        )
    }

    meaureImg() {
        Image.getSize(this.props.imgUrl, (width, height) => {
            this.setState({
                    originalW: width,
                    originalH: height
                }
            );
        });
    }

    //按图片宽度缩放
    getHeight() {
        let ratio = Config.sreenW / this.state.originalW
        return this.state.originalH * ratio
    }
}

export default ComicImg