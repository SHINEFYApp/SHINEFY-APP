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
import CountDown from 'react-native-countdown-component';
import OTPTextInput from 'react-native-otp-textinput';
import {notification} from './Provider/NotificationProvider';
//import OneSignal from 'react-native-onesignal';

export default class Otp_verify extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      timing: 60 * 2,
      running: true,
      check: this.props.route.params.check,
      phone_number: this.props.route.params.phone_number,
      user_id: '',
      device_type: config.device_type,
      // player_id_me1:config.player_id_me,
      user_otp: '',
      countshow: true,
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }
  startTimer() {
    this.setState({timing: 60 * 2});
    let interval = setInterval(() => {
      this.setState({timing: this.state.timing - 1}, () => {
        if (this.state.timing <= 0) {
          clearInterval(interval);
        }
      });
    }, 1000);
  }
  componentDidMount() {
    this.startTimer();
    this.props.navigation.addListener('focus', () => {
      setTimeout(() => {
        this.setOTP();
      }, 500);
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

  handleBackPress = () => {
    return true;
  };

  setOTP = async () => {
    let user_value = await localStorage.getItemObject('user_value');
    this.setText(user_value.otp);
    consolepro.consolelog('user_value', user_value);
    this.setState({
      phone_number: user_value.phone_number,
      user_id: user_value.user_id,
    });
  };

  _OTPVerifyBtn = async () => {
    let {user_otp, device_type, player_id_me1, phone_number, check} =
      this.state;
    let user_value = await localStorage.getItemObject('user_value');

    if (user_otp.length <= 0) {
      msgProvider.toast(Lang_chg.Otp_validation[config.language], 'center');
      return false;
    }
    if (user_otp.length <= 3) {
      msgProvider.toast(Lang_chg.Enter_otp[config.language], 'center');
      return false;
    }
    var data = new FormData();
    data.append('user_id', user_value.user_id);
    data.append('otp', user_otp);
    data.append('user_type', 1);
    data.append('device_type', device_type);
    data.append('player_id', global.player_id_me1);
    // data.append("player_id", player_id_me1)
    data.append('status', check);
    consolepro.consolelog('data', data);
    var url = config.baseURL + 'otp_verify';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        consolepro.consolelog('obj', obj);
        if (obj.success == 'true') {
          if (check == 1) {
            if (obj.notification_arr != 'NA') {
              notification.notification_arr(obj.notification_arr);
            }
            localStorage.setItemObject('user_arr', obj.user_details);
            this.props.navigation.navigate('Home', {home_status: 3});
          } else {
            this.props.navigation.navigate('New_password');
          }
        } else {
          msgProvider.alert(
            Lang_chg.information[config.language],
            obj.msg[config.language],
            false,
          );
          if (obj.account_active_status == 'deactivate') {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          }
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

  clearText = () => {
    this.otpInput.clear();
  };

  setText = otp => {
    this.otpInput.setValue(otp.toString());
  };

  _resendBtn = async () => {
    let {check} = this.state;
    let user_value = await localStorage.getItemObject('user_value');
    var url = config.baseURL + 'resend_otp/' + user_value.user_id + '/' + check;
    consolepro.consolelog('url', url);
    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          this.clearText();
          this.startTimer();
          //   this.setText(obj.otp);
        } else {
          msgProvider.alert(
            Lang_chg.information[config.language],
            obj.msg[config.language],
            false,
          );
          if (obj.account_active_status == 'deactivate') {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          }

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

  secondsToHms = d => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ':' : ':') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ':' : ':') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? '' : '') : '';
    return hDisplay + mDisplay + sDisplay;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <SafeAreaView
            style={{backgroundColor: Colors.statusbar_color, flex: 0}}
          />
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.statusbarcolor}
            hidden={false}
            translucent={false}
          />
          <ImageBackground
            resizeMode="stretch"
            style={styles.logo}
            source={localimag.full_background_icon}>
            <View style={{marginTop: (mobileW * 35) / 100}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: (mobileW * 5.6) / 100,
                    fontFamily: Font.fontsemibold,
                    color: Colors.whiteColor,
                  }}>
                  {Lang_chg.otp_verification[config.language]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: (mobileW * 2) / 100,
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.2) / 100,
                    fontFamily: Font.fontmedium,
                    color: Colors.whiteColor,
                  }}>
                  {Lang_chg.otp_verification_msg[config.language]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.fontmedium,
                    color: Colors.whiteColor,
                  }}>
                  +20 {this.state.phone_number}{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({running: false}, () => {
                      this.props.navigation.goBack();
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.5) / 100,
                      fontFamily: Font.fontbold,
                      color: Colors.whiteColor,
                      textDecorationLine: 'underline',
                    }}>
                    {Lang_chg.backone[config.language]}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container_otp}>
                <OTPTextInput
                  ref={e => (this.otpInput = e)}
                  containerStyle={styles.textInputContainer}
                  textInputStyle={styles.roundedTextInput}
                  handleTextChange={text => this.setState({user_otp: text})}
                  numberOfInputs={4}
                  cellTextLength={1}
                  tintColor="#FFFFFF"
                  offTintColor="#FFFFFF"
                  keyboardType={'number-pad'}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this._OTPVerifyBtn();
                }}
                style={{
                  flexDirection: 'row',
                  width: (mobileW * 60) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileW * 6) / 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: (mobileW * 10) / 100,
                  paddingVertical: (mobileW * 2.8) / 100,
                  backgroundColor: Colors.whiteColor,
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.9) / 100,
                    color: Colors.appColor,
                    fontFamily: Font.fontsemibold,
                    textAlign: config.textAlign,
                    paddingLeft: 4,
                  }}>
                  {Lang_chg.verify_text[config.language]}
                </Text>
              </TouchableOpacity>
              {this.state.timing <= 0 ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this._resendBtn();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: (mobileW * 1.5) / 100,
                  }}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.7) / 100,
                      fontFamily: Font.fontbold,
                      color: Colors.whiteColor,
                      textDecorationLine: 'underline',
                    }}>
                    {Lang_chg.resend_text[config.language]}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    borderRadius: (mobileW * 20) / 100,
                    marginTop: (mobileW * 3) / 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{alignSelf: 'center', color: 'white'}}>
                    {this.secondsToHms(this.state.timing)}
                  </Text>
                  {/* <CountDown
                    id={1}
                    running={this.state.running}
                    until={60 * 2}
                    size={15}
                    onFinish={() => {
                      this.setState({countshow: false});
                    }}
                    digitStyle={{
                      backgroundColor: '#FFF',
                      borderRadius: (mobileW * 9) / 100,
                      width: (mobileW * 9) / 100,
                    }}
                    digitTxtStyle={{color: Colors.appColor}}
                    timeLabelStyle={{color: '#eb133a', fontSize: 1}}
                    timeToShow={['M', 'S']}
                    separatorStyle={{
                      color: Colors.whiteColor,
                      paddingHorizontal: (mobileW * 1) / 100,
                    }}
                    timeLabels={{m: '', s: ''}}
                    showSeparator={true}
                  /> */}
                </View>
              )}
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: (mobileW * 100) / 100,
    height: (mobileH * 100) / 100,
  },
  container_otp: {
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: (mobileW * 3) / 100,
  },
  textInputContainer: {
    alignSelf: 'center',
    width: (mobileW * 60) / 100,
  },
  roundedTextInput: {
    borderRadius: (mobileW * 6) / 100,
    borderWidth: 4,
    backgroundColor: Colors.whiteColor,
    color: Colors.main_font,
    height: (mobileW * 10) / 100,
    fontSize: (mobileW * 4.2) / 100,
    width: (mobileW * 10) / 100,
  },
});
