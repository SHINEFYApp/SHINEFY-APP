import React, {Component} from 'react';
import {
  View,
  Image,
  BackHandler,
  Keyboard,
  Text,
  Modal,
  FlatList,
  Alert,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import {Shareratepro} from './Provider/Sharerateapp';
import {
  Colors,
  Font,
  mobileH,
  mobileW,
  localimag,
  apifuntion,
  config,
  localStorage,
  consolepro,
  Lang_chg,
  msgProvider,
  msgTitle,
  msgText,
  Currentltlg,
} from './Provider/utilslib/Utils';
import {validationprovider} from '../src/Provider/Validation_provider';
import {notification} from './Provider/NotificationProvider';
// //import OneSignal from 'react-native-onesignal';
import FastImage from 'react-native-fast-image'

global.latitude = '26.911588824432545';
global.longitude = '29.3977009691298';
global.address = 'NA';
global.latdelta = '2.6015921075018085';
global.longdelta = '2.7328608557581973';
global.address = 'NA';
global.player_id_me1 = '123456';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

const requestUserPermission = async () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

export default class Splash extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      device_type: config.device_type,
      player_id: player_id_me1,
      user_type: 1,
      login_type: 'app',
      loanguage: 1,
    };
    /* O N E S I G N A L   S E T U P */
    // OneSignal.setAppId(config.onesignalappid);
    // OneSignal.setLogLevel(6, 0);
    // OneSignal.setRequiresUserPrivacyConsent(false);
    // OneSignal.promptForPushNotificationsWithUserResponse(response => {

    // });
  }

  async componentDidMount() {
    this.getfcmtoken();
    this.language_fun();

    // OneSignal.addEmailSubscriptionObserver((event) => {
    //     this.OSLog("OneSignal: email subscription changed: ", event);
    // });
    // OneSignal.addSubscriptionObserver(event => {
    //     this.OSLog("OneSignal: subscription changed:", event);
    //     this.setState({ isSubscribed: event.to.isSubscribed })
    // });
    // OneSignal.addPermissionObserver(event => {
    //     this.OSLog("OneSignal: permission changed:", event);
    // });

    // var interval = setInterval(async () => {
    //     await OneSignal.getDeviceState().then(state => {
    //         if (state.isSubscribed == true) {
    //             clearInterval(interval);
    //         }
    //         player_id_me1 = state.userId

    //     }).catch(error => {
    //     })
    // }, 500);

    setTimeout(() => {
      this.autoLogin();
    }, 2000);
  }

  getfcmtoken = async () => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(async fcmToken => {
      
          this.setState({
            player_id: fcmToken,
          });
          var user_arr = await localStorage.getItemObject('user_arr');
          let user_id = user_arr.user_id;
          if (user_id) {
            const url = config.baseURL + 'save_user_notification_data';
            const data = new FormData();
            data.append('player_id', fcmToken);
            data.append('device_type', config.device_type);
            data.append('user_id', user_id);
            let res = await apifuntion.postApi(url, data);
        
          }
        });
    }
  };

  OSLog = (message, optionalArg) => {
    if (optionalArg) {
      message = message + JSON.stringify(optionalArg);
    }
    let consoleValue;
    if (this.state.consoleValue) {
      consoleValue = this.state.consoleValue + '\n' + message;
    } else {
      consoleValue = message;
    }
    this.setState({consoleValue});
  };

  onIds(device) {
    player_id_me1 = device.userId;
    this.setState({
      player_id: device.userId,
    });
  }

  language_fun = async () => {
    let textalign = await localStorage.getItemObject('language');
    if (textalign != null) {
      if (textalign == 1) {
        config.textalign = 'right';

        config.language = 1;
        localStorage.setItemObject('languagesetenglish', 3);
        localStorage.setItemObject('languagecathc', 0);
        this.setState({loanguage: 1});
      } else {
        config.textalign = 'left';

        config.language = 0;
      }
    } else {
      config.textalign = 'left';

      config.language = 0;
      localStorage.setItemObject('language', 0);
    }
  };

  getsocialhide = async () => {
    let url = config.baseURL1 + 'social_hide.php';
    apifuntion
      .getApi(url, 1)
      .then(obj => {
        if (obj.success == 'true') {
          (config.facebook_hide_android = obj.android_facebook_show),
            (config.facebook_hide_ios = obj.ios_facebook_show),
            (config.google_hide_android = obj.android_google_show),
            (config.google_hide_ios = obj.ios_google_show),
            (config.payment_hide_android = obj.android_payment_show),
            (config.payment_hide_ios = obj.ios_payment_show);
        } else {
          if (
            obj.active_status == 0 ||
            obj.msg == msgTitle.usernotexit[config.language]
          ) {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false,
            );
            config.checkUserDeactivate(this.props.navigation);
          } else {
            msgProvider.toast(obj.msg[config.language], 'center');
          }
          return false;
        }
      })
      .catch(error => {});
  };

  autoLogin = async () => {
    let user_value = await localStorage.getItemObject('user_value');
    let user_details = await localStorage.getItemObject('user_arr');
    // let data2= await localStorage.getItemObject('socialdata');
    let result = user_details;
    if (user_details != null) {
      this.props.navigation.navigate('HomeScreen', {home_status: 1});
    } else {
      this.props.navigation.navigate('WelcomeScreen');
    }
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar
          hidden={false}
          StatusBarStyle="dark-content"
          backgroundColor={"#fff"}
          translucent={false}
          networkActivityIndicatorVisible={true}
          barStyle="dark-content"
        />
        <View>
          <FastImage
            imageStyle={{
              width: (mobileW * 100) / 100,
              height: (mobileH * 100) / 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            resizeMode="stretch"
            style={styles.logo}
            source={localimag.newsplash}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: (mobileW * 100) / 100,
    height: (mobileH * 100) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: (mobileW * 48) / 100,
    width: (mobileW * 48) / 100,
  },
});