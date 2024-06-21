import React, {Component} from 'react';
import {
  View,
  Image,
  BackHandler,
  Keyboard,
  Text,
  Modal,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
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
import {Nodata_foundimage} from '../src/Provider/Nodata_foundimage';

export default class Select_Vehicles extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      vehical_arr: 'NA',
      user_id: '',
      vehicle_id: '',
      refresh: false,
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
      //    },500);
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
      this.setVehicleData();
    }, 500);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  _onRefresh = async () => {
    this.setState({refresh: true});
    this.setVehicleData();
  };

  setVehicleData = async () => {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    this.setState({user_id: user_id});
    let vehicle_id = 'NA';
    var url = config.baseURL + 'get_user_vehicle/' + user_id + '/' + vehicle_id;
    var user_vehicle_arr = await localStorage.getItemObject('user_vehicle_arr');
    if (user_vehicle_arr == null) {
      apifuntion
        .getApi(url)
        .then(obj => {
          if (obj.success == 'true') {
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject('user_vehicle_arr', obj.vehicle_arr);
            this.setState({vehical_arr: obj.vehicle_arr, refresh: false});
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
          } else {
            msgProvider.alert(
              Lang_chg.msgTitleServerNotRespond[config.language],
              Lang_chg.serverNotRespond[config.language],
              false,
            );
          }
        });
    } else {
      this.setState({vehical_arr: user_vehicle_arr, refresh: false});
      apifuntion
        .getApi(url, 1)
        .then(obj => {
          if (obj.success == 'true') {
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject('user_vehicle_arr', obj.vehicle_arr);
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
          } else {
            msgProvider.alert(
              Lang_chg.msgTitleServerNotRespond[config.language],
              Lang_chg.serverNotRespond[config.language],
              false,
            );
          }
        });
    }
  };

  selectVehicle = async (item, index) => {
    let data = this.state.vehical_arr;
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
    }
    data[index].status = true;
    this.setState({vehicle_id: data[index].vehicle_id, vehical_arr: data});
    await localStorage.setItemObject('booking_vehicle_arr', item);
    await localStorage.setItemObject('user_vehicle_arr', data);
    localStorage.setItemObject('page_status', 1);
    this.props.navigation.navigate('Select_Service');
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
          <ImageBackground
            source={localimag.bacKground1}
            resizeMode="stretch"
            style={{
              width: (mobileW * 100) / 100,
              height: (mobileH * 97) / 100,
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
                    this.props.navigation.navigate('Search_Location');
                  }}>
                  <Image
                    source={localimag.goback}
                    style={{
                      width: (mobileW * 5.5) / 100,
                      height: (mobileW * 5.5) / 100,
                      transform: [
                        config.textalign == 'right'
                          ? {scaleX: -1}
                          : {scaleX: 1},
                      ],
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: '88%',
                    alignItems: 'center',
                    paddingRight: (mobileW * 10) / 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontsemibold,
                      fontSize: (mobileW * 5.5) / 100,
                      color: Colors.whiteColor,
                    }}>
                    {''}
                    {Lang_chg.SelectVehicles[config.language]}
                  </Text>
                </View>
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
              <View style={{marginTop: (mobileW * 1) / 100}}>
                {this.state.vehical_arr != 'NA' ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.vehical_arr}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{paddingBottom: (mobileW * 8) / 100}}
                    renderItem={({index, item}) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.selectVehicle(item, index);
                          }}
                          style={{
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
                          {item.status == true && (
                            <TouchableOpacity
                              style={{
                                zIndex: 9999,
                                position: 'absolute',
                                top: -5,
                                right: -11,
                                height: (mobileW * 7) / 100,
                                width: (mobileW * 7) / 100,
                                elevation: 5,
                                backgroundColor: Colors.whiteColor,
                                shadowOffset: {width: 1, height: 1},
                                shadowColor: Colors.shadow_color,
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                borderRadius: (mobileW * 5) / 100,
                              }}>
                              <Image
                                source={localimag.right_check}
                                style={{
                                  height: (mobileW * 4) / 100,
                                  width: (mobileW * 4) / 100,
                                  top: 8,
                                  left: 5,
                                }}
                              />
                            </TouchableOpacity>
                          )}
                          <View
                            style={{
                              width: '100%',
                              backgroundColor: Colors.appColor,
                              borderTopLeftRadius: (mobileW * 1) / 100,
                              borderTopRightRadius: (mobileW * 1) / 100,
                              flexDirection: 'row',
                            }}>
                            <View style={{width: '85%', alignSelf: 'center'}}>
                              <View style={{width: '93%', alignSelf: 'center'}}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 3.3) / 100,
                                    color: Colors.whiteColor,
                                    paddingVertical: (mobileW * 1.7) / 100,
                                  }}>
                                  {''}
                                  {item.model_name[config.language]}
                                </Text>
                              </View>
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
                                }}>
                                {''}
                                {item.vehicle_name[config.language]}
                              </Text>
                              <Image
                                source={{
                                  uri: config.img_url3 + item.vehicle_image,
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
                                  {''}
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
                                  {''}
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
                                  {''}
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
                                width: '16%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                              }}>
                              <View
                                style={{
                                  paddingBottom: (mobileW * 4) / 100,
                                  alignSelf: 'center',
                                }}>
                                <Text style={styles.text_style}>
                                  {''}
                                  {Lang_chg.color1_txt[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: item.color_code,
                                  borderRadius: (mobileW * 2) / 100,
                                  height: (mobileW * 3.5) / 100,
                                  width: (mobileW * 3.5) / 100,
                                }}
                              />
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
            </ScrollView>
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
