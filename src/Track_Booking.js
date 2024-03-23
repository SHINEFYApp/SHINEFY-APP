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
  PermissionsAndroid,
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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
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

export default class Change_password extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      securepass3: true,
      securepass2: true,
      securepass1: true,
      old_password: '',
      new_password: '',
      con_password: '',
      latitude: this.props.route.params.google_latitude,
      longitude: this.props.route.params.google_longitude,
      physical_address: this.props.route.params.google_address,
      google_address: this.props.route.params.google_address,
      google_latitude: this.props.route.params.google_latitude,
      google_longitude: this.props.route.params.google_longitude,
      latDelta: '0.0922',
      longDelta: '0.0421',
      booking_id: this.props.route.params.booking_id,
      booking_arr: 'NA',
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({
        latitude: this.props.route.params.lat,
        longitude: this.props.route.params.lon,
        physical_address: '',
        google_address: '',
        google_latitude: this.props.route.params.lat,
        google_longitude: this.props.route.params.lon,
        latDelta: '0.0922',
        longDelta: '0.0421',
        booking_id: this.props.route.params.booking_id,
      });
      this.setBookingDetails();
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
            booking_id: obj.booking_arr.booking_id,
            latitude: obj.booking_arr.lat,
            longitude: obj.booking_arr.lon,
            google_latitude: obj.booking_arr.lat,
            google_longitude: obj.booking_arr.lon,
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

  //--------------------function for calling location ---------------//

  callLocation = async that => {
    localStorage.getItemObject('position').then(position => {
      if (position != null) {
        var pointcheck1 = 0;
        this.getalldata(position);
        Geolocation.getCurrentPosition(
          position => {
            localStorage.setItemObject('position', position);
            this.getalldata(position);
            pointcheck1 = 1;
          },
          error => {
            let position = {
              coords: {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              },
            };

            this.getalldata(position);
          },
          {enableHighAccuracy: true, timeout: 150000, maximumAge: 10000},
        );
        that.watchID = Geolocation.watchPosition(position => {
          if (pointcheck1 != 1) {
            localStorage.setItemObject('position', position);
            this.getalldata(position);
          }
        });
      } else {
        var pointcheck = 0;
        Geolocation.getCurrentPosition(
          position => {
            localStorage.setItemObject('position', position);

            this.getalldata(position);
            pointcheck = 1;
          },
          error => {
            let position = {
              coords: {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              },
            };

            this.getalldata(position);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
        );
        that.watchID = Geolocation.watchPosition(position => {
          if (pointcheck != 1) {
            localStorage.setItemObject('position', position);
            this.getalldata(position);
          }
        });
      }
    });
  };

  //--------------------function for get lat long ------------//
  getlatlong = async () => {
    let permission = await localStorage.getItemString('permission');
    if (permission != 'denied') {
      var that = this;

      if (Platform.OS === 'ios') {
        this.callLocation(that);
      } else {
        async function requestLocationPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              that.callLocation(that);
            } else {
              let position = {
                coords: {
                  latitude: that.state.latitude,
                  longitude: that.state.longitude,
                },
              };
              localStorage.setItemString('permission', 'denied');
              that.getalldata(position);
            }
          } catch (err) {
            console.warn(err);
          }
        }
        requestLocationPermission();
      }
    } else {
      let position = {
        coords: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      };
      this.getalldata(position);
    }
  };

  //---------------------function for set location ------------//
  getalldata = position => {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    this.setState({
      latitude: latitude,
      longitude: longitude,
      google_latitude: latitude,
      google_longitude: longitude,
      loading: false,
    });
  };

  //==========for map -------------//
  setMapRef = map => {
    this.map = map;
  };
  getCoordinates = region => {
    return {
      latitude: parseFloat(this.state.google_latitude),
      longitude: parseFloat(this.state.google_longitude),
      latitudeDelta: parseFloat(this.state.latDelta),
      longitudeDelta: parseFloat(this.state.longDelta),
    };
  };

  //-----------------google address get--------------//
  getadddressfromlatlong = event => {
    var latitude = event.latitude;
    var longitude = event.longitude;
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        event.latitude +
        ',' +
        event.longitude +
        '&key=' +
        config.mapkey +
        '&language=' +
        config.maplanguage,
    )
      .then(response => response.json())
      .then(resp => {
        let responseJson = resp.results[0];
        let city = '';
        let administrative_area_level_1 = '';
        for (let i = 0; i < responseJson.address_components.length; i++) {
          if (responseJson.address_components[i].types[0] == 'locality') {
            city = responseJson.address_components[i].long_name;
            break;
          } else if (
            responseJson.address_components[i].types[0] ==
            'administrative_area_level_2'
          ) {
            city = responseJson.address_components[i].long_name;
          }
        }
        for (let j = 0; j < responseJson.address_components.length; j++) {
          if (
            responseJson.address_components[j].types[0] ==
            'administrative_area_level_1'
          ) {
            administrative_area_level_1 =
              responseJson.address_components[j].long_name;
          }
        }
        let details = responseJson;
        let data2 = {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          address: details.formatted_address,
          city: city,
          administrative_area_level_1: administrative_area_level_1,
        };
        var google_latitude = details.geometry.location.lat;
        var google_longitude = details.geometry.location.lng;
        var google_address = details.formatted_address;

        this.setState({
          latDelta: event.latitudeDelta,
          longDelta: event.longitudeDelta,
          google_address: google_address,
          google_latitude: google_latitude,
          google_longitude: google_longitude,
        });
      });
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
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
                    width: (mobileW * 5.5) / 100,
                    height: (mobileW * 5.5) / 100,
                    transform: [
                      config.textalign == 'right' ? {scaleX: -1} : {scaleX: 1},
                    ],
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '70%',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontFamily: Font.fontsemibold,
                    fontSize: (mobileW * 5.5) / 100,
                    color: Colors.whiteColor,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  {Lang_chg.trackyourbooking_txt[config.language]}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  justifyContent: 'center',
                  width: '15%',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setBookingDetails();
                }}>
                <Image
                  source={require('./icons/refresh1.jpg')}
                  style={{
                    width: (mobileW * 5.5) / 100,
                    height: (mobileW * 5.5) / 100,
                    transform: [
                      config.textalign == 'right' ? {scaleX: -1} : {scaleX: 1},
                    ],
                  }}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <MapView
              followsUserLocation={true}
              style={{
                height: (mobileH * 90) / 100,
                width: (mobileW * 100) / 100,
                alignSelf: 'center',
              }}
              region={this.getCoordinates(this)}
              mapType={'standard'}
              zoomEnabled={true}
              scrollEnabled={false}
              minZoomLevel={15}
              maxZoomLevel={20}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={false}
              showsMyLocationButton={false}
              onMapReady={this.onMapReady}
              ref={this.setMapRef}
              onRegionChangeComplete={event => {
                this.getadddressfromlatlong(event);
              }}>
              <Marker
                coordinate={{
                  latitude: parseFloat(this.state.google_latitude),
                  longitude: parseFloat(this.state.google_longitude),
                  latitudeDelta: parseFloat(this.state.latDelta),
                  longitudeDelta: parseFloat(this.state.longDelta),
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
            </MapView>
            <View
              style={{
                width: '95%',
                paddingBottom: (mobileW * 13) / 100,
                elevation: 5,
                borderRadius: (mobileW * 2) / 100,
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
                backgroundColor: Colors.whiteColor,
                shadowOffset: {width: 1, height: 1},
                shadowColor: Colors.shadow_color,
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}>
              <View style={{width: '100%', flexDirection: 'row'}}>
                <View
                  style={{
                    width: '21%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    bottom: 22,
                  }}>
                  {this.state.booking_arr.on_the_way_status == 1 ? (
                    <Image
                      source={localimag.track_booking_img1}
                      style={{
                        height: (mobileW * 11) / 100,
                        width: (mobileW * 11) / 100,
                      }}
                    />
                  ) : (
                    <Image
                      source={localimag.onthe_way_active_icon}
                      style={{
                        height: (mobileW * 11) / 100,
                        width: (mobileW * 11) / 100,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 2.6) / 100,
                      paddingTop: (mobileW * 2.5) / 100,
                      color:
                        this.state.booking_arr.on_the_way_status == 1
                          ? 'black'
                          : 'grey',
                    }}>
                    {Lang_chg.ontheway_txt[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: '29%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    bottom: 22,
                  }}>
                  {this.state.booking_arr.arrive_status == 1 ? (
                    <Image
                      source={localimag.arrive_active_icon}
                      style={{
                        height: (mobileW * 11) / 100,
                        width: (mobileW * 11) / 100,
                      }}
                    />
                  ) : (
                    <Image
                      source={localimag.track_booking_img2}
                      style={{
                        height: (mobileW * 11) / 100,
                        width: (mobileW * 11) / 100,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 2.6) / 100,
                      paddingTop: (mobileW * 2.5) / 100,
                      color:
                        this.state.booking_arr.arrive_status == 1
                          ? 'black'
                          : 'grey',
                    }}>
                    {Lang_chg.arrive_txt[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: '29%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    bottom: 22,
                  }}>
                  {this.state.booking_arr.washing_status == 1 ? (
                    <Image
                      source={localimag.start_washing_active_icon}
                      style={{
                        height: (mobileW * 11) / 100,
                        width: (mobileW * 11) / 100,
                      }}
                    />
                  ) : (
                    <Image
                      source={localimag.track_booking_img3}
                      style={{
                        height: (mobileW * 11) / 100,
                        width: (mobileW * 11) / 100,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 2.6) / 100,
                      paddingTop: (mobileW * 2.5) / 100,
                      color:
                        this.state.booking_arr.washing_status == 1
                          ? 'black'
                          : 'grey',
                    }}>
                    {Lang_chg.startwashing_txt[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: '21%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    bottom: 22,
                  }}>
                  {this.state.booking_arr.completed_status == 1 ? (
                    <Image
                      source={localimag.completed_active_icon}
                      style={{
                        height: (mobileW * 11) / 100,
                        width: (mobileW * 11) / 100,
                      }}
                    />
                  ) : (
                    <Image
                      source={localimag.track_booking_img4}
                      style={{
                        height: (mobileW * 11) / 100,
                        width: (mobileW * 11) / 100,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 2.6) / 100,
                      paddingTop: (mobileW * 2.5) / 100,
                      color:
                        this.state.booking_arr.completed_status == 1
                          ? 'black'
                          : 'grey',
                    }}>
                    {Lang_chg.complete_txt[config.language]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={localimag.scooter1}
                  style={{
                    height: (mobileW * 30) / 100,
                    width: (mobileW * 83) / 100,
                  }}
                />
              </View>
            </View>
          </View>
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
