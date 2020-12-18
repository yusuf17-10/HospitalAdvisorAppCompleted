import * as React from "react";
import {createSwitchNavigator} from "react-navigation";
import HomeScreen from "../Screens/HomeScreen";
import MapScreen from "./Screens/MapScreen";

export const AppSwitch=createSwitchNavigator({
    Home:{screen:HomeScreen},
    MapScreen:{screen:MapScreen}
})