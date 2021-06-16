/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"

import {  DashboardScreen, SubcategoryScreen, ImageDetailScreen } from "../screens"

import { DrawerContent } from './drawer-navigator'
import { MyTabBar } from './bottom-navigator'
import { color } from "../theme"
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
  drawerStack: undefined
  subcategory: undefined
  dashboradScreen: undefined
  imagescreen:undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()
const Drawers = createDrawerNavigator<PrimaryParamList>()
const Tab = createBottomTabNavigator<PrimaryParamList>()

export function PrimaryNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="drawerStack" component={DrawerStack} />
    </Stack.Navigator>
  )
}
function DrawerStack() {
  return (
    <Drawers.Navigator
      hideStatusBar={true}
      drawerPosition="right"
      drawerType="slide"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ swipeEnabled: false }}
      drawerContentOptions={{
        activeBackgroundColor: "#5cbbff",
        activeTintColor: color.palette.yellow,
        inactiveBackgroundColor: "black",
        inactiveTintColor: "white",
      }}>
      <Drawers.Screen name="bottomstack" component={BottomTabStack} />
    </Drawers.Navigator>
  );
}
function BottomTabStack() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="dashboard" component={DashboardStack}
        options={{
          tabBarLabel: "Dashboard",
        }} />
      <Tab.Screen name="imagescreen" component={ImageDetailScreen}
        options={{
          tabBarLabel: "Profile",
        }} />
    </Tab.Navigator>
  );
}
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: true,
    }}>
      <Stack.Screen name="dashboradScreen" component={DashboardScreen} />
      <Stack.Screen name="subcategory" component={SubcategoryScreen}  />
      {/* <Stack.Screen name="Day1" component={Day1} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
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
