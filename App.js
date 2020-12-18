import * as React from "react";
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import { AppDrawerNavigator } from "./Components/AppDrawerNavigator";
import MapScreen from "./Screens/MapScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";


export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const AppSwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  MapScreen:{screen:MapScreen}
})

var AppContainer = createAppContainer(AppSwitchNavigator)
