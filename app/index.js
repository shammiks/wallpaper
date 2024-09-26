// index.js
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Screen1 from "./Views/Screen1";
import Screen2 from "./Views/Screen2";
import Login from "./Views/Login";
import SignOut from "./Views/SignOut";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="S1">
      <Stack.Screen
        name="S1"
        component={Screen1}
        options={({ navigation }) => ({
          headerStyle: { backgroundColor: "#0a0a1e" },
          headerLeft: () => (
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../assets/images/wallpaperlogo.png")}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require("../assets/images/usericon.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  backgroundColor: "#2c3135",
                }}
              />
            </TouchableOpacity>
          ),
          headerTintColor: "#fff",
          headerTintStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
          title: "Home",
        })}
      />
      <Stack.Screen
        name="S2"
        component={Screen2}
        options={{
          headerStyle: { backgroundColor: "#0a0a1e" },
          headerRight: () => (
            <TouchableOpacity>
              <Image
                style={{ width: 45, height: 45 }}
                source={require("../assets/images/like.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerTintColor: '#fff',
          headerTintStyle: { fontWeight: 'bold' },
          title: 'Back',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer independent={true}>
        <Drawer.Navigator
          initialRouteName="MainStack"
          screenOptions={{ 
            drawerPosition: "right",
            drawerStyle:{
              backgroundColor: 'rgba(11,16,67,0.95)',
              width: 240, 
            },
            drawerLabelStyle: {
              color: "#ffffff",
            },
            drawerActiveTintColor: "white", 
            drawerInactiveTintColor: "#c0c0c0",
          }} 
        >
          <Drawer.Screen
            name="Home"
            component={MainStack}
            options={{ headerShown: false }}
          />
          <Drawer.Screen 
      
            name="Login"
            component={Login}
            options={{ drawerLabel: "Login/SignUp" }}
          />
          <Drawer.Screen 
            
            name="SignOut"
            component={SignOut}
            options={{ drawerLabel: "Sign Out" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
