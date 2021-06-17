import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Dimensions, Image } from "react-native"
import { Screen, Text, Wallpaper, Header, Icon } from "../../components"
import Carousel, { Pagination } from "react-native-snap-carousel"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { imageDetailScreenStyles } from "./image-detail-styles"
import { useRoute } from "@react-navigation/native"
import HTML from "react-native-render-html"

const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

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

  const route = useRoute<any>();

  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  const medias = route.params.ParamMedia;
  
  const CarouselCardItem = ({ item, index }) => {
    console.tron.log(item.url)
    return (
      <View key={index}>
        <Image
          source={{
            uri: item.url,
          }}
          resizeMode="contain"
          style={imageDetailScreenStyles.SLIDERIMAGE}
        />
        <Text style={imageDetailScreenStyles.SLIDERTITLE} text={item.caption} />
        {/* <Text style={imageDetailScreenStyles.SLIDERDES} text={item.description} /> */}
        <HTML source={{html:item.description}} containerStyle={imageDetailScreenStyles.SLIDERDES}
        baseFontStyle={imageDetailScreenStyles.SLIDERDES}/>
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Wallpaper />
      <Header headerText="Image Detail" rightIcon="rightIcon" leftIcon="leftIcon" />
      <View style={imageDetailScreenStyles.MAINVIEW}>
        <View style={imageDetailScreenStyles.TOPBUTTONVIEW}>

          <TouchableOpacity style={imageDetailScreenStyles.PREVBUTTON}>
            <View style={imageDetailScreenStyles.INNERBUTTONVIEW}>
              <Icon icon="prevIcon" style={imageDetailScreenStyles.BUTTONIMAGE} />
              <Text style={imageDetailScreenStyles.PREVBUTTONTEXT}>PREV</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={imageDetailScreenStyles.NEXTBUTTON}>
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
