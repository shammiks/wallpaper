// Login.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';


const Login = () => {
  return (
   
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Username" placeholderTextColor={'white'} style={styles.input} />
      <TextInput placeholder="Password"  placeholderTextColor={'white'} secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.btn}onPress={() => {}}>
        <Text style={styles.txt}> Login </Text>
      </TouchableOpacity>
    </View>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    padding: 20,
    backgroundColor:'#0a0a1e',
    
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color:'white'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color:'white',
  },
  btn:{
    width:'100%',
    height:40,
    backgroundColor:'#0b1043',
    borderRadius:10,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
    elevation:2,
    shadowColor:'white'
  },
  txt:{
    color:'white',
    fontWeight:'bold',
  }
});

export default Login;
