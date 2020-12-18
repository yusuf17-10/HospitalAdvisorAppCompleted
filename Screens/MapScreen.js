import * as React from "react";
import {Text,View,Dimensions,Alert,StyleSheet,Linking} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView,{Callout, Marker} from "react-native-maps";
import db from '../config';

export default class MapScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            longitude:"",
            latitude:"",
            hospitalList:[],
            searchList:[],
            text:this.props.navigation.getParam("diseaseName")
        }
    }

    searchDiseases=async()=>{
        var diseaseName = this.state.text.toLowerCase().trim()
        Alert.alert(diseaseName);
        var hospitals = await db.collection("diseases").where("diseaseName","==",diseaseName).get()
        hospitals.forEach(doc=>{
          this.setState({
            searchList:[...this.state.searchList,doc.data()]
          })
        })
        this.searchHospitals();
        
      }

    searchHospitals=async()=>{
        this.state.searchList.map(async(item)=>{
          var hospitals = await db.collection("hospital").where("hospitalId","==",item.hospitalId).get()
          hospitals.forEach(doc=>{
            this.setState({
              hospitalList:[...this.state.hospitalList,doc.data()]
            })
          })
        })
       
      }

    componentDidMount(){
        this.searchDiseases();
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({
                longitude:position.coords.longitude,
                latitude:position.coords.latitude

            })
        })
    }

    render(){
        return(
            <View>          
                {
                    this.state.longitude && this.state.latitude ?
                    (
                      <View style={{justifyContent:"center",alignItems:"center"}}>
                         <MapView 
                         zoomEnabled={true}
                         style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}}
                            initialRegion={{latitude:this.state.latitude,longitude:this.state.longitude,longitudeDelta:0.01,latitudeDelta:0.01}}
                         >

                             <Marker.Animated
                             pinColor={"red"}

                             coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}
                             
                             />
                               {
                                   this.state.hospitalList.length !== 0 ? 
                    (
                                    this.state.hospitalList.map((hospital)=>{
                                        return(
                                        
                                        <Marker.Animated
                                        pinColor={"blue"}
                                        title={hospital.name}
                                        coordinate={{latitude:hospital.position.latitude,longitude:hospital.position.longitude}}
                                        >
                                            <Callout onPress={()=>{
                                              Linking.openURL("https://"+hospital.description).catch(err=>{
                                                Alert.alert("Sorry! Couldn't open the webpage!")
                                              })
                                            }} tooltip>
                                               
                                                    <View style={{backgroundColor:"white",padding:10}}>
                                                    <Text>{hospital.name}</Text>
                                                    </View>
                                                
                                            </Callout>
                                        </Marker.Animated>
                                        )
                                    })
                    ):(Alert.alert("Reading the Position"))
                            
                         }
                         </MapView>
                         <View style={styles.mapBackView}>
                           <TouchableOpacity style={styles.mapButton}
                            onPress={()=>{
                              this.props.navigation.navigate("Home")
                            }}
                           >
                             <Text style={styles.mapButtonText}>Back</Text>
                           </TouchableOpacity>

                           </View>
                      
                       
                     </View> 
                    ):(Alert.alert("Reading the Position"))
                }
            </View>
        )
    }
}

const styles=StyleSheet.create({
  mapBackView:{
    position:"absolute",
    top:10,
    left:10,
    backgroundColor:"black",
    borderRadius:8

  },
  mapButton:{
    padding:10
  },
  mapButtonText:{
    fontWeight:"bold",
    color:"white"
  }
})