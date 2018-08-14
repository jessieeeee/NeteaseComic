/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : App导航注册
 */
import {createStackNavigator} from 'react-navigation'
import Main from '../main/Main'
// this.props.navigation.navigate('Main')
const App = createStackNavigator({
    Main: {screen: Main, navigationOptions: {header: null}},
});

export default App