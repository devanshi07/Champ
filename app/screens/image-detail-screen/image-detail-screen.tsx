import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Dimensions, Alert } from "react-native"
import { Screen, Text, Wallpaper, Header, Icon } from "../../components"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { imageDetailScreenStyles } from "./image-detail-styles"
import { useRoute } from "@react-navigation/native"
import HTML from "react-native-render-html"
import FastImage from "react-native-fast-image"
import { verticalScale } from '../../utils/scale';

const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
export const ImageDetailScreen = observer(function ImageDetailScreen() {
  // Pull in one of our MST stores
  const { subCategoryStore,parentCategoryStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const route = useRoute<any>();

  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  const medias = route.params.ParamMedia;
  let currentId = route.params.ParamId;

  const nextButton = () => {
    currentId = currentId + 1;
    console.tron.log("current id.......",currentId)
    if (currentId <= subCategoryStore.maxChildId) {
      let nextSubCategory = subCategoryStore.subCategoryDetails.find(x => x.id == currentId)
      console.tron.log("media.....", nextSubCategory)
      if (nextSubCategory.type !== 'Video') {
        navigation.navigate("imagescreen", { ParamMedia: nextSubCategory.media, ParamId: nextSubCategory.id, ParamName: nextSubCategory.name });
      }
      else {
        navigation.navigate("videoscreen", { ParamMedia: nextSubCategory.media, ParamId: nextSubCategory.id, ParamName: nextSubCategory.name });
      }
    }
    else {
      console.tron.log(parentCategoryStore.maxParentId)
      Alert.alert("wrong route")
    }
  }
  const CarouselCardItem = ({ item, index }) => {
    //console.tron.log(item.url)
    return (
      <View key={index}>
        <FastImage style={{
          alignSelf: 'center',
          width: "100%",
          height: verticalScale(270.7),
          marginBottom: verticalScale(26.3),
        }}
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
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <Header headerText={route.params.ParamName} rightIcon="rightIcon" leftIcon="leftIcon" />
      <View style={imageDetailScreenStyles.MAINVIEW}>
        <View style={imageDetailScreenStyles.TOPBUTTONVIEW}>

          <TouchableOpacity style={imageDetailScreenStyles.PREVBUTTON}>
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
        <View
          style={imageDetailScreenStyles.SLIDEVIEW}>
          <Carousel
            layoutCardOffset={9}
            ref={isCarousel}
            data={medias}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            keyExtractor={item => item.id}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
          />
          <Pagination
            dotsLength={medias.length}
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
      </View>
    </Screen>
  )
})
