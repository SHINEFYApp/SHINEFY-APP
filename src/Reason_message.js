import React, {Component} from 'react';
import {
  View,
  Image,
  BackHandler,
  Keyboard,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
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
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
export default class Reason_message extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      user_type: 1,
      page_status: this.props.route.params.msg_page_status,
      booking_id: this.props.route.params.booking_id,
      user_id: '',
      login_type: 'app',
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getUserId();
    });
    this._willBlurSubscription = this.props.navigation.addListener(
      'blur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
    );
  }

  getUserId = async () => {
    let user_arr = await localStorage.getItemObject('user_arr');
    this.setState({user_id: user_arr.user_id});
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  navigationPage = () => {
    Keyboard.dismiss();
    let {message, user_type} = this.state;
    //-------------------------Message-------------------------
    if (message.length <= 0) {
      msgProvider.toast(Lang_chg.emptyMessage[config.language], 'center');
      return false;
    }
    if (message.length <= 2) {
      msgProvider.toast(Lang_chg.minlenMessage[config.language], 'center');
      return false;
    }
    if (message.length > 250) {
      msgProvider.toast(Lang_chg.maxlenMessage[config.language], 'center');
      return false;
    }
    if (this.state.page_status == 1) {
      this.DeleteAccount();
    } else {
      this.cancelBooking();
    }
  };
  AppLogout = async () => {
    var language = await localStorage.getItemObject('language');
    var languagecathc = await localStorage.getItemObject('languagecathc');
    var languagesetenglish = await localStorage.getItemObject(
      'languagesetenglish',
    );
    if (this.state.login_type == 'facebook') {
      LoginManager.logOut();
      localStorage.clear();
      localStorage.setItemObject('user_arr', null);
      localStorage.setItemObject('user_value', null);
      localStorage.setItemObject('facebookdata', null);
      localStorage.setItemObject('socialdata', null);
      localStorage.setItemString('remember_me', 'no');
      localStorage.setItemObject('language', language);
      localStorage.setItemObject('languagecathc', languagecathc);
      localStorage.setItemObject('languagesetenglish', languagesetenglish);
      this.props.navigation.navigate('Delete_success');
    } else if (this.state.login_type == 'google') {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        localStorage.clear();
        localStorage.setItemObject('user_arr', null);
        localStorage.setItemObject('user_value', null);
        localStorage.setItemObject('facebookdata', null);
        localStorage.setItemObject('socialdata', null);
        localStorage.setItemString('remember_me', 'no');
        localStorage.setItemObject('language', language);
        localStorage.setItemObject('languagecathc', languagecathc);
        localStorage.setItemObject('languagesetenglish', languagesetenglish);
        this.props.navigation.navigate('Delete_success');
      } catch (error) {}
      localStorage.clear();
      localStorage.setItemObject('user_arr', null);
      localStorage.setItemObject('user_value', null);
      localStorage.setItemObject('facebookdata', null);
      localStorage.setItemObject('socialdata', null);
      localStorage.setItemString('remember_me', 'no');
      localStorage.setItemObject('language', language);
      localStorage.setItemObject('languagecathc', languagecathc);
      localStorage.setItemObject('languagesetenglish', languagesetenglish);
      this.props.navigation.navigate('Delete_success');
    } else {
      localStorage.clear();
      let user_arr = localStorage.getItemObject('user_arr');
      localStorage.setItemObject('language', language);
      localStorage.setItemObject('languagecathc', languagecathc);
      localStorage.setItemObject('languagesetenglish', languagesetenglish);
      this.props.navigation.navigate('Delete_success');
    }
  };

  DeleteAccount = async () => {
    let user_arr = await localStorage.getItemObject('user_arr');
    this.setState({login_type: user_arr.login_type});
    let user_id = user_arr.user_id;
    var data = new FormData();
    data.append('user_id', user_id);
    data.append('message', this.state.message);
    data.append('user_type', user_arr.user_type);
    let url = config.baseURL + 'delete_account';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        if (obj.success == 'true') {
          this.AppLogout();
        } else {
          setTimeout(() => {
            msgProvider.alert(
              Lang_chg.information[config.language],
              obj.msg[config.language],
              false,
            );
          }, 300);
          return false;
        }
      })
      .catch(err => {
        if (err == 'noNetwork') {
          msgProvider.alert(
            Lang_chg.msgTitleNoNetwork[config.language],
            Lang_chg.noNetwork[config.language],
            false,
          );
        } else {
          msgProvider.alert(
            Lang_chg.msgTitleServerNotRespond[config.language],
            Lang_chg.serverNotRespond[config.language],
            false,
          );
        }
      });
  };

  cancelBooking = async () => {
    let {user_id, booking_id, message, page_status} = this.state;
    let user_arr = await localStorage.getItemObject('user_arr');
    var data = new FormData();
    data.append('user_id', user_arr.user_id);
    data.append('booking_id', booking_id);
    data.append('message', message);
    data.append('status', page_status);
    let url = config.baseURL + 'cancel_booking';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        if (obj.success == 'true') {
          if (page_status == 3) {
            localStorage.removeItem('user_all_bookings');

            setTimeout(() => {
              msgProvider.toast(
                Lang_chg.msgBookingCancel[config.language],
                'center',
              );
              this.props.navigation.navigate('Bookings_Details', {
                my_booking_check: 1,
                booking_id: this.state.booking_id,
              });
            }, 500);
          } else {
            setTimeout(() => {
              msgProvider.toast(
                Lang_chg.msgReportSend[config.language],
                'center',
              );
              this.props.navigation.goBack();
            }, 200);
          }
        } else {
          setTimeout(() => {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
            );
            this.props.navigation.goBack();
          }, 300);
          return false;
        }
      })
      .catch(err => {
        this.setState({loading: false});
        if (err == 'noNetwork') {
          msgProvider.alert(
            Lang_chg.msgTitleNoNetwork[config.language],
            Lang_chg.noNetwork[config.language],
            false,
          );
          return false;
        } else {
          msgProvider.alert(
            Lang_chg.msgTitleServerNotRespond[config.language],
            Lang_chg.serverNotRespond[config.language],
            false,
          );
          return false;
        }
      });
  };

  render() {
    return (
      <View style={Styles.container}>
        <TouchableOpacity activeOpacity={1} style={{flex: 1}}>
          <View style={Styles.container}>
            <SafeAreaView
              style={{backgroundColor: Colors.theme_color, flex: 0}}
            />
            <StatusBar
              barStyle="light-content"
              backgroundColor={Colors.statusbar_color}
              hidden={false}
              translucent={false}
              networkActivityIndicatorVisible={true}
            />
            <ImageBackground
              source={localimag.new_header}
              style={{
                width: (mobileW * 100) / 100,
                height: (mobileW * 20) / 100,
              }}>
              <View
                style={{
                  width: (mobileW * 100) / 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: (mobileW * 6) / 100,
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    justifyContent: 'center',
                    width: '15%',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Image
                    source={localimag.goback}
                    style={{
                      width: (mobileW * 5) / 100,
                      height: (mobileW * 5) / 100,
                      transform: [
                        config.textalign == 'right'
                          ? {scaleX: -1}
                          : {scaleX: 1},
                      ],
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: '85%',
                    alignItems: 'center',
                    paddingRight: (mobileW * 15) / 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontsemibold,
                      fontSize: (mobileW * 5.5) / 100,
                      color: Colors.whiteColor,
                    }}>
                    {this.state.page_status == 1
                      ? Lang_chg.deleteaccount_txt[config.language]
                      : this.state.page_status == 2
                      ? Lang_chg.report[config.language]
                      : Lang_chg.cancelservice_txt[config.language]}
                  </Text>
                </View>
              </View>
            </ImageBackground>

            <View
              style={{
                flexDirection: 'row',
                width: (mobileW * 88) / 100,
                marginTop: (mobileW * 8) / 100,
                alignSelf: 'center',
                borderBottomWidth: 1,
                borderBottomColor: Colors.pass_bottom_border,
              }}>
              <View
                style={{
                  width: '10%',
                  paddingLeft: (mobileW * 2) / 100,
                  paddingTop: (mobileW * 3) / 100,
                }}>
                <Image
                  source={localimag.pen1}
                  resizeMode="contain"
                  style={{
                    height: (mobileW * 4.5) / 100,
                    width: (mobileW * 4.5) / 100,
                    paddingLeft: (mobileW * 5) / 100,
                  }}
                />
              </View>
              <TextInput
                style={{
                  fontFamily: Font.fontmedium,
                  textAlign: config.textalign,
                  fontSize: (mobileW * 4) / 100,
                  textAlignVertical: 'top',
                  paddingLeft: (mobileW * 1) / 100,
                  width: '75%',
                  color: Colors.black_color,
                  height: (mobileW * 30) / 100,
                }}
                placeholder={Lang_chg.message_txt[config.language]}
                placeholderTextColor={Colors.black_color}
                value={'' + this.state.message + ''}
                keyboardType="default"
                multiline={true}
                secureTextEntry={this.state.securepass3}
                maxLength={250}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                autoCompleteType="off"
                onChangeText={txt => {
                  this.setState({message: txt});
                }}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: Colors.appColor,
                width: (mobileW * 80) / 100,
                borderRadius: 25,
                marginTop: (mobileW * 14) / 100,
                alignSelf: 'center',
              }}
              onPress={() => {
                this.navigationPage();
              }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  alignSelf: 'center',
                  fontSize: (mobileW * 4) / 100,
                  fontFamily: Font.fontmedium,
                  paddingVertical: (mobileW * 2.2) / 100,
                }}>
                {Lang_chg.Submit[config.language]}
              </Text>
            </TouchableOpacity>
          </View>
          <HideWithKeyboard>
            <ImageBackground
              source={localimag.bottom_logo}
              style={{
                height: (mobileW * 65) / 100,
                width: (mobileW * 100) / 100,
                bottom: 0,
              }}
            />
          </HideWithKeyboard>
        </TouchableOpacity>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
});
