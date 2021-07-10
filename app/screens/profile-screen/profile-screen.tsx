import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Image, TouchableOpacity, Animated, FlatList, TextInput, Dimensions, BackHandler } from "react-native"
import { Screen, Text, Wallpaper, Header, Icon } from "../../components"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import FastImage from "react-native-fast-image"
import { profileScreenStyles } from "./profile-styles"
import { useRef } from "react"

import Accordion from 'react-native-collapsible/Accordion'
import * as Animatable from 'react-native-animatable'

const MAX_HEIGHT = 260
const MIN_HEIGHT = 150
const HEIGHT_DIFF = MAX_HEIGHT - MIN_HEIGHT
const DEVICE_WIDTH = Dimensions.get('window').width

export const ProfileScreen = observer(function ProfileScreen() {
  const { authStore, subCategoryStore, parentCategoryStore } = useStores()
  const scrollY = useRef(new Animated.Value(0)).current
  const headerHight = scrollY.interpolate(
    {
      inputRange: [0, HEIGHT_DIFF],
      outputRange: [MAX_HEIGHT, MIN_HEIGHT],
      extrapolate: "clamp"
    }
  )
  const imageTop = scrollY.interpolate(
    {
      inputRange: [0, HEIGHT_DIFF],
      outputRange: [10, 25],
      extrapolate: "clamp"
    }
  )
  const imageLeft = scrollY.interpolate(
    {
      inputRange: [0, 60, HEIGHT_DIFF],
      outputRange: [DEVICE_WIDTH / 2 - 60, 42, 32],
      extrapolate: "clamp"
    }
  )
  const userDetailTop = scrollY.interpolate(
    {
      inputRange: [0, HEIGHT_DIFF],
      outputRange: [160, 60],
      extrapolate: "clamp"
    }
  )
  const userDetailLeft = scrollY.interpolate(
    {
      inputRange: [0, 40, 50, HEIGHT_DIFF],
      outputRange: [0, 160, 160, 160],
      extrapolate: "clamp"
    }
  )
  const userDetailRight = scrollY.interpolate(
    {
      inputRange: [0, HEIGHT_DIFF],
      outputRange: [0, 10],
      extrapolate: "clamp"
    }
  )
  const minWidth = scrollY.interpolate(
    {
      inputRange: [0, HEIGHT_DIFF],
      outputRange: ["100%", "0%"],
      extrapolate: "clamp",

    }
  )
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [categoryList, setcategoryList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeSections, setActiveSections] = React.useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchData();
      BackHandler.addEventListener("hardwareBackPress", backAction)
    }
    return function cleanUp() {
      setSearchText('')
      setcategoryList([])
      setFilterList([])
      setActiveSections([])
      BackHandler.removeEventListener("hardwareBackPress", backAction)
    }
  }, [isFocused]);

  function backAction() {
    navigation.navigate("dashboradScreen");
    return true;
  }

  function fetchData() {
    let ids = []
    subCategoryStore.visitedSubcategorydata.forEach(visitedElement => {
      visitedElement.media.forEach(x => {
        ids.push(x.id)
      })
    })
    let tempArray = [];
    parentCategoryStore.parentCategoryDetails.forEach(parentCategoryElement => {
      subCategoryStore.subCategoryDetails.forEach(subCategoryElement => {
        if (subCategoryElement.parentId == parentCategoryElement.id) {
          let visitedMedia = [];
          subCategoryElement.data.forEach(dataElement => {
            //object for filter data
            let tempObj = new Object;
            tempObj['name'] = dataElement.name;
            if (dataElement.type != 'None') {
              //filter data media by ids
              let temp = dataElement.media.filter((item) => {
                return ids.indexOf(item.id) > -1;
              })
              if (temp.length != 0) {
                tempObj['media'] = temp;
                visitedMedia.push(tempObj);
              }
            }
          });
          if (visitedMedia.length > 0) {
            tempArray.push({ title: parentCategoryElement.name, content: visitedMedia });
          }
        }
      });
    });
    setcategoryList(tempArray);
    setFilterList(tempArray);
  }
  function searchFilter(text) {
    console.tron.log(text)
    setSearchText(text);
    if (text == "") {
      setFilterList(categoryList)
      setActiveSections([]);
    }
    else {
      let filterArray = categoryList.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
      if (filterArray.length > 0) {
        setFilterList(filterList);
        setActiveSections([0]);
      }
      else {
        let copiedArray = categoryList.slice();
        let tempArray = copiedArray.map((element) => {
          return {
            ...element,
            content: element.content.filter((subElement) =>
              subElement.name.toLowerCase().includes(text.toLowerCase()))
          }
        });
        let filteredArray = tempArray.filter((item) => item.content.length > 0)
        setFilterList(filteredArray);
        setActiveSections([0]);
      }
    }
  }
 
  const ListItem = ({ item }) => {
    return (
      <View style={profileScreenStyles.LISTVIEW}>
        <View style={profileScreenStyles.LISTITEMVIEW}>
          <FastImage style={item.type == 'Image' ? profileScreenStyles.LISTIMAGE : profileScreenStyles.LISTVIDEOIMAGE}
            source={{
              uri: item.type == 'Image' ? item.url : item.video_cover,
              priority: FastImage.priority.normal,
            }}
            resizeMode={item.type == 'Image' ? FastImage.resizeMode.contain : FastImage.resizeMode.cover}
          />
          <TouchableOpacity onPress={() => {
            let stringtext = subCategoryStore.visitedSubcategorydata.find(x => x.categoryId == item.category_id)
            subCategoryStore.deletevisitedsubcategory(item.category_id, item.id, stringtext.parentName)
            setActiveSections([])
            fetchData()
          }}
            style={profileScreenStyles.DELETEVIEW}>
            <Icon icon="delete" style={profileScreenStyles.DELETEICON} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderView = ({ item }) => {
    return (
      <>
        <Text style={profileScreenStyles.DISPLAYTEXT}>{item.name}</Text>
        <FlatList
          horizontal
          data={item.media}
          renderItem={({ item }) => <ListItem item={item} />}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={profileScreenStyles.LISTSEPARATOR}/>}
        />
      </>
    );
  }
  
  const renderHeader = (section, index, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={isActive ? profileScreenStyles.OPENBUTTON : profileScreenStyles.CLOSEBUTTON
        }
        transition="backgroundColor">
        <Text style={isActive ? profileScreenStyles.OPENBUTTONTEXT : profileScreenStyles.CLOSEBUTTONTEXT}>
          {section.title}
        </Text>
        <Icon icon={isActive ? "downArrow" : "upArrow"} style={profileScreenStyles.BUTTONICON} />
      </Animatable.View>
    );
  };
  const renderContent = (section) => {
    return (
      <View style={profileScreenStyles.DISPLAYVIEW}>
        <FlatList
          data={section.content}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={profileScreenStyles.LISTSEPARATOR} />}
          renderItem={renderView}
        />
      </View>
    );
  };
  return (
    <Screen style={profileScreenStyles.ROOT} preset="fixed">
      <Wallpaper />
      <Header headerText="Profile" />

      <Animated.View style={[profileScreenStyles.PROFILEVIEW, { maxHeight: headerHight,backgroundColor:'rgba(52, 52, 52, 0.8)' }]}>
        <Animated.View style={[{
          top: imageTop, left: imageLeft, position: "absolute", bottom: 0,
        }]}>
          {authStore.userDetails.profileUrl != ""
            ? <Image
              source={{ uri: authStore.userDetails.profileUrl }}
              style={profileScreenStyles.PROFILEIMAGE} />
            : <View style={profileScreenStyles.PLACEHOLDERVIEW}>
              <Text style={profileScreenStyles.PLACEHOLDERTEXT}>PlaceHolder</Text>
            </View>}
        </Animated.View>
        <Animated.View style={{
          position: "absolute",
          height: 100,
          justifyContent: "center",
          top: userDetailTop,
          left: userDetailLeft,
          right: userDetailRight
        }}>
          <Animated.Text style={[profileScreenStyles.PROFILENAME, { minWidth }]}>
            {authStore.userDetails.userName != "" ? authStore.userDetails.userName : "Person Name"}
          </Animated.Text>
          <Animated.Text style={[profileScreenStyles.PROFILETEXT, { minWidth }]}>
            {authStore.userDetails.userEmail != "" ? authStore.userDetails.userEmail : "Person Email"}
          </Animated.Text>
          <Animated.Text style={[profileScreenStyles.PROFILETEXT, { minWidth }]}>
            {authStore.userDetails.dateOfBirth != "" ? authStore.userDetails.dateOfBirth : "person Birthdate"}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <View style={{ flexGrow: 1, marginTop: MAX_HEIGHT }}>
        <Animated.ScrollView onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
          scrollEventThrottle={16}
          style={{backgroundColor:"#0C090A",paddingBottom:20}}>
          <View style={profileScreenStyles.CATEGORYVIEW}>
            <Text style={profileScreenStyles.SAVEDTEXT}>Saved Category</Text>

            <View style={profileScreenStyles.SEARCHVIEW}>
              <TextInput
                value={searchText}
                onChangeText={(text) => searchFilter(text)}
                placeholder="Search categories"
                placeholderTextColor="white"
                style={profileScreenStyles.TEXTINPUT} />
              <Icon icon="search"
                style={profileScreenStyles.SEARCHIMAGE} />
            </View>
            <Accordion
              activeSections={activeSections}
              sections={filterList}
              touchableComponent={TouchableOpacity}
              expandMultiple={true}
              renderHeader={renderHeader}
              renderContent={renderContent}
              duration={400}
              onChange={(activeSections) => setActiveSections(activeSections)}
            />
          </View>
        </Animated.ScrollView>
      </View>
    </Screen >
  )
})

