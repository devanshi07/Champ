/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"

import { SplashScreen, DashboardScreen } from "../screens"

import { View, Text,TouchableOpacity } from "react-native"
import { Icon } from "../components"
import { typography } from "../theme"

import { useStores } from "../models"

// import {
//   Avatar,
//   Title,
//   Caption,
//   Paragraph,
//   Drawer,
//   Text,
//   TouchableRipple,
//   Switch
// } from "react-native-paper"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  splash: undefined
  dashboard: undefined
  bottomstack: undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()
const Drawers = createDrawerNavigator<PrimaryParamList>()
const Tab = createBottomTabNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  //const { authStore} = useStores()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="bottomstack" component={DrawerStack} />
    </Stack.Navigator>
  )
}
function DrawerStack() {
  return (
    <Drawers.Navigator
      drawerPosition="right"
      drawerStyle={{backgroundColor:"black"}}
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeBackgroundColor: "#5cbbff",
        activeTintColor: "#ffffff",
        inactiveBackgroundColor: "black",
        inactiveTintColor: "white",
      }}>
      <Drawers.Screen name="bottomstack" component={BottomTabStack} />
    </Drawers.Navigator>
  );
}
function BottomTabStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: 'yellow',
        inactiveBackgroundColor: 'white'
      }}>
      <Tab.Screen name="dashboard" component={DashboardScreen} />
      <Tab.Screen name="splash" component={SplashScreen}
        options={{
          tabBarLabel: "Profile"
        }} />
    </Tab.Navigator>
  );
}

function DrawerContent({ navigation, props }) {
  const { authStore} = useStores()

  return (
    <View style={{ flex: 1, backgroundColor: "black",marginHorizontal:33.3 }}>
      <DrawerContentScrollView {...props} style={{ backgroundColor: "black" }}>
        <View style={{ flex: 1 }}>
          <View style={{ paddingLeft: 20, marginTop: 15 }}>
            <Icon icon="loginScreenLogo" style={{ width: 36, height: 36 }} />
            <Text style={{
              fontSize: 23.8,
              marginTop: 3,
              fontWeight: "bold",
              color: "#fefefe"
            }}>Boxing</Text>
            <Text style={{
              fontSize: 6,
              color: '#fefefe',
              letterSpacing: 2.4
            }}>by Tatvasoft</Text>
          </View>

          <DrawerItem label="BottomStack" labelStyle={{ color: "#fefefe", fontSize: 20 }}
            onPress={() => { navigation.navigate("bottomstack") }} />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity style={{ flex: 0.1,marginBottom:49.7,padding:0 }}
      onPress={() =>  {authStore.updateLoginStatus(false);
      authStore.updateUserDetails("","")}}>
        <Text style={{ color: "white",fontFamily:typography.regular,fontSize:20,lineHeight:50 }}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}
/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
