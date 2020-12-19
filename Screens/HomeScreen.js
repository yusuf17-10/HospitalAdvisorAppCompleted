import * as React from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''      
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'red'}
          centerComponent={{
            text: 'Hospital Advisor',
            style: {
              color: 'gold',
              fontSize: 22,
              fontStyle: 'italic',
              textShadowColor: 'black',
              textShadowRadius: 1,
              textShadowOffset: {
                width: 2,
                height: 2,
              },
            },
          }}
        />

        <Image
          style={styles.imageIcon}
          source={require('../assets/dribbble_2.gif')}
        />

        <Text style={styles.text}>
          Type The Disease From Which You Are Suffering From
        </Text>

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.goButton} onPress={() => {
          this.props.navigation.navigate("MapScreen",{diseaseName:this.state.text})
        }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  inputBox: {
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
   
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    borderRadius: 30,
    backgroundColor: 'green',
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 2,
    fontStyle: 'italic',
  },

  imageIcon: {
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignSelf:"center",
    alignItems:"center",
    borderRadius: 5,
  },
});
