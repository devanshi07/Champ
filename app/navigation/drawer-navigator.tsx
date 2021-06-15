import React from "react"
import {  DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { View, Text, TouchableOpacity, } from "react-native"
import { Icon } from "../components"
import { typography } from "../theme"
import {  useStores } from "../models"

export function DrawerContent({ navigation, props }) {
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
  
            <DrawerItem label="Dashboard" labelStyle={{ color: "#fefefe", fontSize: 20 }}
              onPress={() => { navigation.navigate("bottomstack") }} />
          </View>
        </DrawerContentScrollView>
  
        <TouchableOpacity style={{ flex: 0.1, marginBottom: 49.7, padding: 0 }}
          onPress={() => {
  authStore.removeAccess()        
  }}>
          <Text style={{ color: "white", fontFamily: typography.regular, fontSize: 20, lineHeight: 50 }}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }