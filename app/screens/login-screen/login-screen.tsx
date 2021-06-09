import React from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, TouchableOpacity, StatusBar } from "react-native"
import { Icon, Screen, Text, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { loginScreenStyles } from './login-screen-styles'
import {LoginManager,LoginButton,AccessToken} from "react-native-fbsdk"

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
  function checkEmail(text) {
    if (text == "") {
      setEmailError(true)
    }
    else {
      setEmailError(false)
      setEmail(text)
    }
  }

  function checkPassword(text) {
    if (text == "") {
      setPasswordError(true)
    }
    else {
      setPasswordError(false)
      setPassword(text)
    }
  }

  function checkFacebbokLogin(){
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("==> Login cancelled");
        } else {
          console.log(
            "==> Login success with permissions: " +
              result.grantedPermissions.toString()
          );
        }
       },
       function(error) {
        console.log("==> Login fail with error: " + error);
       }
     );
  }
  return (
    <Screen style={loginScreenStyles.ROOT} preset="scroll">

      <StatusBar backgroundColor="black" />
      <Wallpaper />

      <Icon icon={"loginScreenLogo"} style={loginScreenStyles.LOGO} />

      <View style={loginScreenStyles.EMAILVIEW}>
        <Text tx="loginScreen.emailAddress" style={loginScreenStyles.TEXTSTYLE} />
        <TextInput placeholder="Enter Email"
          onChangeText={text => checkEmail(text)}
          placeholderTextColor={color.palette.white}
          style={loginScreenStyles.TEXTINPUTSTYLE} />
        {emailError ? <View style={loginScreenStyles.ERRORMSGVIEW}>
          <Text tx="loginScreen.emailErrorMsg" style={loginScreenStyles.ERRORMSGTEXT} />
        </View> : <></>}
      </View>

      <View style={loginScreenStyles.PASSWORDVIEW}>
        <Text tx="loginScreen.password" style={loginScreenStyles.TEXTSTYLE} />
        <TextInput placeholder="Enter Password"
          onChangeText={text => checkPassword(text)}
          secureTextEntry={true}
          placeholderTextColor={color.palette.white}
          style={loginScreenStyles.TEXTINPUTSTYLE} />
        {passwordError ? <View style={loginScreenStyles.ERRORMSGVIEW}>
          <Text tx="loginScreen.passwordErrorLength" style={loginScreenStyles.ERRORMSGTEXT} />
          <Text tx="loginScreen.passwordErrorAlpha" style={loginScreenStyles.ERRORMSGTEXT} />
          <Text tx="loginScreen.passwordErrorSpecialChar" style={loginScreenStyles.ERRORMSGTEXT} />
        </View> : <></>}
      </View>
       {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>   */}
      <TouchableOpacity onPress={() => checkValidation()}
        style={loginScreenStyles.SIGNINBTN}>
        <Text tx="loginScreen.signIn" style={loginScreenStyles.SIGNINTEXT} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()  => checkFacebbokLogin()}
      style={loginScreenStyles.FACEBOOKBTN}>
        <Text tx="loginScreen.facebook" style={loginScreenStyles.BTNTEXTSTYLE} />
      </TouchableOpacity>

      <TouchableOpacity style={loginScreenStyles.GMAILBTN}>
        <Text tx="loginScreen.gmail" style={loginScreenStyles.BTNTEXTSTYLE} />
      </TouchableOpacity>
    </Screen>
  )
})
