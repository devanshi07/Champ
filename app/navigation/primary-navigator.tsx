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

import { View, Text, TouchableOpacity, ImageBackground, Image } from "react-native"
import { Icon } from "../components"
import { color, typography } from "../theme"

import { UserDetailsModel, useStores } from "../models"
import { moderateVerticalScale, scale, verticalScale } from "../utils/scale"

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
  drawerStack: undefined
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
      drawerStyle={{ backgroundColor: "black" }}
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
      tabBar={props => <MyTabBar {...props} />}
      >
      <Tab.Screen name="dashboard" component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
        }} />
      <Tab.Screen name="splash" component={SplashScreen}
        options={{
          tabBarLabel: "Profile",
        }} />
    </Tab.Navigator>
  );
}

function MyTabBar({ navigation, descriptors, state }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <View>
            {isFocused ? <View style={{
              borderBottomColor: isFocused ? "white" : "yellow",
              borderBottomWidth: 16,
              borderLeftWidth: 105,
              borderLeftColor: "transparent",
              borderRightWidth: 105,
              borderRightColor: "transparent",
              borderEndColor: "transparent",
              height: 0,
              width: 187.7,
              left: 0,
              top: -16,
              bottom: -2,
              position: "absolute",
              backgroundColor: "transparent"
            }}></View> : <></>}
            <TouchableOpacity accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ backgroundColor: isFocused ? "white" : "yellow", height: verticalScale(91.3), width: scale(187.7), borderTopColor: "transparent", justifyContent: "center" }}>
              <Icon icon={label !== "Dashboard" ? "userIcon" : "homeIcon"} style={{ height: 23.3, alignSelf: "center", marginBottom: verticalScale(10),marginTop:verticalScale(11) }} />
              <Text style={{ color: color.palette.black, alignSelf: "center", fontFamily: typography.regular, fontSize: moderateVerticalScale(17.3),marginBottom:verticalScale(19.7) }}>
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  );
}
function DrawerContent({ navigation, props }) {
  const { authStore } = useStores()

  return (
    <View style={{ flex: 1, backgroundColor: "black", marginHorizontal: 33.3 }}>
      <DrawerContentScrollView {...props} style={{ backgroundColor: "black" }}>
        <View style={{ flex: 1 }}>
          <View style={{}}>
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
            <Text style={{ color: "white" }}>{authStore.userDetails.userName}</Text>
          </View>

          <DrawerItem label="BottomStack" labelStyle={{ color: "#fefefe", fontSize: 20 }}
            onPress={() => { navigation.navigate("bottomstack") }} />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity style={{ flex: 0.1, marginBottom: 49.7, padding: 0 }}
        onPress={() => {
          authStore.updateLoginStatus(false);
          authStore.updateUserDetails("")
        }}>
        <Text style={{ color: "white", fontFamily: typography.regular, fontSize: 20, lineHeight: 50 }}>LOG OUT</Text>
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
