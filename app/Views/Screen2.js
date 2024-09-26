import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, Platform } from "react-native";
import { useRecoilState } from "recoil";
import { inputtextwallpaper } from "../../atoms/wallpaperinputtext";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const Screen2 = ({ route }) => {
  const access_key = "MAoKoKfhKVbZEkcXNrePow8OC90vIFauvezU7E1Zl4M";
  const { clickedimage } = route.params;
  const [searchvalue, setsearchvalue] = useRecoilState(inputtextwallpaper);
  const [imagedata, setimagedata] = useState();

  useEffect(() => {
    setimagedata(JSON.parse(clickedimage)?.cover_photo.urls.regular); // Choose the desired size (regular, full, etc.)
  }, []);

  const shownextimage = async () => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${searchvalue}&client_id=${access_key}`);
      const data = await response.json();
  
      // Update the imagedata state with the new image's URL
      setimagedata(data.urls.regular); // or use data.urls.full if you want a higher resolution
    } catch (error) {
      console.error('Error fetching the next image:', error);
      Alert.alert('Error', 'Could not fetch the next image.');
    }
  };
  
  const downloadImage = async () => {
    try {
      if (Platform.OS === 'android') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied!', 'Storage permission is required to download images.');
          return;
        }
      }

      const uri = imagedata;
      const fileUri = FileSystem.documentDirectory + `${Date.now()}.jpg`; // Explicitly set file extension based on the URL

      const downloadObject = FileSystem.createDownloadResumable(
        uri,
        fileUri
      );

      const { uri: localUri } = await downloadObject.downloadAsync();

      const asset = await MediaLibrary.createAssetAsync(localUri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      Alert.alert('Download Complete', 'Image has been downloaded to your gallery!');
    } catch (error) {
      console.error(error);
      Alert.alert('Download Failed', 'An error occurred while downloading the image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source={{ uri: imagedata }} style={styles.image} />
        <View style={styles.container}>

        <TouchableOpacity style={styles.nextbtn} onPress={shownextimage}>
            <Image 
             style={{height:30,width:30}}
            source={require('../../assets/images/nexticon.png')}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadbtn} onPress={downloadImage}>
          <Image 
          style={{height:30,width:30}}
          source={require('../../assets/images/downloadicon.png')}/>
          </TouchableOpacity>

         
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1e',
  },
  imagecontainer: {
    width: "100%",
    height: "88%",
    backgroundColor: "#09091d",
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    width: "90%",
    height: "97%",
    borderRadius: 10,
    margin: 5,
    marginTop:25
  },
  downloadbtn: {
    position: 'absolute',
    bottom: -55,
    backgroundColor: '#0b1043',
    paddingHorizontal: 20,
    paddingVertical: 10,
    left: 70,
    borderRadius: 10,
    width:90,
    elevation: 2,
    shadowColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  downloadtxt: {
    color: 'white',
    fontSize: 20,
  },
  nextbtn: {
    position: 'absolute',
    width:80,
    bottom: -55,
    backgroundColor: '#0b1043',
    paddingHorizontal: 20,
    paddingVertical: 10,
    right: 80,
    borderRadius: 10,
    elevation: 2,
    shadowColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  nextbtntext: {
    color: 'white',
    fontSize: 20,
  }
});

export default Screen2;
