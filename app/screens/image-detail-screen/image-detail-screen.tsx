import React, { useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, TouchableOpacity, Dimensions, FlatList, Alert, ActivityIndicator } from "react-native"
import { Screen, Text, Wallpaper, Header, Icon } from "../../components"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { imageDetailScreenStyles } from "./image-detail-styles"
import { useRoute } from "@react-navigation/native"
import HTML from "react-native-render-html"
import FastImage from "react-native-fast-image"
import { verticalScale } from '../../utils/scale';
import YoutubePlayer from "react-native-youtube-iframe";

const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export const ImageDetailScreen = observer(function ImageDetailScreen() {

  const { subCategoryStore, parentCategoryStore } = useStores()
  const navigation = useNavigation()
  const route = useRoute<any>();
  const [index, setIndex] = useState<number>(0)
  const [isLoading, setisLoading] = useState<boolean>(false);
  const isCarousel = useRef(null)

  let currentId = route.params.ParamId;
  let parentId = route.params.ParamParentId;
  let categoryIndex = route.params.ParamCategoryIndex;

  let findParentCategory = subCategoryStore.subCategoryDetails.find(x => x.parentId == parentId)
  let subcategory = findParentCategory.data.find(x => x.id == currentId)
  let parenCategory = parentCategoryStore.parentCategoryDetails.find(x => x.id == parentId)
  subCategoryStore.visitedSubcategory(parentId, parenCategory.name, subcategory.id, subcategory.name, subcategory.media)

  const nextButton = () => {
    currentId = currentId + 1;
    categoryIndex = categoryIndex + 1;
    if (categoryIndex < findParentCategory.data.length) {
      let nextSubCategory = findParentCategory.data.find(x => x.id == currentId)
      navigation.navigate("imagescreen", { ParamId: nextSubCategory.id, ParamName: nextSubCategory.name, ParamParentId: parentId, ParamCategoryIndex: categoryIndex });
    }
    else {
      let parentIndex = subCategoryStore.subCategoryDetails.findIndex(x => x.parentId == parentId + 1)
      if (parentIndex != -1) {
        let findParentCategory = subCategoryStore.subCategoryDetails.find(x => x.parentId == parentId + 1)
        let categoryIndex = 0
        let nextSubCategory = findParentCategory.data[categoryIndex]
        navigation.navigate("imagescreen", { ParamId: nextSubCategory.id, ParamName: nextSubCategory.name, ParamParentId: parentId + 1, ParamCategoryIndex: categoryIndex });
      }
      else {
        if (parentId + 1 <= parentCategoryStore.parentCategoryDetails.length) {
          setisLoading(true)
          subCategoryStore.getSubCategoryData(parentId + 1)
          setisLoading(false)
        }
        let parentIndex = subCategoryStore.subCategoryDetails.findIndex(x => x.parentId == parentId + 1)
        if (parentIndex != -1) {
          let findParentCategory = subCategoryStore.subCategoryDetails.find(x => x.parentId == parentId + 1)
          let categoryIndex = 0
          let nextSubCategory = findParentCategory.data[categoryIndex]
          navigation.navigate("imagescreen", { ParamId: nextSubCategory.id, ParamName: nextSubCategory.name, ParamParentId: parentId + 1, ParamCategoryIndex: categoryIndex });
        }
        else {
          Alert.alert("Finished....")
        }
      }
    }
  }
  const prevButton = () => {
    currentId = currentId - 1;
    categoryIndex = categoryIndex - 1;
    if (categoryIndex >= 0) {
      let prevSubCategory = findParentCategory.data.find(x => x.id == currentId)
      navigation.navigate("imagescreen", { ParamId: prevSubCategory.id, ParamName: prevSubCategory.name, ParamParentId: parentId, ParamCategoryIndex: categoryIndex });
    }
    else {
      let parentIndex = subCategoryStore.subCategoryDetails.findIndex(x => x.parentId == parentId - 1)
      if (parentIndex != -1) {
        let findParentCategory = subCategoryStore.subCategoryDetails.find(x => x.parentId == parentId - 1)
        let categoryIndex = findParentCategory.data.length - 1
        let prevSubCategory = findParentCategory.data[categoryIndex]
        navigation.navigate("imagescreen", { ParamId: prevSubCategory.id, ParamName: prevSubCategory.name, ParamParentId: parentId - 1, ParamCategoryIndex: categoryIndex });
      }
      else {
        Alert.alert("Finished....")
      }
    }
  }
  const renderView = ({ item, index }) => {
    var videoUrl = item.url.replace("https://youtu.be/", "");
    return (
      <View style={imageDetailScreenStyles.RENDERVIEW}>
        <Text style={imageDetailScreenStyles.RENDERTITLE}>{item.caption}</Text>
        <TouchableOpacity>
          <YoutubePlayer height={verticalScale(250)} videoId={videoUrl} webViewStyle={imageDetailScreenStyles.RENDERIMAGE} />
        </TouchableOpacity>
        <HTML source={{ html: item.description }} baseFontStyle={imageDetailScreenStyles.RENDERDES} />
      </View>
    );
  }
  const CarouselCardItem = ({ item, index }) => {
    const dataIndex = subCategoryStore.visitedSubcategorydata.findIndex(x => x.categoryId == item.category_id)
    const copyData = [...subCategoryStore.visitedSubcategorydata[dataIndex].media]
    const index1 = copyData.findIndex(x => x.id == item.id)
    if (index1 == -1) {
      subCategoryStore.updateMediaList(parentId, parenCategory.name, subcategory.id, subcategory.name, item)
    }
    return (
      <View key={index}>
        <FastImage style={imageDetailScreenStyles.SLIDERIMAGE}
          source={{
            uri: item.url,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={imageDetailScreenStyles.SLIDERTITLE} text={item.caption} />
        <HTML source={{ html: item.description }}
          baseFontStyle={imageDetailScreenStyles.SLIDERDES} />
      </View>
    )
  }
  return (
    <Screen style={imageDetailScreenStyles.MAINVIEW} preset="fixed">
      <Wallpaper />
      <Header headerText={route.params.ParamName} rightIcon="rightIcon" leftIcon="leftIcon" />
      {isLoading ? <View style={imageDetailScreenStyles.ACTIVITYINDICATOR}>
        <ActivityIndicator color="white" size={70} />
      </View> : <></>}
      <View style={imageDetailScreenStyles.MAINVIEW}>
        <View style={imageDetailScreenStyles.TOPBUTTONVIEW}>
          <TouchableOpacity onPress={() => prevButton()}
            style={imageDetailScreenStyles.PREVBUTTON}>
            <View style={imageDetailScreenStyles.INNERBUTTONVIEW}>
              <Icon icon="prevIcon" style={imageDetailScreenStyles.BUTTONIMAGE} />
              <Text style={imageDetailScreenStyles.PREVBUTTONTEXT}>PREV</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextButton()}
            style={imageDetailScreenStyles.NEXTBUTTON}>
            <View style={imageDetailScreenStyles.INNERBUTTONVIEW}>
              <Text style={imageDetailScreenStyles.NEXTBUTTONTEXT}>NEXT</Text>
              <Icon icon="nextIcon" style={imageDetailScreenStyles.BUTTONIMAGE} />
            </View>
          </TouchableOpacity>
        </View>
        {subcategory.type == 'Image'
          ? <View
            style={imageDetailScreenStyles.SLIDEVIEW}>
            <Carousel
              layoutCardOffset={9}
              ref={isCarousel}
              data={subcategory.media}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              keyExtractor={item => item.id}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true}
            />
            <Pagination
              dotsLength={subcategory.media.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={imageDetailScreenStyles.PAGINATION}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              inactiveDotColor="white"
              dotColor="yellow"
              tappableDots={true}
            />
          </View>
          : <FlatList
            contentContainerStyle={imageDetailScreenStyles.FLATLIST}
            data={subcategory.media}
            keyExtractor={(item) => item.id.toString()}
            extraData={subcategory.media}
            renderItem={renderView}
          />}
        {subcategory.type == 'None' ?
          <View
            style={imageDetailScreenStyles.NONEVIEW}>
            <Icon icon="nothing" style={imageDetailScreenStyles.NONEIMAGE} />
            <Text style={imageDetailScreenStyles.NONETEXT}>Nothing....</Text>
          </View> : <></>}
      </View>
    </Screen>
  )
})
