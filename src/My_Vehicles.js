import React, {Component} from 'react';
import {
  View,
  Image,
  BackHandler,
  Text,
  Modal,
  FlatList,
  ScrollView,
  StyleSheet,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
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
} from './Provider/utilslib/Utils';
import {Nodata_foundimage} from '../src/Provider/Nodata_foundimage';
import Footer from './Provider/Footer';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {setVehicleData} from './apis/viechles';
export default class My_Vehicles extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      vehical_arr: [],
      loaddata: false,
      refresh: false,
      user_id: '',
      delete_vehicle_id: '',
      modalVisible: false,
      modalVisible1: false,
      latitude: config.latitude,
      longitude: config.longitude,
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      //     setTimeout( () => {
      //         this.setVehicleData();
      //    },300);
    });
    setTimeout(() => {
      this.setVehicleData();
    }, 300);

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

  _onRefresh = async () => {
    this.setState({refresh: true});
    this.setVehicleData();
  };

  deleteVehicle = async () => {
    let vehicle_id = this.state.delete_vehicle_id;
    let user_id = this.state.user_id;
    var url = config.baseURL + 'delete_vehicle/' + user_id + '/' + vehicle_id;
    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          setTimeout(() => {
            global.props.hideLoader();
          }, 800);
          this.setState({vehical_arr: obj.vehicle_arr});
          localStorage.removeItem('saved_vehicle_arr');
          localStorage.removeItem('user_home_data');
        } else {
          if (obj.acount_delete_status[0] == 'deactivate') {
            config.checkUserDelete(this.props.navigation);
            return false;
          }
          if (obj.account_active_status[0] == 'deactivate') {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          }
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

  setVehicleData = async () => {
    setVehicleData(this, this.props.navigation);
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
    // let responseJson = resp.results[0]
    // let city = '';
    // let administrative_area_level_1 = '';
    // for (let i = 0; i < responseJson.address_components.length; i++) {
    //     if (responseJson.address_components[i].types[0] == "locality") {
    //         city = responseJson.address_components[i].long_name
    //         break;
    //     }
    //     else if (responseJson.address_components[i].types[0] == "administrative_area_level_2") {
    //         city = responseJson.address_components[i].long_name
    //     }

    // }
    // for (let j = 0; j < responseJson.address_components.length; j++) {
    //     if (responseJson.address_components[j].types[0] == "administrative_area_level_1") {
    //         administrative_area_level_1 = responseJson.address_components[j].long_name
    //     }

    // }
    // let details = responseJson
    // let data2 = { 'latitude': details.geometry.location.lat, 'longitude': details.geometry.location.lng, 'address': details.formatted_address, 'city': city, 'administrative_area_level_1': administrative_area_level_1 }

    // var google_latitude = details.geometry.location.lat;
    // var google_longitude = details.geometry.location.lng;
    // var google_address = details.formatted_address;
    // global.latitude==google_latitude,global.longitude=google_longitude,
    // global.latdelta =event.latitudeDelta,global.longdelta=event.longitudeDelta
    // })
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
          msgProvider.alert(
            Lang_chg.information[config.language],
            obj.msg[config.language],
            false,
          );
          if (obj.acount_delete_status == 'deactivate') {
            config.checkUserDelete(this.props.navigation);
            return false;
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
          return false;
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <SafeAreaView
            style={{backgroundColor: Colors.theme_color, flex: 0}}
          />
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.appColor}
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
          {/* Modal Open */}
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
                  {Lang_chg.titleDelete[config.language]}
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
                  {Lang_chg.msgConfirmvehicleDelete[config.language]}
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
                      setTimeout(() => {
                        this.deleteVehicle();
                      }, 500),
                        this.setState({modalVisible: false});
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
            source={localimag.bacKground1}
            resizeMode="stretch"
            style={{
              width: (mobileW * 100) / 100,
              height: mobileH,
            }}>
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
                  paddingVertical: (mobileW * 6) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontsemibold,
                    fontSize: (mobileW * 5.5) / 100,
                    color: Colors.whiteColor,
                  }}>
                  {Lang_chg.myvehicles_txt[config.language]}
                </Text>
              </View>
            </ImageBackground>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: (mobileW * 20) / 100}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={this._onRefresh}
                  tintColor={Colors.black_color}
                />
              }>
              <View style={{marginTop: (mobileW * 1) / 100, flex: 1}}>
                {this.state.vehical_arr.length ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.vehical_arr}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                      paddingBottom: (mobileW * 10) / 100,
                    }}
                    renderItem={({index, item}) => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            width: (mobileW * 93) / 100,
                            alignSelf: 'center',
                            marginTop: (mobileW * 4.5) / 100,
                            elevation: 3,
                            backgroundColor: Colors.whiteColor,
                            shadowOffset: {width: 1, height: 1},
                            shadowColor: Colors.shadow_color,
                            shadowOpacity: 0.24,
                            shadowRadius: 2.22,
                            borderRadius: (mobileW * 1) / 100,
                          }}>
                          <View
                            style={{
                              width: '100%',
                              backgroundColor: Colors.appColor,
                              borderTopLeftRadius: (mobileW * 1) / 100,
                              borderTopRightRadius: (mobileW * 1) / 100,
                              flexDirection: 'row',
                            }}>
                            <View style={{width: '80%', alignSelf: 'center'}}>
                              <View style={{width: '93%', alignSelf: 'center'}}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 3.3) / 100,
                                    color: Colors.whiteColor,
                                    paddingVertical: (mobileW * 1.7) / 100,
                                    textAlign: config.textRotate,
                                  }}>
                                  {item.model_name[config.language]}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: '18%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.props.navigation.navigate(
                                    'Edit_Vechicle',
                                    {vehicle_id: item.vehicle_id},
                                  );
                                }}
                                activeOpacity={0.7}
                                style={{width: '50%'}}>
                                <Image
                                  source={localimag.message1}
                                  style={{
                                    width: (mobileW * 5) / 100,
                                    height: (mobileW * 5) / 100,
                                  }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                  this.setState({
                                    modalVisible: true,
                                    delete_vehicle_id: item.vehicle_id,
                                  });
                                }}
                                style={{width: '50%'}}>
                                <Image
                                  source={localimag.delete1}
                                  style={{
                                    width: (mobileW * 5) / 100,
                                    height: (mobileW * 5) / 100,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View
                            style={{
                              width: '92%',
                              paddingTop: (mobileW * 2.2) / 100,
                              flexDirection: 'row',
                              alignSelf: 'center',
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
                                  paddingBottom: (mobileW * 1) / 100,
                                }}
                                numberOfLines={1}>
                                {item.vehicle_name[config.language]}
                              </Text>
                              <Image
                                source={
                                  item.image == 'NA'
                                    ? localimag.placeholder_img
                                    : {
                                        uri:
                                          config.img_url3 + item.vehicle_image,
                                      }
                                }
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
                                  {item.plate_number}
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
                              <View
                                style={{paddingVertical: (mobileW * 2) / 100}}>
                                <Text style={styles.text_style}>
                                  {Lang_chg.make_txt[config.language]}
                                </Text>
                              </View>
                              <View style={{}}>
                                <Image
                                  source={{
                                    uri: config.img_url3 + item.make_image,
                                  }}
                                  style={{
                                    height: (mobileW * 8) / 100,
                                    width: (mobileW * 11) / 100,
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
                                  alignSelf: 'center',
                                  paddingBottom: (mobileW * 4) / 100,
                                }}>
                                <Text style={styles.text_style}>
                                  {Lang_chg.color1_txt[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: item.color_code,

                                  height: (mobileW * 3.5) / 100,
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                ) : (
                  <Nodata_foundimage />
                )}
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.props.navigation.navigate('Add_your_vehicle');
                }}
                style={{
                  backgroundColor: Colors.appColor,
                  width: (mobileW * 80) / 100,
                  borderRadius: 25,
                  marginTop: (mobileH * 4.5) / 100,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.whiteColor,
                    alignSelf: 'center',
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.fontmedium,
                    paddingVertical: (mobileW * 2) / 100,
                  }}>
                  {Lang_chg.addvechicle_txt[config.language]}
                </Text>
              </TouchableOpacity>
              <View style={{height: 100}} />
            </ScrollView>
          </ImageBackground>
          <Footer
            mapModel={() => {
              this.setState({modalVisible1: true}, this.locationGet());
            }}
            navigation={this.props.navigation}
            page={'My_Vehicles'}
            user_id={1}
          />
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
