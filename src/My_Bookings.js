import React, {Component} from 'react';
import {
  View,
  Image,
  BackHandler,
  Keyboard,
  Text,
  Modal,
  RefreshControl,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Platform,
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
import {Nodata_foundimage} from '../src/Provider/Nodata_foundimage';
import Footer from './Provider/Footer';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon2 from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';

export default class My_Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status_check: 1,
      pending_arr: 'NA',
      loaddata: false,
      refresh: false,
      Inprogress_arr: 'NA',
      completed_arr: 'NA',
      modalVisible1: false,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      if (this.props.route.params.booking_check != null) {
        this.setState({status_check: this.props.route.params.booking_check});
      }
      //     setTimeout( () => {
      //         this.setBookings();
      //    },500);
    });
    setTimeout(() => {
      this.setBookings();
    }, 500);
  }

  _onRefresh = async () => {
    this.setState({refresh: true});
    this.setBookings();
  };

  setBookings = async () => {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    let booking_id = 'NA';
    var url = config.baseURL + 'get_booking/' + user_id + '/' + booking_id;
    apifuntion
      .getApi(url, 1)
      .then(obj => {
        if (obj.success == 'true') {
          localStorage.setItemObject('user_arr', obj.user_details);
          localStorage.setItemObject('user_all_bookings', obj.booking_arr);
          let data = obj.booking_arr;
          this.setState({
            pending_arr: data.pending_booking,
            Inprogress_arr: data.inprogress_booking,
            completed_arr: data.completed_booking,
            refresh: false,
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

  getCoordinatesModal = region => {
    return {
      latitude: parseFloat(global.latitude),
      longitude: parseFloat(global.longitude),
      latitudeDelta: parseFloat(global.latdelta),
      longitudeDelta: parseFloat(global.longdelta),
    };
  };

  getadddressfromlatlongModal = event => {
    var latitude = event.latitude;
    var longitude = event.longitude;
    // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + event.latitude + ',' + event.longitude + '&key=' + config.mapkey + '&language=' + config.maplanguage)

    //     .then((response) => response.json())
    //     .then((resp) => {
    //         let responseJson = resp.results[0]
    //         let city = '';
    //         let administrative_area_level_1 = '';
    //         for (let i = 0; i < responseJson.address_components.length; i++) {
    //             if (responseJson.address_components[i].types[0] == "locality") {
    //                 city = responseJson.address_components[i].long_name
    //                 break;
    //             }
    //             else if (responseJson.address_components[i].types[0] == "administrative_area_level_2") {
    //                 city = responseJson.address_components[i].long_name
    //             }

    //         }
    //         for (let j = 0; j < responseJson.address_components.length; j++) {
    //             if (responseJson.address_components[j].types[0] == "administrative_area_level_1") {
    //                 administrative_area_level_1 = responseJson.address_components[j].long_name
    //             }

    //         }
    //         let details = responseJson
    //         let data2 = { 'latitude': details.geometry.location.lat, 'longitude': details.geometry.location.lng, 'address': details.formatted_address, 'city': city, 'administrative_area_level_1': administrative_area_level_1 }

    //         var google_latitude = details.geometry.location.lat;
    //         var google_longitude = details.geometry.location.lng;
    //         var google_address = details.formatted_address;
    //         global.latitude==google_latitude,global.longitude=google_longitude,
    //         global.latdelta =event.latitudeDelta,global.longdelta=event.longitudeDelta
    //     })
  };

  locationGet = async () => {
    var location_arr = {
      latitude: global.latitude,
      longitude: global.longitude,
      location: global.address,
    };
    localStorage.setItemObject('page_status', 2);
    let booking_vehicle = await localStorage.getItemObject(
      'booking_vehicle_arr',
    );
    localStorage.setItemObject('location_arr', location_arr);
  };

  checkLocation = async () => {
    let userdata = await localStorage.getItemObject('user_arr');
    var url =
      config.baseURL +
      'check_location/' +
      global.latitude +
      '/' +
      global.longitude +
      '/' +
      userdata.user_id;
    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          localStorage.setItemObject('user_arr', obj.user_details);
          this.setState({modalVisible1: false});
          this.props.navigation.navigate('Select_Service');
        } else {
          this.setState({modalVisible1: false});
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

  setRefresh = () => {
    localStorage.removeItem('user_all_bookings');
    this.setBookings();
  };

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.container}>
          <SafeAreaView
            style={{backgroundColor: Colors.theme_color, flex: 0}}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible1}
            onRequestClose={() => {
              this.setState({modalVisible1: false});
            }}>
            <SafeAreaView style={{backgroundColor: Colors.appColor, flex: 0}} />
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <StatusBar
                barStyle=""
                backgroundColor={Colors.appColor}
                hidden={false}
                translucent={false}
                networkActivityIndicatorVisible={true}
              />
              <View
                style={{
                  width: (mobileW * 85) / 100,
                  height: (mobileW * 65) / 100,
                  alignSelf: 'center',
                  backgroundColor: Colors.whiteColor,
                  borderRadius: (mobileW * 3) / 100,
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({modalVisible1: false});
                  }}
                  style={{
                    position: 'absolute',
                    top: -12,
                    right: -10,
                    height: (mobileW * 9) / 100,
                    width: (mobileW * 9) / 100,
                    elevation: 5,
                    backgroundColor: Colors.whiteColor,
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: Colors.shadow_color,
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    borderRadius: (mobileW * 5) / 100,
                  }}>
                  <Image
                    source={localimag.home_cancel}
                    style={{
                      height: (mobileW * 8) / 100,
                      width: (mobileW * 8) / 100,
                      left: 1.5,
                      top: 1.5,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: (mobileW * 4) / 100,
                    paddingBottom: (mobileW * 3.5) / 100,
                    marginLeft: (mobileW * 2) / 100,
                    fontSize: (mobileW * 4.8) / 100,
                    color: 'black',
                    fontFamily: Font.fontsemibold,
                    textAlign: config.textRotate,
                  }}>
                  {Lang_chg.confirm_booking_location[config.language]}
                </Text>
                <View
                  style={{
                    elevation: 3,
                    backgroundColor: Colors.whiteColor,
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: Colors.shadow_color,
                    shadowOpacity: 0.24,
                    shadowRadius: 2.22,
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <MapView
                      followsUserLocation={true}
                      scrollEnabled={false}
                      style={{
                        height: (mobileW * 33) / 100,
                        width: (mobileW * 80) / 100,
                        alignSelf: 'center',
                      }}
                      region={this.getCoordinatesModal(this)}
                      minZoomLevel={16}
                      maxZoomLevel={20}
                      mapType={'standard'}
                      zoomEnabled={false}
                      provider={PROVIDER_GOOGLE}
                      onMapReady={this.onMapReady}
                      ref={this.setMapRef1}
                      //onRegionChangeComplete={(event) => { this.getadddressfromlatlongModal(event) }}
                    >
                      {global.latitude != null && (
                        <View style={{}}>
                          <Marker
                            coordinate={{
                              latitude: parseFloat(global.latitude),
                              longitude: parseFloat(global.longitude),
                              latitudeDelta: parseFloat(global.latdelta),
                              longitudeDelta: parseFloat(global.longdelta),
                            }}>
                            <TouchableOpacity>
                              <Image
                                resizeMode="contain"
                                source={localimag.home_map_pin}
                                style={{
                                  height: (mobileW * 7.5) / 100,
                                  width: (mobileW * 7.5) / 100,
                                }}
                              />
                            </TouchableOpacity>
                          </Marker>
                        </View>
                      )}
                    </MapView>
                  </View>
                </View>
                <View
                  style={{
                    width: (mobileW * 80) / 100,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    paddingVertical: (mobileW * 4) / 100,
                  }}>
                  <View style={{width: '50%', marginLeft: (mobileW * 3) / 100}}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() =>
                        this.props.navigation.navigate('Home', {home_status: 3})
                      }
                      style={{
                        width: '90%',
                        backgroundColor: Colors.appColor,
                        paddingVertical: (mobileW * 2.4) / 100,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: (mobileW * 10) / 100,
                      }}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.5) / 100,
                        }}>
                        {Lang_chg.edit_location[config.language]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width: '50%'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.checkLocation();
                      }}
                      activeOpacity={0.7}
                      style={{
                        width: '90%',
                        backgroundColor: Colors.appColor,
                        paddingVertical: (mobileW * 2.4) / 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: (mobileW * 10) / 100,
                      }}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.5) / 100,
                          textAlign: 'center',
                        }}>
                        {Lang_chg.yes_confirm[config.language]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.appColor}
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
              <View style={{width: '10%'}} />
              <Text
                style={{
                  width: '80%',
                  textAlign: 'center',
                  fontFamily: Font.fontsemibold,
                  fontSize: (mobileW * 5.5) / 100,
                  color: Colors.whiteColor,
                }}>
                {Lang_chg.mybookings_txt[config.language]}
              </Text>
              <TouchableOpacity activeOpacity={0.8} style={{width: '10%'}}>
                {/* <Image source={localimag.refresh} style={{width:mobileW*5/100,height:mobileW*5/100}} /> */}
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View
            style={{
              width: (mobileW * 96) / 100,
              alignSelf: 'center',
              flexDirection: 'row',
              borderRadius: (mobileW * 50) / 100,
              marginTop: (mobileW * 4) / 100,
              elevation: 5,
              backgroundColor: Colors.whiteColor,
              shadowOffset: {width: 1, height: 1},
              shadowColor: Colors.shadow_color,
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({status_check: 1})}
              style={
                this.state.status_check != 1 ? Styles.tab_bar : Styles.tab_bar1
              }>
              <Text
                style={
                  this.state.status_check != 1
                    ? Styles.tab_bar_txt
                    : Styles.tab_bar_txt1
                }>
                {Lang_chg.pending_txt[config.language]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({status_check: 2})}
              style={
                this.state.status_check != 2 ? Styles.tab_bar : Styles.tab_bar1
              }>
              <Text
                style={
                  this.state.status_check != 2
                    ? Styles.tab_bar_txt
                    : Styles.tab_bar_txt1
                }>
                {Lang_chg.inprogress_txt[config.language]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({status_check: 3})}
              style={
                this.state.status_check != 3 ? Styles.tab_bar : Styles.tab_bar1
              }>
              <Text
                style={
                  this.state.status_check != 3
                    ? Styles.tab_bar_txt
                    : Styles.tab_bar_txt1
                }>
                {Lang_chg.completed_txt[config.language]}
              </Text>
            </TouchableOpacity>
          </View>
          <ImageBackground
            source={localimag.bacKground1}
            resizeMode="stretch"
            style={{
              width: (mobileW * 100) / 100,
              flex: 1,
            }}>
            <KeyboardAwareScrollView
              style={{flex: 1}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={this._onRefresh}
                  tintColor={Colors.black_color}
                />
              }>
              {this.state.status_check == 1 && (
                <View style={{flex: 1}}>
                  {this.state.pending_arr != 'NA' ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{}}
                      keyExtractor={(item, index) => index.toString()}
                      data={this.state.pending_arr}
                      renderItem={({index, item}) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              this.props.navigation.navigate(
                                'Bookings_Details',
                                {
                                  my_booking_check: 1,
                                  booking_id: item.booking_id,
                                },
                              );
                            }}
                            style={{
                              width: (mobileW * 94) / 100,
                              elevation: 3,
                              marginTop: (mobileW * 3) / 100,
                              alignSelf: 'center',
                              backgroundColor: Colors.whiteColor,
                              shadowOffset: {width: 1, height: 1},
                              shadowColor: Colors.shadow_color,
                              shadowOpacity: 0.24,
                              shadowRadius: 2.22,
                              borderRadius: (mobileW * 1) / 100,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '93%',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                borderBottomColor: Colors.appColor_border,
                                borderBottomWidth: (mobileW * 0.5) / 100,
                                paddingTop: (mobileW * 3) / 100,
                                paddingBottom: (mobileW * 1.5) / 100,
                              }}>
                              <View
                                style={{
                                  width: '50%',
                                  alignItems: 'flex-start',
                                }}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.bookingid1_txt[config.language]} :{' '}
                                  {item.booking_no}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: '50%',
                                  alignItems: 'flex-end',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 2.6) / 100,
                                    color: Colors.signup_placeholder_color,
                                  }}>
                                  {item.$createtime}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: '93%',
                                paddingTop: (mobileW * 2) / 100,
                                flexDirection: 'row',
                                alignSelf: 'center',
                              }}>
                              <View
                                style={{
                                  width: '23%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: Colors.appColor,
                                  borderRadius: (mobileW * 1.5) / 100,
                                  paddingVertical: (mobileW * 2.5) / 100,
                                }}>
                                <Image
                                  source={{
                                    uri: config.img_url3 + item.vehicle_image,
                                  }}
                                  style={{
                                    height: (mobileW * 14) / 100,
                                    width: (mobileW * 16) / 100,
                                  }}
                                />
                              </View>
                              <View
                                style={{width: '27%', alignItems: 'center'}}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.service_txt[config.language]}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.service_name[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  borderRightWidth: (mobileW * 0.3) / 100,
                                  borderRightColor: Colors.bottom_border,
                                  height: (mobileW * 10) / 100,
                                  marginTop: (mobileW * 2) / 100,
                                }}
                              />
                              <View
                                style={{width: '25%', alignItems: 'center'}}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.time_slot[config.language]}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.booking_time[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  borderRightWidth: (mobileW * 0.3) / 100,
                                  borderRightColor: Colors.bottom_border,
                                  height: (mobileW * 10) / 100,
                                  marginTop: (mobileW * 2) / 100,
                                }}
                              />
                              <View
                                style={{width: '25%', alignItems: 'center'}}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.date_txt[config.language]}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.booking_date}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: '93%',
                                paddingBottom: (mobileW * 3) / 100,
                              }}>
                              <View
                                style={{
                                  width: '26%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text style={Styles.text_style}>
                                  {item.plate_number}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: '30%',
                                  justifyContent: 'center',
                                }}>
                                <Text style={Styles.modal_name_style}>
                                  {item.model_name[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '43%',
                                  justifyContent: 'flex-end',
                                }}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.payment_txt[config.language]}:{' '}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.payment_option[config.language]}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: '100%',
                                backgroundColor: '#F5F5F5',
                              }}>
                              <View
                                style={{
                                  width: '93%',
                                  alignSelf: 'center',
                                  flexDirection: 'row',
                                }}>
                                {item.user_name == 'NA' && (
                                  <View
                                    style={{
                                      width: '70%',
                                      alignSelf: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      paddingVertical: (mobileW * 3.5) / 100,
                                    }}
                                  />
                                )}
                                {item.user_name != 'NA' && (
                                  <View
                                    style={{
                                      width: '70%',
                                      alignSelf: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      paddingVertical: (mobileW * 3.5) / 100,
                                    }}>
                                    <View
                                      style={{
                                        width: '23%',
                                        justifyContent: 'center',
                                      }}>
                                      <Image
                                        source={
                                          item.user_image == 'NA'
                                            ? localimag.placeholder_img
                                            : {
                                                uri:
                                                  config.img_url3 +
                                                  item.user_image,
                                              }
                                        }
                                        style={{
                                          height: (mobileW * 12) / 100,
                                          width: (mobileW * 12) / 100,
                                          borderRadius: (mobileW * 10) / 100,
                                        }}
                                      />
                                    </View>
                                    <View
                                      style={{
                                        width: '77%',
                                        alignSelf: 'flex-start',
                                        justifyContent: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: Font.fontmedium,
                                          fontSize: (mobileW * 3) / 100,
                                          textAlign: config.textRotate,
                                        }}>
                                        {item.user_name}
                                      </Text>
                                      <Text
                                        style={{
                                          fontFamily: Font.fontmedium,
                                          fontSize: (mobileW * 2.7) / 100,
                                          color: Colors.signup_text_title,
                                          lineHeight: (mobileW * 3.3) / 100,
                                          textAlign: config.textRotate,
                                        }}>
                                        +20 {item.user_phone_number}
                                      </Text>
                                      {item.user_email != 'NA' && (
                                        <Text
                                          style={{
                                            fontFamily: Font.fontmedium,
                                            fontSize: (mobileW * 2.7) / 100,
                                            color: Colors.signup_text_title,
                                            lineHeight: (mobileW * 3.3) / 100,
                                            textAlign: config.textRotate,
                                          }}>
                                          {item.user_email}
                                        </Text>
                                      )}
                                    </View>
                                  </View>
                                )}
                                <View
                                  style={{
                                    width: '30%',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: Font.fontsemibold,
                                      fontSize: (mobileW * 3) / 100,
                                      color: Colors.red,
                                      paddingVertical: (mobileW * 4) / 100,
                                      textAlign: 'right',
                                    }}>
                                    {Lang_chg.pending_txt[config.language]}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            {/* <View style={{width:'100%',backgroundColor:'#F5F5F5'}}>
                                            <View style={{width:'93%',alignSelf:'center',alignItems:'flex-end'}}>
                                                <Text style={{fontFamily:Font.fontsemibold,fontSize:mobileW*3/100,color:Colors.red,paddingVertical:mobileW*4/100}}>{Lang_chg.pending_txt[config.language]}</Text>
                                            </View>
                                        </View> */}
                          </TouchableOpacity>
                        );
                      }}
                    />
                  ) : (
                    <Nodata_foundimage />
                  )}
                </View>
              )}

              {this.state.status_check == 2 && (
                <View style={{flex: 1}}>
                  {this.state.Inprogress_arr != 'NA' ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        paddingBottom: (mobileW * 20) / 100,
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      data={this.state.Inprogress_arr}
                      renderItem={({index, item}) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate(
                                'Bookings_Details',
                                {
                                  my_booking_check: 1,
                                  booking_id: item.booking_id,
                                },
                              );
                            }}
                            activeOpacity={0.8}
                            style={{
                              width: (mobileW * 94) / 100,
                              elevation: 3,
                              marginTop: (mobileW * 3) / 100,
                              alignSelf: 'center',
                              backgroundColor: Colors.whiteColor,
                              shadowOffset: {width: 1, height: 1},
                              shadowColor: Colors.shadow_color,
                              shadowOpacity: 0.24,
                              shadowRadius: 2.22,
                              borderRadius: (mobileW * 1) / 100,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '93%',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                borderBottomColor: Colors.appColor_border,
                                borderBottomWidth: (mobileW * 0.5) / 100,
                                paddingTop: (mobileW * 3) / 100,
                                paddingBottom: (mobileW * 1.5) / 100,
                              }}>
                              <View
                                style={{
                                  width: '50%',
                                  alignItems: 'flex-start',
                                }}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.bookingid1_txt[config.language]} :{' '}
                                  {item.booking_no}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: '50%',
                                  alignItems: 'flex-end',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 2.6) / 100,
                                    color: Colors.signup_placeholder_color,
                                  }}>
                                  {item.createtime}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: '93%',
                                paddingTop: (mobileW * 2) / 100,
                                flexDirection: 'row',
                                alignSelf: 'center',
                              }}>
                              <View
                                style={{
                                  width: '23%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: Colors.appColor,
                                  borderRadius: (mobileW * 1.5) / 100,
                                  paddingVertical: (mobileW * 2.5) / 100,
                                }}>
                                <Image
                                  source={{
                                    uri: config.img_url3 + item.vehicle_image,
                                  }}
                                  style={{
                                    height: (mobileW * 14) / 100,
                                    width: (mobileW * 16) / 100,
                                  }}
                                />
                              </View>
                              <View
                                style={{width: '27%', alignItems: 'center'}}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.service_txt[config.language]}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.service_name[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  borderRightWidth: (mobileW * 0.3) / 100,
                                  borderRightColor: Colors.bottom_border,
                                  height: (mobileW * 10) / 100,
                                  marginTop: (mobileW * 2) / 100,
                                }}
                              />
                              <View
                                style={{width: '25%', alignItems: 'center'}}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.time_slot[config.language]}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.booking_time[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  borderRightWidth: (mobileW * 0.3) / 100,
                                  borderRightColor: Colors.bottom_border,
                                  height: (mobileW * 10) / 100,
                                  marginTop: (mobileW * 2) / 100,
                                }}
                              />
                              <View
                                style={{width: '25%', alignItems: 'center'}}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.date_txt[config.language]}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.booking_date}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: '93%',
                                paddingBottom: (mobileW * 3) / 100,
                              }}>
                              <View
                                style={{
                                  width: '26%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text style={Styles.text_style}>
                                  {item.plate_number}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: '30%',
                                  justifyContent: 'center',
                                }}>
                                <Text style={Styles.modal_name_style}>
                                  {item.model_name[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '43%',
                                  justifyContent: 'flex-end',
                                }}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.payment_txt[config.language]}:{' '}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.payment_option[config.language]}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: '100%',
                                backgroundColor: '#F5F5F5',
                              }}>
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
                                    paddingVertical: (mobileW * 3.5) / 100,
                                  }}>
                                  <View
                                    style={{
                                      width: '23%',
                                      justifyContent: 'center',
                                    }}>
                                    <Image
                                      source={
                                        item.user_image == 'NA'
                                          ? localimag.placeholder_img
                                          : {
                                              uri:
                                                config.img_url3 +
                                                item.user_image,
                                            }
                                      }
                                      style={{
                                        height: (mobileW * 12) / 100,
                                        width: (mobileW * 12) / 100,
                                        borderRadius: (mobileW * 10) / 100,
                                      }}
                                    />
                                  </View>
                                  <View
                                    style={{
                                      width: '77%',
                                      alignSelf: 'flex-start',
                                      justifyContent: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontFamily: Font.fontmedium,
                                        fontSize: (mobileW * 3) / 100,
                                        textAlign: config.textRotate,
                                      }}>
                                      {item.user_name}
                                    </Text>
                                    <Text
                                      style={{
                                        fontFamily: Font.fontmedium,
                                        fontSize: (mobileW * 2.7) / 100,
                                        color: Colors.signup_text_title,
                                        lineHeight: (mobileW * 3.3) / 100,
                                        textAlign: config.textRotate,
                                      }}>
                                      +20 {item.user_phone_number}
                                    </Text>
                                    {item.email != 'NA' && (
                                      <Text
                                        style={{
                                          fontFamily: Font.fontmedium,
                                          fontSize: (mobileW * 2.7) / 100,
                                          color: Colors.signup_text_title,
                                          lineHeight: (mobileW * 3.3) / 100,
                                          textAlign: config.textRotate,
                                        }}>
                                        {item.email}
                                      </Text>
                                    )}
                                  </View>
                                </View>
                                <View
                                  style={{
                                    width: '30%',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: Font.fontsemibold,
                                      fontSize: (mobileW * 3) / 100,
                                      color: '#2172B8',
                                      paddingVertical: (mobileW * 4) / 100,
                                      textAlign: 'right',
                                    }}>
                                    {Lang_chg.inprogress_txt[config.language]}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  ) : (
                    <Nodata_foundimage />
                  )}
                </View>
              )}

              {this.state.status_check == 3 && (
                <View style={{flex: 1}}>
                  {this.state.completed_arr != 'NA' ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        paddingBottom: (mobileW * 20) / 100,
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      data={this.state.completed_arr}
                      renderItem={({index, item}) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              this.props.navigation.navigate(
                                'Bookings_Details',
                                {
                                  my_booking_check: 1,
                                  booking_id: item.booking_id,
                                },
                              );
                            }}
                            style={{
                              width: (mobileW * 94) / 100,
                              elevation: 3,
                              marginTop: (mobileW * 3) / 100,
                              alignSelf: 'center',
                              backgroundColor: Colors.whiteColor,
                              shadowOffset: {width: 1, height: 1},
                              shadowColor: Colors.shadow_color,
                              shadowOpacity: 0.24,
                              shadowRadius: 2.22,
                              borderRadius: (mobileW * 1) / 100,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '93%',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                borderBottomColor: Colors.appColor_border,
                                borderBottomWidth: (mobileW * 0.5) / 100,
                                paddingTop: (mobileW * 3) / 100,
                                paddingBottom: (mobileW * 1.5) / 100,
                              }}>
                              <View
                                style={{
                                  width: '50%',
                                  alignItems: 'flex-start',
                                }}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.bookingid1_txt[config.language]} :{' '}
                                  {item.booking_no}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: '50%',
                                  alignItems: 'flex-end',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 2.6) / 100,
                                    color: Colors.signup_placeholder_color,
                                  }}>
                                  {item.createtime}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: '93%',
                                paddingTop: (mobileW * 2) / 100,
                                flexDirection: 'row',
                                alignSelf: 'center',
                              }}>
                              <View
                                style={{
                                  width: '23%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: Colors.appColor,
                                  borderRadius: (mobileW * 1.5) / 100,
                                  paddingVertical: (mobileW * 2.5) / 100,
                                }}>
                                <Image
                                  source={{
                                    uri: config.img_url3 + item.vehicle_image,
                                  }}
                                  style={{
                                    height: (mobileW * 14) / 100,
                                    width: (mobileW * 16) / 100,
                                  }}
                                />
                              </View>
                              <View
                                style={{width: '27%', alignItems: 'center'}}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.service_txt[config.language]}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.service_name[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  borderRightWidth: (mobileW * 0.3) / 100,
                                  borderRightColor: Colors.bottom_border,
                                  height: (mobileW * 10) / 100,
                                  marginTop: (mobileW * 2) / 100,
                                }}
                              />
                              <View
                                style={{width: '25%', alignItems: 'center'}}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.time_slot[config.language]}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.booking_time[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  borderRightWidth: (mobileW * 0.3) / 100,
                                  borderRightColor: Colors.bottom_border,
                                  height: (mobileW * 10) / 100,
                                  marginTop: (mobileW * 2) / 100,
                                }}
                              />
                              {item.status == 2 && (
                                <View
                                  style={{width: '25%', alignItems: 'center'}}>
                                  <Text style={Styles.text_style}>
                                    {Lang_chg.date_txt[config.language]}
                                  </Text>
                                  <Text style={Styles.text_style1}>
                                    {item.booking_date}
                                  </Text>
                                </View>
                              )}
                              {item.status == 3 && (
                                <View
                                  style={{width: '25%', alignItems: 'center'}}>
                                  <Text style={Styles.text_style}>
                                    {Lang_chg.Pirce[config.language]}
                                  </Text>
                                  <Text style={Styles.text_style1}>
                                    £ {item.total_price}/-
                                  </Text>
                                </View>
                              )}
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: '93%',
                                paddingBottom: (mobileW * 3) / 100,
                              }}>
                              <View
                                style={{
                                  width: '26%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text style={Styles.text_style}>
                                  {item.plate_number}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: '30%',
                                  justifyContent: 'center',
                                }}>
                                <Text style={Styles.modal_name_style}>
                                  {item.model_name[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '43%',
                                  justifyContent: 'flex-end',
                                }}>
                                <Text style={Styles.text_style}>
                                  {Lang_chg.payment_txt[config.language]}:{' '}
                                </Text>
                                <Text style={Styles.text_style1}>
                                  {item.payment_option[config.language]}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: '100%',
                                backgroundColor: '#F5F5F5',
                              }}>
                              {item.status == 2 && (
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
                                      paddingVertical: (mobileW * 3.5) / 100,
                                    }}>
                                    <View
                                      style={{
                                        width: '23%',
                                        justifyContent: 'center',
                                      }}>
                                      <Image
                                        source={
                                          item.user_image == 'NA'
                                            ? localimag.placeholder_img
                                            : {
                                                uri:
                                                  config.img_url3 +
                                                  item.user_image,
                                              }
                                        }
                                        style={{
                                          height: (mobileW * 12) / 100,
                                          width: (mobileW * 12) / 100,
                                          borderRadius: (mobileW * 10) / 100,
                                        }}
                                      />
                                    </View>
                                    <View
                                      style={{
                                        width: '77%',
                                        alignSelf: 'flex-start',
                                        justifyContent: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: Font.fontmedium,
                                          fontSize: (mobileW * 3) / 100,
                                          textAlign: config.textRotate,
                                        }}>
                                        {item.user_name}
                                      </Text>
                                      <Text
                                        style={{
                                          fontFamily: Font.fontmedium,
                                          fontSize: (mobileW * 2.7) / 100,
                                          color: Colors.signup_text_title,
                                          lineHeight: (mobileW * 3.3) / 100,
                                          textAlign: config.textRotate,
                                        }}>
                                        +20 {item.user_phone_number}
                                      </Text>
                                      {item.email != 'NA' && (
                                        <Text
                                          style={{
                                            fontFamily: Font.fontmedium,
                                            fontSize: (mobileW * 2.7) / 100,
                                            color: Colors.signup_text_title,
                                            lineHeight: (mobileW * 3.3) / 100,
                                            textAlign: config.textRotate,
                                          }}>
                                          {item.email}
                                        </Text>
                                      )}
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      width: '30%',
                                      justifyContent: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontFamily: Font.fontsemibold,
                                        fontSize: (mobileW * 3) / 100,
                                        color: '#19BD3C',
                                        paddingVertical: (mobileW * 4) / 100,
                                        textAlign: 'right',
                                      }}>
                                      {Lang_chg.completed_txt[config.language]}
                                    </Text>
                                  </View>
                                </View>
                              )}
                              {item.status == 3 && (
                                <View
                                  style={{
                                    width: '93%',
                                    alignSelf: 'center',
                                    alignItems: 'flex-end',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: Font.fontsemibold,
                                      fontSize: (mobileW * 3) / 100,
                                      color: Colors.red,
                                      paddingVertical: (mobileW * 8) / 100,
                                    }}>
                                    {Lang_chg.cancel_by_you[config.language]}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  ) : (
                    <Nodata_foundimage />
                  )}
                </View>
              )}
              <View style={{height: 100}} />
            </KeyboardAwareScrollView>
          </ImageBackground>
          <Footer
            mapModel={() => {
              this.setState({modalVisible1: true}), this.locationGet();
            }}
            navigation={this.props.navigation}
            page={'My_Bookings'}
            user_id={1}
          />
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
  tab_bar: {
    width: (mobileW * 32) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tab_bar1: {
    width: (mobileW * 32) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appColor,
    borderRadius: (mobileW * 20) / 100,
  },
  tab_bar_txt: {
    fontFamily: Font.fontbold,
    fontSize: (mobileW * 3.5) / 100,
    color: Colors.black_color,
    paddingVertical: (mobileW * 3.2) / 100,
  },
  tab_bar_txt1: {
    fontFamily: Font.fontbold,
    fontSize: (mobileW * 3.5) / 100,
    color: Colors.whiteColor,
    paddingVertical: (mobileW * 3.2) / 100,
  },
  text_style: {
    fontFamily: Font.fontsemibold,
    fontSize: (mobileW * 3) / 100,
    paddingTop: (mobileW * 1.5) / 100,
    textAlign: config.textRotate,
  },
  text_style1: {
    fontFamily: Font.fontsemibold,
    fontSize: (mobileW * 3) / 100,
    color: Colors.appColor,
    paddingTop: (mobileW * 1.5) / 100,
  },
  modal_name_style: {
    fontFamily: Font.fontsemibold,
    fontSize: (mobileW * 3) / 100,
    color: Colors.appColor,
    paddingTop: (mobileW * 1.5) / 100,
    paddingRight: (mobileW * 1.3) / 100,
    textAlign: config.textRotate,
  },
  modal_name_style1: {
    fontFamily: Font.fontsemibold,
    fontSize: (mobileW * 3) / 100,
    color: Colors.appColor,
    paddingTop: (mobileW * 1.5) / 100,
    paddingLeft: (mobileW * 1.9) / 100,
  },
});
