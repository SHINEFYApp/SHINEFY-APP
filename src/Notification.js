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
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
import {Nodata_foundimage} from './Provider/Nodata_foundimage';

// const notification_arr = [
//     { time:'15/Feb/22,10:00AM ', dis:'Your Booking was Created Successfully',status:true},
//     {  time:'13/Feb/22,11:00AM', dis:'Your Booking has been Cancelled',status:true},
//     {  time:'01/Feb/22,08:00PM', dis:'We remind you that you have an upcoming Booking an hour from now',status:false},
//     { time:'01/Feb/22,10:00AM', dis:'Your Booking was Created Successfully',status:true},
//     { time:'28/Jan/22,06:00PM', dis:'Your Booking has been Cancelled',status:true},
//     { time:'26/Jan/22,10:00AM', dis:'We remind you that you have an upcoming Booking an hour from now',status:false},
//     { time:'23/Jan/22,08:00AM', dis:'Your Booking was Created Successfully',status:true},
//     { time:'28/Jan/22,11:00AM', dis:'Your Booking has been Cancelled',status:true},

// ]

export default class Notification extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      notification_arr: 'NA',
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.get_notification(0);
    });
    this.get_notification(0);
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

  get_notification = async page => {
    let user_details = await localStorage.getItemObject('user_arr');
    let user_id = user_details.user_id;
    let url = config.baseURL1 + 'get_notification.php?user_id=' + user_id;

    apifuntion
      .getApi(url, page)
      .then(obj => {
        if (obj.success == 'true') {
          this.setState({
            notification_arr: obj.notification_arr,
            refresh: false,
          });
        } else {
          if (
            obj.active_status == msgTitle.deactivate[config.language] ||
            obj.msg[config.language] == msgTitle.usernotexit[config.language]
          ) {
            // usernotfound.loginFirst(this.props, obj.msg[config.language]);
          } else {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false,
            );
          }
          return false;
        }
      })
      .catch(error => {});
  };

  notification_delete_click = async (item, index) => {
    let user_details = await localStorage.getItemObject('user_arr');
    let user_id = user_details.user_id;
    let notification_message_id = item.notification_message_id;
    let url =
      config.baseURL1 +
      'delete_single_notification.php?user_id=' +
      user_id +
      '&notification_message_id=' +
      notification_message_id;

    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          let data = this.state.notification_arr;

          data.splice(index, 1);
          if (data.length <= 0) {
            data = 'NA';
          }
          this.setState({notification_arr: data});
        } else {
          if (
            obj.active_status == msgTitle.deactivate[config.language] ||
            obj.msg[config.language] == msgTitle.usernotexit[config.language]
          ) {
            // usernotfound.loginFirst(this.props, obj.msg[config.language]);
          } else {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false,
            );
          }
          return false;
        }
      })
      .catch(error => {});
  };
  delete_all_notification_click = async (item, index) => {
    let user_details = await localStorage.getItemObject('user_arr');
    let user_id = user_details.user_id;
    let url =
      config.baseURL1 + 'delete_all_notification.php?user_id=' + user_id;
    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          this.get_notification();
        } else {
          if (
            obj.active_status == msgTitle.deactivate[config.language] ||
            obj.msg[config.language] == msgTitle.usernotexit[config.language]
          ) {
            usernotfound.loginFirst(this.props, obj.msg[config.language]);
          } else {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false,
            );
          }
          return false;
        }
      })
      .catch(error => {});
  };

  data_delete() {
    Alert.alert(
      Lang_chg.Clear[config.language],
      Lang_chg.clear_notification_detail[config.language],
      [
        {
          text: Lang_chg.No[config.language],
        },
        {
          text: Lang_chg.Yes[config.language],
          onPress: () => this.delete_all_notification_click(),
        },
      ],
      {cancelable: false},
    );
  }

  data_delete_single(item, index) {
    Alert.alert(
      Lang_chg.delete[config.language],
      Lang_chg.delete_noti_detail[config.language],
      [
        {
          text: Lang_chg.No[config.language],
        },
        {
          text: Lang_chg.Yes[config.language],
          onPress: () => this.notification_delete_click(item, index),
        },
      ],
      {cancelable: false},
    );
  }
  myactionfunction = (item, index) => {
    if (item.action == 'on the way') {
      this.props.navigation.navigate('Bookings_Details', {
        booking_id: item.action_id,
      });
    } else if (item.action == 'arrived') {
      this.props.navigation.navigate('Bookings_Details', {
        booking_id: item.action_id,
      });
    } else if (item.action == 'start washing') {
      this.props.navigation.navigate('Bookings_Details', {
        booking_id: item.action_id,
      });
    } else if (item.action == 'booking completed') {
      this.props.navigation.navigate('Bookings_Details', {
        booking_id: item.action_id,
      });
    } else if (item.action == 'collect amount') {
      this.props.navigation.navigate('Bookings_Details', {
        booking_id: item.action_id,
      });
    } else if (item.action == 'booking') {
      this.props.navigation.navigate('Bookings_Details', {
        booking_id: item.action_id,
      });
    } else if (item.action == 'credit') {
      this.props.navigation.navigate('My_Wallet');
    } else if (item.action == 'debit') {
      this.props.navigation.navigate('My_Wallet');
    }
  };
  _onRefresh = () => {
    this.setState({refresh: true});
    this.get_notification(1);
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
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: (mobileW * 6) / 100,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  justifyContent: 'center',
                  width: '12%',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.navigate('Home', {home_status: 1});
                }}>
                <Image
                  source={localimag.goback}
                  style={{
                    width: (mobileW * 5.3) / 100,
                    height: (mobileW * 5.3) / 100,
                    transform: [
                      config.textalign == 'right'
                        ? {
                            scaleX: -1,
                          }
                        : {
                            scaleX: 1,
                          },
                    ],
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '68%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  paddingLeft: (mobileW * 5) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontmedium,
                    fontSize: (mobileW * 5.6) / 100,
                    color: Colors.whiteColor,
                  }}>
                  {Lang_chg.notification_txt[config.language]}
                </Text>
              </View>
              {this.state.notification_arr != 'NA' && (
                <TouchableOpacity
                  style={{width: '20%', alignItems: 'center'}}
                  activeOpacity={0.7}
                  onPress={() => {
                    this.data_delete();
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontregular,
                      fontSize: (mobileW * 4) / 100,
                      color: Colors.whiteColor,
                    }}>
                    {Lang_chg.Clear_all[config.language]}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
          <ScrollView
            style={{flex: 1, backgroundColor: '#fff'}}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={this._onRefresh}
                tintColor="black"
              />
            }>
            <View>
              {this.state.notification_arr == 'NA' && <Nodata_foundimage />}
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: (mobileW * 35) / 100,
                  marginTop: (mobileW * 3) / 100,
                }}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.notification_arr}
                renderItem={({index, item}) => {
                  if (this.state.notification_arr != 'NA') {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.myactionfunction(item, index);
                        }}
                        style={{
                          width: (mobileW * 95) / 100,
                          flexDirection: 'row',
                          marginTop: (mobileW * 4.5) / 100,
                          borderBottomColor: Colors.bottom_border,
                          borderBottomWidth: (mobileW * 0.2) / 100,
                          paddingBottom: (mobileW * 2.7) / 100,
                          alignSelf: 'center',
                          paddingBottom: (mobileW * 3.5) / 100,
                        }}>
                        <View style={{width: '15%'}}>
                          <Image
                            source={localimag.new_app_logo}
                            style={{
                              height: (mobileW * 12) / 100,
                              width: (mobileW * 12) / 100,
                              borderRadius: (mobileW * 10) / 100,
                            }}
                          />
                        </View>
                        <View style={{width: '85%', justifyContent: 'center'}}>
                          <View style={{width: '100%', flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                              <Text
                                style={{
                                  fontSize: (mobileW * 4.1) / 100,
                                  fontFamily: Font.fontmedium,
                                  color: Colors.edit_profile_txt_color,
                                  textAlign: config.textRotate,
                                }}>
                                {config.language == 0
                                  ? item.title
                                  : item.title_2}
                              </Text>
                            </View>
                            <View style={{width: '50%'}}>
                              <Text
                                style={{
                                  textAlign: 'right',
                                  fontSize: (mobileW * 2.8) / 100,
                                  fontFamily: Font.fontmedium,
                                  color: Colors.signup_text_title,
                                }}>
                                {item.createtime}
                              </Text>
                            </View>
                          </View>
                          <View style={{width: '100%', flexDirection: 'row'}}>
                            <View style={{width: '85%'}}>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.2) / 100,
                                  fontFamily: Font.fontmedium,
                                  color: Colors.signup_text_title,
                                  textAlign: config.textRotate,
                                }}>
                                {config.language == 0
                                  ? item.message
                                  : item.message_2}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                this.data_delete_single(item, index);
                              }}
                              activeOpacity={0.7}
                              style={{width: '15%', alignItems: 'flex-end'}}>
                              <Image
                                source={localimag.cross_icon}
                                style={{
                                  height: (mobileW * 3.5) / 100,
                                  width: (mobileW * 3.5) / 100,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                }}
              />
            </View>
          </ScrollView>
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
});
