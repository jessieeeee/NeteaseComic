/**
 * @date : 8/13/18
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :网易漫画首页
 */

import React, {Component} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import Config from '../constant/Config'
import CommonStyle from '../constant/CommonStyle'
import NetUtil from '../util/NetUtil'
import ServerApi from '../constant/ServerApi'
import CommicItem from './ComicItem'
import FlatListView from '../widget/FlatListView'

let numColumns = 3 // 3列
let cellW = Config.sreenW / numColumns // 单个item的宽度

class NeteasePage extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        NetUtil.get(ServerApi.netease.getComic, null, (result) => {
            this.setState({
                data: result
            })
        }, (error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={CommonStyle.styles.container}>
                {this.state.data == null ?
                    null :
                    <FlatListView data={this.state.data}
                                  renderItem={({item}) => (
                                      <CommicItem size={cellW} data={item}/>
                                  )}
                                  keyExtractor={item => item.id}
                                  numColumns={numColumns}
                                  renderRefresh={}
                                  renderLoadMore={}
                    />}
            </View>
        )
    }

    renderRefresh(){

    }

    renderLoadMore(){

    }
}


export default NeteasePage