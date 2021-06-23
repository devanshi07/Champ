import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, FlatList, Alert } from "react-native"
import { Screen, Text, Wallpaper, Header, Icon } from "../../components"
import { useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { videoDetailScreenStyles } from "./video-detail-style"
import { verticalScale } from '../../utils/scale';
import HTML from "react-native-render-html"
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const VideoDetailScreen = observer(function VideoDetailScreen() {
  // Pull in one of our MST stores
  const { subCategoryStore, parentCategoryStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const route = useRoute<any>();
  const medias = route.params.ParamMedia;
  let currentId = route.params.ParamId;

  const nextButton = () => {
    currentId = currentId + 1;
    console.tron.log("current id...", currentId)
    console.tron.log("maximum id...", subCategoryStore.maxChildId)
    
    if (currentId <= subCategoryStore.maxChildId) {
      let nextSubCategory = subCategoryStore.subCategoryDetails.find(x => x.id == currentId)
      console.tron.log("media", nextSubCategory.id)
      if (nextSubCategory.type !== 'Video') {
        navigation.navigate("imagescreen", { ParamMedia: nextSubCategory.media, ParamId: nextSubCategory.id, ParamName: nextSubCategory.name });
      }
      else {
        navigation.navigate("videoscreen", { ParamMedia: nextSubCategory.media, ParamId: nextSubCategory.id, ParamName: nextSubCategory.name });
      }
    }
    else {
      let currentSubCategory = subCategoryStore.subCategoryDetails.find(x => x.id == route.params.ParamId)

      console.tron.log("current parent", currentSubCategory.parent_id)
      if (currentSubCategory.parent_id <= parentCategoryStore.maxParentId) {
        //Alert.alert("next route")

        let nextParentCategory = parentCategoryStore.parentCategoryDetails.find(x => x.id == (currentSubCategory.parent_id + 1))
        console.tron.log("next parent", nextParentCategory)
        subCategoryStore.getSubCategoryData((currentSubCategory.parent_id + 1))
        console.tron.log(subCategoryStore.subCategoryDetails)

        let nextSubCategory = subCategoryStore.subCategoryDetails.find(x => x.id == currentId)
        console.tron.log("media", nextSubCategory.id)
        if (nextSubCategory.type !== 'Video') {
          navigation.navigate("imagescreen", { ParamMedia: nextSubCategory.media, ParamId: nextSubCategory.id, ParamName: nextSubCategory.name });
        }
        else {
          navigation.navigate("videoscreen", { ParamMedia: nextSubCategory.media, ParamId: nextSubCategory.id, ParamName: nextSubCategory.name });
        }
      }
      else {
        Alert.alert("wrong route")
      }
      //console.tron.log(parentCategoryStore.maxParentId)
    }
  }
  const renderView = ({ item, index }) => {
    var videoUrl = item.url.replace("https://youtu.be/", "");
    return (
      <View style={videoDetailScreenStyles.RENDERVIEW}>
        <Text style={videoDetailScreenStyles.RENDERTITLE}>{item.caption}</Text>
        <TouchableOpacity>
          <YoutubePlayer height={verticalScale(250)} videoId={videoUrl} webViewStyle={videoDetailScreenStyles.RENDERIMAGE} />
        </TouchableOpacity>
        <HTML source={{ html: item.description }} baseFontStyle={videoDetailScreenStyles.RENDERDES} />
      </View>
    );
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <Header headerText={route.params.ParamName} rightIcon="rightIcon" leftIcon="leftIcon" />
      <View style={videoDetailScreenStyles.MAINVIEW}>
        <View style={videoDetailScreenStyles.TOPBUTTONVIEW}>
          <TouchableOpacity style={videoDetailScreenStyles.PREVBUTTON}>
            <View style={videoDetailScreenStyles.INNERBUTTONVIEW}>
              <Icon icon="prevIcon" style={videoDetailScreenStyles.BUTTONIMAGE} />
              <Text style={videoDetailScreenStyles.PREVBUTTONTEXT}>PREV</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextButton()}
            style={videoDetailScreenStyles.NEXTBUTTON}>
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
