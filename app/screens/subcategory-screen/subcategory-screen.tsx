import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native"
import { Screen, Text, Wallpaper, Header } from "../../components"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { subCategoryScreenStyles } from "./subcategory-styles"
import FastImage from "react-native-fast-image"
import { scale } from "../../utils/scale"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const SubcategoryScreen = observer(function SubcategoryScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { subCategoryStore } = useStores()

  const parent_id = route.params.ParamId;
  const titleName = route.params.ParamName;
  const [isLoading, setisLoading] = useState(false);
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      subCategoryStore.setMaxChildId(0)
      // console.tron.log("subcategory max id:...",subCategoryStore.maxChildId)
      callApi()
    }
  }, [isFocused, route.params.ParamId])

  const callApi = () => {
    setisLoading(true)
    subCategoryStore.getSubCategoryData(parent_id)
    setisLoading(false)
  }
  const renderView = ({ item, index }) => {
    //console.tron.log(item)
    //set max child id in sub category store
    let storeChildId = subCategoryStore.maxChildId
    if (storeChildId < item.id) {
      subCategoryStore.setMaxChildId(item.id)
    }
    return (
      <TouchableOpacity onPress={() => {
        if (item.type !== 'Video') {
          navigation.navigate("imagescreen", { ParamMedia: item.media, ParamId: item.id, ParamName: item.name });
        }
        else {
          navigation.navigate("videoscreen", { ParamMedia: item.media, ParamId: item.id, ParamName: item.name });
        }
      }}
        style={subCategoryScreenStyles.BUTTON}>
        <View style={subCategoryScreenStyles.ITEMVIEW}>
          <FastImage style={{
            width: scale(66.7),
            height: scale(66.7),
            backgroundColor: "yellow",
            borderColor: color.palette.yellow,
            borderWidth: 2,
            borderRadius: 300,
          }}
            source={{
              uri: item.icon,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain} />
          <Text style={subCategoryScreenStyles.TEXTSTYLE}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <Header headerText={titleName} rightIcon="rightIcon" leftIcon="leftIcon" />
      {isLoading ? <View style={subCategoryScreenStyles.ACTIVITYINDICATOR}>
        <ActivityIndicator color="white" size={70} />
      </View> : <></>}
      <FlatList
        contentContainerStyle={subCategoryScreenStyles.FLATLIST}
        data={subCategoryStore.subCategoryDetails}
        keyExtractor={(item) => item.id}
        extraData={subCategoryStore.subCategoryDetails}
        renderItem={renderView}
      />
    </Screen>
  )
})
