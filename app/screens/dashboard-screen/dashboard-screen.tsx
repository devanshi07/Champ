import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, FlatList, View, ActivityIndicator } from "react-native"
import { Screen, Text, Wallpaper, Header } from "../../components"
import {  useNavigation } from "@react-navigation/native"
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
  const navigation = useNavigation()
  //const isFocused = useIsFocused()
  const [load, setLoad] = useState(false);

  useEffect(() => {
    console.log("inside...")
    callApi()
  }, [])

  const callApi = () => {
    setLoad(true)
    parentCategoryStore.getParentCategoryData(0)
    setLoad(false)
  }
  const renderView = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate("subcategory", { ParamId: item.id, ParamName: item.name });
      }}
        style={dashboardScreenStyles.BUTTON}>
        <Text style={dashboardScreenStyles.TEXTSTYLE}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Wallpaper />
      <Header headerText="Dashboard" rightIcon="rightIcon" />
      {load ? <View style={dashboardScreenStyles.ACTIVITYINDICATOR}>
        <ActivityIndicator color="white" size={70} />
      </View> : <></>}
      <FlatList
        contentContainerStyle={dashboardScreenStyles.FLATLIST}
        data={parentCategoryStore.parentCategoryDetails}
        keyExtractor={(item) => item.id}
        key={parentCategoryStore.parentCategoryDetails.id}
        renderItem={renderView}
      />
    </Screen>
  )
})
