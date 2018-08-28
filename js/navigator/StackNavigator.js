/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : App导航注册
 */
import {createStackNavigator} from 'react-navigation'
import TabNavigator from '../navigator/TabNavigator'
import NeteaseDetail from '../netease/ComicDetail'
import TencentDetail from '../tencent/ComicDetail'
import ComicContent from '../common/ComicContent'
// this.props.navigation.navigate('Welcome')
const navigationOptions = {header: null}
const App = createStackNavigator({
    Main: {screen:TabNavigator, navigationOptions},
    NeteaseDetail: {screen:NeteaseDetail, navigationOptions},
    TencentDetail: {screen:TencentDetail, navigationOptions},
    ComicContent: {screen:ComicContent, navigationOptions},
});

export default App