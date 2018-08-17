/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 设置顶层导航
 */
import { NavigationActions } from 'react-navigation'

let navigator

function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef
}

function navigate(routeName, params) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    )
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
};