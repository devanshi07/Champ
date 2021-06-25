import React from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, FlatList, View, ActivityIndicator } from "react-native"
import { Screen, Text, Wallpaper, Header } from "../../components"
import {  useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { dashboardScreenStyles } from "./dashboard-styles"
import { useEffect } from "react"
import { useState } from "react"

export const DashboardScreen = observer(function DashboardScreen() {
  // Pull in one of our MST stores
  const { parentCategoryStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    callApi()
  }, [])
  const callApi = () => {
    setisLoading(true)
    parentCategoryStore.getParentCategoryData(0)
    setisLoading(false)
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
    <Screen style={dashboardScreenStyles.ROOT} preset="fixed">
      <Wallpaper />
      <Header headerText="Dashboard" rightIcon="rightIcon" />
      {isLoading ? <View style={dashboardScreenStyles.ACTIVITYINDICATOR}>
        <ActivityIndicator color="white" size={70} />
      </View> : <></>}
      <FlatList
        contentContainerStyle={dashboardScreenStyles.FLATLIST}
        data={parentCategoryStore.parentCategoryDetails}
        keyExtractor={(item,index) => index.toString()}
        renderItem={renderView}
      />
    </Screen>
  )
})
