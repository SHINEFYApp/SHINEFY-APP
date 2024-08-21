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
  SocialLogin,
} from './Provider/utilslib/Utils';
import {validationprovider} from '../src/Provider/Validation_provider';
//import OneSignal from 'react-native-onesignal';
import {notification} from './Provider/NotificationProvider';

export default class Signup extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      passwordhide: false,
      securepass1: true,
      securepass2: true,
      check: false,
      checkbox: false,
      checkboxEmail: false,
      name: '',
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: '',
      con_password: '',
      social_type: 'app',
      login_type: 'app',
      // player_id: '123456',
      social_id: 'NA',
      companyCode: null,
    };

    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getsocialdata();
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
    this.props.navigation.goBack();
    return true;
  };
  onIds(device) {
    this.setState({
      player_id: device.userId,
    });
    config.player_id_me = device.userId;
  }

  getsocialdata = async () => {
    let data = await localStorage.getItemObject('socialdata');
    if (data != null) {
      if (data.social_type == 'facebook') {
        if (data.social_email != undefined || data.social_email != null) {
          this.setState({
            name: data.social_name,
            login_type: data.logintype,
            social_type: data.logintype,
            email: data.social_email,
            social_id: data.social_id,
          });
        } else {
          this.setState({
            name: data.social_name,
            login_type: data.logintype,
            social_type: data.logintype,
            email: '',
            social_id: data.social_id,
          });
        }
      } else {
        this.setState({
          name: data.social_name,
          login_type: data.logintype,
          social_type: data.logintype,
          email: data.social_email,
          social_id: data.social_id,
        });
      }
      if (data.social_image != null) {
        this.setState({
          image: data.social_image,
        });
      }
      this.setState({loginStatus: false});
    }
  };
  googleLogin = async () => {
    let data = await localStorage.getItemObject('socialdata');
    if (data == null) {
      SocialLogin.Socialfunction(this.props.navigation, 'google');
    } else {
      SocialLogin.socaillogout('google', this.props.navigation);
    }
  };

  facebookLogin = async () => {
    let data = await localStorage.getItemObject('socialdata');
    if (data == null) {
      SocialLogin.Socialfunction(this.props.navigation, 'facebook');
    } else {
      SocialLogin.socaillogout('facebook', this.props.navigation);
    }
  };

  signupbtn = async () => {
    Keyboard.dismiss();
    let {
      checkboxEmail,
      firstname,
      lastname,
      email,
      mobile,
      password,
      con_password,
      checkbox,
      social_type,
      login_type,
      player_id,
      companyCode,
    } = this.state;
    //------------- name--------------------
    if (firstname.trim().length <= 0) {
      msgProvider.toast(Lang_chg.emptyFirstName[config.language], 'center');
      return false;
    }
    if (lastname.trim().length <= 0) {
      msgProvider.toast(Lang_chg.emptyLastName[config.language], 'center');
      return false;
    }

    // if (name.trim().length <= 0) {
    //   msgProvider.toast(Lang_chg.emptyName[config.language], 'center');
    //   return false;
    // }
    // if(name.trim().length<=2){
    //     msgProvider.toast(Lang_chg.NameMinLength[config.language],'center')
    //     return false
    // }
    // if(name.length>25){
    //     msgProvider.toast(Lang_chg.NameMaxLength[config.language],'center')
    //     return false
    // }
    // if ((await validationprovider.textCheck(firstname)) != true) {
    //   msgProvider.toast(Lang_chg.validFirstName[config.language], 'center');
    //   return false;
    // }

    // if ((await validationprovider.textCheck(lastname)) != true) {
    //   msgProvider.toast(Lang_chg.validLastName[config.language], 'center');
    //   return false;
    // }
    //-------------------------email address----------------
    if (email.trim().length <= 0) {
      msgProvider.toast(Lang_chg.emptyEmail[config.language], 'center');
      return false;
    }

    if (email.trim().length > 0) {
      if ((await validationprovider.emailCheck(email)) != true) {
        msgProvider.toast(Lang_chg.validEmail[config.language], 'center');
        return false;
      }
    }
    //-----------------mobile number--------------------
    if (mobile.trim().length <= 0) {
      msgProvider.toast(Lang_chg.emptyMobile[config.language], 'center');
      return false;
    }
    if (mobile.trim().length < 7) {
      msgProvider.toast(Lang_chg.MobileMinLength[config.language], 'center');
      return false;
    }
    if (mobile.trim().length > 15) {
      msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center');
      return false;
    }
    if ((await validationprovider.digitCheck(mobile)) != true) {
      msgProvider.toast(Lang_chg.validMobile[config.language], 'center');
      return false;
    }
    //----------------password---------------------------
    if (social_type == 'app') {
      if (password.indexOf(' ') != -1) {
        msgProvider.toast(Lang_chg.PasswordSpace[config.language], 'center');
        return false;
      }
      if (password.trim().length <= 0) {
        msgProvider.toast(Lang_chg.emptyPassword[config.language], 'center');
        return false;
      }
      if (password.trim().length <= 5) {
        msgProvider.toast(
          Lang_chg.PasswordMinLength[config.language],
          'center',
        );
        return false;
      }
      if (password.trim().length > 16) {
        msgProvider.toast(
          Lang_chg.PasswordMaxLength[config.language],
          'center',
        );
        return false;
      }
      //----------------confirm password---------------------------
      if (con_password.indexOf(' ') != -1) {
        msgProvider.toast(Lang_chg.PasswordSpace[config.language], 'center');
        return false;
      }
      if (con_password.trim().length <= 0) {
        msgProvider.toast(Lang_chg.emptyConfirmPWD[config.language], 'center');
        return false;
      }
      if (con_password.trim().length <= 5) {
        msgProvider.toast(
          Lang_chg.ConfirmPWDMinLength[config.language],
          'center',
        );
        return false;
      }
      if (con_password.trim().length > 16) {
        msgProvider.toast(
          Lang_chg.ConfirmPWDMaxLength[config.language],
          'center',
        );
        return false;
      }
      if (con_password !== password) {
        msgProvider.toast(Lang_chg.ConfirmPWDMatch[config.language], 'center');
        return false;
      }
    }
    //--------------------------check Terms & Condition----------------------
    if (checkbox == false) {
      msgProvider.toast(Lang_chg.acceptTermsPolicy[config.language], 'center');
      return false;
    }

    var data = new FormData();
    data.append('has_company_email', checkboxEmail == true ? 1 : 0);
    if ((companyCode ?? '') !== '') {
      data.append('company_code', companyCode);
    }
    data.append('name', firstname + ' ' + lastname);
    data.append('f_name', firstname);
    data.append('l_name', lastname);
    data.append('email', email);
    data.append('phone_number', mobile);
    data.append('player_id', player_id_me1);
    data.append('device_type', config.device_type);
    data.append('social_type', social_type);
    if (social_type != 'app') {
      data.append('social_id', this.state.social_id);
      if (this.state.image != '') {
        data.append('image', {
          uri: this.state.image,
          type: 'image/jpg',
          name: 'image.jpg',
        });
      }
    } else {
      data.append('password', password);
    }
    let url = config.baseURL + 'signup';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        console.log(obj)
        if (obj.success == 'true') {
          localStorage.setItemObject('user_arr', obj.user_details);
          // if (social_type == 'app') {
          var user_value = {
            user_id: JSON.stringify(obj.user_details.user_id),
            otp: obj.user_details.otp,
            phone_number: mobile,
            password: password,
          };
          localStorage.setItemObject('user_value', user_value);
          localStorage.setItemString('password', password);
          this.props.navigation.navigate('Otp_verify', {
            check: 1,
            phone_number: mobile,
            navigation: this.props.navigation,
          });
          // }
          // else {
          //   if (obj.notification_arr != 'NA') {
          //     notification.notification_arr(obj.notification_arr);
          //   }
          //   this.props.navigation.navigate('Home', {home_status: 1});
          // }
        } else {
          if (obj.msg.constructor === Array) {
            msgProvider.alert(
              Lang_chg.information[config.language],
              obj.msg[config.language],
              false,
            );
          } else {
            msgProvider.alert(
              Lang_chg.information[config.language],
              obj.msg,
              false,
            );
          }

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
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.container}>
          <SafeAreaView
            style={{backgroundColor: Colors.theme_color, flex: 0}}
          />
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.theme_color}
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
          <ImageBackground
            source={localimag.bacKground1}
            resizeMode="stretch"
            style={{
              width: (mobileW * 100) / 100,
              height: (mobileH * 97) / 100,
            }}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: (mobileW * 40) / 100}}>
              <ImageBackground
                source={localimag.signup_top_bg}
                style={{
                  width: (mobileW * 100) / 100,
                  height: (mobileW * 70) / 100,
                  alignItems: 'center',
                }}>
                <Image
                  source={localimag.splash}
                  style={{
                    width: (mobileW * 47) / 100,
                    height: (mobileW * 47) / 100,
                  }}
                />
              </ImageBackground>
              <View
                style={{
                  alignSelf: 'center',
                  width: (mobileW * 92) / 100,
                  borderRadius: (mobileW * 3) / 100,
                  backgroundColor: Colors.whiteColor,
                  shadowOffset: {width: 1, height: 1},
                  shadowColor: Colors.shadow_color,
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: (mobileW * -16) / 100,
                }}>
                <View
                  style={{
                    width: '33%',
                    marginTop: (mobileW * 4) / 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontbold,
                      fontSize: (mobileW * 5.5) / 100,
                      color: Colors.black_color,
                      textalign: config.textRotate,
                    }}>
                    {Lang_chg.Signup[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: (mobileW * 46) / 100,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: (mobileW * 3) / 100,
                    }}>
                    <View
                      style={{
                        width: '87%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: Font.fontmedium,
                          fontSize: (mobileW * 4.3) / 100,
                          color: Colors.signup_text_title,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.firstname_txt[config.language]}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '87%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderBottomWidth: (mobileW * 0.2) / 100,
                        borderBottomColor: Colors.appColor,
                        paddingBottom: (mobileW * 1.5) / 100,
                      }}>
                      <View
                        style={{
                          width: '8%',
                          justifyContent: 'center',
                          marginEnd: 5,
                        }}>
                        <Image
                          source={localimag.men}
                          style={{
                            height: (mobileW * 5) / 100,
                            width: (mobileW * 5) / 100,
                          }}
                        />
                      </View>
                      <View style={{width: '92%'}}>
                        <TextInput
                          style={{
                            fontFamily: Font.fontregular,
                            fontSize: (mobileW * 4) / 100,
                            textAlign: config.textalign,
                            color: Colors.black_color,
                            paddingVertical: (mobileW * 1.5) / 100,
                          }}
                          placeholder={Lang_chg.firstname_txt[config.language]}
                          placeholderTextColor={Colors.signup_placeholder_color}
                          value={this.state.firstname}
                          keyboardType="default"
                          maxLength={50}
                          returnKeyLabel="done"
                          returnKeyType="done"
                          onSubmitEditing={() => {
                            Keyboard.dismiss();
                          }}
                          autoCompleteType="off"
                          onChangeText={txt => {
                            this.setState({firstname: txt});
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: (mobileW * 46) / 100,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: (mobileW * 3) / 100,
                    }}>
                    <View
                      style={{
                        width: '87%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: Font.fontmedium,
                          fontSize: (mobileW * 4.3) / 100,
                          color: Colors.signup_text_title,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.lastname_txt[config.language]}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '87%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderBottomWidth: (mobileW * 0.2) / 100,
                        borderBottomColor: Colors.appColor,
                        paddingBottom: (mobileW * 1.5) / 100,
                      }}>
                      <View
                        style={{
                          width: '8%',
                          justifyContent: 'center',
                          marginEnd: 5,
                        }}>
                        <Image
                          source={localimag.men}
                          style={{
                            height: (mobileW * 5) / 100,
                            width: (mobileW * 5) / 100,
                          }}
                        />
                      </View>
                      <View style={{width: '92%'}}>
                        <TextInput
                          style={{
                            fontFamily: Font.fontregular,
                            fontSize: (mobileW * 4) / 100,
                            textAlign: config.textalign,
                            color: Colors.black_color,
                            paddingVertical: (mobileW * 1.5) / 100,
                          }}
                          placeholder={Lang_chg.lastname_txt[config.language]}
                          placeholderTextColor={Colors.signup_placeholder_color}
                          value={this.state.lastname}
                          keyboardType="default"
                          maxLength={50}
                          returnKeyLabel="done"
                          returnKeyType="done"
                          onSubmitEditing={() => {
                            Keyboard.dismiss();
                          }}
                          autoCompleteType="off"
                          onChangeText={txt => {
                            this.setState({lastname: txt});
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: (mobileW * 92) / 100,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: (mobileW * 4.5) / 100,
                  }}>
                  <View
                    style={{
                      width: '87%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 4.3) / 100,
                        color: Colors.signup_text_title,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.email[config.language]}
                    </Text>
                  </View>

                  {this.state.login_type == 'app' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '87%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderBottomWidth: (mobileW * 0.2) / 100,
                        borderBottomColor: Colors.appColor,
                        paddingBottom: (mobileW * 1.5) / 100,
                      }}>
                      <View style={{width: '9%', justifyContent: 'center'}}>
                        <Image
                          source={localimag.signup_email}
                          style={{
                            height: (mobileW * 6.5) / 100,
                            width: (mobileW * 6.5) / 100,
                          }}
                        />
                      </View>
                      <View style={{width: '91%'}}>
                        <TextInput
                          style={{
                            fontFamily: Font.fontregular,
                            textAlign: config.textalign,
                            fontSize: (mobileW * 4) / 100,
                            color: Colors.black_color,
                            paddingVertical: (mobileW * 1.5) / 100,
                          }}
                          placeholder={Lang_chg.email[config.language]}
                          placeholderTextColor={Colors.signup_placeholder_color}
                          value={this.state.email}
                          keyboardType="email-address"
                          maxLength={100}
                          returnKeyLabel="done"
                          returnKeyType="done"
                          onSubmitEditing={() => {
                            Keyboard.dismiss();
                          }}
                          autoCompleteType="off"
                          onChangeText={txt => {
                            this.setState({email: txt});
                          }}
                        />
                      </View>
                    </View>
                  )}
                  {this.state.login_type != 'app' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '87%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderBottomWidth: (mobileW * 0.2) / 100,
                        borderBottomColor: Colors.appColor,
                        paddingBottom: (mobileW * 1.5) / 100,
                      }}>
                      <View style={{width: '9%', justifyContent: 'center'}}>
                        <Image
                          source={localimag.signup_email}
                          style={{
                            height: (mobileW * 6.5) / 100,
                            width: (mobileW * 6.5) / 100,
                          }}
                        />
                      </View>
                      <View style={{width: '91%'}}>
                        <TextInput
                          style={{
                            fontFamily: Font.fontregular,
                            textAlign: config.textalign,
                            fontSize: (mobileW * 4) / 100,
                            color: Colors.black_color,
                            paddingVertical: (mobileW * 1.5) / 100,
                          }}
                          placeholder={Lang_chg.email[config.language]}
                          placeholderTextColor={Colors.signup_placeholder_color}
                          value={this.state.email}
                          keyboardType="email-address"
                          maxLength={100}
                          editable={false}
                          returnKeyLabel="done"
                          returnKeyType="done"
                          onSubmitEditing={() => {
                            Keyboard.dismiss();
                          }}
                          autoCompleteType="off"
                          onChangeText={txt => {
                            this.setState({email: txt});
                          }}
                        />
                      </View>
                    </View>
                  )}
                  <View
                    style={{
                      width: (mobileW * 79) / 100,
                      alignSelf: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'flex-start'}}
                      activeOpacity={0.7}
                      onPress={() => {
                        this.setState({
                          checkboxEmail: !this.state.checkboxEmail,
                        });
                      }}>
                      {this.state.checkboxEmail == false ? (
                        <Image
                          source={localimag.checkbox1}
                          style={{
                            height: (mobileW * 5) / 100,
                            width: (mobileW * 5) / 100,
                          }}
                        />
                      ) : (
                        <Image
                          source={localimag.checkbox}
                          style={{
                            height: (mobileW * 5) / 100,
                            width: (mobileW * 5) / 100,
                          }}
                        />
                      )}
                      <Text
                        style={{
                          fontSize: (mobileW * 3.2) / 100,
                          fontFamily: Font.fontregular,
                          paddingLeft: (mobileW * 2) / 100,
                          color: Colors.terms_condi_txt,
                          textAlign: config.textalign,
                        }}>
                        {Lang_chg.verifyEmail[config.language]}{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {this.state.checkboxEmail === true && (
                  <Text
                    style={{
                      paddingTop: 10,
                      fontSize: (mobileW * 3.2) / 100,
                      fontFamily: Font.fontregular,
                      paddingLeft: (mobileW * 2.8) / 50,
                      color: Colors.green,
                      textAlign: config.textalign,
                    }}>
                    {Lang_chg.verifyEmailDesc[config.language]}
                  </Text>
                )}
                {this.state.checkboxEmail === true && (
                  <View>
                    <Text
                      style={{
                        paddingTop: 10,
                        fontSize: (mobileW * 3.2) / 100,
                        fontFamily: Font.fontregular,
                        paddingLeft: (mobileW * 2.8) / 50,
                        color: Colors.red,
                        textAlign: config.textalign,
                      }}>
                      {Lang_chg.donthaveDomainEmail[config.language]}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '87%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderBottomWidth: (mobileW * 0.2) / 100,
                        borderBottomColor: Colors.appColor,
                        paddingBottom: (mobileW * 1.5) / 100,
                      }}>
                      <View style={{width: '9%', justifyContent: 'center'}}>
                        <Image
                          source={localimag.signup_password}
                          style={{
                            height: (mobileW * 6.5) / 100,
                            width: (mobileW * 6.5) / 100,
                          }}
                        />
                      </View>
                      <View style={{width: '91%'}}>
                        <TextInput
                          style={{
                            fontFamily: Font.fontregular,
                            textAlign: config.textalign,
                            fontSize: (mobileW * 4) / 100,
                            color: Colors.black_color,
                            paddingVertical: (mobileW * 1.5) / 100,
                          }}
                          placeholder={
                            Lang_chg.companyCodeTitle[config.language]
                          }
                          placeholderTextColor={Colors.signup_placeholder_color}
                          value={this.state.companyCode}
                          maxLength={100}
                          returnKeyLabel="done"
                          returnKeyType="done"
                          onSubmitEditing={() => {
                            Keyboard.dismiss();
                          }}
                          autoCompleteType="off"
                          onChangeText={txt => {
                            this.setState({companyCode: txt});
                          }}
                        />
                      </View>
                    </View>
                  </View>
                )}
                <View
                  style={{
                    width: (mobileW * 92) / 100,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: (mobileW * 4.5) / 100,
                  }}>
                  <View
                    style={{
                      width: '87%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 4.3) / 100,
                        color: Colors.signup_text_title,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.mobile[config.language]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection:
                        config.textalign == 'left' ? 'row' : 'row-reverse',
                      width: '87%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      borderBottomWidth: (mobileW * 0.2) / 100,
                      borderBottomColor: Colors.appColor,
                      paddingBottom: (mobileW * 1.5) / 100,
                    }}>
                    <View style={{width: '9%', justifyContent: 'center'}}>
                      <Image
                        source={localimag.call1}
                        style={{
                          height: (mobileW * 5) / 100,
                          width: (mobileW * 5) / 100,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: '13%',
                        justifyContent: 'center',
                        borderRightColor: Colors.bottom_border,
                        borderRightWidth: (mobileW * 0.2) / 100,
                      }}>
                      <Text
                        style={{
                          color: Colors.signup_placeholder_color,
                          fontFamily: Font.fontregular,
                          fontSize: (mobileW * 4) / 100,
                        }}>
                        +20
                      </Text>
                    </View>
                    <View
                      style={{width: '78%', paddingLeft: (mobileW * 1) / 100}}>
                      <TextInput
                        style={{
                          fontFamily: Font.fontregular,
                          textAlign: 'left',
                          fontSize: (mobileW * 4) / 100,
                          color: Colors.black_color,
                          paddingVertical: (mobileW * 1.5) / 100,
                        }}
                        placeholder={Lang_chg.mobile[config.language]}
                        placeholderTextColor={Colors.signup_placeholder_color}
                        value={this.state.mobile}
                        keyboardType="number-pad"
                        maxLength={15}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                        }}
                        autoCompleteType="off"
                        onChangeText={txt => {
                          this.setState({mobile: txt});
                        }}
                      />
                    </View>
                  </View>
                </View>

                {this.state.login_type == 'app' && (
                  <View
                    style={{
                      width: (mobileW * 92) / 100,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: (mobileW * 4.5) / 100,
                    }}>
                    <View
                      style={{
                        width: '87%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: Font.fontmedium,
                          fontSize: (mobileW * 4.3) / 100,
                          color: Colors.signup_text_title,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.password[config.language]}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '87%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderBottomWidth: (mobileW * 0.2) / 100,
                        borderBottomColor: Colors.appColor,
                        paddingBottom: (mobileW * 1.5) / 100,
                      }}>
                      <View style={{width: '9%', justifyContent: 'center'}}>
                        <Image
                          source={localimag.signup_password}
                          style={{
                            height: (mobileW * 5.5) / 100,
                            width: (mobileW * 5.5) / 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: '91%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <TextInput
                          style={{
                            fontFamily: Font.fontregular,
                            textAlign: config.textalign,
                            fontSize: (mobileW * 4.2) / 100,
                            color: Colors.black_color,
                            paddingVertical: (mobileW * 1.5) / 100,
                            width: '85%',
                          }}
                          placeholder={Lang_chg.password[config.language]}
                          placeholderTextColor={Colors.signup_placeholder_color}
                          value={this.state.password}
                          keyboardType="default"
                          secureTextEntry={this.state.securepass1}
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
                            this.setState({
                              securepass1: !this.state.securepass1,
                            });
                          }}
                          style={{width: '15%', justifyContent: 'center'}}>
                          {this.state.securepass1 == true ? (
                            <Text
                              style={{
                                color: Colors.appColor,
                                textAlign: config.textRotate,
                                fontFamily: Font.fontmedium,
                                fontSize: (mobileW * 3.1) / 100,
                              }}>
                              {Lang_chg.show[config.language]}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                color: Colors.appColor,
                                textAlign: config.textRotate,
                                fontFamily: Font.fontmedium,
                                fontSize: (mobileW * 3.1) / 100,
                              }}>
                              {Lang_chg.Hide[config.language]}
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}

                {this.state.login_type == 'app' && (
                  <View
                    style={{
                      width: (mobileW * 92) / 100,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: (mobileW * 4.5) / 100,
                    }}>
                    <View
                      style={{
                        width: '87%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: Font.fontmedium,
                          textAlign: config.textRotate,
                          fontSize: (mobileW * 4.3) / 100,
                          color: Colors.signup_text_title,
                        }}>
                        {Lang_chg.confirmpassword[config.language]}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '87%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderBottomWidth: (mobileW * 0.2) / 100,
                        borderBottomColor: Colors.appColor,
                        paddingBottom: (mobileW * 1.5) / 100,
                      }}>
                      <View style={{width: '9%', justifyContent: 'center'}}>
                        <Image
                          source={localimag.signup_password}
                          style={{
                            height: (mobileW * 5.5) / 100,
                            width: (mobileW * 5.5) / 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: '91%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <TextInput
                          style={{
                            fontFamily: Font.fontregular,
                            textAlign: config.textalign,
                            fontSize: (mobileW * 4) / 100,
                            color: Colors.black_color,
                            paddingVertical: (mobileW * 1.5) / 100,
                            width: '85%',
                          }}
                          placeholder={
                            Lang_chg.confirmpassword[config.language]
                          }
                          placeholderTextColor={Colors.signup_placeholder_color}
                          value={this.state.con_password}
                          keyboardType="default"
                          secureTextEntry={this.state.securepass2}
                          maxLength={16}
                          returnKeyLabel="done"
                          returnKeyType="done"
                          onSubmitEditing={() => {
                            Keyboard.dismiss();
                          }}
                          autoCompleteType="off"
                          onChangeText={txt => {
                            this.setState({con_password: txt});
                          }}
                        />
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.setState({
                              securepass2: !this.state.securepass2,
                            });
                          }}
                          style={{width: '15%', justifyContent: 'center'}}>
                          {this.state.securepass2 == true ? (
                            <Text
                              style={{
                                color: Colors.appColor,
                                textAlign: config.textRotate,
                                fontFamily: Font.fontmedium,
                                fontSize: (mobileW * 3.1) / 100,
                              }}>
                              {Lang_chg.show[config.language]}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                color: Colors.appColor,
                                textAlign: config.textRotate,
                                fontFamily: Font.fontmedium,
                                fontSize: (mobileW * 3.1) / 100,
                              }}>
                              {Lang_chg.Hide[config.language]}
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}

                <View
                  style={{
                    marginTop: (mobileH * 2.5) / 100,
                    width: (mobileW * 79) / 100,
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}
                    activeOpacity={0.7}
                    onPress={() => {
                      this.setState({checkbox: !this.state.checkbox});
                    }}>
                    {this.state.checkbox == false ? (
                      <Image
                        source={localimag.checkbox1}
                        style={{
                          height: (mobileW * 5) / 100,
                          width: (mobileW * 5) / 100,
                        }}
                      />
                    ) : (
                      <Image
                        source={localimag.checkbox}
                        style={{
                          height: (mobileW * 5) / 100,
                          width: (mobileW * 5) / 100,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: (mobileW * 3.2) / 100,
                        fontFamily: Font.fontregular,
                        paddingLeft: (mobileW * 2) / 100,
                        color: Colors.terms_condi_txt,
                        textAlign: config.textalign,
                      }}>
                      {Lang_chg.clicking_signup_btn[config.language]}{' '}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        fontSize: (mobileW * 2.8) / 100,
                        fontFamily: Font.fontregular,
                        color: Colors.terms_condi_txt,
                        justifyContent: 'center',
                        paddingTop: (mobileW * 0.4) / 100,
                        textAlign: config.textalign,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('Terms_about_policy', {
                          check: 2,
                        });
                      }}>
                      {Lang_chg.tearmsetting[config.language]}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.2) / 100,
                        fontFamily: Font.fontregular,
                        color: Colors.terms_condi_txt,
                        textAlign: config.textalign,
                      }}>
                      {' '}
                      {Lang_chg.and[config.language]}{' '}
                    </Text>
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        fontSize: (mobileW * 2.8) / 100,
                        fontFamily: Font.fontregular,
                        color: Colors.terms_condi_txt,
                        paddingTop: (mobileW * 0.4) / 100,
                        textAlign: config.textalign,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('Terms_about_policy', {
                          check: 1,
                        });
                      }}>
                      {Lang_chg.privacy_txt[config.language]}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.signupbtn();
                  }}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    width: (mobileW * 60) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 7) / 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: (mobileW * 6) / 100,
                    backgroundColor: Colors.appColor,
                    marginBottom: (mobileW * 13) / 100,
                  }}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.9) / 100,
                      color: Colors.whiteColor,
                      fontFamily: Font.fontsemibold,
                      textAlign: config.textAlign,
                      paddingLeft: 4,
                      paddingVertical: (mobileW * 2.8) / 100,
                    }}>
                    {Lang_chg.Signup[config.language]}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: (mobileW * 92) / 100,
                    marginBottom: (mobileW * 6) / 100,
                  }}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.5) / 100,
                      fontFamily: Font.fontmedium,
                      color: Colors.black_color,
                      textAlign: config.textRotate,
                    }}>
                    {Lang_chg.already[config.language]}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      this.props.navigation.navigate('Login');
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.fontmedium,
                        color: Colors.login_btn_color,
                        textAlign: config.textalign,
                      }}>
                      {' '}
                      {Lang_chg.login1[config.language]}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  imageView: {
    height: (mobileW * 3.5) / 100,
    width: (mobileW * 9) / 100,
    resizeMode: 'contain',
  },
  ViewText: {
    flexDirection: 'row',
    width: '87%',
    borderBottomColor: Colors.appColor,
    borderBottomWidth: (mobileW * 0.2) / 100,
    alignSelf: 'center',

    justifyContent: 'center',

    backgroundColor: 'pink',
  },
  textInputView: {
    width: '80%',

    fontFamily: Font.fontmedium,
    color: Colors.textColors,
  },
  ImageView: {
    width: '9%',
  },
  img: {
    height: (mobileW * 47) / 100,
    width: (mobileW * 47) / 100,
  },
});
