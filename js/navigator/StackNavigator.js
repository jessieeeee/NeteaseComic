/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : App导航注册
 */
import {createStackNavigator} from 'react-navigation'
import TabNavigator from '../navigator/TabNavigator'
import NeteaseDetail from '../netease/ComicDetail'
// this.props.navigation.navigate('Welcome')
const App = createStackNavigator({
    Main: {screen:TabNavigator, navigationOptions:{header: null}},
    NeteaseDetail: {screen:NeteaseDetail, navigationOptions:{header: null}}
});

export default App