import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, TouchableOpacity, StatusBar, Alert } from "react-native"
import { Icon, Screen, Text, Wallpaper } from "../../components"
//import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { loginScreenStyles } from './login-screen-styles'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { authStore } = useStores()
  // OR
  // const rootStore = useStores()
  //webclient for google
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: "102124790001-68m37k6gnjus7jr3anee0jed5ojgthe0.apps.googleusercontent.com",
      offlineAccess: false,
    });
  }, []);

  //All hooks
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const [onlyNumbers, setonlyNumbers] = React.useState<boolean>(false);
  const [onlyAlpha, setOnlyAlpha] = React.useState<boolean>(false);
  const [onlyLength, setOnlyLength] = React.useState<boolean>(false);
  const [onlySpecial, setOnlySpecial] = React.useState<boolean>(false);

  const lastname = useRef<any>();
  const [lastNameRef,setLastNameRef] = React.useState<boolean>(false);
  var pass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.([a-zA-Z]{2,5}|[a-zA-z]{2,5}\.[a-zA-Z]{2,5})$/;

  //for google sign in
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let user_Info = {
        name: userInfo.user.name,
        email: userInfo.user.email,
        dateOfBirth: "",
        url: userInfo.user.photo
      }
      authStore.updateUserDetails(user_Info)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert("play service not availble")
      } else {
        // some other error happened
      }
    }
  };
  //function for email and password validation
  function checkValidation() {
    // if (email === "" || password === "") {
    //   setEmailError(true);  //set email error
    //   setPasswordError(true); //set password error
    // }
    if (!re.test(email)) {
      setEmailError(true);
    }
    else if (!pass.test(password)) {
      setPasswordError(true);
    }
    else {
      let userInfo = {
        name: "",
        email: email,
        dateOfBirth: "",
        url: ""
      }
      authStore.updateUserDetails(userInfo)
      setEmail("");
      setPassword("");
    }
  }
  //check email while entering the value
  function checkEmail(text: string) {
    if (text == "" || !re.test(text)) {
      setEmailError(true)
    }
    else {
      setEmailError(false)
      setEmail(text)
    }
  }
  //check password while entering the value
  function checkPassword(text: string) {
    if (/\d/.test(text)) {
      setPasswordError(true);
      setonlyNumbers(true);
    } else {
      setonlyNumbers(false);
    }
    if (/[a-z]/.test(text) || /[A-Z]/.test(text)) {
      setPasswordError(true);
      setOnlyAlpha(true);
    } else {
      setOnlyAlpha(false);
    }
    if (/(_|[^\w\d ])/.test(text)) {
      setPasswordError(true);
      setOnlySpecial(true);
    } else {
      setOnlySpecial(false);
    }
    if (text.length >= 8) {
      setPasswordError(true);
      setOnlyLength(true);
    } else {
      setOnlyLength(false);
    }
    if (text == "" || !pass.test(text)) {
      setPasswordError(true)
    }
    else {
      setPasswordError(false)
      setPassword(text)
    }
  }
  //get info from facebook
  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,birthday,email,gender',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          let user_Info = {
            name: user.name,
            email: user.email,
            dateOfBirth: "",
            url: ""
          }
          authStore.updateUserDetails(user_Info)
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  //for facebook login
  function checkFacebbokLogin() {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("==> Login cancelled");
        } else {
          console.log(
            "==> Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken)
          });
        }
      },
      function (error) {
        console.log("==> Login fail with error: " + error);
      }
    );
  }
  const renderError = (error) => (
    <Text tx={error} style={loginScreenStyles.ERRORMSGTEXT} />
  )
  const renderBotton = (isgmail: boolean, text: string) => {
    return (
      <TouchableOpacity onPress={() => isgmail ? signIn() : checkFacebbokLogin()}
        style={isgmail ? loginScreenStyles.GMAILBTN : loginScreenStyles.FACEBOOKBTN}>
        <Text tx={text} style={loginScreenStyles.BTNTEXTSTYLE} />
      </TouchableOpacity>
    );
  }

  return (
    <Screen style={loginScreenStyles.ROOT} preset="scroll">
      <StatusBar backgroundColor="black" />
      <Wallpaper />
      <View style={loginScreenStyles.MAINCONTAINER}>
        <View style={loginScreenStyles.ROOT}>
          <Icon icon={"loginScreenLogo"} style={loginScreenStyles.LOGO} />
          <Text style={loginScreenStyles.WELCOMETEXT} tx="loginScreen.welcometext"></Text>
          <Text style={loginScreenStyles.SIGNINWELCOMETEXT} tx="loginScreen.signintext"></Text>
          <View style={loginScreenStyles.EMAILVIEW}>
            <Text tx="loginScreen.emailAddress" style={loginScreenStyles.TEXTSTYLE} />
            <TextInput
              returnKeyType="next"
              onSubmitEditing={() => {
                lastname.current.focus();
              }}
              blurOnSubmit={false}
              placeholder="Enter Email"
              onChangeText={text => checkEmail(text)}
              placeholderTextColor={color.palette.white}
              style={loginScreenStyles.TEXTINPUTSTYLE} />
            {emailError ? <View style={loginScreenStyles.ERRORMSGVIEW}>
              {renderError("loginScreen.emailErrorMsg")}
            </View> : <></>}
          </View>
          <View style={loginScreenStyles.PASSWORDVIEW}>
            <Text tx="loginScreen.password" style={loginScreenStyles.TEXTSTYLE} />
            <TextInput placeholder="Enter Password"
              returnKeyType="go"
           ref={lastname}
              onSubmitEditing={() => checkValidation()}
              onChangeText={text => checkPassword(text)}
              secureTextEntry={true}
              placeholderTextColor={color.palette.white}
              style={loginScreenStyles.TEXTINPUTSTYLE} />
            {passwordError ? <View style={loginScreenStyles.ERRORMSGVIEW}>
              {!onlyLength ? renderError("loginScreen.passwordErrorLength") : <></>}
              {!onlyAlpha || !onlyNumbers ? renderError("loginScreen.passwordErrorAlpha") : <></>}
              {!onlySpecial ? renderError("loginScreen.passwordErrorSpecialChar") : <></>}
            </View> : <></>}
          </View>
          <TouchableOpacity onPress={checkValidation}
            style={loginScreenStyles.SIGNINBTN}>
            <Text tx="loginScreen.signIn" style={loginScreenStyles.SIGNINTEXT} />
          </TouchableOpacity>
        </View>
        <View style={loginScreenStyles.BOTTOMVIEW}>
          {renderBotton(false, "loginScreen.facebook")}
          {renderBotton(true, "loginScreen.gmail")}
        </View>
      </View>
    </Screen>
  )
})
