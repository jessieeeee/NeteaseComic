/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 返回顶部和底部按钮
 */
import React, {Component} from 'react'
import {Image, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import CommonStyle from '../common/CommonStyle'
let icListDown = require('../img/ic_list_down.png')
let icListUp = require('../img/ic_list_up.png')


class ControlBtn extends Component<Props>{
    static States = {
        Down: 1,　//向上滑动
        Up: 2,　　//向下滑动
        Default: 0　//默认不展示
    }

    static propTypes = {
        btnState: PropTypes.number, // 展示状态,
        callback: PropTypes.func, //触发回调
    }

    static defaultProps = {
        btnState: ControlBtn.States.Default, // 默认不显示
    }

   render(){
       return (
           <TouchableOpacity style={CommonStyle.styles.controlBtnView} onPress={() => {
               if(this.props.callback) {
                   this.props.callback()
               }
           }}>
               <Image source={this.getCurSource()} style={CommonStyle.styles.controlBtn}/>
           </TouchableOpacity>
       )
   }

   getCurSource(){
        switch (this.props.btnState){
            case ControlBtn.States.Down:
                return icListUp
            case ControlBtn.States.Up:
                return icListDown
        }
   }
}
export default ControlBtn