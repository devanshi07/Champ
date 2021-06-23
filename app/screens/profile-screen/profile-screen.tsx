import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, View, Image, TouchableOpacity } from "react-native"
import { Screen, Text, Wallpaper, Header, Icon } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"



const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const ProfileScreen = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  const { authStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [text, setText] = React.useState(false);
   
  return (
    <Screen style={ROOT} preset="scroll">
      <Wallpaper />
      <Header headerText="Profile" />

      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 20, height: 263.3 }}>
          <Image
            source={require("../../components/icon/icons/logo.png")}
            style={{
              width: 116.7,
              height: 116.7,
              borderRadius: 360,
              borderColor: 'yellow',
              borderWidth: 2,
              marginTop: 33.3
            }} />
          <Text style={{ fontFamily: typography.semiBold, letterSpacing: 0.6, fontSize: 24, color: "#ffffff", marginTop: 16.3 }}>{authStore.userDetails.userName}</Text>
          <Text style={{ fontFamily: typography.light, letterSpacing: 0.43, fontSize: 17.3, color: "#ffffff", marginTop: 13 }}>{authStore.userDetails.userEmail}</Text>
          <Text style={{ fontFamily: typography.light, letterSpacing: 0.43, fontSize: 17.3, color: "#ffffff" }}>17th, March, 1986</Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center", marginHorizontal: 33.3,marginBottom:49.3 }}>
          <Text style={{ fontFamily: typography.regular, fontSize: 20, color: "#eece00", alignSelf: "flex-start", marginTop: 27 }}>Saved Category</Text>

          <TouchableOpacity onPress={() => setText(true)}
            style={{ flex: 1, flexDirection: "row", height: 43.3, borderWidth: 1, justifyContent: "center", marginTop: 10, alignItems: "center", borderColor: "white" }}>
            <Text style={{ fontFamily: typography.regular, fontSize: 17.3, color: "#ffffff", flex: 1, marginLeft: 17.3 }}>PREPARE</Text>
            <Icon icon="upArrow" style={{ height: 9, marginRight: 14 }} />
          </TouchableOpacity>


          {/* <TouchableOpacity onPress={() => setText(true)}
            style={{ flex: 1, flexDirection: "row", height: 43.3, justifyContent: "center", marginTop: 10, alignItems: "center", backgroundColor: "#eece00" }}>
            <Text style={{ fontFamily: typography.regular, fontSize: 17.3, color: "#000000", flex: 1, marginLeft: 17.3 }}>PREPARE</Text>
            <Icon icon="downArrow" style={{ height: 9, marginRight: 14 }} />
          </TouchableOpacity> */}

          {text ? <Icon icon="delete" style={{ marginTop: 5, width: "90%", backgroundColor: "white" }} /> : <></>}

          <TouchableOpacity onPress={() => setText(true)}
            style={{ flex: 1, flexDirection: "row", height: 43.3, borderWidth: 1, justifyContent: "center", marginTop: 10, alignItems: "center", borderColor: "white" }}>
            <Text style={{ fontFamily: typography.regular, fontSize: 17.3, color: "#ffffff", flex: 1, marginLeft: 17.3 }}>LEARN</Text>
            <Icon icon="upArrow" style={{ height: 9, marginRight: 14 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setText(true)}
            style={{ flex: 1, flexDirection: "row", height: 43.3, borderWidth: 1, justifyContent: "center", marginTop: 10, alignItems: "center", borderColor: "white" }}>
            <Text style={{ fontFamily: typography.regular, fontSize: 17.3, color: "#ffffff", flex: 1, marginLeft: 17.3 }}>TRAIN</Text>
            <Icon icon="upArrow" style={{ height: 9, marginRight: 14 }} />
          </TouchableOpacity>

          {/* <View style={{ width: 200, height: 200, marginLeft: 100 }}>
            <Image
              source={require("../../components/icon/icons/logo.png")}
              style={{
                width: 64.3,
                height: 64.7,
                borderRadius: 360,
                borderColor: 'yellow',
                borderWidth: 2,
                backgroundColor: "black"
              }} />
            <TouchableOpacity style={{
              height: 17, width: 16.7, backgroundColor: "red", position: "absolute",
              left: 50,
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              borderRadius: 360
            }}>
              <Icon icon="delete" style={{
                alignSelf: "center",
                backgroundColor: "red",
                width: 8.7,
                height: 9.3
              }} />
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </Screen>
  )
})
