/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :腾讯漫画单个item
 */
import React, {Component} from 'react'
import {Text, View, Image} from 'react-native'
import PropTypes from 'prop-types'
import TencentStyle from './Style'
import Config from "../constant/Config"

class ComicItem extends Component<Props> {

    static propTypes = {
        data: PropTypes.object.isRequired, // 数据源,
    };

    static defaultProps = {
        data: null, // 默认数据源为空
    }

    render() {
        return (
            <View style={{width: Config.sreenW, height: Config.sreenW * 0.4}}>
                <View style={TencentStyle.styles.itemView}>
                    <Image source={{uri: this.props.data.cover}} style={{
                        width: Config.sreenW * 0.26,
                        height: Config.sreenW * 0.4
                    }}/>
                    <View style={TencentStyle.styles.textView}>
                        <View style={TencentStyle.styles.titleView}>
                            <Text style={TencentStyle.styles.title}>{this.props.data.title}</Text>
                            {this.renderLabelViews(this.props.data.labels)}
                        </View>
                        <Text style={TencentStyle.styles.chapter}>{this.props.data.author}</Text>
                        <Text style={TencentStyle.styles.clickNum}>{this.props.data.clickNum}</Text>
                        <Text style={TencentStyle.styles.category}>{this.getCategory(this.props.data.categorys)}</Text>
                        <Text style={TencentStyle.styles.intro}>{this.props.data.intro}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderLabelViews(labels) {
        let labelViews = []
        labels.forEach(function (value, index) {
            let bgColor = Config.orange
            switch (value){
                case '签约':
                    bgColor = Config.lightBlue
                    break
                case '精品':
                    bgColor = Config.orange
                    break
                case '独家':
                    bgColor = Config.greenBlue
                    break
                case '热门':
                    bgColor = Config.hotRed
                    break
            }

            labelViews.push(
                <Text key={index} style={[TencentStyle.styles.labelView,{backgroundColor:bgColor}]}>{value}</Text>
            )
        });
        return labelViews
    }

    getCategory(categorys) {
        let str = ''
        categorys.forEach(function (value, index) {
            str += value + '  '
        });
        return '类别：' + str
    }
}


export default ComicItem