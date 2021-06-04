import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInput, TouchableOpacity, Alert, ImageStyle } from "react-native"
import { Icon, Screen, Text, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const LOGO: ImageStyle = {
  width: 221.7, height: 131, marginTop: 20, marginLeft: 10
}
const BUTTON: ViewStyle = {
  height: 53.3, justifyContent: "center", marginHorizontal: 10
}
const LOGINBTN: ViewStyle={
  ...BUTTON,
  
}

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
    <Screen style={ROOT} preset="scroll">
      <Wallpaper />
      <Icon icon={"loginScreenLogo"} style={LOGO} />
      <View style={{ marginTop: 46.3, marginHorizontal: 10, marginVertical: 10 }}>
        <Text tx="loginScreen.emailAddress" style={{ fontSize: 12, color: color.palette.textColor }} />
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
          style={{ borderBottomColor: color.palette.white, borderBottomWidth: 0.7, fontSize: 16, color: color.palette.white }} />
        {emailError ? <Text tx="loginScreen.emailErrorMsg" style={{ fontSize: 12, color: "#c53838", marginTop: 9.7, marginHorizontal: 10 }} /> : <></>}

        <Text tx="loginScreen.password" style={{ fontSize: 12, color: color.palette.textColor, marginTop: 32.7 }} />
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
          style={{ borderBottomColor: color.palette.white, borderBottomWidth: 0.7, fontSize: 16, color: color.palette.white }} />
        {passwordError ? <View style={{ marginTop: 9.7, marginHorizontal: 10 }}>
          <Text tx="loginScreen.passwordErrorLength" style={{ fontSize: 12, color: "#c53838" }} />
          <Text tx="loginScreen.passwordErrorAlpha" style={{ fontSize: 12, color: "#c53838" }} />
          <Text tx="loginScreen.passwordErrorSpecialChar" style={{ fontSize: 12, color: "#c53838" }} />
        </View> : <></>}
      </View>

      <TouchableOpacity onPress={() => checkValidation()}
        style={{ backgroundColor: '#eece00', height: 53.3, justifyContent: 'center', marginTop: 33.3, marginHorizontal: 10 }}>
        <Text tx="loginScreen.signIn" style={{ letterSpacing: 3.07, fontSize: 15.3, color: '#000000', alignSelf: "center" }} />
      </TouchableOpacity>

      <TouchableOpacity style={{ backgroundColor: '#4267b2', height: 53.3, justifyContent: 'center', marginTop: 100, marginHorizontal: 10 }}>
        <Text tx="loginScreen.facebook" style={{ fontSize: 15.3, color: color.palette.textColor, alignSelf: "center" }} />
      </TouchableOpacity>

      <TouchableOpacity style={{ backgroundColor: '#b23121', height: 53.3, justifyContent: 'center', marginTop: 5, marginBottom: 50.7, marginHorizontal: 10 }}>
        <Text tx="loginScreen.gmail" style={{ fontSize: 15.3, color: '#fefefe', alignSelf: "center" }} />
      </TouchableOpacity>
    </Screen>
  )
})
