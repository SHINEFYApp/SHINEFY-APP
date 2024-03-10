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

export default class Saved_Location extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      location_arr: 'NA',
      location_id: '',
      user_id: '',
      delete_location_id: '',
      modalVisible: false,
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
      //         this.getSavedLocation();
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
      this.getSavedLocation();
    }, 500);
  }

  getSavedLocation = async () => {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    this.setState({user_id: user_id});
    var url = config.baseURL + 'get_user_saved_location/' + user_id;
    var saved_location_arr = await localStorage.getItemObject(
      'saved_location_arr',
    );
    if (saved_location_arr == null) {
      apifuntion
        .getApi(url)
        .then(obj => {
          if (obj.success == 'true') {
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject(
              'saved_location_arr',
              obj.saved_location_arr,
            );
            this.setState({location_arr: obj.saved_location_arr});
          } else {
            if (obj.account_active_status == 'deactivate') {
              config.checkUserDeactivate(this.props.navigation);
              return false;
            }
            if (obj.acount_delete_status == 'deactivate') {
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
          consolepro.consolelog('err', err);
        });
    } else {
      this.setState({location_arr: saved_location_arr});
      apifuntion
        .getApi(url, 1)
        .then(obj => {
          if (obj.success == 'true') {
            consolepro.consolelog('else_obj', obj);
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject(
              'saved_location_arr',
              obj.saved_location_arr,
            );
          } else {
            if (obj.account_active_status == 'deactivate') {
              config.checkUserDeactivate(this.props.navigation);
              return false;
            }
            if (obj.acount_delete_status == 'deactivate') {
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
          consolepro.consolelog('err', err);
        });
    }
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  deleteLocation = async () => {
    let location_id = this.state.delete_location_id;
    let user_id = this.state.user_id;
    var url = config.baseURL + 'delete_location/' + user_id + '/' + location_id;
    consolepro.consolelog('url', url);
    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          setTimeout(() => {
            global.props.hideLoader();
          }, 500);
          this.setState({location_arr: obj.saved_location_arr});
          consolepro.consolelog('delete successfully');
          localStorage.setItemObject(
            'saved_location_arr',
            obj.saved_location_arr,
          );
        } else {
          if (obj.account_active_status == 'deactivate') {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          }

          if (obj.acount_delete_status == 'deactivate') {
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
        consolepro.consolelog('err', err);
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
                        this.deleteLocation();
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
                  width: '10%',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  source={localimag.goback}
                  style={{
                    width: (mobileW * 5.2) / 100,
                    height: (mobileW * 5.2) / 100,
                    transform: [
                      config.textalign == 'right' ? {scaleX: -1} : {scaleX: 1},
                    ],
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '87%',
                  alignItems: 'center',
                  paddingRight: (mobileW * 10) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontsemibold,
                    fontSize: (mobileW * 5.3) / 100,
                    color: Colors.whiteColor,
                  }}>
                  {Lang_chg.savedlocation_txt[config.language]}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View
            style={{
              width: (mobileW * 100) / 100,
              backgroundColor: '#FCDCB7',
              marginTop: (mobileW * 1) / 100,
            }}>
            <Text
              style={{
                fontFamily: Font.fontsemibold,
                fontSize: (mobileW * 3.5) / 100,
                color: Colors.appColor,
                paddingVertical: (mobileW * 2.5) / 100,
                paddingLeft: (mobileW * 5) / 100,
                textAlign: config.textRotate,
              }}>
              {Lang_chg.savedlocation_txt[config.language]}
            </Text>
          </View>

          <View>
            {this.state.location_arr != 'NA' ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.location_arr}
                renderItem={({index, item}) => {
                  return (
                    <View
                      style={{
                        width: (mobileW * 90) / 100,
                        marginTop: (mobileW * 5.5) / 100,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderBottomColor: Colors.bottom_border,
                        borderBottomWidth: (mobileW * 0.2) / 100,
                        flexDirection: 'row',
                        paddingBottom: (mobileW * 1.8) / 100,
                      }}>
                      <View
                        style={{
                          width: '9%',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={localimag.favou1}
                          style={{
                            height: (mobileW * 5) / 100,
                            width: (mobileW * 5) / 100,
                          }}
                        />
                      </View>
                      <View style={{width: '76%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.6) / 100,
                            fontFamily: Font.fontmedium,
                            textAlign: config.textRotate,
                          }}>
                          {item.user_address_name}
                        </Text>
                      </View>
                      <View style={{width: '15%', flexDirection: 'row'}}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.setState({
                              modalVisible: true,
                              delete_location_id: item.user_location_id,
                            });
                          }}
                          style={{
                            height: (mobileW * 6) / 100,
                            width: (mobileW * 6) / 100,
                            elevation: 5,
                            backgroundColor: Colors.whiteColor,
                            shadowOffset: {width: 1, height: 1},
                            shadowColor: Colors.shadow_color,
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            borderRadius: (mobileW * 6) / 100,
                          }}>
                          <Image
                            source={localimag.delete1}
                            style={{
                              height: (mobileW * 5.5) / 100,
                              width: (mobileW * 5.5) / 100,
                              left: 1,
                              top: 1,
                            }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.props.navigation.navigate(
                              'Home_save_location',
                              {
                                address: item.user_address_name,
                                google_address: item.location,
                                google_longitude: item.longitude,
                                google_latitude: item.latitude,
                                status: 2,
                                user_location_id: item.user_location_id,
                                latDelta: 'NA',
                                longDelta: 'NA',
                              },
                            );
                          }}
                          style={{
                            height: (mobileW * 6) / 100,
                            width: (mobileW * 6) / 100,
                            elevation: 5,
                            backgroundColor: Colors.whiteColor,
                            shadowOffset: {width: 1, height: 1},
                            shadowColor: Colors.shadow_color,
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            borderRadius: (mobileW * 6) / 100,
                            marginLeft: (mobileW * 2) / 100,
                          }}>
                          <Image
                            source={localimag.message1}
                            style={{
                              height: (mobileW * 5.5) / 100,
                              width: (mobileW * 5.5) / 100,
                              left: 1,
                              top: 1,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <Nodata_foundimage />
            )}
          </View>
        </View>
        <HideWithKeyboard>
          <ImageBackground
            source={localimag.bottom_logo}
            style={{
              height: (mobileW * 65) / 100,
              width: (mobileW * 100) / 100,
              bottom: 0,
            }}
          />
        </HideWithKeyboard>
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
