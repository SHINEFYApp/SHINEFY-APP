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
  ScrollView,
  StyleSheet,
  TextInput,
  Linking,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
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
import DashedLine from 'react-native-dashed-line';
import StarRating from 'react-native-star-rating';
import openMap from 'react-native-open-maps';

export default class Bookings_Details extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      modalVisible1: false,
      booking_id: this.props.route.params.booking_id,
      check: '',
      booking_arr: 'NA',
      openImageModal: false,
      fullImage: '',
      user_name: '',
      user_image: 'NA',
      user_id: '',
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  NoAreaFound = msg => {
    Alert.alert(
      Lang_chg.alert_txt[config.language],
      Lang_chg.msgConfirmBookingReschedule[config.language],
      [
        {
          text: Lang_chg.no_txt[config.language],
          onPress: () => {},
          style: 'Yes',
        },
        {
          text: Lang_chg.yes_txt[config.language],
          onPress: () => {
            this.freeDriver();
          },
        },
      ],
      {
        cancelable: false,
      },
    ); // works best when the goBack is async
    return false;
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      if (this.props.route.params.my_booking_check != null) {
        this.setState({check: this.props.route.params.my_booking_check});
      }
      this.setState({booking_id: this.props.route.params.booking_id});
      // setTimeout(() => {
      //     this.setBookingDetails();
      // }, 500);
    });
    this._willBlurSubscription = this.props.navigation.addListener(
      'blur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
    );
    setTimeout(() => {
      this.setBookingDetails();
    }, 500);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  rescheduleFun = async () => {
    let {user_id, booking_arr} = this.state;
    var reschedule_arr = {
      user_id: user_id,
      booking_id: booking_arr.booking_id,
      latitude: booking_arr.lat,
      longitude: booking_arr.lon,
      service_time: booking_arr.service_hours,
      amount: booking_arr.sub_total,
      booking_no: booking_arr.booking_no,
      service_time: booking_arr.service_hours,
    };
    localStorage.setItemObject('reschedule_arr', reschedule_arr);
    localStorage.setItemObject('booking_number', booking_arr.booking_no);
    localStorage.setItemObject('booking_id', booking_arr.booking_id);
    this.props.navigation.navigate('Select_date_reschedule');
  };

  openMapFun = async () => {
    openMap({
      latitude: this.state.booking_arr.lat,
      longitude: this.state.booking_arr.long,
    });
  };

  setBookingDetails = async () => {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    let booking_id = this.state.booking_id;
    var url = config.baseURL + 'get_booking/' + user_id + '/' + booking_id;
    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          localStorage.setItemObject('user_arr', obj.user_details);
          this.setState({
            booking_arr: obj.booking_arr,
            user_name: obj.user_details.name,
            user_image: obj.user_details.image,
            user_id: obj.user_details.user_id,
          });
        } else {
          if (obj.account_active_status[0] == 'deactivate') {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          }
          if (obj.acount_delete_status[0] == 'deactivate') {
            config.checkUserDelete(this.props.navigation);
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

  freeDriver = async () => {
    let booking_id = this.state.booking_id;
    var url = config.baseURL + 'update_booking_driver/' + booking_id;
    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          this.rescheduleFun();
        } else {
          if (obj.account_active_status[0] == 'deactivate') {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          }
          if (obj.acount_delete_status[0] == 'deactivate') {
            config.checkUserDelete(this.props.navigation);
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

  gobackFun = async () => {
    if (this.state.booking_arr.status == 0) {
      this.props.navigation.navigate('My_Bookings', {booking_check: 1});
    } else if (this.state.booking_arr.status == 1) {
      this.props.navigation.navigate('My_Bookings', {booking_check: 2});
    } else {
      this.props.navigation.navigate('My_Bookings', {booking_check: 3});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <SafeAreaView style={{backgroundColor: Colors.appColor, flex: 0}} />
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.appColor}
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
          {/* Report Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible1}
            onRequestClose={() => {
              this.setState({modalVisible1: !this.state.modalVisible1});
            }}>
            <View
              style={{
                backgroundColor: '#00000080',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <StatusBar
                backgroundColor={Colors.Themecolor}
                barStyle="default"
                hidden={false}
                translucent={false}
                networkActivityIndicatorVisible={true}
              />
              <View
                style={{
                  borderRadius: 20,
                  width: '88%',
                  position: 'absolute',
                  bottom: 0,
                }}>
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 20,
                    width: '100%',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: (mobileW * 3.2) / 100,
                        alignSelf: 'center',
                        fontFamily: Font.fontmedium,
                        paddingVertical: (mobileH * 2.2) / 100,
                      }}>
                      {Lang_chg.Select_Option[config.language]}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomColor: '#D0D7DE',
                      borderBottomWidth: 1,
                    }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      this.setState({modalVisible1: false}),
                        this.props.navigation.navigate('Reason_message', {
                          msg_page_status: 2,
                          booking_id: this.state.booking_arr.booking_id,
                        });
                    }}>
                    <Text
                      style={{
                        color: Colors.modalText_color,
                        fontSize: (mobileW * 4) / 100,
                        fontFamily: Font.fontmedium,
                        alignSelf: 'center',
                        paddingTop: (mobileH * 3) / 100,
                        paddingBottom: (mobileH * 3) / 100,
                      }}>
                      {Lang_chg.report[config.language]}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 20,
                    width: '100%',
                    paddingVertical: 20,
                    marginVertical: 15,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.setState({modalVisible1: false})}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: (mobileW * 4) / 100,
                        fontFamily: Font.fontmedium,
                        alignSelf: 'center',
                      }}>
                      {Lang_chg.cancelmedia[config.language]}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Report Modal */}
          {/* Open Image Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.openImageModal}
            onRequestClose={() => {
              this.setState({openImageModal: !this.state.openImageModal});
            }}>
            <View style={{flex: 1, backgroundColor: '#000'}}>
              <SafeAreaView style={{flex: 0}} />
              <TouchableOpacity
                onPress={() => {
                  this.setState({openImageModal: false});
                }}
                style={{
                  width: (mobileW * 10) / 100,
                  alignItems: 'center',
                  marginTop: (mobileW * 8) / 100,
                }}>
                <Image
                  source={localimag.goback}
                  style={{
                    width: (mobileW * 5) / 100,
                    height: (mobileW * 5) / 100,
                    transform: [
                      config.textalign == 'right' ? {scaleX: -1} : {scaleX: 1},
                    ],
                  }}
                />
              </TouchableOpacity>

              <View
                style={{
                  height: (mobileH * 100) / 100,
                  width: (mobileW * 100) / 100,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({openImageModal: false});
                  }}
                  style={{
                    width: (mobileW * 10) / 100,
                    height: (mobileH * 10) / 100,
                    paddingTop: 30,
                    paddingRight: 20,
                    position: 'absolute',
                    right: 0,
                    top: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <View
                  style={{
                    alignSelf: 'center',
                    width: '100%',
                    height: (mobileH * 60) / 100,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: config.img_url3 + this.state.fullImage}}
                    style={{
                      width: '100%',
                      height: (mobileH * 60) / 100,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          {/* close Open Image Modal */}
          {/* -------------------------------------------Header---------------------------------------- */}
          <ImageBackground
            source={localimag.new_header}
            style={{
              width: (mobileW * 100) / 100,
              height: (mobileW * 20) / 100,
            }}>
            <View
              style={{
                alignItems: 'center',
                width: (mobileW * 100) / 100,
                flexDirection: 'row',
                paddingVertical: (mobileW * 6) / 100,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: (mobileW * 13) / 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.gobackFun();
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: (mobileW * 5.3) / 100,
                    height: (mobileW * 5.3) / 100,
                    transform: [
                      config.textalign == 'right' ? {scaleX: -1} : {scaleX: 1},
                    ],
                  }}
                  source={localimag.goback}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '72%',
                  alignItems: 'center',
                  paddingLeft: (mobileW * 3) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontsemibold,
                    fontSize: (mobileW * 5.5) / 100,
                    color: Colors.whiteColor,
                  }}>
                  {this.state.booking_arr != 'NA' &&
                    this.state.booking_arr.booking_no}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: (mobileW * 18) / 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({modalVisible1: true});
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: (mobileW * 5) / 100,
                    height: (mobileW * 6) / 100,
                  }}
                  source={localimag.bullet_icon}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <ImageBackground
            source={localimag.bacKground1}
            resizeMode="stretch"
            style={{
              width: (mobileW * 100) / 100,
              height: (mobileH * 87) / 100,
            }}>
            {this.state.booking_arr != 'NA' && (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: (mobileW * 15) / 100}}>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: (mobileW * 5) / 100,
                  }}>
                  <View style={{width: '60%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: Colors.signup_placeholder_color,
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {this.state.booking_arr.createtime}
                    </Text>
                  </View>
                  <View style={{width: '40%', justifyContent: 'center'}}>
                    {this.state.booking_arr.status == 0 && (
                      <Text
                        style={{
                          color: Colors.red,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.4) / 100,
                          textAlign: 'right',
                        }}>
                        {Lang_chg.pending_txt[config.language]}
                      </Text>
                    )}
                    {this.state.booking_arr.status == 1 && (
                      <Text
                        style={{
                          color: Colors.blue,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.4) / 100,
                          textAlign: 'right',
                        }}>
                        {Lang_chg.inprogress_txt[config.language]}
                      </Text>
                    )}
                    {this.state.booking_arr.status == 2 && (
                      <Text
                        style={{
                          color: Colors.green,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.4) / 100,
                          textAlign: 'right',
                        }}>
                        {Lang_chg.completed_txt[config.language]}
                      </Text>
                    )}
                    {this.state.booking_arr.status == 3 && (
                      <Text
                        style={{
                          color: Colors.red,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.4) / 100,
                          textAlign: 'right',
                        }}>
                        {Lang_chg.cancel1_txt[config.language]}
                      </Text>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: (mobileW * 4) / 100,
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.2) / 100,
                    paddingBottom: (mobileW * 1.5) / 100,
                  }}>
                  <View style={{width: '60%', justifyContent: 'flex-end'}}>
                    <Text
                      style={{
                        color: Colors.signup_placeholder_color,
                        fontFamily: Font.fontbold,
                        fontSize: (mobileW * 3.6) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.adress_txt[config.language]}
                    </Text>
                  </View>
                  <View style={{width: '40%', alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 4) / 100,
                      }}>
                      {Lang_chg.home1_txt[config.language]}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        Linking.openURL(
                          'https://maps.google.com/?q=' +
                            this.state.booking_arr.address_loc,
                        );
                      }}>
                      <Text
                        style={{
                          color: '#0075FF',
                          fontFamily: Font.fontmedium,
                          fontSize: (mobileW * 2.9) / 100,
                          textDecorationLine: 'underline',
                        }}>
                        {Lang_chg.navigatelocation_txt[config.language]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    borderRadius: (mobileW * 1) / 100,
                    marginTop: (mobileW * 4) / 100,
                    elevation: 5,
                    backgroundColor: Colors.whiteColor,
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: Colors.shadow_color,
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}>
                  <View
                    style={{
                      width: '95%',
                      alignItems: 'center',
                      backgroundColor: Colors.appColor,
                      borderRadius: (mobileW * 1) / 100,
                      marginTop: (mobileW * 4) / 100,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: Colors.whiteColor,
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.5) / 100,
                        paddingVertical: (mobileW * 2.3) / 100,
                      }}>
                      {this.state.booking_arr.booking_date} ,{' '}
                      {this.state.booking_arr.booking_time[config.language]}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '94%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingTop: (mobileW * 4.3) / 100,
                      alignItems: 'center',
                    }}>
                    <View style={{width: '50%', alignItems: 'flex-start'}}>
                      <Text
                        style={{
                          color: Colors.appColor,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'center',
                        }}>
                        {Lang_chg.cardetails_txt[config.language]}
                      </Text>
                    </View>
                    <View style={{width: '50%', alignItems: 'flex-end'}}>
                      <Text
                        style={{
                          color: Colors.appColor,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'center',
                        }}>
                        {this.state.booking_arr.model_name[config.language]}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '92%',
                      paddingTop: (mobileW * 2.2) / 100,
                      flexDirection: 'row',
                      alignSelf: 'center',
                      borderBottomColor: Colors.bottom_border,
                      borderBottomWidth: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      paddingBottom: (mobileW * 3.5) / 100,
                    }}>
                    <View
                      style={{
                        width: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.appColor,
                        borderRadius: (mobileW * 1.5) / 100,
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          color: Colors.white_color,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.7) / 100,
                          marginTop: (mobileW * 2) / 100,
                        }}>
                        {this.state.booking_arr.vehicle_name[config.language]}
                      </Text>
                      <Image
                        source={{
                          uri:
                            config.img_url3 +
                            this.state.booking_arr.vehicle_image,
                        }}
                        style={{
                          height: (mobileW * 15) / 100,
                          width: (mobileW * 17) / 100,
                          marginBottom: (mobileW * 1) / 100,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: '33%',
                        alignItems: 'center',
                        marginTop: (mobileW * 3) / 100,
                      }}>
                      <View
                        style={{
                          alignSelf: 'center',
                          paddingVertical: (mobileW * 0.9) / 100,
                          alignItems: 'center',
                        }}>
                        <Text style={styles.text_style}>
                          {Lang_chg.platenumber_txt[config.language]}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignSelf: 'center',
                          paddingVertical: (mobileW * 3.5) / 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.text_style1}>
                          {this.state.booking_arr.plate_number}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderRightWidth: (mobileW * 0.3) / 100,
                        borderRightColor: Colors.appColor,
                        height: (mobileW * 16) / 100,
                        marginTop: (mobileW * 4) / 100,
                      }}
                    />
                    <View
                      style={{
                        width: '27%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <View style={{paddingVertical: (mobileW * 2) / 100}}>
                        <Text style={styles.text_style}>
                          {Lang_chg.make_txt[config.language]}
                        </Text>
                      </View>
                      <View style={{}}>
                        <Image
                          source={{
                            uri:
                              config.img_url3 +
                              this.state.booking_arr.make_image,
                          }}
                          style={{
                            height: (mobileW * 9) / 100,
                            width: (mobileW * 12) / 100,
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        borderRightWidth: (mobileW * 0.3) / 100,
                        borderRightColor: Colors.appColor,
                        height: (mobileW * 16) / 100,
                        marginTop: (mobileW * 4) / 100,
                      }}
                    />
                    <View
                      style={{
                        width: '16%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          paddingVertical: (mobileW * 1.5) / 100,
                          alignSelf: 'flex-end',
                        }}>
                        <Text style={styles.text_style}>
                          {Lang_chg.color1_txt[config.language]}
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingVertical: (mobileW * 2.5) / 100,
                          alignSelf: 'center',
                          marginLeft: (mobileW * 6) / 100,
                        }}>
                        <View
                          style={{
                            backgroundColor: this.state.booking_arr.color_code,
                            borderRadius: (mobileW * 2) / 100,
                            height: (mobileW * 3.5) / 100,
                            width: (mobileW * 3.5) / 100,
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '93%',
                      flexDirection: 'row',
                      marginTop: (mobileW * 4) / 100,
                      alignSelf: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.7) / 100,
                          color: Colors.appColor,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.services[config.language]}
                      </Text>
                    </View>
                    {this.state.booking_arr.status == 1 && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this.props.navigation.navigate('Track_Booking', {
                            lat: this.state.booking_arr.lat,
                            lon: this.state.booking_arr.lon,
                            booking_id: this.state.booking_id,
                          });
                        }}
                        style={{width: '50%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontsemibold,
                            fontSize: (mobileW * 3.5) / 100,
                            color: Colors.green,
                            textDecorationLine: 'underline',
                          }}>
                          {Lang_chg.trackyourbooking_txt[config.language]}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View
                    style={{
                      width: '93%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingVertical: (mobileW * 2) / 100,
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontregular,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: config.textRotate,
                        }}>
                        {this.state.booking_arr.service_name[config.language]}
                      </Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontbold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'right',
                        }}>
                        {this.state.booking_arr.service_price} EGP
                      </Text>
                    </View>
                  </View>
                  {this.state.booking_arr.extra_services != 'NA' && (
                    <View style={{width: (mobileW * 90) / 100}}>
                      <View
                        style={{
                          width: '93%',
                          flexDirection: 'row',
                          paddingVertical: (mobileW * 1) / 100,
                          alignSelf: 'center',
                        }}>
                        <View style={{width: '50%'}}>
                          <Text
                            style={{
                              fontFamily: Font.fontsemibold,
                              fontSize: (mobileW * 3.8) / 100,
                              color: Colors.appColor,
                              textAlign: config.textRotate,
                            }}>
                            {Lang_chg.extraservice_txt[config.language]}
                          </Text>
                        </View>
                      </View>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={this.state.booking_arr.extra_services}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{}}
                        renderItem={({index, item}) => {
                          return (
                            <View
                              style={{
                                width: '93%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                paddingVertical: (mobileW * 2) / 100,
                              }}>
                              <View style={{width: '60%'}}>
                                <Text
                                  style={{
                                    color: Colors.black_color,
                                    fontFamily: Font.fontregular,
                                    fontSize: (mobileW * 3.6) / 100,
                                    textAlign: config.textRotate,
                                  }}>
                                  {item.extra_service_name[config.language]}
                                </Text>
                              </View>
                              <View style={{width: '40%'}}>
                                <Text
                                  style={{
                                    color: Colors.black_color,
                                    fontFamily: Font.fontbold,
                                    fontSize: (mobileW * 3.6) / 100,
                                    textAlign: 'right',
                                  }}>
                                  {item.extra_service_price} EGP X{' '}
                                  {
                                    this.state.booking_arr
                                      .extra_services_quantity
                                  }
                                </Text>
                              </View>
                            </View>
                          );
                        }}
                      />
                    </View>
                  )}

                  <DashedLine
                    axis="horizontal"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 2) / 100,
                    }}
                    Length={7}
                    dashColor={Colors.bottom_border}
                    dashThickness={0.7}
                  />

                  <View
                    style={{
                      width: '93%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingVertical: (mobileW * 2) / 100,
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.subtotal_txt[config.language]}
                      </Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontbold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'right',
                        }}>
                        {this.state.booking_arr.sub_total} EGP
                      </Text>
                    </View>
                  </View>
                  <DashedLine
                    axis="horizontal"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 2) / 100,
                    }}
                    Length={7}
                    dashColor={'#DDDDDD'}
                    dashThickness={0.7}
                  />

                  {this.state.booking_arr.vat_amount != '0.00' && (
                    <View
                      style={{
                        width: '93%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingTop: (mobileW * 2) / 100,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.fontsemibold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: config.textRotate,
                          }}>
                          {Lang_chg.vat_txt[config.language]}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: Colors.red,
                            fontFamily: Font.fontbold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: 'right',
                          }}>
                          {this.state.booking_arr.vat_amount} EGP
                        </Text>
                      </View>
                    </View>
                  )}

                  {this.state.booking_arr.vat_amount != '0.00' && (
                    <View
                      style={{
                        width: '93%',
                        flexDirection: 'row',
                        paddingVertical: (mobileW * 2) / 100,
                        alignSelf: 'center',
                      }}>
                      <View style={{width: '50%', flexDirection: 'row'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 3) / 100,
                            color: Colors.black_color,
                            textAlign: config.textRotate,
                          }}>
                          {Lang_chg.varid_txt[config.language]} :{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 3) / 100,
                            color: Colors.black_color,
                            textAlign: config.textRotate,
                          }}>
                          #{this.state.booking_arr.vat_id}
                        </Text>
                      </View>
                    </View>
                  )}

                  <DashedLine
                    axis="horizontal"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 2) / 100,
                    }}
                    Length={7}
                    dashColor={'#DDDDDD'}
                    dashThickness={0.7}
                  />

                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: (mobileW * 4) / 100,
                      backgroundColor: Colors.appColor,
                      alignItems: 'center',
                      borderRadius: (mobileW * 1) / 100,
                      marginLeft: (mobileW * 2) / 100,
                    }}>
                    <View
                      style={{
                        width: '50%',
                        paddingVertical: (mobileW * 2) / 100,
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'center',
                        }}>
                        {Lang_chg.totalservicecharges_txt[config.language]}
                      </Text>
                    </View>
                    <View
                      style={{width: '50%', paddingRight: (mobileW * 2) / 100}}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          fontFamily: Font.fontbold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'right',
                        }}>
                        {this.state.booking_arr.service_charges} EGP
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '93%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 4) / 100,
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.totalservicecharges_txt[config.language]}
                      </Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontbold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'right',
                        }}>
                        {this.state.booking_arr.service_charges} EGP
                      </Text>
                    </View>
                  </View>
                  {this.state.booking_arr.coupan_id != null && (
                    <View
                      style={{
                        width: '93%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingTop: (mobileW * 3) / 100,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.fontsemibold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: config.textRotate,
                          }}>
                          {Lang_chg.coupon_txt[config.language]}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.fontbold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: 'right',
                          }}>
                          -{this.state.booking_arr.coupan_amount} EGP
                        </Text>
                      </View>
                    </View>
                  )}

                  <View
                    style={{
                      width: '93%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 3) / 100,
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.wallet_txt[config.language]}
                      </Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontbold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'right',
                        }}>
                        {this.state.booking_arr.wallet_amount} EGP
                      </Text>
                    </View>
                  </View>

                  <DashedLine
                    axis="horizontal"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 4) / 100,
                    }}
                    Length={7}
                    dashColor={'#DDDDDD'}
                    dashThickness={0.7}
                  />

                  <View
                    style={{
                      width: '93%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 3) / 100,
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.grand_txt[config.language]}
                      </Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontbold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'right',
                        }}>
                        {this.state.booking_arr.total_price} EGP
                      </Text>
                    </View>
                  </View>

                  <DashedLine
                    axis="horizontal"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 3) / 100,
                    }}
                    Length={7}
                    dashColor={'#DDDDDD'}
                    dashThickness={0.7}
                  />

                  <View
                    style={{
                      width: '93%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingBottom: (mobileW * 3) / 100,
                      paddingTop: (mobileW * 4) / 100,
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.payment_txt[config.language]}
                      </Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          color: Colors.appColor,
                          fontFamily: Font.fontbold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'right',
                        }}>
                        {this.state.booking_arr.payment_option[config.language]}
                      </Text>
                    </View>
                  </View>
                  <DashedLine
                    axis="horizontal"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 3) / 100,
                    }}
                    Length={7}
                    dashColor={'#DDDDDD'}
                    dashThickness={0.7}
                  />

                  {this.state.booking_arr.note != null && (
                    <View
                      style={{
                        width: '93%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingTop: (mobileW * 4) / 100,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.fontsemibold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: config.textRotate,
                          }}>
                          {Lang_chg.note_txt[config.language]}
                        </Text>
                      </View>
                    </View>
                  )}
                  {this.state.booking_arr.note != null && (
                    <View
                      style={{
                        width: '93%',
                        alignSelf: 'center',
                        paddingBottom: (mobileW * 2) / 100,
                      }}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.fontregular,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: config.textRotate,
                        }}>
                        {this.state.booking_arr.note}
                      </Text>
                    </View>
                  )}
                </View>
                {this.state.booking_arr.status != 3 &&
                  this.state.booking_arr.service_boy_name != 'NA' &&
                  this.state.booking_arr.service_boy_id != 0 && (
                    <View
                      style={{
                        width: (mobileW * 90) / 100,
                        alignSelf: 'center',
                        borderRadius: (mobileW * 1) / 100,
                        marginTop: (mobileW * 3.5) / 100,
                        elevation: 5,
                        backgroundColor: Colors.whiteColor,
                        shadowOffset: {width: 1, height: 1},
                        shadowColor: Colors.shadow_color,
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        paddingBottom: (mobileW * 3.5) / 100,
                      }}>
                      <View
                        style={{
                          width: '93%',
                          flexDirection: 'row',
                          paddingVertical: (mobileW * 1) / 100,
                          alignSelf: 'center',
                          paddingTop: (mobileW * 4) / 100,
                        }}>
                        <View style={{width: '50%'}}>
                          <Text
                            style={{
                              fontFamily: Font.fontsemibold,
                              fontSize: (mobileW * 3.5) / 100,
                              color: Colors.appColor,
                              textAlign: config.textRotate,
                            }}>
                            {Lang_chg.serviceboy_txt[config.language]}
                          </Text>
                        </View>
                      </View>
                      <View style={{width: '100%'}}>
                        <View
                          style={{
                            width: '93%',
                            alignSelf: 'center',
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              width: '70%',
                              alignSelf: 'center',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              paddingVertical: (mobileW * 2) / 100,
                            }}>
                            <View
                              style={{width: '35%', justifyContent: 'center'}}>
                              <Image
                                source={{
                                  uri:
                                    config.img_url3 +
                                    this.state.booking_arr.service_boy_image,
                                }}
                                style={{
                                  height: (mobileW * 14) / 100,
                                  width: (mobileW * 17) / 100,
                                  borderRadius: (mobileW * 1) / 100,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                width: '65%',
                                alignSelf: 'flex-start',
                                justifyContent: 'center',
                                paddingVertical: (mobileW * 3) / 100,
                              }}>
                              <Text
                                style={{
                                  fontFamily: Font.fontmedium,
                                  fontSize: (mobileW * 3) / 100,
                                  textAlign: config.textRotate,
                                }}>
                                {this.state.booking_arr.service_boy_name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <StarRating
                                  containerStyle={{width: (mobileW * 16) / 100}}
                                  fullStar={localimag.star_rating}
                                  halfStarColor={'#FFC815'}
                                  disabled={true}
                                  maxStars={5}
                                  starSize={(mobileW * 2.8) / 100}
                                  rating={
                                    this.state.booking_arr.service_boy_rating
                                  }
                                />
                                <Text
                                  style={{
                                    paddingLeft: (mobileW * 1) / 100,
                                    fontSize: (mobileW * 2.5) / 100,
                                    fontFamily: Font.fontmedium,
                                  }}>
                                  ({this.state.booking_arr.service_boy_rating})
                                </Text>
                              </View>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(
                                `tel:+20${this.state.booking_arr.service_boy_phone_number}`,
                              );
                            }}
                            activeOpacity={0.7}
                            style={{
                              width: '30%',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            }}>
                            <Image
                              source={localimag.active_call_icon}
                              style={{
                                height: (mobileW * 7) / 100,
                                width: (mobileW * 7) / 100,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                {(this.state.booking_arr.status == 0 ||
                  this.state.booking_arr.status == 1) &&
                  this.state.booking_arr.on_the_way_status == 0 &&
                  this.state.booking_arr.shedule_status == 1 && (
                    <View
                      style={{
                        width: (mobileW * 100) / 100,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        marginTop: (mobileW * 8) / 100,
                      }}>
                      <View style={{width: '50%'}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('Reason_message', {
                              msg_page_status: 3,
                              booking_id: this.state.booking_arr.booking_id,
                            })
                          }
                          activeOpacity={0.7}
                          style={{
                            width: '75%',
                            backgroundColor: Colors.red,
                            paddingVertical: (mobileW * 2.2) / 100,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: (mobileW * 10) / 100,
                          }}>
                          <Text
                            style={{
                              color: Colors.whiteColor,
                              fontFamily: Font.fontsemibold,
                              fontSize: (mobileW * 4) / 100,
                            }}>
                            {Lang_chg.cancel_new_txt[config.language]}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{width: '50%'}}>
                        <TouchableOpacity
                          onPress={() => this.NoAreaFound()}
                          activeOpacity={0.7}
                          style={{
                            width: '75%',
                            backgroundColor: Colors.appColor,
                            paddingVertical: (mobileW * 2.2) / 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: (mobileW * 10) / 100,
                            marginLeft: (mobileW * 5) / 100,
                          }}>
                          <Text
                            style={{
                              color: Colors.whiteColor,
                              fontFamily: Font.fontsemibold,
                              fontSize: (mobileW * 4) / 100,
                              textAlign: 'center',
                            }}>
                            {Lang_chg.reschedule_txt[config.language]}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                {(this.state.booking_arr.status == 0 ||
                  this.state.booking_arr.status == 1) &&
                  this.state.booking_arr.arrive_status == 0 &&
                  this.state.booking_arr.shedule_status == 0 && (
                    <View
                      style={{
                        width: (mobileW * 100) / 100,
                        marginTop: (mobileW * 8) / 100,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Reason_message', {
                            msg_page_status: 3,
                            booking_id: this.state.booking_arr.booking_id,
                          })
                        }
                        activeOpacity={0.7}
                        style={{
                          width: '38%',
                          backgroundColor: Colors.red,
                          paddingVertical: (mobileW * 2.2) / 100,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: (mobileW * 10) / 100,
                        }}>
                        <Text
                          style={{
                            color: Colors.whiteColor,
                            fontFamily: Font.fontsemibold,
                            fontSize: (mobileW * 4) / 100,
                          }}>
                          {Lang_chg.cancel_new_txt[config.language]}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                {this.state.booking_arr.status == 2 && (
                  <View
                    style={{
                      width: (mobileW * 89) / 100,
                      marginTop: (mobileW * 5) / 100,
                      alignSelf: 'center',
                    }}>
                    <View style={{width: '100%', justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: (mobileW * 4) / 100,
                          fontFamily: Font.fontsemibold,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.photosworking_txt[config.language]}
                      </Text>
                    </View>
                    <View
                      style={{width: '100%', marginTop: (mobileW * 2) / 100}}>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={this.state.booking_arr.booking_images}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={4}
                        renderItem={({index, item}) => {
                          return (
                            <TouchableOpacity
                              style={{width: '25%'}}
                              activeOpacity={0.7}
                              onPress={() => {
                                this.setState({
                                  fullImage: item.image,
                                  openImageModal: true,
                                });
                              }}>
                              <Image
                                style={{
                                  height: (mobileW * 21) / 100,
                                  width: (mobileW * 21) / 100,
                                  borderRadius: (mobileW * 0.5) / 100,
                                }}
                                source={{uri: config.img_url3 + item.image}}
                              />
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  </View>
                )}
                {this.state.booking_arr.status == 2 &&
                  this.state.booking_arr.rating_status == 0 && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: Colors.appColor,
                        width: (mobileW * 80) / 100,
                        borderRadius: 25,
                        marginTop: (mobileH * 3.5) / 100,
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('Rate_Now', {
                          service_boy_id: this.state.booking_arr.service_boy_id,
                          booking_id: this.state.booking_arr.booking_id,
                          status: 1,
                        });
                      }}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          alignSelf: 'center',
                          fontSize: (mobileW * 4) / 100,
                          fontFamily: Font.fontmedium,
                          paddingVertical: (mobileW * 2) / 100,
                        }}>
                        {Lang_chg.ratenow_txt[config.language]}
                      </Text>
                    </TouchableOpacity>
                  )}
                {this.state.booking_arr.status == 3 && (
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      alignSelf: 'center',
                      borderRadius: (mobileW * 1) / 100,
                      marginTop: (mobileW * 5) / 100,
                      elevation: 5,
                      backgroundColor: '#FFCCCC',
                      shadowOffset: {width: 1, height: 1},
                      shadowColor: Colors.shadow_color,
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      paddingBottom: (mobileW * 2) / 100,
                    }}>
                    <View
                      style={{
                        width: '93%',
                        flexDirection: 'row',
                        paddingVertical: (mobileW * 1) / 100,
                        alignSelf: 'center',
                        paddingTop: (mobileW * 4) / 100,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontsemibold,
                            fontSize: (mobileW * 3.5) / 100,
                            color: Colors.red,
                            textAlign: config.textRotate,
                          }}>
                          {Lang_chg.Cancellation_Reason[config.language]}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '93%',
                        flexDirection: 'row',
                        paddingVertical: (mobileW * 1) / 100,
                        alignSelf: 'center',
                        paddingTop: (mobileW * 2) / 100,
                      }}>
                      <View style={{width: '95%'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontregular,
                            fontSize: (mobileW * 3.5) / 100,
                            color: '#FF3535',
                            textAlign: config.textRotate,
                          }}>
                          {this.state.booking_arr.cancel_reason}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {this.state.booking_arr.rating_status == 1 && (
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      alignSelf: 'center',
                      borderRadius: (mobileW * 1) / 100,
                      marginTop: (mobileW * 3) / 100,
                      elevation: 5,
                      backgroundColor: Colors.whiteColor,
                      shadowOffset: {width: 1, height: 1},
                      shadowColor: Colors.shadow_color,
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      paddingBottom: (mobileW * 5) / 100,
                    }}>
                    <View
                      style={{
                        width: '93%',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        paddingTop: (mobileW * 2) / 100,
                      }}>
                      <Text
                        style={{
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.5) / 100,
                          color: Colors.appColor,
                        }}>
                        {Lang_chg.your_review[config.language]}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: (mobileW * 93) / 100,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        paddingTop: (mobileW * 0.5) / 100,
                      }}>
                      <View style={{width: '9%'}}>
                        <Image
                          source={
                            this.state.user_image == 'NA'
                              ? localimag.placeholder_img
                              : {uri: config.img_url3 + this.state.user_image}
                          }
                          style={{
                            height: (mobileW * 6) / 100,
                            width: (mobileW * 6) / 100,
                            borderRadius: (mobileW * 3) / 100,
                          }}
                        />
                      </View>
                      <View style={{justifyContent: 'center', width: '41%'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 2.5) / 100,
                            textAlign: 'left',
                          }}>
                          {this.state.user_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          width: '40%',
                          alignItems: 'flex-end',
                        }}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 2.4) / 100,
                            color: Colors.signup_text_title,
                          }}>
                          {this.state.booking_arr.user_rating.createtime}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '92%',
                        alignSelf: 'center',
                        paddingTop: (mobileW * 3.5) / 100,
                        alignItems: 'center',
                      }}>
                      <StarRating
                        containerStyle={{width: (mobileW * 22) / 100}}
                        fullStar={localimag.star_rating}
                        emptyStar={localimag.unactiverating_icon}
                        halfStarColor={'#FFC815'}
                        disabled={true}
                        maxStars={5}
                        starSize={(mobileW * 4) / 100}
                        rating={this.state.booking_arr.user_rating.rating}
                      />
                      <Text
                        style={{
                          paddingLeft: (mobileW * 2) / 100,
                          fontSize: (mobileW * 2.5) / 100,
                          fontFamily: Font.fontmedium,
                          paddingTop: (mobileW * 0.5) / 100,
                        }}>
                        ({this.state.booking_arr.user_rating.rating})
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '92%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingVertical: (mobileW * 1.5) / 100,
                        paddingTop: (mobileW * 2) / 100,
                      }}>
                      <View style={{width: '90%'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 2.6) / 100,
                            textAlign: config.textRotate,
                          }}>
                          1.{' '}
                          {Lang_chg.your_satisfied_with_work[config.language]}
                        </Text>
                      </View>
                      <View style={{width: '10%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 2.5) / 100,
                            color: Colors.appColor,
                          }}>
                          {this.state.booking_arr.user_rating.behavior_status ==
                          0
                            ? Lang_chg.no_txt[config.language]
                            : Lang_chg.yes_txt[config.language]}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '92%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingVertical: (mobileW * 1.5) / 100,
                      }}>
                      <View style={{width: '90%'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 2.6) / 100,
                            textAlign: config.textRotate,
                          }}>
                          2.{' '}
                          {Lang_chg.agian_serive_with_worker[config.language]}{' '}
                          {this.state.booking_arr.service_boy_name}{' '}
                          {Lang_chg.agian_serive_with_worker2[config.language]}
                        </Text>
                      </View>
                      <View style={{width: '10%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 2.5) / 100,
                            color: Colors.appColor,
                          }}>
                          {this.state.booking_arr.user_rating.work_status == 0
                            ? Lang_chg.no_txt[config.language]
                            : Lang_chg.yes_txt[config.language]}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '92%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingVertical: (mobileW * 1.5) / 100,
                      }}>
                      <View style={{width: '90%'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 2.6) / 100,
                            textAlign: config.textRotate,
                          }}>
                          3. {Lang_chg.worker_nature_txt[config.language]}{' '}
                          {this.state.booking_arr.service_boy_name}{' '}
                          {Lang_chg.worker_nature_txt2[config.language]}
                        </Text>
                      </View>
                      <View style={{width: '10%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 2.5) / 100,
                            color: Colors.appColor,
                            textAlign: config.textRotate,
                          }}>
                          {this.state.booking_arr.user_rating.nature_status == 0
                            ? Lang_chg.no_txt[config.language]
                            : Lang_chg.yes_txt[config.language]}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>
            )}
          </ImageBackground>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  flexStyle: {
    flex: 0,
    backgroundColor: Colors.themecolor,
  },
  text_style: {
    fontFamily: Font.fontsemibold,
    fontSize: (mobileW * 3.2) / 100,
    color: 'grey',
  },
  text_style1: {
    fontFamily: Font.fontsemibold,
    fontSize: (mobileW * 3.2) / 100,
    color: Colors.black_color,
  },
  text_style2: {
    fontFamily: Font.fontsemibold,
    fontSize: (mobileW * 3) / 100,
    paddingBottom: (mobileW * 2.5) / 100,
  },
  img_style: {
    width: '25%',
    justifyContent: 'center',
    marginTop: (mobileW * 1.2) / 100,
  },
});
