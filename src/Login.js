import React, {Component} from 'react';
import {
  View,
  Image,
  BackHandler,
  Keyboard,
  Text,
  Modal,
  Alert,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//import OneSignal from 'react-native-onesignal';
import {
  Colors,
  Font,
  mobileH,
  mobileW,
  localimag,
  apifuntion,
  config,
  localStorage,
  Lang_chg,
  msgProvider,
  SocialLogin,
} from './Provider/utilslib/Utils';
import {validationprovider} from '../src/Provider/Validation_provider';

export default class Login extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      passwordhide: false,
      check: false,
      language_check: false,
      english: true,
      arabic: false,
      language: 0,
      securepass3: true,
      modalVisible: false,
      phone_number: '',
      mobile: '',
      password: '',
      player_id: '123456',
      device_type: config.device_type,
      login_type: 'app',
      user_type: 1,
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.SetLang();
    this.props.navigation.addListener('focus', () => {
      localStorage.removeItem('socialdata');
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
  SetLang = async () => {
    let language = await localStorage.getItemObject('language');
    if (language == null) {
      config.language = 0;
      localStorage.setItemObject('language', 0);
      this.setState({
        language_id: 0,
        language: Lang_chg.english_txt[config.language],
      });
    } else {
      if (language == 1) {
        config.language = 1;
        localStorage.setItemObject('language', 1);
        this.setState({
          language_id: 1,
          language: Lang_chg.arabic_txt[config.language],
        });
      } else {
        config.language = 0;
        localStorage.setItemObject('language', 0);
        this.setState({
          language_id: 0,
          language: Lang_chg.english_txt[config.language],
        });
      }
    }
    Lang_chg.language_get();
  };

  onIds(device) {
    this.setState({
      player_id: device.userId,
    });
    player_id_me1 = device.userId;
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  language_change = value => {
    Alert.alert(
      Lang_chg.language_change[config.language],
      Lang_chg.Lang_change_msg[config.language],
      [
        {
          text: Lang_chg.no_txt[config.language],
          onPress: () => {},
          tyle: 'Yes',
        },
        {
          text: Lang_chg.yes_txt[config.language],
          onPress: () => {
            this.launguage_setbtn(value);
          },
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  launguage_setbtn = language => {
    Lang_chg.language_set(language);
  };

  _loginBtn = async () => {
    Keyboard.dismiss();
    let {
      phone_number,
      password,
      player_id,
      device_type,
      login_type,
      user_type,
    } = this.state;
    //-----------------phone number--------------------
    if (phone_number.length <= 0) {
      msgProvider.toast(Lang_chg.emptyMobile[config.language], 'center');
      return false;
    }
    if (phone_number.length < 7) {
      msgProvider.toast(Lang_chg.MobileMinLength[config.language], 'center');
      return false;
    }
    if (phone_number.length > 15) {
      msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center');
      return false;
    }
    if ((await validationprovider.digitCheck(phone_number)) != true) {
      msgProvider.toast(Lang_chg.validMobile[config.language], 'center');
      return false;
    }
    //----------------password---------------------------
    if (password.indexOf(' ') != -1) {
      msgProvider.toast(Lang_chg.PasswordSpace[config.language], 'center');
      return false;
    }
    if (password.length <= 0) {
      msgProvider.toast(Lang_chg.emptyPassword[config.language], 'center');
      return false;
    }
    if (password.length <= 5) {
      msgProvider.toast(Lang_chg.PasswordMinLength[config.language], 'center');
      return false;
    }
    if (password.length > 16) {
      msgProvider.toast(Lang_chg.PasswordMaxLength[config.language], 'center');
      return false;
    }

    var data = new FormData();
    data.append('phone_number', phone_number);
    data.append('password', password);
    data.append('player_id', player_id_me1);
    data.append('device_type', device_type);
    data.append('login_type', login_type);
    data.append('user_type', user_type);
    let url = config.baseURL + 'Login';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        if (obj.success == 'true') {
          var user_arr = obj.user_details;
          let user_id = user_arr.user_id;
          let otp_verify = user_arr.otp_verify;
          let admin_status = user_arr.admin_status;
          let user_value = {
            user_id: user_id,
            otp: user_arr.otp,
            phone_number: phone_number,
            password: password,
            login_type: login_type,
            user_type: user_type,
          };
          localStorage.setItemObject('user_arr', user_arr);
          localStorage.setItemObject('user_value', user_value);
          localStorage.setItemObject('user_pass', password);

          if (otp_verify == 0) {
            this.props.navigation.navigate('Otp_verify', {
              check: 1,
              phone_number: phone_number,
            });
            return false;
          }
          if (this.state.passwordhide == true) {
            localStorage.setItemString('remember_email', phone_number);
            localStorage.setItemString('remember_password', password);
            localStorage.setItemString('remember_me', 'yes');
          } else {
            this.setState({
              passwordhide: false,
              phone_number: '',
              password: '',
            });
          }
          localStorage.setItemString('password', password);
          localStorage.setItemString('email', phone_number);
          this.props.navigation.navigate('Home', {home_status: 1});
        } else {
          setTimeout(() => {
            if (obj?.msg) {
              msgProvider.alert(
                Lang_chg.information[config.language],
                obj.msg[config.language],
                false,
              );
            }
          }, 200);
          if (obj.account_active_status == 'deactivate') {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          }
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

  facebookLogin = async () => {
    let data = await localStorage.getItemObject('socialdata');
    if (data == null) {
      SocialLogin.Socialfunction(this.props.navigation, 'facebook');
    }
  };

  googleLogin = async () => {
    let data = await localStorage.getItemObject('socialdata');
    if (data == null) {
      SocialLogin.Socialfunction(this.props.navigation, 'google');
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <SafeAreaView
            style={{backgroundColor: Colors.statusbar_color, flex: 0}}
          />
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.statusbar_color}
            hidden={false}
            translucent={false}
          />
          {/* Modal Open */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({modalVisible: false});
            }}>
            <SafeAreaView
              style={{backgroundColor: Colors.theme_color, flex: 0}}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.appColor}
                hidden={false}
                translucent={false}
                networkActivityIndicatorVisible={true}
              />
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  height: (mobileH * 22) / 100,
                  alignSelf: 'center',
                  backgroundColor: Colors.whiteColor,
                  borderRadius: (mobileW * 4) / 100,
                }}>
                <Text
                  style={{
                    marginTop: (mobileH * 4) / 100,
                    marginLeft: (mobileW * 6) / 100,
                    fontSize: (mobileW * 4.3) / 100,
                    color: 'black',
                    fontFamily: Font.fontmedium,
                    textAlign: config.textRotate,
                  }}>
                  {Lang_chg.titleexitapp[config.language]}
                </Text>
                <Text
                  style={{
                    marginTop: (mobileH * 1) / 100,
                    marginLeft: (mobileW * 6) / 100,
                    fontSize: (mobileW * 4) / 100,
                    color: 'black',
                    fontFamily: Font.fontregular,
                    textAlign: config.textRotate,
                  }}>
                  {Lang_chg.exitappmessage[config.language]}
                </Text>
                <View
                  style={{
                    marginTop: (mobileH * 5) / 100,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: (mobileW * 32) / 100,
                    alignSelf: 'flex-end',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      BackHandler.exitApp();
                    }}
                    style={{
                      height: (mobileW * 6) / 100,
                      width: (mobileW * 15) / 100,
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 4) / 100,
                        color: 'red',
                        fontFamily: Font.fontsemibold,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.Yes[config.language]}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      height: (mobileW * 6) / 100,
                      width: (mobileW * 15) / 100,
                    }}
                    onPress={() => {
                      this.setState({modalVisible: false});
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 4) / 100,
                        color: '#1D77FF',
                        fontFamily: Font.fontsemibold,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.No[config.language]}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Modal Close */}
          <ImageBackground
            resizeMode="stretch"
            style={styles.logo}
            source={localimag.login_background}>
            <View
              style={{
                height: (mobileH * 7) / 100,
                marginTop: (mobileH * 5) / 100,
              }}>
              <View
                style={
                  this.state.language_check == true
                    ? styles.lanuageStyle
                    : styles.lanuageStyle1
                }>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    this.setState({language_check: !this.state.language_check});
                  }}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: (mobileW * 1.2) / 100,
                  }}>
                  <View style={{width: '25%'}}>
                    <Image
                      source={localimag.language}
                      style={{
                        height: (mobileW * 4.2) / 100,
                        width: (mobileW * 4.2) / 100,
                      }}
                    />
                  </View>
                  <View style={{width: '56%'}}>
                    {config.language == 0 ? (
                      <Text
                        style={{
                          fontFamily: Font.fontmedium,
                          fontSize: (mobileW * 2.8) / 100,
                          textAlign: config.textRotate,
                        }}
                        onPress={() => {
                          this.language_change(0);
                        }}>
                        {Lang_chg.english_txt[config.language]}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: Font.fontmedium,
                          fontSize: (mobileW * 2.8) / 100,
                          textAlign: config.textRotate,
                        }}
                        onPress={() => {
                          this.language_change(1);
                        }}>
                        {Lang_chg.arabic_txt[config.language]}
                      </Text>
                    )}
                  </View>
                  <View style={{width: '15%'}}>
                    {this.state.language_check == true ? (
                      <Image
                        source={localimag.arrowlup}
                        style={{
                          height: (mobileW * 3.3) / 100,
                          width: (mobileW * 3.3) / 100,
                        }}
                      />
                    ) : (
                      <Image
                        source={localimag.arrowldown}
                        style={{
                          height: (mobileW * 3.1) / 100,
                          width: (mobileW * 3.1) / 100,
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {this.state.language_check == true && (
                  <View>
                    {config.language == 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          this.language_change(1),
                            this.setState({
                              language_check: !this.state.language_check,
                            });
                        }}
                        activeOpacity={0.7}
                        style={{
                          width: '93%',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          borderTopColor: Colors.bottom_border,
                          borderTopWidth: (mobileW * 0.3) / 100,
                        }}>
                        <View
                          style={{
                            width: '97%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            paddingVertical: (mobileW * 1.2) / 100,
                          }}>
                          <Text
                            style={{
                              fontFamily: Font.fontmedium,
                              fontSize: (mobileW * 2.8) / 100,
                              textAlign: config.textRotate,
                            }}>
                            {Lang_chg.arabic_txt[config.language]}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    {config.language == 1 && (
                      <TouchableOpacity
                        onPress={() => {
                          this.language_change(0),
                            this.setState({
                              language_check: !this.state.language_check,
                            });
                        }}
                        activeOpacity={0.7}
                        style={{
                          width: '93%',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          borderTopColor: Colors.bottom_border,
                          borderTopWidth: (mobileW * 0.3) / 100,
                        }}>
                        <View
                          style={{
                            width: '97%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            paddingVertical: (mobileW * 1.2) / 100,
                          }}>
                          <Text
                            style={{
                              fontFamily: Font.fontmedium,
                              fontSize: (mobileW * 2.8) / 100,
                              textAlign: config.textRotate,
                            }}>
                            {Lang_chg.english_txt[config.language]}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            </View>

            <View style={{alignItems: 'center'}}>
              <Image style={styles.img} source={localimag.splash} />
            </View>
            {/*------------------Phone number -------------*/}
            <View
              style={{
                width: (mobileW * 80) / 100,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop:
                  Platform.OS == 'ios'
                    ? (mobileH * 5) / 100
                    : (mobileH * 5.5) / 100,
              }}>
              {config.language == 0 && (
                <View
                  style={{
                    width: (mobileW * 60) / 100,
                    marginLeft: (mobileW * 1) / 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontbold,
                      fontSize: (mobileW * 4.3) / 100,
                      color: Colors.appColor,
                      textAlign: config.textRotate,
                    }}>
                    {Lang_chg.login1[config.language]}
                  </Text>
                </View>
              )}
              <View
                style={[
                  styles.ViewText,
                  {
                    flexDirection:
                      config.textalign == 'left' ? 'row' : 'row-reverse',
                    marginTop:
                      config.language == 0
                        ? (mobileH * 2) / 100
                        : (mobileH * 5) / 100,
                  },
                ]}>
                <View style={styles.ImageView}>
                  <Image
                    style={{
                      height: (mobileW * 5.5) / 100,
                      width: (mobileW * 5.5) / 100,
                      resizeMode: 'contain',
                    }}
                    source={localimag.call}
                  />
                </View>
                <View
                  style={{
                    borderRightColor: Colors.bottom_border,
                    borderRightWidth: 1,
                    paddingHorizontal: (mobileW * 2) / 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 3.3) / 100,
                      color: Colors.textColors,
                      width: (mobileW * 9.5) / 100,
                      alignSelf: 'center',
                    }}>
                    +20
                  </Text>
                </View>
                <TextInput
                  style={styles.textInputView}
                  maxLength={16}
                  value={this.state.phone_number}
                  keyboardType="number-pad"
                  returnKeyLabel="done"
                  returnKeyType="done"
                  placeholderTextColor={Colors.textColors}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  placeholder={Lang_chg.mobile[config.language]}
                  onChangeText={txt => {
                    this.setState({phone_number: txt});
                  }}
                />
              </View>
            </View>

            {/*------------------Password -------------*/}
            <View
              style={{
                flexDirection: 'row',
                paddingVertical:
                  Platform.OS == 'ios' ? (mobileW * 1.5) / 100 : null,
                width: (mobileW * 85) / 100,
                alignSelf: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: Colors.Light_border,
              }}>
              <View style={{width: '10%'}}>
                <Image
                  source={localimag.password}
                  resizeMode="contain"
                  style={{
                    height: (mobileW * 5.5) / 100,
                    width: (mobileW * 5.5) / 100,
                    paddingLeft: (mobileW * 13) / 100,
                  }}
                />
              </View>
              <TextInput
                style={{
                  fontFamily: Font.fontmedium,
                  textAlign: config.textalign,
                  fontSize: (mobileW * 3.8) / 100,
                  paddingLeft: (mobileW * 5) / 100,
                  width: '75%',
                  color: Colors.black_color,
                  paddingVertical: (mobileW * 3) / 100,
                }}
                placeholder={Lang_chg.password[config.language]}
                placeholderTextColor={Colors.textColors}
                value={this.state.password}
                keyboardType="default"
                secureTextEntry={this.state.securepass3}
                maxLength={16}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                autoCompleteType="off"
                onChangeText={txt => {
                  this.setState({password: txt});
                }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.setState({securepass3: !this.state.securepass3});
                }}
                style={{width: '15%'}}>
                {this.state.securepass3 == true ? (
                  <Text
                    style={{
                      color: Colors.appColor,
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 3) / 100,
                      textAlign: config.textRotate,
                    }}>
                    {Lang_chg.show[config.language]}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: Colors.appColor,
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 3) / 100,
                      textAlign: config.textRotate,
                    }}>
                    {Lang_chg.Hide[config.language]}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({passwordhide: !this.state.passwordhide});
              }}
              style={{
                width: (mobileW * 80) / 100,
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: (mobileW * 2) / 100,
              }}>
              <View style={{alignSelf: 'center'}}>
                <View style={{alignSelf: 'center'}}>
                  {this.state.passwordhide == false ? (
                    <Image
                      style={{
                        height: (mobileW * 5) / 100,
                        width: (mobileW * 5) / 100,
                        resizeMode: 'contain',
                      }}
                      source={localimag.checkbox1}
                    />
                  ) : (
                    <Image
                      style={{
                        height: (mobileW * 5) / 100,
                        width: (mobileW * 5) / 100,
                        resizeMode: 'contain',
                      }}
                      source={localimag.checkbox}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  width: (mobileW * 70) / 100,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: (mobileW * 2) / 100,
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.fontmedium,
                    color: Colors.black_color,
                    textAlign: config.textRotate,
                  }}>
                  {Lang_chg.remember[config.language]}
                </Text>
              </View>
            </TouchableOpacity>

            {/* ------------------------ Login Button -------------------------- */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this._loginBtn();
              }}
              style={{
                flexDirection: 'row',
                width: (mobileW * 65) / 100,
                alignSelf: 'center',
                marginTop: (mobileW * 6) / 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: (mobileW * 6) / 100,
                padding: (mobileW * 3) / 100,
                backgroundColor: Colors.login_btn_color,
              }}>
              <Text
                style={{
                  fontSize: (mobileW * 3.7) / 100,
                  color: Colors.whiteColor,
                  fontFamily: Font.fontmedium,
                  textAlign: config.textAlign,
                  paddingLeft: 4,
                }}>
                {Lang_chg.login[config.language]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Forgot'),
                  this.setState({
                    phone_number: '',
                    password: '',
                    passwordhide: false,
                  });
              }}
              style={{
                flexDirection: 'row',
                width: (mobileW * 65) / 100,
                alignSelf: 'center',
                marginTop: (mobileW * 5) / 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: (mobileW * 3.5) / 100,
                  color: Colors.black_color,
                  fontFamily: Font.fontmedium,
                  textAlign: config.textAlign,
                  textDecorationLine: 'underline',
                }}>
                {Lang_chg.forgot[config.language]}
              </Text>
            </TouchableOpacity>

            {/* <View
              style={{
                alignSelf: 'center',
                width: (mobileW * 80) / 100,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: (mobileW * 5) / 100,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.gray_color,
                  width: '45%',
                }}
              />
              <View
                style={{
                  backgroundColor: '#E6E6E6',
                  borderRadius: (mobileW * 6) / 100,
                  padding: (mobileW * 2) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontregular,
                    fontSize: (mobileW * 2) / 100,
                  }}>
                  {Lang_chg.or_txt[config.language]}
                </Text>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.gray_color,
                  width: '45%',
                }}
              />
            </View> */}
            {Platform.OS == 'android' && (
              <View
                style={{
                  flexDirection: 'row',
                  width: (mobileW * 30) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileW * 5) / 100,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {config.facebook_hide_android == 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      this.facebookLogin();
                    }}
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        alignSelf: 'center',
                        width: (mobileW * 12) / 100,
                        height: (mobileW * 12) / 100,
                        resizeMode: 'contain',
                      }}
                      source={localimag.facebook}
                    />
                  </TouchableOpacity>
                )}

                {config.google_hide_android == 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      this.googleLogin();
                    }}
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        alignSelf: 'center',
                        width: (mobileW * 12) / 100,
                        height: (mobileW * 12) / 100,
                        resizeMode: 'contain',
                      }}
                      source={localimag.google}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/*Platform.OS == 'ios' && (
              <View
                style={{
                  flexDirection: 'row',
                  width: (mobileW * 30) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileW * 5) / 100,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {config.facebook_hide_ios == 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      this.facebookLogin();
                    }}
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        alignSelf: 'center',
                        width: (mobileW * 12) / 100,
                        height: (mobileW * 12) / 100,
                        resizeMode: 'contain',
                      }}
                      source={localimag.facebook}
                    />
                  </TouchableOpacity>
                )}

                {config.google_hide_ios == 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      this.googleLogin();
                    }}
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        alignSelf: 'center',
                        width: (mobileW * 12) / 100,
                        height: (mobileW * 12) / 100,
                        resizeMode: 'contain',
                      }}
                      source={localimag.google}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )*/}

            <View
              style={{
                width: (mobileW * 100) / 100,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                bottom:
                  Platform.OS == 'ios'
                    ? (mobileH * 11) / 100
                    : (mobileW * 10) / 100,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.fontmedium,
                  color: Colors.black_color,
                  textAlign: config.textAlign,
                }}>
                {Lang_chg.doyou[config.language]}{' '}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.props.navigation.navigate('Signup'),
                    this.setState({
                      phone_number: '',
                      password: '',
                      passwordhide: false,
                    });
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.fontmedium,
                    color: Colors.login_btn_color,
                    textAlign: config.textAlign,
                    textDecorationLine: 'underline',
                  }}>
                  {Lang_chg.Signup[config.language]}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: (mobileW * 100) / 100,
    height: (mobileH * 100) / 100,
  },
  imageView: {
    height: (mobileW * 3.5) / 100,
    width: (mobileW * 9) / 100,
    resizeMode: 'contain',
  },
  ViewText: {
    flexDirection: config.textalign == 'right' ? 'row-reverse' : 'row',

    width: (mobileW * 81) / 100,
    borderBottomColor: Colors.Light_border,
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingVertical: Platform.OS == 'ios' ? (mobileW * 2) / 100 : null,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (mobileW * 2.5) / 100,
  },

  ViewText1: {
    flexDirection: 'row',
    marginTop: (mobileH * 2) / 100,
    width: (mobileW * 81) / 100,
    borderBottomColor: Colors.Light_border,
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingVertical: Platform.OS == 'ios' ? (mobileW * 2) / 100 : null,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (mobileW * 2.5) / 100,
  },

  textInputView: {
    width: '75%',
    justifyContent: 'center',
    paddingLeft: (mobileW * 1.5) / 100,
    alignSelf: 'center',
    fontFamily: Font.fontmedium,
    fontSize: (mobileW * 3.8) / 100,
    color: Colors.black_color,
    textAlign: 'left',
  },
  ImageView: {
    width: '8%',
    alignSelf: 'center',
    marginLeft: (mobileW * 1) / 100,
  },
  img: {
    height: (mobileW * 47) / 100,
    width: (mobileW * 47) / 100,
    marginTop: (mobileH * -12) / 100,
  },
  lanuageStyle: {
    backgroundColor: 'white',
    height: (mobileW * 14) / 100,
    width: (mobileW * 23) / 100,
    borderRadius: (mobileW * 2) / 100,
    alignSelf: 'flex-end',
    marginRight: (mobileW * 2) / 100,
    borderColor: 'black',
    borderWidth: (mobileW * 0.3) / 100,
  },
  lanuageStyle1: {
    backgroundColor: 'white',
    height: (mobileW * 7.5) / 100,
    width: (mobileW * 23) / 100,
    borderRadius: (mobileW * 2) / 100,
    alignSelf: 'flex-end',
    marginRight: (mobileW * 2) / 100,
    borderColor: 'black',
    borderWidth: (mobileW * 0.3) / 100,
  },
});
