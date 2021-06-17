import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList, TouchableOpacity, Image, View, ActivityIndicator } from "react-native"
import { Screen, Text, Wallpaper, Header } from "../../components"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { subCategoryScreenStyles } from "./subcategory-styles"

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
  const [load, setLoad] = useState(false);
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      callApi()
    }
  }, [isFocused, route.params.ParamId])

  const callApi = () => {
    setLoad(true)
    subCategoryStore.getSubCategoryData(parent_id)
    setLoad(false)
  }

  const renderView = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => {
        if (item.type !== 'Video') {
          navigation.navigate("imagescreen", { ParamMedia: item.media });
        }
        else {
          navigation.navigate("videoscreen", { ParamMedia: item.media });
        }
      }}
        style={subCategoryScreenStyles.BUTTON}>
        <View style={subCategoryScreenStyles.ITEMVIEW}>
          <Image source={{ uri: item.icon }} style={subCategoryScreenStyles.IMAGESTYLE} />
          <Text style={subCategoryScreenStyles.TEXTSTYLE}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Wallpaper />
      <Header headerText={titleName} rightIcon="rightIcon" leftIcon="leftIcon" />
      {load ? <View style={subCategoryScreenStyles.ACTIVITYINDICATOR}>
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
