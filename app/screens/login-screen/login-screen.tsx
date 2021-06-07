import React from "react"
import { observer } from "mobx-react-lite"
import { View,TextInput, TouchableOpacity} from "react-native"
import { Icon, Screen, Text, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import {loginScreenStyles} from './login-screen-styles'
// const ROOT: ViewStyle = {
//   backgroundColor: color.palette.black,
//   flex: 1,
// }
// const LOGO: ImageStyle = {
//   width: scale(221.7),
//   height: verticalScale(131),
//   marginTop: verticalScale(30),
//   marginHorizontal: scale(20.7)
// }
// const BUTTON: ViewStyle = {
//   height: verticalScale(53.3),
//   justifyContent: "center",
//   marginHorizontal: scale(33.3)
// }
// const TEXTSTYLE: TextStyle = {
//   fontSize: moderateVerticalScale(12),
//   color: color.palette.textColor
// }
// const SIGNINBTN: ViewStyle = {
//   ...BUTTON,
//   backgroundColor: '#eece00',
//   marginTop: verticalScale(33.3),
// }
// const FACEBOOKBTN: ViewStyle = {
//   ...BUTTON,
//   backgroundColor: '#4267b2',
//   marginTop: verticalScale(160.7),
// }
// const GMAILBTN: ViewStyle = {
//   ...BUTTON,
//   backgroundColor: '#b23121',
//   marginTop: verticalScale(10),
//   marginBottom: verticalScale(50.7)
// }
// const EMAILVIEW: ViewStyle = {
//   marginTop: verticalScale(46.3),
//   marginHorizontal: scale(33.3),
// }
// const PASSWORDVIEW: ViewStyle = {
//   ...EMAILVIEW,
//   marginTop: verticalScale(32.7)
// }
// const TEXTINPUTSTYLE: TextStyle = {
//   borderBottomColor: color.palette.white,
//   borderBottomWidth: 0.7,
//   fontSize: moderateVerticalScale(16),
//   color: color.palette.white
// }
// const BTNTEXTSTYLE: TextStyle = {
//   fontSize: moderateVerticalScale(15.3),
//   color: color.palette.textColor,
//   alignSelf: "center"
// }
// const SIGNINTEXT: TextStyle = {
//   ...BTNTEXTSTYLE,
//   letterSpacing: 3.07,
//   color: color.palette.black,
// }
// const ERRORMSGVIEW: ViewStyle={
//   marginTop: verticalScale(9.7), 
//   marginHorizontal: scale(10) 
// }
// const ERRORMSGTEXT: TextStyle={
//   fontSize: moderateVerticalScale(12), 
//   color: "#c53838" 
// }

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // All hooks
  const navigation = useNavigation()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  //function for email and password validation
  function checkValidation() {
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var pass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (email == "" || password == "") {
      setEmailError(true);  //set email error
      setPasswordError(true); //set password error
    }
    else if (!re.test(email)) {
      //Alert.alert("Enter Valid Email !");
      setEmailError(true);
    }
    else if (!pass.test(password)) {
      //Alert.alert("Enter Valid Password !");
      setPasswordError(true);
    }
    else {
      //Alert.alert("login successfully")
      navigation.navigate("dashboard");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <Screen style={loginScreenStyles.ROOT} preset="scroll">
      <Wallpaper/>
      <Icon icon={"loginScreenLogo"} style={loginScreenStyles.LOGO} />
      <View style={loginScreenStyles.EMAILVIEW}>
        <Text tx="loginScreen.emailAddress" style={loginScreenStyles.TEXTSTYLE} />
        <TextInput placeholder="Enter Email"
          onChangeText={text => {
            if (text == "") {
              setEmailError(true)
            }
            else {
              setEmailError(false)
              setEmail(text)
            }
          }}
          placeholderTextColor={color.palette.white}
          style={loginScreenStyles.TEXTINPUTSTYLE} />
        {emailError ? <View style={loginScreenStyles.ERRORMSGVIEW}>
          <Text tx="loginScreen.emailErrorMsg" style={loginScreenStyles.ERRORMSGTEXT} />
        </View> : <></>}
      </View>
      <View style={loginScreenStyles.PASSWORDVIEW}>
        <Text tx="loginScreen.password" style={loginScreenStyles.TEXTSTYLE} />
        <TextInput placeholder="Enter Password"
          onChangeText={text => {
            if (text == "") {
              setPasswordError(true)
            }
            else {
              setPasswordError(false)
              setPassword(text)
            }
          }}
          secureTextEntry={true}
          placeholderTextColor={color.palette.white}
          style={loginScreenStyles.TEXTINPUTSTYLE} />
        {passwordError ? <View style={loginScreenStyles.ERRORMSGVIEW}>
          <Text tx="loginScreen.passwordErrorLength" style={loginScreenStyles.ERRORMSGTEXT} />
          <Text tx="loginScreen.passwordErrorAlpha" style={loginScreenStyles.ERRORMSGTEXT} />
          <Text tx="loginScreen.passwordErrorSpecialChar" style={loginScreenStyles.ERRORMSGTEXT} />
        </View> : <></>}
      </View>

      <TouchableOpacity onPress={() => checkValidation()}
        style={loginScreenStyles.SIGNINBTN}>
        <Text tx="loginScreen.signIn" style={loginScreenStyles.SIGNINTEXT} />
      </TouchableOpacity>

      <TouchableOpacity style={loginScreenStyles.FACEBOOKBTN}>
        <Text tx="loginScreen.facebook" style={loginScreenStyles.BTNTEXTSTYLE} />
      </TouchableOpacity>

      <TouchableOpacity style={loginScreenStyles.GMAILBTN}>
        <Text tx="loginScreen.gmail" style={loginScreenStyles.BTNTEXTSTYLE} />
      </TouchableOpacity>
    </Screen>
  )
})
