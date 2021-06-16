import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,View,TouchableOpacity} from "react-native"
import { Screen, Text,Wallpaper,Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const ImageDetailScreen = observer(function ImageDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const word = '<';
  const word1 = '>';
  return (
    <Screen style={ROOT} preset="scroll">
      <Wallpaper />
      <Header headerText="Image Detail" rightIcon="rightIcon" leftIcon="leftIcon" /> 
      <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: 60, height: 40, borderWidth: 1, borderColor: 'white', justifyContent: 'center' }}>
              <TouchableOpacity >
                <Text style={{ color: 'white', fontSize: 15 }}>  {word}PREV</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: 60, height: 40, borderWidth: 1, backgroundColor: 'yellow', justifyContent: 'center' }}>
              <TouchableOpacity >
                <Text style={{ color: 'black', fontSize: 15 }}> NEXT{word1} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </Screen>
  )
})
