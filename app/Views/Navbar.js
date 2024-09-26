import React from 'react';
import {Text, View,StyleSheet,TextInput,Image} from 'react-native';
import logo from '../../assets/images/searchicon.png';
import { useRecoilState } from 'recoil';
import { inputtextwallpaper } from '../../atoms/wallpaperinputtext';

const Navbar = () => {
  const[searchvalue,setsearchvalue] = useRecoilState(inputtextwallpaper)
   const onChangeTextinput = (text)=> {
      setsearchvalue(text)
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchcont}>
      <Image source={logo} style={styles.icon}/>
      <TextInput style={styles.searchinput}
      placeholder='Search Anything...'
      placeholderTextColor={'#fff'}
      onChangeText={onChangeTextinput}
      />
      </View>
    </View>
  );
}; 
const styles = StyleSheet.create({
      container:{
        paddingVertical:10,
        width:'100%',
        backgroundColor:'#0a0a1e',
        alignItems: 'center',
        marginTop:-20,
        
      },
      icon:{
        height:20,
        width:20,
        
      },
      searchcont:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#15162c',
        elevation:6,
        shadowColor:'#ffffff',
        padding:10,
        borderRadius:10,
        width:'90%',
        marginTop:10,
        marginBottom:6
      },
      searchinput:{
        width:'90%',
        fontSize:20,
        paddingLeft:10,
        color:'white'
        
      }
})
export default Navbar;