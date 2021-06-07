import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, ImageStyle } from "react-native"
import { Screen, Text, Icon, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { scale, verticalScale } from "../../utils/scale"
import LauchScreen from "react-native-splash-screen"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  justifyContent: "center"
}
const LOGO: ImageStyle = {
  width: scale(220),
  height: verticalScale(158.7),
  alignSelf: "center"
}

export const SplashScreen = observer(function SplashScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // React.useEffect(() => {
  //   setTimeout(2000)
  // },[])
// componentDidMount(){
//   LauchScreen.hide()
// }
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      {/* <Text preset="header" text="splashScreen" /> */}
      <Wallpaper />
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        {/* <Text preset="header" text="splashScreen" /> */}

        <Icon icon={"appLogo"} style={LOGO} />
      </TouchableOpacity>
    </Screen>
  )
})
