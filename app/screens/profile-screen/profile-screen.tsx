import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, Image, TouchableOpacity, Animated, StyleSheet, FlatList, Alert, Switch, TextInput, Dimensions, BackHandler } from "react-native"
import { Screen, Text, Wallpaper, Header, Icon } from "../../components"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import FastImage from "react-native-fast-image"
import { profileScreenStyles } from "./profile-styles"
import { useRef } from "react"

import Accordion from 'react-native-collapsible/Accordion'
import Collapsible from 'react-native-collapsible'
import * as Animatable from 'react-native-animatable'

const MAX_HEIGHT = 260
const MIN_HEIGHT = 150
const HEIGHT_DIFF = MAX_HEIGHT - MIN_HEIGHT
const DEVICE_WIDTH = Dimensions.get('window').width



export const ProfileScreen = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  const { authStore, subCategoryStore, parentCategoryStore } = useStores()
  const scrollY = useRef(new Animated.Value(0)).current
  let anystring = [];

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


  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [text, setText] = useState<string>("");
  const [changeView, setChangeView] = useState<boolean>(true);
  const [changeView1, setChangeView1] = useState<boolean>(true);
  const [changeView2, setChangeView2] = useState<boolean>(true);

  const [show, setShow] = useState<any>("");
  const [categoryList, setcategoryList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [idlist, setidList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeSections, setActiveSections] = React.useState([]);
  const [list, setList] = useState<any>();


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
  // function fetchIds() {
  //   let ids = []

  //   subCategoryStore.visitedSubcategorydata.forEach(visitedElement => {
  //     visitedElement.media.forEach(x => {
  //       ids.push(x.id)
  //     })
  //   })
  //   setidList(ids);
  // }
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
            // console.tron.log(dataElement.name)
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
    console.tron.log(categoryList)
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
  // const renderCloseButton = (text: string) => {
  //   return (
  //     <TouchableOpacity onPress={() => {
  //       if (text == "PREPARE") {
  //         setChangeView(false);
  //         setText("PREPARE")
  //       } else if (text == "LEARN") {
  //         setChangeView1(false)
  //         setText("LEARN")
  //       } else {
  //         setChangeView2(false)
  //         setText("TRAIN")
  //       }
  //     }}
  //       style={profileScreenStyles.CLOSEBUTTON}>
  //       <Text style={profileScreenStyles.CLOSEBUTTONTEXT}>{text}</Text>
  //       <Icon icon="upArrow" style={profileScreenStyles.BUTTONICON} />
  //     </TouchableOpacity>
  //   );
  // }
  // const renderOpenButton = (text: string) => {
  //   return (
  //     <TouchableOpacity onPress={() => {
  //       if (text == "PREPARE") {
  //         setChangeView(true);
  //         setText("")
  //       } else if (text == "LEARN") {
  //         setChangeView1(true)
  //         setText("")
  //       } else {
  //         setChangeView2(true)
  //         setText("")
  //       }
  //     }}
  //       style={profileScreenStyles.OPENBUTTON}>
  //       <Text style={profileScreenStyles.OPENBUTTONTEXT}>{text}</Text>
  //       <Icon icon="downArrow" style={profileScreenStyles.BUTTONICON} />
  //     </TouchableOpacity>
  //   );
  // }
  const ListItem = ({ item }) => {
    // console.tron.log("item...", item)
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
  const renderView = ({ item, index }) => {
    return (
      <>
        {/* <Text style={profileScreenStyles.DISPLAYTEXT}>{item.categoryName}</Text> */}
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
  // const displayView = (index: number) => {
  //   let visitedSubcategory = subCategoryStore.visitedSubcategorydata.filter(x => x.parentId == index)
  //   visitedSubcategory.sort((a, b) => (a.categoryId > b.categoryId) ? 1 : -1)
  //   if (visitedSubcategory.length != 0) {
  //     return (
  //       <View style={profileScreenStyles.DISPLAYVIEW}>
  //         <FlatList
  //           data={visitedSubcategory}
  //           showsHorizontalScrollIndicator={false}
  //           ItemSeparatorComponent={() => <View style={profileScreenStyles.LISTSEPARATOR} />}
  //           renderItem={renderView}
  //         />
  //       </View>
  //     );
  //   } else {
  //     Alert.alert("category empty.....")
  //   }
  // }
  // const filterdata = (text: string) => {
  //   if (text) {
  //     const newData = list.filter(x => x.categoryName.toLowerCase().includes(text.toLowerCase()) || x.parentName.toLowerCase().includes(text.toLowerCase()))
  //     console.tron.log("fileter...", newData)
  //     setFilterList(newData)
  //     setShow(text)
  //   } else {
  //     setShow(text)
  //   }
  // }
  // const displaySearchList = ({ item }) => {
  //   if (item.categoryName.toLowerCase().includes(show.toLowerCase())) {
  //     return (<Text text={item.categoryName} style={profileScreenStyles.TEXTINPUT} />);
  //   }
  //   if (item.parentName.toLowerCase().includes(show.toLowerCase())) {
  //     return (<Text text={item.parentName} style={profileScreenStyles.TEXTINPUT} />);
  //   }
  // }



  const renderHeader = (section, index, isActive) => {
    // Accordion header view
    // console.log("header....",section)
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
  const renderContent = (section, index, isActive) => {
    // console.tron.log("content....",section)
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

            {/* {show ? <FlatList
              style={profileScreenStyles.SEARCHLIST}
              data={filterList}
              renderItem={displaySearchList}
              ItemSeparatorComponent={() => <View style={profileScreenStyles.ITEMSEPERATOR} />}
            /> : <></>} */}

            {/* {changeView ? renderCloseButton("PREPARE") : renderOpenButton("PREPARE")}
            {text == "PREPARE" ? displayView(1) : <></>}

            {changeView1 ? renderCloseButton("LEARN") : renderOpenButton("LEARN")}
            {text == "LEARN" ? displayView(2) : <></>}

            {changeView2 ? renderCloseButton("TRAIN") : renderOpenButton("TRAIN")}
            {text == "TRAIN" ? displayView(3) : <></>} */}

            <Accordion
              activeSections={activeSections}
              // For any default active section
              sections={filterList}
              // Title and content of accordion
              touchableComponent={TouchableOpacity}
              // Which type of touchable component you want
              // It can be the following Touchables
              // TouchableHighlight, TouchableNativeFeedback
              // TouchableOpacity , TouchableWithoutFeedback
              expandMultiple={true}
              // If you want to expand multiple at a time
              renderHeader={renderHeader}
              // Header Component(View) to render
              renderContent={renderContent}
              // Content Component(View) to render
              duration={400}
              // Duration for Collapse and expand
              onChange={(activeSections) => setActiveSections(activeSections)}
            // Setting the state of active sections 
            />
          </View>
        </Animated.ScrollView>
      </View>
    </Screen >
  )
})

// const CONTENT = [
//   {
//     title: 'Terms and Conditions',
//     content:
//       "The following terms and conditions, together with any referenced documents form a legal agreement between you and your employer, employees,agents, contractors and any other entity on whose behalf you accept these terms",
//   },
//   {
//     title: 'Privacy Policy',
//     content:
//       "A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users,what kind of personal data you collect and what you do with that data.",
//   },

// ];

//To make the selector (Something like tabs)
// const SELECTORS = [
//   { title: 'T&C', value: 0 },
//   { title: 'Privacy Policy', value: 1 },
//   { title: 'Return Policy', value: 2 },
//   { title: 'Reset all', value: 3 },
// ];
