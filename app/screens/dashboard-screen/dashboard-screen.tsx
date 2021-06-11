import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, StatusBar } from "react-native"
import { Screen, Text, Wallpaper, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { scale, verticalScale } from "../../utils/scale"
import { dashboardScreenStyles } from "./dashboard-styles"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const DashboardScreen = observer(function DashboardScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <Wallpaper />
      <Header headerText="Dashboard" leftIcon="leftIcon" rightIcon="rightIcon" />

      <View style={dashboardScreenStyles.MAINVIEW}>
        <TouchableOpacity
          style={{ width: 308.3, height: 53.3, borderWidth: 1, borderColor: "#ffffff", justifyContent: "center", marginBottom: 16.7 }}>
          <Text style={dashboardScreenStyles.TEXTSTYLE}>Prepare</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
