/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :　主界面分页导航注册
 */
import {Image} from 'react-native';
import {
    createBottomTabNavigator,
} from 'react-navigation'
import NeteasePage from '../netease/NeteasePage'
import TencentPage from '../tencent/TencentPage'
import Mine from '../mine/Mine'
import CommonStyle from '../constant/CommonStyle'
import React,{Component} from "react"

/**
 * 底部图标资源加载
 */
let tabBarNeteaseSelected=require('../img/icon_tab_netease1.png')
let tabBarNeteaseUnselected=require('../img/icon_tab_netease2.png')
let tabBarTencentSelected=require('../img/icon_tab_tencent1.png')
let tabBarTencentUnselected=require('../img/icon_tab_tencent2.png')
let tabBarMineSelected=require('../img/icon_tab_mine1.png')
let tabBarMineUnselected=require('../img/icon_tab_mine2.png')

class TabBarItem extends Component<Props> {
    render(){
        return(
            <Image
                source={this.props.focused ? this.props.selectedIcon : this.props.unSelectedIcon}
                style={CommonStyle.styles.tabBarImage}
            />
        )
    }
}
const TabRouteConfigs = {
    Home: {
        screen: NeteasePage,
        navigationOptions: ({navigation}) => ({
            header:null,
            tabBarLabel: '网易',
            tabBarIcon:(({tintColor,focused}) => {
                return(
                    <TabBarItem focused={focused} selectedIcon={tabBarNeteaseSelected} unSelectedIcon={tabBarNeteaseUnselected}/>
                )
            }),
        }),
    },
    NearBy: {
        screen: TencentPage,
        navigationOptions: {
            header:null,
            tabBarLabel: '腾讯',
            tabBarIcon:(({tintColor,focused}) => {
                return(
                    <TabBarItem focused={focused} selectedIcon={tabBarTencentSelected} unSelectedIcon={tabBarTencentUnselected}/>
                )
            }),
        },
    }
    ,
    Mine: {
        screen: Mine,
        navigationOptions: {
            header:null,
            tabBarLabel: '我的',
            tabBarIcon:(({tintColor,focused}) => {
                return(
                    <TabBarItem focused={focused} selectedIcon={tabBarMineSelected} unSelectedIcon={tabBarMineUnselected}/>
                )
            }),
        },
    }
};
const TabNavigatorConfigs = {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled:false, // 是否允许在标签之间进行滑动。
    tabBarOptions:{
        style:{
            backgroundColor:'#ffffff'
        },
        activeTintColor:'#fb887d', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor:'#666666', // label和icon的前景色 不活跃状态下(未选中)。
        labelStyle:{
            fontSize: 12,
        }, //label的样式。
    }
};
const Tab = createBottomTabNavigator(TabRouteConfigs, TabNavigatorConfigs);

export default Tab