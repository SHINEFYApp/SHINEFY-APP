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
  StyleSheet,
  ScrollView,
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

export default class Search_Location extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      location_arr: 'NA',
      location_id: 'NA',
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

  _onRefresh = async () => {
    this.setState({refresh: true});
    this.getSavedLocation();
  };

  getSavedLocation = async () => {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    var url = config.baseURL + 'get_user_saved_location/' + user_id;
    apifuntion
      .getApi(url, 1)
      .then(obj => {
        if (obj.success == 'true') {
          localStorage.setItemObject('user_arr', obj.user_details);
          var data = obj.saved_location_arr;
          for (var i = 0; i < data.length; i++) {
            data[i].status = false;
          }
          this.setState({location_arr: data, refresh: false});
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
          //   msgProvider.alert(
          //     Lang_chg.msgTitleServerNotRespond[config.language],
          //     Lang_chg.serverNotRespond[config.language],
          //     false,
          //   );
        }
      });
  };

  checkLocation = async (item, index) => {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    global.props.showLoader();
    var url =
      config.baseURL +
      'check_location/' +
      item.latitude +
      '/' +
      item.longitude +
      '/' +
      user_id;

    apifuntion
      .getApi(url, 1)
      .then(obj => {
        global.props.hideLoader();
        if (obj.success == 'true') {
          let data = this.state.location_arr;
          for (let i = 0; i < data.length; i++) {
            data[i].status = false;
          }
          data[index].status = true;
          this.setState({
            location_id: data[index].user_location_id,
            location_arr: data,
          });
          localStorage.setItemObject('location_arr', item);
          localStorage.setItemObject('saved_location_arr', data);
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

  locationCheck = async (item, index) => {
    this.checkLocation(item, index);
  };

  handleBackPress = async () => {
    this.props.navigation.goBack();
    return false;
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
                  width: '10%',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.navigate('Home', {home_status: 1});
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
                  paddingRight: (mobileW * 8) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontsemibold,
                    fontSize: (mobileW * 5.3) / 100,
                    color: Colors.whiteColor,
                  }}>
                  {Lang_chg.titlesearchlocation[config.language]}
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
              }}>
              {Lang_chg.savedlocation_txt[config.language]}
            </Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={this._onRefresh}
                tintColor={Colors.black_color}
              />
            }>
            <ImageBackground
              source={localimag.bacKground1}
              resizeMode="stretch"
              style={{
                width: (mobileW * 100) / 100,
                height: (mobileH * 85) / 100,
              }}>
              {this.state.location_arr != 'NA' ? (
                <View>
                  <View>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{}}
                      data={this.state.location_arr}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({index, item}) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              this.locationCheck(item, index);
                            }}
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
                            <View
                              style={{width: '84%', justifyContent: 'center'}}>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.6) / 100,
                                  fontFamily: Font.fontmedium,
                                }}>
                                {item.user_address_name}
                              </Text>
                            </View>
                            <View style={{}}>
                              {item.status === true && (
                                <Image
                                  source={localimag.right_check}
                                  style={{
                                    height: 10,
                                    width: 10,
                                  }}
                                />
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      backgroundColor: Colors.appColor,
                      width: (mobileW * 85) / 100,
                      borderRadius: 25,
                      marginTop: (mobileW * 13) / 100,
                      alignSelf: 'center',
                    }}
                    onPress={() => {
                      if ((this.state.location_arr?.length ?? 0) > 0) {
                        var flag = false;
                        for (
                          var i = 0;
                          i < this.state.location_arr.length;
                          i++
                        ) {
                          if (this.state.location_arr[i].status == true) {
                            flag = true;
                          }
                        }
                        if (flag == true) {
                          this.props.navigation.navigate(
                            'Select_Vehicles',
                            this.state.location_id,
                          );
                        } else {
                          //No Selection
                          msgProvider.alert(
                            Lang_chg.information[config.language],
                            Lang_chg.emptyOrderLocation[config.language],
                            false,
                          );
                        }
                      } else {
                        //empty data
                        msgProvider.alert(
                          Lang_chg.information[config.language],
                          Lang_chg.emptyOrderLocation[config.language],
                          false,
                        );
                      }
                    }}>
                    <Text
                      style={{
                        color: Colors.whiteColor,
                        alignSelf: 'center',
                        fontSize: (mobileW * 4.3) / 100,
                        fontFamily: Font.fontmedium,
                        paddingVertical: (mobileH * 1.2) / 100,
                      }}>
                      {Lang_chg.continue_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Nodata_foundimage />
              )}
            </ImageBackground>
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
