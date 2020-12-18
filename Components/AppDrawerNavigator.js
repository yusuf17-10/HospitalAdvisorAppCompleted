import * as React from "react";
import {createDrawerNavigator} from "react-navigation-drawer";
import CustomSideBarMenu from "./CustomSideBarMenu";
import HomeScreen from "../Screens/HomeScreen";


export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:HomeScreen},
   
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:"Home"
})