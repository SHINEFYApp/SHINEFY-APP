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
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import {Shareratepro} from './Provider/Sharerateapp';
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
import StarRating from 'react-native-star-rating';
import {notification} from './Provider/NotificationProvider';

export default class Rate_Now extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      service_boy_id: this.props.route.params.service_boy_id,
      booking_id: this.props.route.params.booking_id,
      status: this.props.route.params.status,
      service_boy_arr: 'NA',
      avg_rating: '',
      behavior_status: 1,
      work_status: 1,
      nature_status: 1,
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setServiceBoyData(
        this.props.route.params.service_boy_id,
        this.props.route.params.booking_id,
      );
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
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  setServiceBoyData = async (service_boy_id, booking_id) => {
    var url = config.baseURL + 'getServiceBoy/' + service_boy_id;
    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          setTimeout(() => {
            this.setState({
              service_boy_arr: obj.service_boy_arr,
              avg_rating: obj.avg_rating,
            });
          }, 300);
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

  SubmitBTN = async () => {
    let {
      service_boy_id,
      booking_id,
      behavior_status,
      work_status,
      nature_status,
      rating,
      status,
    } = this.state;
    if (rating <= 0) {
      msgProvider.toast(Lang_chg.emptyRating[config.language], 'center');
      return false;
    }
    let user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    var data = new FormData();
    data.append('user_id', user_id);
    data.append('service_boy_id', service_boy_id);
    data.append('booking_id', booking_id);
    data.append('behavior_status', behavior_status);
    data.append('work_status', work_status);
    data.append('nature_status', nature_status);
    data.append('rating', rating);
    let url = config.baseURL + 'user_rating';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        if (obj.success == 'true') {
          if (obj.notification_arr != 'NA') {
            notification.notification_arr_schedule(obj.notification_arr);
          }
          if (status == 1) {
            setTimeout(() => {
              this.props.navigation.navigate('Bookings_Details', {
                my_booking_check: 1,
                booking_id: obj.booking_id,
              });
            });
          } else {
            setTimeout(() => {
              this.props.navigation.goBack();
            }, 300);
          }
        } else {
          msgProvider.alert(
            Lang_chg.information[config.language],
            obj.msg[config.language],
            false,
          );
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
        {this.state.service_boy_arr != 'NA' && (
          <View style={Styles.container}>
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
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: (mobileW * 20) / 100}}>
                <ImageBackground
                  style={{
                    width: (mobileW * 100) / 100,
                    height: (mobileW * 60) / 100,
                    alignItems: 'center',
                  }}
                  source={localimag.profile1}>
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
                      {this.state.status == 1 && (
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
                      )}
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '85%',
                        alignItems: 'center',
                        paddingRight: (mobileW * 15) / 100,
                      }}>
                      <Text
                        style={{
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 5.5) / 100,
                          color: Colors.whiteColor,
                        }}>
                        {Lang_chg.ratenow_txt[config.language]}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: (mobileW * -15) / 100,
                  }}>
                  <Image
                    source={
                      this.state.service_boy_arr.image == 'NA'
                        ? localimag.placeholder_img
                        : {
                            uri:
                              config.img_url3 +
                              this.state.service_boy_arr.image,
                          }
                    }
                    style={{
                      width: (mobileW * 25) / 100,
                      height: (mobileW * 25) / 100,
                      borderRadius: (mobileW * 20) / 100,
                    }}
                  />
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: (mobileW * 2) / 100,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 4) / 100,
                    }}>
                    {this.state.service_boy_arr.name}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <StarRating
                      containerStyle={{width: (mobileW * 18) / 100}}
                      fullStar={localimag.star_rating}
                      emptyStar={localimag.unactiverating_icon}
                      halfStarColor={'#FFC815'}
                      disabled={true}
                      maxStars={5}
                      starSize={(mobileW * 3.3) / 100}
                      rating={this.state.avg_rating}
                    />
                    <Text
                      style={{
                        paddingLeft: (mobileW * 1) / 100,
                        fontSize: (mobileW * 2.5) / 100,
                        fontFamily: Font.fontmedium,
                      }}>
                      ({this.state.avg_rating})
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    paddingTop: (mobileW * 13) / 100,
                  }}>
                  <StarRating
                    containerStyle={{width: (mobileW * 65) / 100}}
                    fullStar={localimag.star_rating}
                    emptyStar={localimag.unactiverating_icon}
                    halfStarColor={'#FFC815'}
                    disabled={false}
                    maxStars={5}
                    starSize={(mobileW * 10) / 100}
                    rating={this.state.rating}
                    selectedStar={rating => {
                      this.setState({rating: rating});
                    }}
                  />
                </View>

                <View
                  style={{
                    width: (mobileW * 93) / 100,
                    alignSelf: 'center',
                    paddingTop: (mobileW * 9) / 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontsemibold,
                      fontSize: (mobileW * 3.3) / 100,
                      textAlign: config.textRotate,
                    }}>
                    {' '}
                    1. {Lang_chg.your_satisfied_with_work[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 91) / 100,
                    alignSelf: 'center',
                    paddingTop: (mobileW * 3) / 100,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({behavior_status: 1});
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {this.state.behavior_status == 1 ? (
                      <Image
                        source={localimag.yesIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    ) : (
                      <Image
                        source={localimag.noIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.3) / 100,
                        paddingLeft: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.yes_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({behavior_status: 0});
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {this.state.behavior_status == 0 ? (
                      <Image
                        source={localimag.yesIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    ) : (
                      <Image
                        source={localimag.noIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.3) / 100,
                        paddingLeft: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.no_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: (mobileW * 93) / 100,
                    alignSelf: 'center',
                    paddingTop: (mobileW * 8) / 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontsemibold,
                      fontSize: (mobileW * 3.3) / 100,
                      textAlign: config.textRotate,
                    }}>
                    2. {Lang_chg.agian_serive_with_worker[config.language]}{' '}
                    {this.state.service_boy_arr.name}{' '}
                    {Lang_chg.agian_serive_with_worker2[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 91) / 100,
                    alignSelf: 'center',
                    paddingTop: (mobileW * 3) / 100,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({work_status: 1});
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {this.state.work_status == 1 ? (
                      <Image
                        source={localimag.yesIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    ) : (
                      <Image
                        source={localimag.noIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.3) / 100,
                        paddingLeft: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.yes_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({work_status: 0});
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {this.state.work_status == 0 ? (
                      <Image
                        source={localimag.yesIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    ) : (
                      <Image
                        source={localimag.noIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.3) / 100,
                        paddingLeft: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.no_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: (mobileW * 93) / 100,
                    alignSelf: 'center',
                    paddingTop: (mobileW * 6) / 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontsemibold,
                      fontSize: (mobileW * 3.3) / 100,
                      textAlign: config.textRotate,
                    }}>
                    3. {Lang_chg.worker_nature_txt[config.language]}{' '}
                    {this.state.service_boy_arr.name}{' '}
                    {Lang_chg.worker_nature_txt2[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 91) / 100,
                    alignSelf: 'center',
                    paddingTop: (mobileW * 3) / 100,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({nature_status: 1});
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {this.state.nature_status == 1 ? (
                      <Image
                        source={localimag.yesIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    ) : (
                      <Image
                        source={localimag.noIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.3) / 100,
                        paddingLeft: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.yes_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({nature_status: 0});
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {this.state.nature_status == 0 ? (
                      <Image
                        source={localimag.yesIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    ) : (
                      <Image
                        source={localimag.noIcon}
                        style={{
                          height: (mobileW * 3) / 100,
                          width: (mobileW * 3) / 100,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.3) / 100,
                        paddingLeft: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.no_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: Colors.appColor,
                    width: (mobileW * 80) / 100,
                    borderRadius: 25,
                    marginTop: (mobileH * 8) / 100,
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    this.SubmitBTN();
                  }}>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      alignSelf: 'center',
                      fontSize: (mobileW * 4) / 100,
                      fontFamily: Font.fontmedium,
                      paddingVertical: (mobileW * 2) / 100,
                    }}>
                    {Lang_chg.submit1_txt[config.language]}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </ImageBackground>
          </View>
        )}
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
