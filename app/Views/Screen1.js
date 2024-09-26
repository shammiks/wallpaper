import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, FlatList , TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";
import { inputtextwallpaper } from "../../atoms/wallpaperinputtext";
import Navbar from './Navbar';


const Screen1 = ({navigation}) => {
  const access_key = "MAoKoKfhKVbZEkcXNrePow8OC90vIFauvezU7E1Zl4M";
  const [searchvalue, setsearchvalue] = useRecoilState(inputtextwallpaper);
  const [imagecollection, setimagecollection] = useState([]);

  //console.log(searchvalue);
  useEffect(() => {
    const getImagecollection = async () => {
      let data = await fetch(
        `https://api.unsplash.com/search/collections?page=1&per_page=30&query=${searchvalue}&client_id=${access_key}`
      );
      data = await data.json();
      setimagecollection(data);
    };
    getImagecollection();
  }, [searchvalue]);
  useEffect(() => {
    if (imagecollection.total === 0) {
      setsearchvalue('all');
    }
  }, [imagecollection.total, setsearchvalue]);



  const showWallpaper = (item) => {
      navigation.navigate('S2',{clickedimage : `${JSON.stringify(item)}`})
  }
  return (
    <View style={styles.container}>
      <Navbar />
       
      <FlatList
        numColumns={2}
        data={imagecollection.results}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> showWallpaper(item)}>
            <View style={styles.imagecontainer}>
              <Image
                source={{ uri: item.cover_photo.urls.regular }}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop:20,
    backgroundColor:'#0a0a1e'
  },
  imagecontainer: {
    height: 400,
    width: 200,
    backgroundColor: "#0a0a1e",
    
  },
  image: {
    width: "95%",
    height: "95%",
    marginRight:10,
    borderRadius:10,
    overflow:'hidden',
    elevation:5
  },
});
export default Screen1;
