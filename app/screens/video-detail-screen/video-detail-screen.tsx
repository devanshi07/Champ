import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, FlatList, Image } from "react-native"
import { Screen, Text, Wallpaper, Header, Icon } from "../../components"
import { useNavigation, useRoute } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { videoDetailScreenStyles } from "./video-detail-style"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const VideoDetailScreen = observer(function VideoDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const route = useRoute<any>();
  const medias = route.params.ParamMedia;

  console.tron.log("image screen : ", medias)
  const renderView = ({ item, index }) => {
    return (
      <View style={videoDetailScreenStyles.RENDERVIEW}>
        <Text style={videoDetailScreenStyles.RENDERTITLE}>{item.caption}</Text>
        <Icon icon="play" style={videoDetailScreenStyles.RENDERIMAGE} />
        <Text style={videoDetailScreenStyles.RENDERDES}>{item.description}
        </Text>
      </View>
    );
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="videoDetailScreen" />
      <Wallpaper />
      <Header headerText="Video Detail" rightIcon="rightIcon" leftIcon="leftIcon" />
      <View style={videoDetailScreenStyles.MAINVIEW}>
        <View style={videoDetailScreenStyles.TOPBUTTONVIEW}>

          <TouchableOpacity style={videoDetailScreenStyles.PREVBUTTON}>
            <View style={videoDetailScreenStyles.INNERBUTTONVIEW}>
              <Icon icon="prevIcon" style={videoDetailScreenStyles.BUTTONIMAGE} />
              <Text style={videoDetailScreenStyles.PREVBUTTONTEXT}>PREV</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={videoDetailScreenStyles.NEXTBUTTON}>
            <View style={videoDetailScreenStyles.INNERBUTTONVIEW}>
              <Text style={videoDetailScreenStyles.NEXTBUTTONTEXT}>NEXT</Text>
              <Icon icon="nextIcon" style={videoDetailScreenStyles.BUTTONIMAGE} />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={videoDetailScreenStyles.FLATLIST}
          data={medias}
          keyExtractor={(item) => item.id}
          extraData={medias}
          renderItem={renderView}
        />

      </View>
    </Screen>
  )
})
