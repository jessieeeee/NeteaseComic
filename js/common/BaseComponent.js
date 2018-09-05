/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 高阶组件基类- 处理界面公共逻辑
 */
import React, {Component} from 'react'
import {View} from 'react-native'
import {observer} from "mobx-react/native"
import NetUtil from "../util/NetUtil"
import Status from '../util/Status'
import DefaultDisplay from '../widget/DefaultDisplay'
@observer
export const BaseComponent = (WrapComponent) => {
    return class HOC extends Component {

        /**
         * 状态界面处理相关
         * @param url 请求地址
         * @param params 参数
         * @param statusManager 状态管理器
         * @param next 正常返回后的逻辑
         * @param err 错误逻辑
         * @param showLoading 是否显示加载中的界面（避免和下拉刷新冲突）
         */
        request(url, params, statusManager , next ,err ,showLoading) {
            if (showLoading){
                statusManager.setStatus(Status.Loading)
            }
            NetUtil.post(url, params, (result) => {
                // 如果设置了目标空数据的key
                if (statusManager.getTargetEmptyKey()) {
                    // 检查目标空数据是否为空
                    if (!result[statusManager.getTargetEmptyKey()]) {
                        statusManager.setStatus(Status.Empty)
                    } else {
                        statusManager.setStatus(Status.Normal)
                        next(result)
                    }
                } else {
                    // 如果没有结果数据
                    if (!result) {
                        statusManager.setStatus(Status.Empty)
                    } else {
                        statusManager.setStatus(Status.Normal)
                        next(result)
                    }
                }
            }, (error) => {
                if (showLoading){
                    statusManager.setStatus(Status.Error)
                }
                err(error)

            })
        }


        /**
         * 根据状态展示
         * @param statusManager
         * @returns {*}
         */
        displayStatus(statusManager){
            if (statusManager.Status === Status.Normal){
                console.log('显示正常界面')
               return null
            }
            console.log('显示异常界面')
            return (
                <DefaultDisplay status={statusManager.Status} onRetry={() => this.retryCallback() }/>
            )
        }

        /**
         * 重试
         */
        retryCallback(){
            if(this.component.retry){
                this.component.retry()
            }
        }

        render() {
            return (
                <View style={{flex: 1}}>
                    <WrapComponent ref={(ref) => {
                        this.component = ref
                    }} {...this.props} request={(url, params, statusManager, next ,err) => {
                        this.request(url, params, statusManager ,next, err)
                    }} displayStatus={(statusManager) => {return this.displayStatus(statusManager)}}
                    />
                </View>
            )
        }

    }
}

