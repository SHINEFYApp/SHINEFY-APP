import React, {Component} from 'react';
import {
  View,
  Image,
  BackHandler,
  Text,
  Modal,
  StyleSheet,
  Alert,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Platform,
  PermissionsAndroid,
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
  msgTitle,
} from './Provider/utilslib/Utils';
import Carousel from 'react-native-snap-carousel';
import Footer from './Provider/Footer';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import HomeAdPopup from './HomeAdPopup';
import {setVehicleData} from './apis/viechles';
import {pushnotification} from './Provider/Pushnotificationredirection';
import {notification} from './Provider/NotificationProvider';

export default class Home extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      home_status: '',
      timer: false,
      modalVisible: false,
      user_id: '',
      vehical_arr: [],
      vehicle_index: 0,
      vehicle_id: '',

      //----------for map------------//
      latitude: config.latitude,
      longitude: config.longitude,
      physical_address: '',
      google_address: '',
      google_latitude: config.latitude,
      google_longitude: config.longitude,
      latDelta: '0.000122',
      longDelta: '0.000421',
      modal_address: '',
      modal_latitude: config.latitude,
      modal_longitude: config.longitude,
      modal_latDelta: '0.0000122',
      modal_longDelta: '0.0000421',
      notification_count: 0,
      showHomeAd: false,
      adObj: null,
    };

    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    async function requestNotificationPermission() {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      requestNotificationPermission();
    }
    pushnotification.redirectfun(this.props);
    this.getHomeAdd();
    this.setVehicleData();

    this.props.navigation.addListener('focus', () => {
      this.getlatlong();
      if (this.props.route.params.home_status != null) {
        this.setState({home_status: this.props.route.params.home_status});
      }
      this.setState({timer: false});
      this.setVehicleData();

      setTimeout(async () => {
        await this.setHomeData();
        await this.getNotificationCount();
        
        localStorage.setItemObject(
          'booking_vehicle_arr',
          this.state.vehical_arr[this.state.vehicle_index],
        );
      }, 500);
    });

    this.getNotificationCount();
    this._willBlurSubscription = this.props.navigation.addListener(
      'blur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
    );
    this.getnotification();
   
  }
  setVehicleData = () => {
    setVehicleData(this, this.props.navigation);
  };
  //--------for notification get  start -------------
  getnotification = async () => {
    messaging().onMessage(async remoteMessage => {
      var isScheduled = remoteMessage.data.isScheduled;
      if (isScheduled == 'true') {
        var schedule_time = remoteMessage.data.scheduledTime;
        PushNotification.localNotificationSchedule({
          channelId: 'specialid', //his must be same with channelid in createchannel
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
          data: remoteMessage.data,
          largeIcon: 'ic_launcher',
          date: new Date(schedule_time), // in 60 secs
          allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        });

        PushNotification.getDeliveredNotifications(res => {});
        //----for local schedule end--------//
      } else {
        //------for local start---------- //
        PushNotification.localNotification({
          channelId: 'specialid', //his must be same with channelid in createchannel
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
          data: remoteMessage.data,
          largeIcon: 'ic_launcher',
        });
        //------for local end-----------//
      }
    });
  };
  //--------for notification get  end -------------

  //----------for map start-----------------//
  //----------function for getting current lat long start ----------//
  //--------------------function for calling location ---------------//

  callLocation = async that => {
    localStorage.getItemObject('position').then(position => {
      if (position != null) {
        var pointcheck1 = 0;
        this.getalldata(position);
        Geolocation.getCurrentPosition(
          //Will give you the current location
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
          //Will give you the location on location change

          if (pointcheck1 != 1) {
            localStorage.setItemObject('position', position);
            this.getalldata(position);
          }
        });
      } else {
        var pointcheck = 0;
        Geolocation.getCurrentPosition(
          //Will give you the current location
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
          //Will give you the location on location change

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
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      // this.callLocation(that);
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
      if (Platform.Version >= 33) {
        requestLocationPermission();
      } else {
        this.callLocation(this);
      }
    }
  };

  //---------------------function for set location ------------//
  getalldata = position => {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    config.latitude = latitude;
    config.longitude = longitude;
    this.setState({
      latitude: latitude,
      longitude: longitude,
      google_latitude: latitude,
      google_longitude: longitude,
      modal_latitude: latitude,
      modal_longitude: longitude,
      loading: false,
      review_arr: 'NA',
      booking_hours: 'NA',
    });

    (global.latitude = latitude), (global.longitude = longitude);
  };

  //==========for map -------------//
  setMapRef = map => {
    this.map = map;
  };

  setMapRef1 = map1 => {
    this.map1 = map1;
  };

  getCoordinates = region => {
    return {
      latitude: parseFloat(global.latitude),
      longitude: parseFloat(global.longitude),
      latitudeDelta: parseFloat(global.latdelta),
      longitudeDelta: parseFloat(global.longdelta),
    };
  };

  getCoordinatesModal = region => {
    return {
      latitude: parseFloat(global.latitude),
      longitude: parseFloat(global.longitude),
      latitudeDelta: parseFloat(global.latdelta),
      longitudeDelta: parseFloat(global.longdelta),
    };
  };

  //-----------------google address get--------------//
  getadddressfromlatlong = event => {
    var latitude = event.latitude;
    var longitude = event.longitude;

    // fetch(
    //   'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    //     event.latitude +
    //     ',' +
    //     event.longitude +
    //     '&key=' +
    //     config.mapkey +
    //     '&language=' +
    //     config.maplanguage,
    // )
    //   .then(response => response.json())
    //   .then(resp => {
    //     let responseJson = resp.results[0];
    //     let city = '';
    //     let administrative_area_level_1 = '';
    //     for (let i = 0; i < responseJson.address_components.length; i++) {
    //       if (responseJson.address_components[i].types[0] == 'locality') {
    //         city = responseJson.address_components[i].long_name;
    //         break;
    //       } else if (
    //         responseJson.address_components[i].types[0] ==
    //         'administrative_area_level_2'
    //       ) {
    //         city = responseJson.address_components[i].long_name;
    //       }
    //     }
    //     for (let j = 0; j < responseJson.address_components.length; j++) {
    //       if (
    //         responseJson.address_components[j].types[0] ==
    //         'administrative_area_level_1'
    //       ) {
    //         administrative_area_level_1 =
    //           responseJson.address_components[j].long_name;
    //       }
    //     }
    //     let details = responseJson;
    //     let data2 = {
    //       latitude: details.geometry.location.lat,
    //       longitude: details.geometry.location.lng,
    //       address: details.formatted_address,
    //       city: city,
    //       administrative_area_level_1: administrative_area_level_1,
    //     };

    var google_latitude = latitude;
    var google_longitude = longitude;
    var google_address = 'NA';

    // this.setState({
    //   latDelta: event.latitudeDelta,
    //   longDelta: event.longitudeDelta,
    //   google_address: google_address,
    //    google_latitude: google_latitude,
    //    google_longitude: google_longitude,
    //   modal_address: google_address,
    //   modal_latitude: google_latitude,
    //   modal_longitude: google_longitude,
    //   modal_latDelta: event.latitudeDelta,
    //   modal_longDelta: event.longitudeDelta,
    // });
    (global.latitude = google_latitude),
      (global.longitude = google_longitude),
      (global.address = google_address),
      (global.latdelta = event.latitudeDelta),
      (global.longdelta = event.longitudeDelta);
    this.getCoordinatesModal(event);
  };

  //-----------------google address get--------------//
  getadddressfromlatlongModal = event => {
    var latitude = event.latitude;
    var longitude = event.longitude;
    // fetch(
    //   'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    //     event.latitude +
    //     ',' +
    //     event.longitude +
    //     '&key=' +
    //     config.mapkey +
    //     '&language=' +
    //     config.maplanguage,
    // )
    //   .then(response => response.json())
    //   .then(resp => {
    //     let responseJson = resp.results[0];
    //     let city = '';
    //     let administrative_area_level_1 = '';
    //     for (let i = 0; i < responseJson.address_components.length; i++) {
    //       if (responseJson.address_components[i].types[0] == 'locality') {
    //         city = responseJson.address_components[i].long_name;
    //         break;
    //       } else if (
    //         responseJson.address_components[i].types[0] ==
    //         'administrative_area_level_2'
    //       ) {
    //         city = responseJson.address_components[i].long_name;
    //       }
    //     }
    //     for (let j = 0; j < responseJson.address_components.length; j++) {
    //       if (
    //         responseJson.address_components[j].types[0] ==
    //         'administrative_area_level_1'
    //       ) {
    //         administrative_area_level_1 =
    //           responseJson.address_components[j].long_name;
    //       }
    //     }
    //     let details = responseJson;
    //     let data2 = {
    //       latitude: details.geometry.location.lat,
    //       longitude: details.geometry.location.lng,
    //       address: details.formatted_address,
    //       city: city,
    //       administrative_area_level_1: administrative_area_level_1,
    //     };

    //     var google_latitude = latitude;
    //     var google_longitude = longitude;
    //     var google_address = 'NA';

    //     this.setState({
    //       modal_address: google_address,
    //       modal_latitude: google_latitude,
    //       modal_longitude: google_longitude,
    //       modal_latDelta: event.latitudeDelta,
    //       modal_longDelta: event.longitudeDelta,
    //     });
    //   });
  };
  //----------function for getting current lat long end----------//
  //----------for map end-------------------//

  handleBackPress = () => {
    Alert.alert(
      Lang_chg.titleexitapp[config.language],
      Lang_chg.exitappmessage[config.language],
      [
        {
          text: Lang_chg.no_txt[config.language],
          onPress: () => {},
          tyle: 'Yes',
        },
        {
          text: Lang_chg.yes_txt[config.language],
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  setIndex = async index => {
    let data = this.state.vehicle_arr[index];
    localStorage.setItemObject('booking_vehicle_arr', data);
    this.setState({vehicle_id: data.vehicle_id});
  };

  getHomeAdd = () => {
    var url = config.baseURL + 'get_ad';
    apifuntion
      .getApi(url, 1)
      .then(obj => {
        global.props.hideLoader();

        if (obj.success == 'true') {
          // alert(obj?.ad?.description);
          this.setState({adObj: obj?.ad, showHomeAd: true});
        }
      })
      .catch(err => {});
  };

  setHomeData = async () => {
    localStorage.removeItem('location_arr');
    localStorage.removeItem('saved_location_arr');
    localStorage.removeItem('booking_service_arr');
    localStorage.removeItem('vat_data');
    localStorage.removeItem('user_vehicle_arr');
    localStorage.removeItem('all_slots');
    localStorage.removeItem('booking_time_slots');
    localStorage.removeItem('booking_vehicle_arr');
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    this.setState({user_id: user_id});
    var url = config.baseURL + 'get_user_home/' + user_id;
    var user_home_data = await localStorage.getItemObject('user_home_data');
    if (user_home_data == null) {
      apifuntion
        .getApi(url, 1)
        .then(obj => {
          global.props.hideLoader();
       
          if (obj.success == 'true') {
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject('user_home_data', obj.home_arr);
            let data = obj.home_arr.vehicle_arr[0];
            localStorage.setItemObject('booking_vehicle_arr', data);
            if (Platform.OS == 'ios') {
              setTimeout(() => {
                this.setState({
                  vehicle_arr: obj.home_arr.vehicle_arr,
                  review_arr: obj.home_arr.review_arr,
                  booking_hours: obj.home_arr.booking_hours,
                  timer: false,
                });
              }, 300);
            } else {
              this.setState({
                vehicle_arr: obj.home_arr.vehicle_arr,
                review_arr: obj.home_arr.review_arr,
                booking_hours: obj.home_arr.booking_hours,
                timer: false,
              });
            }
            if (
              obj.home_arr.review_arr != 'NA' &&
              obj.home_arr.review_arr.service_boy_id.toString() != '0' &&
              obj.home_arr.review_arr.service_boy_id != null &&
              obj.home_arr.review_arr.booking_id.toString() != '0' &&
              obj.home_arr.review_arr.booking_id != null
            ) {
              this.props.navigation.navigate('Rate_Now', {
                service_boy_id: obj.home_arr.review_arr.service_boy_id,
                booking_id: obj.home_arr.review_arr.booking_id,
                status: 2,
              });
            }
          } else {
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
        .catch(err => {});
    } else {
      this.setState({
        vehicle_arr: user_home_data.vehicle_arr,
        review_arr: user_home_data.review_arr,
        booking_hours: user_home_data.booking_hours,
        timer: false,
      });
      localStorage.setItemObject(
        'booking_vehicle_arr',
        user_home_data.vehicle_arr[0],
      );
      apifuntion
        .getApi(url, 1)
        .then(obj => {
          global.props.hideLoader();
          
          if (obj.success == 'true') {
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject('user_home_data', obj.home_arr);
            if (obj.home_arr.booking_hours != 'NA') {
              this.setState({booking_hours: obj.home_arr.booking_hours});
            }

            if (
              obj.home_arr.review_arr != 'NA' &&
              obj.home_arr.review_arr.service_boy_id.toString() != '0' &&
              obj.home_arr.review_arr.service_boy_id != null &&
              obj.home_arr.review_arr.booking_id.toString() != '0' &&
              obj.home_arr.review_arr.booking_id != null
            ) {
              this.props.navigation.navigate('Rate_Now', {
                service_boy_id: obj.home_arr.review_arr.service_boy_id,
                booking_id: obj.home_arr.review_arr.booking_id,
                status: 2,
              });
            }
          } else {
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
        .catch(err => {});
    }
  };

  locationGet = async () => {
    // let {google_address, google_latitude, google_longitude} = this.state;
    var google_address = global.address;
    var google_latitude = global.latitude;
    var google_longitude = global.longitude;
    var location_arr = {
      latitude: google_latitude,
      longitude: google_longitude,
      location: google_address,
    };
    localStorage.setItemObject('page_status', 2);
    let booking_vehicle = await localStorage.getItemObject(
      'booking_vehicle_arr',
    );
    localStorage.setItemObject('location_arr', location_arr);
  };

  checkLocation = async () => {
    let {google_address, google_latitude, google_longitude, user_id} =
      this.state;
    // global.props.showLoader();
    var url =
      config.baseURL +
      'check_location/' +
      global.latitude +
      '/' +
      global.longitude +
      '/' +
      user_id;
    

    apifuntion
      .getApi(url, 1)
      .then(obj => {

        global.props.hideLoader();
        if (obj.success == 'true') {
          localStorage.setItemObject('user_arr', obj.user_details);
          this.setState({modalVisible: false});
          this.props.navigation.navigate('Select_Service');
        } else {
          this.setState({modalVisible: false});
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
      .catch(err => {});
  };

  getNotificationCount = async () => {
    let user_details = await localStorage.getItemObject('user_arr');
    let user_id = user_details.user_id;
    let url = config.baseURL1 + 'get_notificationcount.php?user_id=' + user_id;

    apifuntion
      .getApi(url, 1)
      .then(obj => {
        global.props.hideLoader();
   
        if (obj.success == 'true') {
          this.setState({notification_count: obj.notification_count});
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
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({modalVisible: false});
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
                    this.setState({modalVisible: false});
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
                      minZoomLevel={0}
                      maxZoomLevel={20}
                      mapType={'standard'}
                      zoomEnabled={false}
                      provider={PROVIDER_GOOGLE}
                      onMapReady={this.onMapReady}
                      ref={this.setMapRef1}

                      // onRegionChangeComplete={event => {
                      //   this.getadddressfromlatlongModal(event);
                      // }}
                    >
                      {this.state.latitude != null && (
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
                      onPress={() => {
                        this.setState({modalVisible: false});
                      }}
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
          {/* Modal Close */}
          <ImageBackground
            source={localimag.new_header}
            style={{
              width: (mobileW * 100) / 100,
              height: (mobileW * 20) / 100,
            }}>
            <View
              style={{
                width: (mobileW * 95) / 100,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: (mobileW * 6) / 100,
              }}>
              <View style={{width: '25%', flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    justifyContent: 'center',
                    width: '50%',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Search_Location');
                  }}>
                  <View
                    style={{
                      borderRadius: (mobileW * 8.5) / 75,
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={localimag.savedlocation}
                      style={{
                        margin: 5,
                        width: (mobileW * 8.5) / 150,
                        height: (mobileW * 8.5) / 150,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    justifyContent: 'center',
                    width: '50%',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Home_save_location', {
                      address: '',
                      status: 1,
                      user_location_id: 'NA',
                      google_address: this.state.google_address,
                      google_longitude: this.state.google_longitude,
                      google_latitude: this.state.google_latitude,
                      latDelta: this.state.latDelta,
                      longDelta: this.state.longDelta,
                    });
                  }}>
                  <View
                    style={{
                      borderRadius: (mobileW * 8.5) / 75,
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={localimag.addlocation}
                      style={{
                        margin: 5,
                        width: (mobileW * 8.5) / 150,
                        height: (mobileW * 8.5) / 150,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '65%', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: Font.fontsemibold,
                    fontSize: (mobileW * 5.5) / 100,
                    color: Colors.whiteColor,
                    paddingRight: (mobileW * 8) / 100,
                  }}>
                  {Lang_chg.Home[config.language]}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  justifyContent: 'center',
                  width: '10%',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.navigate('Notification');
                }}>
                {this.state.notification_count != 0 ? (
                  <View
                    style={{
                      borderRadius: (mobileW * 8.5) / 75,
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={localimag.icnotification}
                      style={{
                        margin: 5,
                        width: (mobileW * 8.5) / 150,
                        height: (mobileW * 8.5) / 150,
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      borderRadius: (mobileW * 8.5) / 75,
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={localimag.icnotification}
                      style={{
                        margin: 5,
                        width: (mobileW * 8.5) / 150,
                        height: (mobileW * 8.5) / 150,
                      }}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </ImageBackground>

          {/* </View> */}
          <View style={{}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <MapView
                followsUserLocation={true}
                style={styles.logo}
                mapType={'standard'}
                minZoomLevel={0}
                maxZoomLevel={20}
                zoomEnabled={true}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onMapReady={this.onMapReady}
                ref={this.setMapRef}
                onRegionChangeComplete={event => {
                  this.getadddressfromlatlong(event);
                }}
                region={this.getCoordinates(this)}
                mapPadding={
                  Platform.OS == 'ios'
                    ? {top: 0, right: 0, left: 0, bottom: 80}
                    : {top: 0, right: 0, left: 0, bottom: 0}
                }
              />
              <View
                style={{
                  //backgroundColor:'green',
                  left: '50%',
                  marginLeft:
                    Platform.OS == 'android' ? -32 : (-mobileW * 8) / 100,
                  marginTop:
                    Platform.OS == 'android' ? -60 : (-mobileW * 25) / 100,
                  position: 'absolute',
                  top: '50%',
                }}>
                <Image
                  resizeMode="contain"
                  source={localimag.home_map_pin}
                  style={{
                    height: (mobileW * 15.5) / 100,
                    width: (mobileW * 15.5) / 100,
                  }}
                />
              </View>
              {this.state.booking_hours != 'NA' &&
                this.state.booking_hours != null && (
                  <View style={{position: 'absolute', width: '97%', top: 13}}>
                    {this.state.timer == false ? (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this.setState({timer: true});
                        }}
                        style={{
                          width: '20%',
                          backgroundColor: '#E20606',
                          borderRadius: (mobileW * 2) / 100,
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingTop: (mobileW * 2) / 100,
                          }}>
                          <Image
                            source={localimag.chronometer}
                            style={{
                              height: (mobileW * 4) / 100,
                              width: (mobileW * 4) / 100,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingTop: (mobileW * 1) / 100,
                            paddingBottom: (mobileW * 2) / 100,
                          }}>
                          <Text
                            style={{
                              fontFamily: Font.fontmedium,
                              fontSize: (mobileW * 2.3) / 100,
                              color: Colors.whiteColor,
                            }}>
                            {' '}
                            {this.state.booking_hours.hours}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this.props.navigation.navigate('Bookings_Details', {
                            my_booking_check: 1,
                            booking_id: this.state.booking_hours.booking_id,
                          });
                        }}
                        style={{
                          width: '75%',
                          backgroundColor: '#E20606',
                          borderRadius: (mobileW * 2) / 100,
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.setState({timer: false});
                          }}
                          style={{position: 'absolute', top: -6, right: -2}}>
                          <Image
                            source={localimag.home_cancel}
                            style={{
                              height: (mobileW * 5.5) / 100,
                              width: (mobileW * 5.5) / 100,
                            }}
                          />
                        </TouchableOpacity>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingTop: (mobileW * 6) / 100,
                          }}>
                          <Image
                            source={localimag.chronometer}
                            style={{
                              height: (mobileW * 8) / 100,
                              width: (mobileW * 8) / 100,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingTop: (mobileW * 1.5) / 100,
                            paddingBottom: (mobileW * 7) / 100,
                          }}>
                          <Text
                            style={{
                              fontFamily: Font.fontmedium,
                              fontSize: (mobileW * 2.8) / 100,
                              color: Colors.whiteColor,
                            }}>
                            {Lang_chg.nextBooking_txt[config.language]}{' '}
                            {this.state.booking_hours.hours}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
            </View>
          </View>

          <View
            style={{
              width: (mobileW * 100) / 100,
              backgroundColor: Colors.whiteColor,
              position: 'absolute',
              bottom: 0,
            }}>
            <View
              style={{
                width: '93%',
                paddingVertical: (mobileW * 2) / 100,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: (mobileW * 3.9) / 100,
                  color: Colors.black_color,
                  fontFamily: Font.fontsemibold,
                  textAlign: config.textRotate,
                }}>
                {Lang_chg.select_your_car[config.language]}
              </Text>
            </View>

            {!!this.state.vehical_arr?.length && (
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom:
                    Platform.OS == 'ios'
                      ? (mobileW * 16) / 100
                      : (mobileW * 13) / 100,
                  paddingTop: (mobileW * 2) / 100,
                }}>
                {/* <TouchableOpacity activeOpacity={0.7} onPress={() => { this._carousel._snapToItem(this.state.vehicle_index - 1) }} style={{ width: mobileW * 9 / 100, paddingBottom: mobileW * 11 / 100 }}>
                                    <Image source={localimag.leftArrowIocn} style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100 }} />
                                </TouchableOpacity> */}

                <Carousel
                  ref={c => {
                    this._carousel = c;
                  }}
                  data={this.state.vehical_arr || []}
                  // loop={true}
                  firstItem={this.state.vehicle_index}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          width: '95%',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          elevation: 5,
                          backgroundColor: Colors.whiteColor,
                          shadowOffset: {width: 1, height: 1},
                          shadowColor: Colors.shadow_color,
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          marginBottom: (mobileW * 11) / 100,
                          borderRadius: (mobileW * 1) / 100,
                          flexDirection: 'row',
                        }}>
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
                              width: '28%',
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
                                fontSize: (mobileW * 3.6) / 100,
                                marginTop: (mobileW * 3) / 100,
                              }}>
                              {item.vehicle_name[config.language]}
                            </Text>
                            <Image
                              source={{
                                uri: config.img_url3 + item.vehicle_image,
                              }}
                              style={{
                                height: (mobileW * 14) / 100,
                                width: (mobileW * 16) / 100,
                                marginBottom: (mobileW * 1) / 100,
                              }}
                            />
                          </View>
                          <View style={{width: '72%'}}>
                            <View style={{width: '91%', alignSelf: 'center'}}>
                              <Text
                                style={{
                                  fontFamily: Font.fontsemibold,
                                  fontSize: (mobileW * 3.3) / 100,
                                  color: Colors.appColor,
                                }}>
                                {item.model_name[config.language]}
                              </Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                              <View
                                style={{width: '40%', alignItems: 'center'}}>
                                <View
                                  style={{
                                    alignSelf: 'center',
                                    marginTop: (mobileW * 5) / 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: Font.fontmedium,
                                      fontSize: (mobileW * 3.8) / 100,
                                    }}>
                                    {item.plate_number}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  borderRightWidth: (mobileW * 0.3) / 100,
                                  borderRightColor: Colors.bottom_border,
                                  height: (mobileW * 13) / 100,
                                  marginTop: (mobileW * 1) / 100,
                                }}
                              />
                              <View
                                style={{
                                  width: '40%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}>
                                <View style={{}}>
                                  <Image
                                    source={{
                                      uri: config.img_url3 + item.make_image,
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
                                  borderRightColor: Colors.bottom_border,
                                  height: (mobileW * 13) / 100,
                                  marginTop: (mobileW * 1) / 100,
                                }}
                              />
                              <View
                                style={{
                                  width: '20%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                }}>
                                <View
                                  style={{
                                    paddingVertical: (mobileW * 2.5) / 100,
                                    alignSelf: 'center',
                                  }}>
                                  <View
                                    style={{
                                      backgroundColor: item.color_code,
                                      borderRadius: (mobileW * 3) / 100,
                                      height: (mobileW * 4.5) / 100,
                                      width: (mobileW * 4.5) / 100,
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  sliderWidth={(mobileW * 80) / 100}
                  itemWidth={(mobileW * 80) / 100}
                  onSnapToItem={index => {
                    this.setState({vehicle_index: index});
                    localStorage.setItemObject(
                      'booking_vehicle_arr',
                      this.state.vehical_arr[index],
                    );
                    this.setIndex(index);
                  }}
                />
                {/* <TouchableOpacity activeOpacity={0.7} onPress={() => { this._carousel._snapToItem(this.state.vehicle_index + 1) }} style={{ width: mobileW * 9 / 100, alignItems: 'flex-end', paddingBottom: mobileW * 11 / 100 }}>
                                    <Image source={localimag.rightArrowIocn} style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100 }} />
                                </TouchableOpacity> */}
              </View>
            )}
            {!this.state.vehical_arr.length && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.props.navigation.navigate('Add_your_vehicle');
                }}
                style={{
                  width: '82%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  elevation: 5,
                  backgroundColor: Colors.whiteColor,
                  shadowOffset: {width: 1, height: 1},
                  shadowColor: Colors.shadow_color,
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  marginBottom: (mobileW * 30) / 100,
                  borderRadius: (mobileW * 1) / 100,
                  flexDirection: 'row',
                  paddingVertical: (mobileW * 6) / 100,
                  marginTop: (mobileW * 5) / 100,
                }}>
                <View
                  style={{
                    width: '15%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={localimag.vehicle_img}
                    style={{
                      height: (mobileW * 7) / 100,
                      width: (mobileW * 7) / 100,
                    }}
                  />
                </View>
                <View style={{width: '70%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: Font.fontsemibold,
                      fontSize: (mobileW * 3.5) / 100,
                    }}>
                    {Lang_chg.add_your_vehicle[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: '15%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={localimag.rightArrowIocn}
                    style={{
                      height: (mobileW * 5) / 100,
                      width: (mobileW * 5) / 100,
                      transform: [
                        config.textalign == 'right'
                          ? {scaleX: -1}
                          : {scaleX: 1},
                      ],
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <HomeAdPopup
            ad={this.state.adObj}
            showDialog={this.state.showHomeAd}
            onClose={() => {
              this.setState({showHomeAd: false});
            }}
          />
          <Footer
            mapModel={() => {
              this.setState({modalVisible: true});
              this.locationGet();
            }}
            navigation={this.props.navigation}
            page={'Home'}
            user_id={1}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: (mobileW * 100) / 100,
    height: (mobileH * 60) / 100,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
});
