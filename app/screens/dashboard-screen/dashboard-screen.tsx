import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { scale, verticalScale } from "../../utils/scale"

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
      <Wallpaper/>
      <Text preset="header" text="dashboardScreen" />
    </Screen>
  )
})
