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
        imgUrl: PropTypes.string.isRequired,
        imgWidth: PropTypes.number,
        imgHeight: PropTypes.number
    }

    static defaultProps = {
        imgUrl: '', // 默认数据源为空
    }

    componentWillMount() {
        this.unmount = false
        // this.meaureImg()
        console.log('当前item' + JSON.stringify(this.props.imgWidth))
    }

    componentWillUnmount(){
        this.unmount = true
    }
    render() {
        return (
                <Image source={{uri: this.props.imgUrl}} style={{width: Config.screenW, height: this.getHeight()}}/>
                // {/*<View style={CommonStyle.styles.imgPlaceholder}>*/}
                //    {/*<Text style={CommonStyle.styles.imgPlaceholderText}>*/}
                //        {/*{this.props.index}*/}
                //    {/*</Text>*/}
                // {/*</View>*/}
        )
    }

    meaureImg() {
        Image.getSize(this.props.imgUrl, (width, height) => {
           if (!this.unmount){
               this.setState({
                       originalW: width,
                       originalH: height
                   }
               );
           }
        },(error) => {
            console.log('获取宽高错误'+error)
        });
    }

    //按图片宽度缩放
    getHeight() {
        let ratio = Config.screenW / this.props.imgWidth
        return this.props.imgHeight * ratio
    }
}

export default ComicImg