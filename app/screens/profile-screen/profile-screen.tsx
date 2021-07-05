import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, Image, TouchableOpacity, Animated, StyleSheet, FlatList, Alert, TextInput, Dimensions } from "react-native"
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
const MIN_HEIGHT = 160
const HEIGHT_DIFF = MAX_HEIGHT - MIN_HEIGHT
const DEVICE_WIDTH = Dimensions.get('window').width



export const ProfileScreen = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  const { authStore, subCategoryStore } = useStores()
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
      extrapolate: "clamp"
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
  const [list, setList] = useState<any>();
  const [filterList, setFilterList] = useState<any>();

  useEffect(() => {
    if (isFocused) {
      setList(subCategoryStore.visitedSubcategorydata);
      console.tron.log(subCategoryStore.visitedSubcategorydata)
    }
  }, [isFocused]);
  const renderCloseButton = (text: string) => {
    return (
      <TouchableOpacity onPress={() => {
        if (text == "PREPARE") {
          setChangeView(false);
          setText("PREPARE")
        } else if (text == "LEARN") {
          setChangeView1(false)
          setText("LEARN")
        } else {
          setChangeView2(false)
          setText("TRAIN")
        }
      }}
        style={profileScreenStyles.CLOSEBUTTON}>
        <Text style={profileScreenStyles.CLOSEBUTTONTEXT}>{text}</Text>
        <Icon icon="upArrow" style={profileScreenStyles.BUTTONICON} />
      </TouchableOpacity>
    );
  }
  const renderOpenButton = (text: string) => {
    return (
      <TouchableOpacity onPress={() => {
        if (text == "PREPARE") {
          setChangeView(true);
          setText("")
        } else if (text == "LEARN") {
          setChangeView1(true)
          setText("")
        } else {
          setChangeView2(true)
          setText("")
        }
      }}
        style={profileScreenStyles.OPENBUTTON}>
        <Text style={profileScreenStyles.OPENBUTTONTEXT}>{text}</Text>
        <Icon icon="downArrow" style={profileScreenStyles.BUTTONICON} />
      </TouchableOpacity>
    );
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
            subCategoryStore.deletevisitedsubcategory(item.category_id, item.id, text)
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
        <Text style={profileScreenStyles.DISPLAYTEXT}>{item.categoryName}</Text>
        <FlatList
          horizontal
          data={item.media}
          renderItem={({ item }) => <ListItem item={item} />}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={profileScreenStyles.LISTSEPARATOR} />}
        />
      </>
    );
  }
  const displayView = (index: number) => {
    let visitedSubcategory = subCategoryStore.visitedSubcategorydata.filter(x => x.parentId == index)
    visitedSubcategory.sort((a, b) => (a.categoryId > b.categoryId) ? 1 : -1)
    if (visitedSubcategory.length != 0) {
      return (
        <View style={profileScreenStyles.DISPLAYVIEW}>
          <FlatList
            data={visitedSubcategory}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={profileScreenStyles.LISTSEPARATOR} />}
            renderItem={renderView}
          />
        </View>
      );
    } else {
      Alert.alert("category empty.....")
    }
  }
  const filterdata = (text: string) => {
    if (text) {
      const newData = list.filter(x => x.categoryName.toLowerCase().includes(text.toLowerCase()) || x.parentName.toLowerCase().includes(text.toLowerCase()))
      console.tron.log("fileter...", newData)
      setFilterList(newData)
      setShow(text)
    } else {
      setShow(text)
    }
  }
  const displaySearchList = ({ item }) => {
    if (item.categoryName.toLowerCase().includes(show.toLowerCase())) {
      return (<Text text={item.categoryName} style={profileScreenStyles.TEXTINPUT} />);
    }
    if (item.parentName.toLowerCase().includes(show.toLowerCase())) {
      return (<Text text={item.parentName} style={profileScreenStyles.TEXTINPUT} />);
    }
  }

  const [activeSections, setActiveSections] = React.useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);

  const toggleExpanded = () => {
    // Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };
  const setSections = (sections) => {
    // Setting up a active section state
    setActiveSections(
      sections.includes(undefined) ? [] : sections
    );
  };
  const renderHeader = (section, _, isActive) => {
    // Accordion header view
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.header,
          isActive ? styles.active : styles.inactive
        ]}
        transition="backgroundColor">
        <Text style={styles.headerText}>
          {section.title}
        </Text>
      </Animatable.View>
    );
  };
  const renderContent = (section, _, isActive) => {
    // Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.content,
          isActive ? styles.active : styles.inactive
        ]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{ textAlign: 'center' }}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };
  return (
    <Screen style={profileScreenStyles.ROOT} preset="fixed">
      <Wallpaper />
      <Header headerText="Profile" />

      <Animated.View style={[profileScreenStyles.PROFILEVIEW, { maxHeight: headerHight, backgroundColor: "transparent" }]}>
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
          <Animated.Text style={[profileScreenStyles.PROFILENAME, { minWidth: minWidth }]}>
          {authStore.userDetails.userName != "" ? authStore.userDetails.userName : "Person Name"}
          </Animated.Text>
          <Animated.Text style={[profileScreenStyles.PROFILETEXT, { minWidth: minWidth }]}>
          {authStore.userDetails.userEmail != ""? authStore.userDetails.userEmail :"Person Email"}
          </Animated.Text>
          <Animated.Text style={[profileScreenStyles.PROFILETEXT, { minWidth: minWidth }]}>
          {authStore.userDetails.dateOfBirth != ""? authStore.userDetails.dateOfBirth :"person Birthdate"}
          </Animated.Text>
          {/* {authStore.userDetails.userName != ""
            ? <Text style={profileScreenStyles.PROFILENAME}>{authStore.userDetails.userName}</Text>
            : <Text style={profileScreenStyles.PROFILENAME}>text</Text>
          } */}
          {/* {authStore.userDetails.userEmail != ""
            ? <Text style={profileScreenStyles.PROFILETEXT}>{authStore.userDetails.userEmail}</Text>
            : <></>}
          {authStore.userDetails.dateOfBirth != ""
            ? <Text style={profileScreenStyles.PROFILETEXT}>17th, March, 1986</Text>
            : <Text style={profileScreenStyles.PROFILETEXT}>17th, March, 1986</Text>} */}
        </Animated.View>
      </Animated.View>
      <View style={{ flexGrow: 1, marginTop: MAX_HEIGHT }}>
        <Animated.ScrollView onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
          scrollEventThrottle={16}>
          <View style={profileScreenStyles.CATEGORYVIEW}>
            <Text style={profileScreenStyles.SAVEDTEXT}>Saved Category</Text>


            <View style={profileScreenStyles.SEARCHVIEW}>
              <TextInput
                value={show}
                onChangeText={(text) => filterdata(text)}
                placeholder="Search categories"
                placeholderTextColor="white"
                style={profileScreenStyles.TEXTINPUT} />
              <Icon icon="search"
                style={profileScreenStyles.SEARCHIMAGE} />
            </View>

            {show ? <FlatList
              style={profileScreenStyles.SEARCHLIST}
              data={filterList}
              renderItem={displaySearchList}
              ItemSeparatorComponent={() => <View style={profileScreenStyles.ITEMSEPERATOR} />}
            /> : <></>}

            {changeView ? renderCloseButton("PREPARE") : renderOpenButton("PREPARE")}
            {text == "PREPARE" ? displayView(1) : <></>}

            {changeView1 ? renderCloseButton("LEARN") : renderOpenButton("LEARN")}
            {text == "LEARN" ? displayView(2) : <></>}

            {changeView2 ? renderCloseButton("TRAIN") : renderOpenButton("TRAIN")}
            {text == "TRAIN" ? displayView(3) : <></>}

          </View>
          {/* <Accordion
        sections={CONTENT}
        activeSections={activeSections}
        renderSectionTitle={renderSectionTitle}
        renderHeader={renderHeader}
        renderContent={renderContent}
        // onChange={updateSections}
      /> */}
          {/* <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
            renderAsFlatList={false}
          /> */}
        </Animated.ScrollView>
      </View>
    </Screen >
  )
})

const CONTENT = [
  {
    title: 'Terms and Conditions',
    content:
      "The following terms and conditions, together with any referenced documents form a legal agreement between you and your employer, employees,agents, contractors and any other entity on whose behalf you accept these terms",
  },
  {
    title: 'Privacy Policy',
    content:
      "A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users,what kind of personal data you collect and what you do with that data.",
  },
  // {
  //   title: 'Return Policy',
  //   content:
  //     'Our Return & Refund Policy template lets you get 
  //      started with a Return and Refund Policy agreement. 
  //      This template is free to download and use. According to
  //      TrueShip study, over 60% of customers review a Return/Refund
  //      Policy before they make a purchasing decision.',
  // },
];

//To make the selector (Something like tabs)
const SELECTORS = [
  { title: 'T&C', value: 0 },
  { title: 'Privacy Policy', value: 1 },
  { title: 'Return Policy', value: 2 },
  { title: 'Reset all' },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
    color: "black"
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});