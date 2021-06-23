import React from "react"
import { DrawerContentScrollView } from "@react-navigation/drawer"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { Icon } from "../components"
import { useStores } from "../models"
import { drawerNavigatorStyles } from "./drawer-navigator-styles"
import { verticalScale } from "../utils/scale"

export function DrawerContent({ navigation, props }) {
  const { authStore, parentCategoryStore } = useStores()
  
  const renderView = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() =>{
        navigation.navigate("subcategory", { ParamId: item.id, ParamName: item.name });        
      }}>
        <Text style={drawerNavigatorStyles.LABELSTYLE}>{item.name}</Text>
      </TouchableOpacity>
      // <DrawerItem label={item.name} 
      // labelStyle={drawerNavigatorStyles.LABELSTYLE}
      // onPress={() => 
      // navigation.navigate("subcategory", { ParamId: item.id, ParamName: item.name })}
      // activeTintColor="red"
      // inactiveTintColor="white"
      // activeBackgroundColor="transparent"
      // focused={true}/>
    );
  }
  return (
    <View style={drawerNavigatorStyles.DRAWERSTYLE}>
      <View style={drawerNavigatorStyles.ROOT} {...props}>
        {/* <DrawerContentScrollView {...props}> */}
          <View style={drawerNavigatorStyles.UPPERPART}>
            <View>
              <Icon icon="loginScreenLogo" style={drawerNavigatorStyles.LOGO} />
              <Text style={drawerNavigatorStyles.TITLE}>Boxing</Text>
              <Text style={drawerNavigatorStyles.CAPTION}>by Tatvasoft</Text>
            </View>
            <View style={{ marginTop: verticalScale(66) }}>
              <TouchableOpacity onPress={() => navigation.navigate("dashboradScreen")}>
                <Text style={drawerNavigatorStyles.LABELSTYLE}>Dashboard</Text>
              </TouchableOpacity>
              <FlatList
                data={parentCategoryStore.parentCategoryDetails}
                keyExtractor={(item) => item.id}
                renderItem={renderView}
                key={parentCategoryStore.parentCategoryDetails.id}
                />
            </View>
          </View>
        {/* </DrawerContentScrollView> */}
        <TouchableOpacity style={drawerNavigatorStyles.BOTTOMPART}
          onPress={() => {
            authStore.removeAccess()
          }}>
          <Text style={drawerNavigatorStyles.TEXTSTYLE}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}