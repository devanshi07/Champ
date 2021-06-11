import React from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, TouchableOpacity, StatusBar, ScrollView, Alert } from "react-native"
import { Icon, Screen, Text, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { loginScreenStyles } from './login-screen-styles'
import {
  LoginManager, LoginButton, AccessToken, GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk"
import { scale, verticalScale } from "../../utils/scale"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  React.useEffect(() => {
    GoogleSignin.configure({
      // webClientId: '587311044042-dq251cmu9u3jl67t915dd97svdbcd1ar.apps.googleusercontent.com',
      webClientId: "102124790001-68m37k6gnjus7jr3anee0jed5ojgthe0.apps.googleusercontent.com",
      offlineAccess: false,

    });
    // isSignedIn()
  }, []);

  const [user, setUser] = React.useState({})

  const signIn = async () => {
    try {
      //await GoogleSignin.hasPlayServices();
      console.log("enter in gmail")
      const userInfo = await GoogleSignin.signIn();
      console.log("success.... ", userInfo)
      setUser({ userInfo });
      console.log(user)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("sign in cancelled")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("play service not availble")
      } else {
        // some other error happened
        console.log("other error..", error)
      }
    }
  };

  // const isSignedIn = async () => {
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   if (!!isSignedIn) {
  //     getCurrentUserInfo()
  //   } else {
  //     console.log('Please Login')
  //   }
  // };
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log("enter get user")
      setUser({ userInfo });
      console.log(user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        Alert.alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        Alert.alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };
  // All hooks
  const navigation = useNavigation()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [fbuser, setFbUser] = React.useState({});


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
  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setFbUser({ userInfo: user });
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
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
            getInfoFromToken(accessToken);
          });
        }
      },
      function (error) {
        console.log("==> Login fail with error: " + error);
      }
    );
  }
  return (
    <Screen style={loginScreenStyles.ROOT} preset="scroll">

      <StatusBar backgroundColor="black" />

      <Wallpaper />

      {/* <ScrollView> */}
      
      <View style={{ flex: 1, marginHorizontal: scale(33.3),justifyContent:"space-between"}}>

        <View style={{ flex: 1 }}>
          <Icon icon={"loginScreenLogo"} style={loginScreenStyles.LOGO} />
          <Text style={loginScreenStyles.WELCOMETEXT}>Welcome Back,</Text>
          <Text style={loginScreenStyles.SIGNINWELCOMETEXT}>Sign in to continue</Text>
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

          <TouchableOpacity onPress={() => checkValidation()}
            style={loginScreenStyles.SIGNINBTN}>
            <Text tx="loginScreen.signIn" style={loginScreenStyles.SIGNINTEXT} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, marginBottom: verticalScale(50.7),justifyContent:"flex-end" }}>
          <TouchableOpacity onPress={() => checkFacebbokLogin()}
            style={loginScreenStyles.FACEBOOKBTN}>
            <Text tx="loginScreen.facebook" style={loginScreenStyles.BTNTEXTSTYLE} />
          </TouchableOpacity>

          <TouchableOpacity onPress={signIn}
            style={loginScreenStyles.GMAILBTN}>
            <Text tx="loginScreen.gmail" style={loginScreenStyles.BTNTEXTSTYLE} />
          </TouchableOpacity>
        </View>

      </View>

      {/* </ScrollView>  */}

    </Screen>
  )
})
