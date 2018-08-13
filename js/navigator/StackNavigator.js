/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : App导航注册
 */
import {createStackNavigator} from 'react-navigation'
import Launch from '../Launch'
import TabNavigator from './TabNavigator'
import React,{Component} from "react"

class Main extends Component<Props> {
    render(){
        return (
            <TabNavigator/>
        )
    }
}
const App = createStackNavigator({
    Launch: {screen: Launch, navigationOptions:{header: null}},
    Main: {screen: Main,  navigationOptions: {header: null}},
});

export default App