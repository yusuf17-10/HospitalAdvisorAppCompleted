import * as React from "react";
import {StyleSheet,View,Text,TouchableOpacity} from "react-native";
import {DrawerItems} from "react-navigation-drawer";
import firebase from "firebase";
import WelcomeScreen from "../Screens/WelcomeScreen";

export default class CustomSideBarMenu extends React.Component {

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.8,marginTop:20}}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={{flex:0.2}}>
                    
                    <TouchableOpacity style = {styles.button}>
                        <Text style={styles.buttonText}
                        onPress={()=>{
                            this.props.navigation.navigate("WelcomeScreen")
                            firebase.auth().signOut()
                        }}
                        >LOGOUT</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles=StyleSheet.create({
    button:{
        borderRadius:10,
        padding:10,
        width:100,
        height:40,
        backgroundColor:"#E10032",
        justifyContent:"center",
        alignItems:"center"
    },
    buttonText:{
        color:"#DBE8E1",
        fontWeight:"bold"
    }
})