/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 可展开显示更多的文本框
 */
import React,{Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
class ExpandableText extends Component<Props> {
    static propTypes = {
        style: Text.propTypes.style,
        expandTextStyle:Text.propTypes.style,
        numberOfLines: PropTypes.number
    }

    constructor(props){
        super(props);
        this.state = {
            expanded:true, // 文本是否展开
            numberOfLines:null,
            showExpandText:false,// 展开收起文字是否处于显示状态
            expandText:'展开',
            measureFlag:true //是否处于测量阶段
        }
        this.numberOfLines = props.numberOfLines
        this.measureFlag = true
    }

    onTextLayout(event){
        if(this.measureFlag){
            if(this.state.expanded){
                this.maxHeight = event.nativeEvent.layout.height;
                this.setState({expanded:false,numberOfLines:this.numberOfLines});
            }else{
                this.minHeight = event.nativeEvent.layout.height;
                if(this.minHeight !== this.maxHeight){
                    this.setState({showExpandText:true})
                }
                this.measureFlag = false
            }
        }

    }

    /**
     * 文本点击回调
     */
    onPressExpand(){
        // 如果当前没有展开
        if(!this.state.expanded){
            //　展开后显示收起
            this.setState({numberOfLines:null,expandText:'收起',expanded:true})
        }else{
            //　收起后显示展开
            this.setState({numberOfLines:this.numberOfLines,expandText:'展开',expanded:false})
        }
    }

    render() {
        const { numberOfLines, onLayout, expandTextStyle, ...rest } = this.props;
        let expandText = this.state.showExpandText?(
            <Text
                style={[styles.expandText,expandTextStyle]}
                onPress={this.onPressExpand.bind(this)}>
                {this.state.expandText}</Text>
        ) : null
        return (
            <View>
                <Text
                    numberOfLines={this.state.numberOfLines}
                    onLayout={this.onTextLayout.bind(this)}
                    {...rest}
                >
                    {this.props.children}
                </Text>
                {expandText}
            </View>
        );
    }

}


const styles = StyleSheet.create({
    expandText: {
        color:'blue',
        marginTop:0
    }
})

export default ExpandableText