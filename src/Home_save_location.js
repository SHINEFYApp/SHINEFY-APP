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
  PermissionsAndroid,
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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon2 from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';

export default class Home_save_location extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.route.params.address,
      user_type: 1,
      location_id: this.props.route.params.user_location_id,

      //----------for map------------//
      latitude: this.props.route.params.google_latitude,
      longitude: this.props.route.params.google_longitude,
      physical_address: this.props.route.params.google_address,
      google_address: this.props.route.params.google_address,
      google_latitude: this.props.route.params.google_latitude,
      google_longitude: this.props.route.params.google_longitude,
      status: this.props.route.params.status,
      latDelta: '0.00122',
      longDelta: '0.00421',
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
        google_latitude: this.props.route.params.google_latitude,
        latitude: this.props.route.params.google_latitude,
        google_longitude: this.props.route.params.google_longitude,
        longitude: this.props.route.params.google_longitude,
        physical_address: this.props.route.params.google_address,
        google_address: this.props.route.params.google_address,
        status: this.props.route.params.status,
        address: this.props.route.params.address,
        latDelta:
          this.props.route.params.latDelta == 'NA'
            ? '0.0922'
            : this.props.route.params.latDelta,
        longDelta:
          this.props.route.params.longDelta == 'NA'
            ? '0.0421'
            : this.props.route.params.longDelta,
      });
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
          } catch (err) {}
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
  //----------function for getting current lat long end----------//
  //----------for map end-------------------//
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  saveBTN = async () => {
    Keyboard.dismiss();
    let user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    let {
      address,
      google_address,
      user_type,
      google_latitude,
      google_longitude,
      status,
      location_id,
    } = this.state;
    //---------------------------check for address------------------------
    if (address.length <= 0) {
      msgProvider.toast(Lang_chg.emptyaddress[config.language], 'center');
      return false;
    }
    if (address.length <= 2) {
      msgProvider.toast(Lang_chg.minlenaddress[config.language], 'center');
      return false;
    }
    var data = new FormData();
    data.append('user_type', user_type);
    data.append('status', status);
    data.append('user_id', user_id);
    data.append('user_location_id', location_id);
    data.append('name', address);
    data.append('latitude', google_latitude);
    data.append('longitude', google_longitude);
    data.append('location', google_address);
    let url = config.baseURL + 'save_user_location';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        if (obj.success == 'true') {
          localStorage.removeItem('saved_location_arr');
          localStorage.setItemObject('user_arr', obj.user_details);
          if (status == 1) {
            msgProvider.toast(
              Lang_chg.LocationaddSuccess[config.language],
              'center',
            );
            setTimeout(() => {
              this.props.navigation.navigate('Home', {home_status: 1});
              global.props.hideLoader();
            }, 500);
          } else {
            msgProvider.toast(
              Lang_chg.LocationUpdateSuccess[config.language],
              'center',
            );
            setTimeout(() => {
              this.props.navigation.navigate('Profile');
              global.props.hideLoader();
            }, 500);
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
                  width: '85%',
                  alignItems: 'center',
                  paddingRight: (mobileW * 12) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontsemibold,
                    fontSize: (mobileW * 5.5) / 100,
                    color: Colors.whiteColor,
                  }}>
                  {this.state.status == 1
                    ? Lang_chg.save_location[config.language]
                    : Lang_chg.edit_location[config.language]}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}>
            <ImageBackground
              source={localimag.bacKground1}
              resizeMode="stretch"
              style={{
                width: (mobileW * 100) / 100,
                height: (mobileH * 100) / 100,
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <MapView
                  followsUserLocation={true}
                  style={{
                    height: (mobileW * 86) / 100,
                    width: (mobileW * 100) / 100,
                  }}
                  initialRegion={this.getCoordinates(this)}
                  mapType={'standard'}
                  minZoomLevel={0}
                  maxZoomLevel={100}
                  zoomEnabled={true}
                  provider={PROVIDER_GOOGLE}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  onMapReady={this.onMapReady}
                  ref={this.setMapRef}
                  onRegionChangeComplete={event => {
                    this.getadddressfromlatlong(event);
                  }}
                  mapPadding={
                    Platform.OS == 'ios'
                      ? {top: 0, right: 0, left: 0, bottom: 80}
                      : {top: 0, right: 0, left: 0, bottom: 0}
                  }
                />
                <View
                  style={{
                    left: '50%',
                    marginLeft: -24,
                    marginTop: -48,
                    position: 'absolute',
                    top: '50%',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={localimag.home_map_pin}
                    style={{
                      height: (mobileW * 10.5) / 100,
                      width: (mobileW * 10.5) / 100,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: (mobileW * 93) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileW * 5.5) / 100,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '98.5%',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 3.5) / 100,
                    }}>
                    {Lang_chg.enterAddressName[config.language]}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 3.5) / 100,
                      color: Colors.appColor,
                    }}>
                    {' '}
                    ({Lang_chg.homeOfficeEtc[config.language]})
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.4) / 100,
                  }}>
                  <TextInput
                    style={{
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 3.8) / 100,
                      color: Colors.black_color,
                      height: (mobileW * 11) / 100,
                    }}
                    placeholder={Lang_chg.enterAddress[config.language]}
                    placeholderTextColor={Colors.textColors}
                    value={this.state.address}
                    keyboardType="default"
                    maxLength={50}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    autoCompleteType="off"
                    onChangeText={txt => {
                      this.setState({address: txt});
                    }}
                  />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  backgroundColor: Colors.appColor,
                  width: (mobileW * 80) / 100,
                  borderRadius: 25,
                  marginTop: (mobileW * 12) / 100,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  this.saveBTN();
                }}>
                <Text
                  style={{
                    color: Colors.whiteColor,
                    alignSelf: 'center',
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.fontmedium,
                    paddingVertical: (mobileW * 2.2) / 100,
                  }}>
                  {this.state.status == 1
                    ? Lang_chg.Save[config.language]
                    : Lang_chg.update_txt[config.language]}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </KeyboardAwareScrollView>
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
