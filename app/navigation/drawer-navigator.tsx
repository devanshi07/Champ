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
      <TouchableOpacity>
        <Text style={drawerNavigatorStyles.LABELSTYLE}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={drawerNavigatorStyles.DRAWERSTYLE}>
      <View style={drawerNavigatorStyles.ROOT}>
        <DrawerContentScrollView {...props}>
          <View style={drawerNavigatorStyles.UPPERPART}>
            <View>
              <Icon icon="loginScreenLogo" style={drawerNavigatorStyles.LOGO} />
              <Text style={drawerNavigatorStyles.TITLE}>Boxing</Text>
              <Text style={drawerNavigatorStyles.CAPTION}>by Tatvasoft</Text>
            </View>
            <View style={{ marginTop: verticalScale(66) }}>
              <TouchableOpacity onPress={() => navigation.navigate("dashboard")}>
                <Text style={drawerNavigatorStyles.LABELSTYLE}>Dashboard</Text>
              </TouchableOpacity>
              <FlatList
                data={parentCategoryStore.parentCategoryDetails}
                keyExtractor={(id) => id}
                renderItem={renderView} />
            </View>
          </View>
        </DrawerContentScrollView>
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