import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native"
import { Screen, Text, Wallpaper, Header } from "../../components"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { subCategoryScreenStyles } from "./subcategory-styles"
import FastImage from "react-native-fast-image"

export const SubcategoryScreen = observer(function SubcategoryScreen() {
  
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { subCategoryStore } = useStores()
  const parent_id = route.params.ParamId;
  const titleName = route.params.ParamName;
  const [isLoading, setisLoading] = useState<boolean>(false);
  const isFocused = useIsFocused()
  const [FlatListData, setFlatListData] = useState<any>();
  useEffect(() => {
    if (isFocused) {
      subCategoryStore.setCurrentSubCategoryId(parent_id)
      callApi()
    }
  }, [isFocused, route.params.ParamId])
  const callApi = async () => {
    setisLoading(true)
    await subCategoryStore.getSubCategoryData(parent_id)
    setisLoading(false)
    let subCategoryData = subCategoryStore.subCategoryDetails.find(x => x.parentId == parent_id)
    setFlatListData(subCategoryData.data)
  }
  const renderView = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => {
        let subCategoryData = subCategoryStore.subCategoryDetails.find(x => x.parentId == parent_id)
        let categoryIndex = subCategoryData.data.findIndex(x => x.id == item.id)
        navigation.navigate("imagescreen", { ParamId: item.id, ParamName: item.name, ParamParentId: parent_id, ParamCategoryIndex: categoryIndex });
      }}
        style={subCategoryScreenStyles.BUTTON}>
        <View style={subCategoryScreenStyles.ITEMVIEW}>
          <FastImage style={subCategoryScreenStyles.IMAGESTYLE}
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
    <Screen style={subCategoryScreenStyles.ROOT} preset="fixed">
      <Wallpaper />
      <Header headerText={titleName} rightIcon="rightIcon" leftIcon="leftIcon" />
      {isLoading ? <View style={subCategoryScreenStyles.ACTIVITYINDICATOR}>
        <ActivityIndicator color="#eece00" size={70} />
      </View> : <></>}
      <FlatList
        contentContainerStyle={subCategoryScreenStyles.FLATLIST}
        data={FlatListData}
        keyExtractor={(item) => item.id.toString()}
        extraData={subCategoryStore.subCategoryDetails}
        renderItem={renderView}
      />
    </Screen>
  )
})
