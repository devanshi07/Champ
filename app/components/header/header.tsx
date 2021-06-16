import React from "react"
import { View, ViewStyle, TextStyle, ImageStyle, StatusBar } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { color } from "../../theme"
import { translate } from "../../i18n/"
import { moderateVerticalScale, scale, verticalScale } from "../../utils/scale"
import { useNavigation } from "@react-navigation/native"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: verticalScale(51.1),
  borderBottomColor: color.palette.white,
  borderBottomWidth: 0.5,
}
const TITLE: TextStyle = {
  textAlign: "center",
  fontSize: moderateVerticalScale(24),
  alignSelf: "center",
  textTransform:"capitalize"
}
const TITLE_MIDDLE: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  marginBottom: verticalScale(17.7),
  marginTop: verticalScale(33.3),
}
const LEFT: ViewStyle = {
  width: 30,
  marginLeft: scale(33),
}
const LEFT1: ImageStyle = {
  width: scale(30),
  marginLeft: scale(33.3),
  height: verticalScale(16.3),
  marginBottom: verticalScale(18.3),
  marginTop:verticalScale(17.3)
}
const RIGHT: ViewStyle = {
  width: scale(20.7),
  height: verticalScale(15),
  marginBottom: verticalScale(18.7),
  marginTop: verticalScale(17.4),
}
const RIGHT1: ImageStyle = {
  width: scale(20.7),
  height: verticalScale(20),
  marginBottom: verticalScale(18.7),
  marginTop: verticalScale(17.4),
  marginRight: scale(33.3)
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""
  const navigation = useNavigation<any>()
  return (
    <View style={{ ...ROOT, ...style }}>
      <StatusBar backgroundColor="black"/>

      {leftIcon ? (
        <Button preset="link" onPress={() => navigation.goBack()}>
          <Icon icon={"leftIcon"} style={LEFT1}/>
        </Button>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={{ ...TITLE, ...titleStyle }} text={header} />
      </View>
      {rightIcon ? (
        <Button preset="link" onPress={() => navigation.toggleDrawer()}>
          <Icon icon={"rightIcon"} style={RIGHT1} />
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
