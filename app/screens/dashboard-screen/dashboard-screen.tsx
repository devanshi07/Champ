import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity,  FlatList } from "react-native"
import { Screen, Text, Wallpaper, Header } from "../../components"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { dashboardScreenStyles } from "./dashboard-styles"
import { useEffect } from "react"
import { useState } from "react"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const DashboardScreen = observer(function DashboardScreen() {
  // Pull in one of our MST stores
  const { parentCategoryStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const isFocused = useIsFocused()

  useEffect(() => {
    console.log("inside...")
    callApi()
  }, [isFocused])

  const callApi = () =>{
    parentCategoryStore.getParentCategoryData(0)
  }
  const renderView = ({item,index}) => {
    return(
    <TouchableOpacity
      style={dashboardScreenStyles.BUTTON}>
      <Text style={dashboardScreenStyles.TEXTSTYLE}>{item.name}</Text>
    </TouchableOpacity>
    );
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Wallpaper />
      <Header headerText="Dashboard" rightIcon="rightIcon" /> 
        <FlatList
        contentContainerStyle={dashboardScreenStyles.FLATLIST}
          data={parentCategoryStore.parentCategoryDetails}
          keyExtractor={(id) => id}
          renderItem={renderView}
        />
    </Screen>
  )
})
