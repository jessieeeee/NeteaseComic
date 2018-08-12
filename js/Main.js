/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 主界面
 */
import React,{Component} from 'react'
import {
    createBottomTabNavigator,
} from 'react-navigation'
import NeteasePage from './netease/NeteasePage'
import TencentPage from './tencent/TencentPage'
import Mine from './mine/Mine'
class Main extends Component<Props> {
   render(){
       return (
           <Tab/>
       )
   }
}
const TabRouteConfigs = {
    Home: {
        screen: NeteasePage,
        navigationOptions: ({navigation}) => ({
            header:null,
            tabBarLabel: '网易',

        }),
    },
    NearBy: {
        screen: TencentPage,
        navigationOptions: {
            header:null,
            tabBarLabel: '腾讯',

        },
    }
    ,
    Mine: {
        screen: Mine,
        navigationOptions: {
            header:null,
            tabBarLabel: '我的',

        },
    }
};
const TabNavigatorConfigs = {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled:false, // 是否允许在标签之间进行滑动。
    tabBarOptions:{
        activeTintColor:'#d81e06', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor:'#515151', // label和icon的前景色 不活跃状态下(未选中)。
        labelStyle:{
            fontSize: 12,
        }, //label的样式。
    }
};
const Tab = createBottomTabNavigator(TabRouteConfigs, TabNavigatorConfigs);

export default Main