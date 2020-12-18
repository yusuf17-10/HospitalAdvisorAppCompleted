import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isModalVisible: false,
      firstName: '',
      lastname: '',
      address: '',
      phone: '',
      confirmPassword: '',
    };
  }

  userSignUp = (username, password,confirmPassword) => {
    if(password!==confirmPassword){
      Alert.alert("Password Doesn't Match")
    }else{
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => {
        return Alert.alert('USER ADDED SUCCESSFULLY');
      })
      .catch((error) => {
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
      db.collection('user').add({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        address: this.state.address,
        emailId:this.state.emailId
      });
    }
  };

  userLogin = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        return this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });

  };

  showModal = () => {
    return (
      <Modal
        visible={this.state.isModalVisible}
        animationType="fade"
        transparent={false}>
        <View>
          <ScrollView>
            <KeyboardAvoidingView style={{alignItems:"center"}}>
              <Text style={{alignItems:"center",alignSelf:"center",backgroundColor:"pink",fontSize:20}}>Registration</Text>
              <TextInput
                style={styles.input}
                placeholder={'firstName'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
                value={this.state.firstName}
              />
              <TextInput
                style={styles.input}
                placeholder={'LastName'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
                value={this.state.lastName}
              />
              <TextInput
                style={styles.input}
                placeholder={'address'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
                value={this.state.address}

              />
              <TextInput
                style={styles.input}
                placeholder={'PhoneNumber'}
                keyboardType={'numeric'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ phone: text });
                }}
                value={this.state.phone}

              />

        <TextInput
          keyboardType={"email-address"}
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            this.setState({ emailId: text });
          }}
          value={this.state.emailId}
        />

             <TextInput
                style={styles.input}
                placeholder={'password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}

              />

              <TextInput
                style={styles.input}
                placeholder={'ConfirmPassword'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
                value={this.state.confirmPassword}

              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}>
                <Text>cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={{backgroundColor:"#FED8B1",flex:1}}>
       {this.showModal()}
        <Image
          style={styles.imageIcon}
          source={require('../assets/AnimationBandeauHaut_6E2BDD7_FR.gif')}
        />
        <Text style={styles.text1}>Enter Your Email And Password To Login</Text>
        <Text style={styles.text3}>(OR)</Text>

        <Text style={styles.text2}>
          If You Are New User Click SignUp
        </Text>
        <TextInput
          keyboardType={"email-address"}
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            this.setState({ emailId: text });
          }}
          value={this.state.emailId}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          value={this.state.password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.userLogin(this.state.emailId, this.state.password);
          }}>
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({ isModalVisible: true });
          }}>
          <Text>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginTop: 40,
    borderWidth: 3,
    width: 200,
    height: 50,
    padding:10
  },
  button: {
    backgroundColor: 'aqua',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 20,
    borderWidth: 2,
    width: 150,
    height: 50,
  },

  imageIcon: {
    width: 200,
    height:100,
    justifyContent: 'center',
    alignItems:"center",
    alignSelf:"center",
    borderRadius: 10,
    marginTop:20
  },
  text1: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 20,
    fontStyle: 'italic',

  },

  text2: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
    fontStyle: 'italic',
  },
  text3: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
