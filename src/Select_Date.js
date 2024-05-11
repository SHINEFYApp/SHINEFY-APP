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
  Alert,
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
import CalendarPicker from 'react-native-calendar-picker';
import {Nodata_foundimage} from '../src/Provider/Nodata_foundimage';

export default class Select_Date extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      today_arr: 'NA',
      today_slots: 'NA',
      tomarrow_arr: 'NA',
      tomarrow_slots: 'NA',
      date_arr: 'NA',
      booking_date: 'NA',
      booking_time: ' NA',
      // date_slots: 'NA',
      day_choose: 1,
      area_id: 'NA',
      service_boy_id: 'NA',
      // date_check: this.props.route.params.date_check,
      user_id: '',
      date: 'NA',
      selected: '',
      currentDate: '',
      booking_day: 'NA',
      slots_arr: 'NA',
      select_date_btn: 'NA',
      refresh: false,
      free_status: '',
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    localStorage.removeItem('all_slots');
    localStorage.removeItem('booking_time_slots');
    return true;
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      //     setTimeout( () => {
      //         this.setSlots(0);
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
      this.setSlots(0);
    }, 500);
  }

  checkTodayTime = (item, index) => {
    let data = this.state.today_slots;
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
    }
    data[index].status = true;
    this.setState({
      today_slots: data,
      booking_date: this.state.today_arr.date,
      booking_time: data[index].time,
      area_id: this.state.today_arr.area_id,
      service_boy_id: this.state.today_arr.service_boy_id,
      booking_day: this.state.today_arr.curent_date,
    });
  };

  unCheckTodayTime = async () => {
    let data = this.state.today_slots;
    let data_arr = this.state.today_arr;
    if (data != 'NA' || data_arr != 'Close') {
      for (let i = 0; i < data.length; i++) {
        data[i].status = false;
      }
      this.setState({
        today_slots: data,
        booking_day: 'NA',
        booking_time: 'NA',
        booking_date: 'NA',
      });
    }
  };

  unCheckTomarrowTime = async () => {
    let data = this.state.tomarrow_slots;
    let data_arr = this.state.tomarrow_arr;
    if (data != 'NA' || data_arr != 'Close') {
      for (let i = 0; i < data.length; i++) {
        data[i].status = false;
      }
      this.setState({
        tomarrow_slots: data,
        booking_day: 'NA',
        booking_time: 'NA',
        booking_date: 'NA',
      });
    }
  };

  checkTomarrowTime = (item, index) => {
    let data = this.state.tomarrow_slots;
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
    }
    data[index].status = true;
    this.setState({
      tomarrow_slots: data,
      booking_date: this.state.tomarrow_arr.date,
      booking_time: data[index].time,
      area_id: this.state.tomarrow_arr.area_id,
      service_boy_id: this.state.tomarrow_arr.service_boy_id,
      booking_day: this.state.tomarrow_arr.curent_date,
    });
  };

  _onRefresh = async () => {
    this.setState({refresh: true});
    localStorage.removeItem('all_slots');
    localStorage.removeItem('booking_time_slots');
    this.setSlots(1);
  };

  checkDateTime = (item, index) => {
    let data = this.state.date_slots;
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
    }
    data[index].status = true;
    this.setState({
      date_slots: data,
      booking_date: this.state.date_arr.date,
      booking_time: data[index].time,
      area_id: this.state.date_arr.area_id,
      service_boy_id: this.state.date_arr.service_boy_id,
      booking_day: this.state.date_arr.curent_date,
    });
  };

  NoAreaFound = msg => {
    Alert.alert(
      Lang_chg.information[config.language],
      msg[config.language],
      [
        {
          onPress: () => {},
          style: 'Yes',
        },
        {
          text: Lang_chg.ok[config.language],
          onPress: () => {
            this.outNaviagteFun();
          },
        },
      ],
      {
        cancelable: false,
      },
    ); // works best when the goBack is async
    return false;
  };

  outNaviagteFun = async () => {
    let getStatus = await localStorage.getItemObject('page_status');
    if (getStatus == 1) {
      this.props.navigation.navigate('Search_Location');
    } else {
      this.props.navigation.navigate('Home', {home_status: 2});
    }
    localStorage.removeItem('booking_vehicle_arr');
    localStorage.removeItem('location_arr');
    localStorage.removeItem('booking_service_arr');
    localStorage.removeItem('vat_data');
    localStorage.removeItem('booking_time_slots');
    localStorage.removeItem('page_status');
    localStorage.removeItem('all_slots');
  };

  setSlots = async page => {
    var user_arr = await localStorage.getItemObject('user_arr');
    var location_arr = await localStorage.getItemObject('location_arr');
    var booking_service_arr = await localStorage.getItemObject(
      'booking_service_arr',
    );
    var all_slots = await localStorage.getItemObject('all_slots');
    var booking_time_slots = await localStorage.getItemObject(
      'booking_time_slots',
    );
    let latitude = location_arr.latitude;
    let longitude = location_arr.longitude;
    let service_time = booking_service_arr.totalServiceTime;
    let amount = booking_service_arr.subTotal;
    let user_id = user_arr.user_id;
    this.setState({user_id: user_id});
    let date = this.state.date;
    var url =
      config.baseURL +
      'get_slots/' +
      latitude +
      '/' +
      longitude +
      '/' +
      date +
      '/' +
      service_time +
      '/' +
      user_id +
      '/' +
      amount;
      if (all_slots == null) {
      apifuntion
        .getApi(url, page)
        .then(obj => {

          if (obj.success == 'true') {
            localStorage.setItemObject('all_slots', obj.slots_arr);
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject('vat_data', obj.vat_data);
            let data = obj.slots_arr;

            this.setState({
              slots_arr: data,
              booking_date: 'NA',
              booking_day: 'NA',
              booking_time: 'NA',
              refresh: false,
              free_status: obj.free_booking,
            });
            if (data.today_slots != 'Close') {
              this.setState({
                today_arr: data.today_slots,
                today_slots: data.today_slots.slot_arr,
              });
            } else {
              this.setState({today_arr: data.today_slots, today_slots: 'NA'});
            }

            if (data.tomarrow_slots != 'Close') {
              this.setState({
                tomarrow_arr: data.tomarrow_slots,
                tomarrow_slots: data.tomarrow_slots.slot_arr,
              });
            } else {
              this.setState({
                tomarrow_arr: data.tomarrow_slots,
                tomarrow_slots: 'NA',
              });
            }

            if (data.date_slots != 'Close') {
              this.setState({
                date_arr: data.date_slots,
                date_slots: data.date_slots.slot_arr,
              });
            } else {
              this.setState({date_arr: data.date_slots, date_slots: 'NA'});
            }
          } else {
            if (obj.area_status == 'NA') {
              this.NoAreaFound(obj.msg);
              return false;
            }
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
          }
        });
    } else {
      if (booking_time_slots != null) {
        if (
          booking_time_slots.booking_day[config.language] ==
            Lang_chg.today_txt[config.language] &&
          booking_time_slots.booking_time !=
            Lang_chg.waiting_time_slot[config.language]
        ) {
          let data = this.state.today_slots;
          var booking_time = 0;
          for (let i = 0; i < data.length; i++) {
            if (booking_time_slots.booking_time == data[i].time) {
              data[i].status = true;
              booking_time = data[i].time;
            } else {
              data[i].status = false;
            }
          }
          this.setState({today_slots: data});
          if (
            booking_time_slots.booking_day[config.language] ==
            Lang_chg.tomorrow_txt[config.language]
          ) {
            let data = this.state.tomarrow_slots;
            var booking_time = 0;
            for (let i = 0; i < data.length; i++) {
              if (booking_time_slots.booking_time == data[i].time) {
                data[i].status = true;
                booking_time = data[i].time;
              } else {
                data[i].status = false;
              }
            }
            this.setState({tomarrow_slots: data});
          } else if (
            booking_time_slots.booking_day ==
            this.state.date_arr.curent_date[config.language]
          ) {
            let data = this.state.date_slots;
            var booking_time = 0;
            for (let i = 0; i < data.length; i++) {
              if (booking_time_slots.booking_time == data[i].time) {
                data[i].status = true;
                booking_time = data[i].time;
              } else {
                data[i].status = false;
              }
            }
            this.setState({date_slots: data});
          }
          this.setState({refresh: false});
        } else {
          this.setState({slots_arr: all_slots, refresh: false});

          if (all_slots.today_slots != 'Close') {
            this.setState({
              today_arr: all_slots.today_slots,
              today_slots: all_slots.today_slots.slot_arr,
            });
          } else {
            this.setState({
              today_arr: all_slots.today_slots,
              today_slots: 'NA',
            });
          }

          if (all_slots.tomarrow_slots != 'Close') {
            this.setState({
              tomarrow_arr: all_slots.tomarrow_slots,
              tomarrow_slots: all_slots.tomarrow_slots.slot_arr,
            });
          } else {
            this.setState({
              tomarrow_arr: all_slots.tomarrow_slots,
              tomarrow_slots: 'NA',
            });
          }

          if (all_slots.date_slots != 'Close') {
            this.setState({
              date_arr: all_slots.date_slots,
              date_slots: all_slots.date_slots.slot_arr,
            });
          } else {
            this.setState({date_arr: all_slots.date_slots, date_slots: 'NA'});
          }
        }

        apifuntion
          .getApi(url, 1)
          .then(obj => {
            if (obj.success == 'true') {
              localStorage.setItemObject('user_arr', obj.user_details);
              localStorage.setItemObject('vat_data', obj.vat_data);
              this.setState({free_status: obj.free_booking});
            } else {
              if (obj.area_status == 'NA') {
                this.NoAreaFound(obj.msg);
                return false;
              }
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
            }
          });
      }
    }
  };

  dateChange = date => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    var selected_date_arr = date._d;
    var getDate = selected_date_arr.getDate();
    var getMonth = selected_date_arr.getMonth() + 1;
    var getYear = selected_date_arr.getFullYear();
    var start_date_time_2 = getYear + '-' + getMonth + '-' + getDate;
    this.setState({date: start_date_time_2});
    localStorage.removeItem('all_slots');
    localStorage.removeItem('booking_time_slots');
    this.setSlots();
  };

  getmaxdate = () => {
    var getDate = new Date();
    getDate.setTime(getDate.valueOf() + 2 * 24 * 60 * 60 * 1000);
    var today_date = getDate.getDate();
    var getMonth = getDate.getMonth() + 1;
    var getYear = getDate.getFullYear();
    let newDate = getYear + ',' + getMonth + ',' + today_date;

    return newDate;
  };
  navigationFun = async () => {
    let {area_id, service_boy_id, today_slots} = this.state;
    if (today_slots == 'NA' || (today_slots?.length ?? 0) == 0) {
      this.setState({
        booking_day: Lang_chg.today_txt,
        booking_date: this.state.today_arr.date,
        booking_time: Lang_chg.waiting_time_slot[config.language],
        area_id: this.state.today_arr.area_id,
      });
      this.redirectionFun();
    } else if (
      this.state.booking_date == 'NA' &&
      this.state.booking_time == 'NA'
    ) {
      msgProvider.toast(Lang_chg.emptyTimeSlot[config.language], 'center');
      return false;
    } else {
      this.redirectionFun();
    }
  };

  navigationFun1 = async () => {
    let {
      area_id,
      service_boy_id,
      booking_date,
      booking_time,
      today_arr,
      tomarrow_arr,
      date_arr,
      booking_day,
      today_slots,
      tomarrow_slots,
      date_slots,
      day_choose,
    } = this.state;
    if (
      booking_date == 'NA' &&
      booking_time == 'NA' &&
      (date_slots?.length ?? 0) > 0
    ) {
      msgProvider.toast(Lang_chg.emptyTimeSlot[config.language], 'center');
      return false;
    } else {
      if (date_slots == 'NA' || (date_slots?.length ?? 0) == 0) {
        this.setState({
          booking_day: Lang_chg.today_txt,
          booking_date: this.state.date_slots.date,
          booking_time: Lang_chg.waiting_time_slot[config.language],
          area_id: this.state.date_slots.area_id,
        });
      }
      this.redirectionFun();
    }
  };

  navigationFun2 = async () => {
    let {
      area_id,
      service_boy_id,
      booking_date,
      booking_time,
      today_arr,
      tomarrow_arr,
      date_arr,
      booking_day,
      today_slots,
      tomarrow_slots,
      date_slots,
      day_choose,
    } = this.state;
    if (
      booking_date == 'NA' &&
      booking_time == 'NA' &&
      (date_slots?.length ?? 0) > 0
    ) {
      msgProvider.toast(Lang_chg.emptyTimeSlot[config.language], 'center');
      return false;
    } else {
      if (date_slots == 'NA' || (date_slots?.length ?? 0) == 0) {
        this.setState({
          booking_day: Lang_chg.today_txt,
          booking_date: this.state.date_slots.date,
          booking_time: Lang_chg.waiting_time_slot[config.language],
          area_id: this.state.date_slots.area_id,
        });
      }
      this.redirectionFun();
    }
  };
  redirectionFun = async () => {
    setTimeout(() => {
      let {
        area_id,
        service_boy_id,
        booking_date,
        booking_time,
        booking_day,
        free_status,
      } = this.state;

      let booking_slot = {
        area_id: area_id,
        service_boy_id: service_boy_id,
        booking_date: booking_date,
        booking_time: booking_time,
        booking_day: booking_day,
        free_status: free_status,
      };
      localStorage.setItemObject('booking_time_slots', booking_slot);

      this.props.navigation.navigate('Booking_overview1');
    }, 100);
  };

  render() {
    var show_date = this.getmaxdate();
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
                    width: '15%',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.handleBackPress();
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
                    width: '85%',
                    alignItems: 'center',
                    paddingRight: (mobileW * 7) / 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontsemibold,
                      fontSize: (mobileW * 5.5) / 100,
                      color: Colors.whiteColor,
                    }}>
                    {Lang_chg.Selectdatetime_txt[config.language]}
                  </Text>
                </View>
              </View>
            </ImageBackground>
            {this.state.slots_arr != 'NA' ? (
              <KeyboardAwareScrollView
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
                <View
                  style={{
                    paddingHorizontal: (mobileW * 5) / 100,
                    flexDirection: 'row',
                    marginTop: (mobileW * 7) / 100,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      this.setState({
                        day_choose: 1,
                        date_arr: 'NA',
                        date_slots: 'NA',
                        date: 'NA',
                      }),
                        this.unCheckTomarrowTime();
                    }}>
                    {this.state.day_choose == 1 ? (
                      <Text
                        style={{
                          backgroundColor: Colors.appColor,
                          borderRadius: (mobileW * 0.5) / 100,
                          fontSize: (mobileW * 3.7) / 100,
                          fontFamily: Font.fontsemibold,
                          paddingHorizontal: (mobileW * 5) / 100,
                          paddingVertical: (mobileW * 1) / 100,
                          color: Colors.white_color,
                        }}>
                        {Lang_chg.today_txt[config.language]}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          backgroundColor: '#E5E5E5',
                          borderRadius: (mobileW * 0.5) / 100,
                          fontSize: (mobileW * 3.7) / 100,
                          fontFamily: Font.fontsemibold,
                          paddingHorizontal: (mobileW * 5) / 100,
                          paddingVertical: (mobileW * 1) / 100,
                          color: Colors.signup_text_title,
                        }}>
                        {Lang_chg.today_txt[config.language]}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      this.state.date_check == 2 &&
                        this.setState({
                          day_choose: 2,
                          date_arr: 'NA',
                          date_slots: 'NA',
                          date: 'NA',
                        }),
                        this.unCheckTodayTime();
                    }}>
                    {this.state.day_choose == 2 ? (
                      <Text
                        style={{
                          backgroundColor: Colors.appColor,
                          borderRadius: (mobileW * 0.5) / 100,
                          fontSize: (mobileW * 3.7) / 100,
                          fontFamily: Font.fontmedium,
                          paddingHorizontal: (mobileW * 5) / 100,
                          paddingVertical: (mobileW * 1) / 100,
                          color: Colors.whiteColor,
                        }}>
                        {Lang_chg.tomorrow_txt[config.language]}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          backgroundColor: '#E5E5E5',
                          borderRadius: (mobileW * 0.5) / 100,
                          fontSize: (mobileW * 3.7) / 100,
                          fontFamily: Font.fontmedium,
                          paddingHorizontal: (mobileW * 5) / 100,
                          paddingVertical: (mobileW * 1) / 100,
                          color: Colors.signup_text_title,
                        }}>
                        {Lang_chg.tomorrow_txt[config.language]}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      this.setState({day_choose: 3}),
                        this.unCheckTodayTime(),
                        this.unCheckTomarrowTime();
                    }}
                    style={
                      this.state.day_choose == 3
                        ? styles.activeColor
                        : styles.unactiveColor
                    }>
                    {this.state.day_choose != 3 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: (mobileW * 3.7) / 100,
                            fontFamily: Font.fontmedium,
                            color: Colors.signup_text_title,
                          }}>
                          {Lang_chg.selectdate_txt[config.language]}
                        </Text>
                        <Image
                          style={{
                            marginLeft: (mobileW * 1) / 100,
                            width: (mobileW * 3) / 100,
                            height: (mobileW * 3) / 100,
                            transform: [
                              config.textalign == 'right'
                                ? {scaleX: -1}
                                : {scaleX: 1},
                            ],
                          }}
                          source={localimag.select_black_icon}
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: (mobileW * 3.7) / 100,
                            fontFamily: Font.fontmedium,
                            color: Colors.signup_text_title,
                            color: Colors.whiteColor,
                          }}>
                          {Lang_chg.selectdate_txt[config.language]}
                        </Text>
                        <Image
                          style={{
                            marginLeft: (mobileW * 1) / 100,
                            width: (mobileW * 3) / 100,
                            height: (mobileW * 3) / 100,
                            transform: [
                              config.textalign == 'right'
                                ? {scaleX: -1}
                                : {scaleX: 1},
                            ],
                          }}
                          source={localimag.white_arrow_icon}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                {this.state.day_choose != 3 ? (
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      marginTop: (mobileW * 10) / 100,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={localimag.time1}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.appColor,
                        fontSize: (mobileW * 3.7) / 100,
                        marginLeft: (mobileW * 2) / 100,
                        fontFamily: Font.fontsemibold,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.selecttime1_txt[config.language]}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      marginTop: (mobileW * 10) / 100,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={localimag.celender1}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.appColor,
                        fontSize: (mobileW * 3.7) / 100,
                        marginLeft: (mobileW * 2) / 100,
                        fontFamily: Font.fontsemibold,
                      }}>
                      {Lang_chg.selectdate_txt[config.language]}
                    </Text>
                  </View>
                )}
                {this.state.day_choose == 1 && this.state.today_arr != 'NA' && (
                  <View>
                    {this.state.today_arr != 'Close' ? (
                      <View>
                        {this.state.today_slots != 'NA' ? (
                          <View
                            style={{
                              paddingHorizontal: (mobileW * 1) / 100,
                              marginTop: (mobileW * 4.5) / 100,
                              width: (mobileW * 95) / 100,
                              alignSelf: 'center',
                            }}>
                            <FlatList
                              data={this.state.today_slots}
                              numColumns={4}
                              showsHorizontalScrollIndicator={false}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({index, item}) => {
                                return (
                                  <TouchableOpacity
                                    onPress={() =>
                                      this.checkTodayTime(item, index)
                                    }
                                    style={
                                      item.status == true
                                        ? styles.timeStyle1
                                        : styles.timeStyle
                                    }>
                                    <Text
                                      style={
                                        item.status == true
                                          ? styles.timeStyletxt1
                                          : styles.timeStyletxt
                                      }>
                                      {item.time}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              }}
                            />
                          </View>
                        ) : (
                          <View
                            style={{
                              width: (mobileW * 90) / 100,
                              justifyContent: 'flex-start',
                              alignSelf: 'center',
                              alignItems: 'flex-start',
                              marginTop: (mobileW * 9) / 100,
                            }}>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.4) / 100,
                                fontFamily: Font.fontsemibold,
                                color: Colors.red,
                                textAlign: 'center',
                              }}>
                              {Lang_chg.slotNot_avialable[config.language]}
                            </Text>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View
                        style={{
                          width: (mobileW * 90) / 100,
                          justifyContent: 'flex-start',
                          alignSelf: 'center',
                          alignItems: 'flex-start',
                          marginTop: (mobileW * 9) / 100,
                        }}>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.4) / 100,
                            fontFamily: Font.fontsemibold,
                            color: Colors.red,
                            textAlign: 'center',
                          }}>
                          {Lang_chg.shopClose[config.language]}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                {this.state.day_choose == 2 &&
                  this.state.tomarrow_arr != 'NA' && (
                    <View>
                      {this.state.tomarrow_arr != 'Close' ? (
                        <View>
                          {this.state.tomarrow_slots != 'NA' ? (
                            <View
                              style={{
                                paddingHorizontal: (mobileW * 1) / 100,
                                marginTop: (mobileW * 4.5) / 100,
                                width: (mobileW * 95) / 100,
                                alignSelf: 'center',
                              }}>
                              <FlatList
                                data={this.state.tomarrow_slots}
                                numColumns={4}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({index, item}) => {
                                  return (
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.checkTomarrowTime(item, index)
                                      }
                                      style={
                                        item.status == true
                                          ? styles.timeStyle1
                                          : styles.timeStyle
                                      }>
                                      <Text
                                        style={
                                          item.status == true
                                            ? styles.timeStyletxt1
                                            : styles.timeStyletxt
                                        }>
                                        {item.time}
                                      </Text>
                                    </TouchableOpacity>
                                  );
                                }}
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                width: (mobileW * 90) / 100,
                                justifyContent: 'flex-start',
                                alignSelf: 'center',
                                alignItems: 'flex-start',
                                marginTop: (mobileW * 9) / 100,
                              }}>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.4) / 100,
                                  fontFamily: Font.fontsemibold,
                                  color: Colors.red,
                                  textAlign: 'center',
                                }}>
                                {
                                  Lang_chg.slotNot_avialableTomarrow[
                                    config.language
                                  ]
                                }
                              </Text>
                            </View>
                          )}
                        </View>
                      ) : (
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            justifyContent: 'flex-start',
                            alignSelf: 'center',
                            alignItems: 'flex-start',
                            marginTop: (mobileW * 9) / 100,
                          }}>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.4) / 100,
                              fontFamily: Font.fontsemibold,
                              color: Colors.red,
                              textAlign: 'center',
                            }}>
                            {Lang_chg.shopClose[config.language]}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                {this.state.day_choose == 3 && (
                  <View
                    style={{
                      alignSelf: 'center',
                      marginTop: (mobileW * 5) / 100,
                    }}>
                    <CalendarPicker
                      width={(mobileW * 95) / 100}
                      minDate={new Date()}
                      selectedDayColor={Colors.appColor}
                      selectedDayTextColor={Colors.whiteColor}
                      todayBackgroundColor={'white'}
                      todayTextStyle={{
                        fontFamily: 'Cochin',
                        color: Colors.black_color,
                      }}
                      onDateChange={date => this.dateChange(date)}
                      textStyle={{
                        fontFamily: 'Cochin',
                        color: Colors.black_color,
                      }}
                      weekdays={[
                        'Sun',
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'Sat',
                      ]}
                    />
                    <View>
                      {this.state.date_arr != 'NA' && (
                        <View>
                          {this.state.date_arr != 'Close' ? (
                            <View>
                              {this.state.date_slots != 'NA' ? (
                                <View>
                                  <View
                                    style={{
                                      width: (mobileW * 90) / 100,
                                      alignSelf: 'center',
                                      flexDirection: 'row',
                                      marginTop: (mobileW * 6) / 100,
                                      alignItems: 'center',
                                    }}>
                                    <Image
                                      source={localimag.time1}
                                      style={{
                                        height: (mobileW * 4.5) / 100,
                                        width: (mobileW * 4.5) / 100,
                                      }}
                                    />
                                    <Text
                                      style={{
                                        color: Colors.appColor,
                                        fontSize: (mobileW * 3.7) / 100,
                                        marginLeft: (mobileW * 2) / 100,
                                        fontFamily: Font.fontsemibold,
                                      }}>
                                      {
                                        Lang_chg.selecttime1_txt[
                                          config.language
                                        ]
                                      }
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      paddingHorizontal: (mobileW * 1) / 100,
                                      marginTop: (mobileW * 4.5) / 100,
                                      width: (mobileW * 95) / 100,
                                      alignSelf: 'center',
                                    }}>
                                    <FlatList
                                      data={this.state.date_slots}
                                      numColumns={4}
                                      showsHorizontalScrollIndicator={false}
                                      keyExtractor={(item, index) =>
                                        index.toString()
                                      }
                                      renderItem={({index, item}) => {
                                        return (
                                          <TouchableOpacity
                                            onPress={() =>
                                              this.checkDateTime(item, index)
                                            }
                                            style={
                                              item.status == true
                                                ? styles.timeStyle1
                                                : styles.timeStyle
                                            }>
                                            <Text
                                              style={
                                                item.status == true
                                                  ? styles.timeStyletxt1
                                                  : styles.timeStyletxt
                                              }>
                                              {item.time}
                                            </Text>
                                          </TouchableOpacity>
                                        );
                                      }}
                                    />
                                  </View>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    width: (mobileW * 90) / 100,
                                    justifyContent: 'flex-start',
                                    alignSelf: 'center',
                                    alignItems: 'flex-start',
                                    marginTop: (mobileW * 9) / 100,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: (mobileW * 3.4) / 100,
                                      fontFamily: Font.fontsemibold,
                                      color: Colors.red,
                                      textAlign: 'center',
                                    }}>
                                    {
                                      Lang_chg.slotNot_avialableTomarrow[
                                        config.language
                                      ]
                                    }
                                  </Text>
                                </View>
                              )}
                            </View>
                          ) : (
                            <View
                              style={{
                                width: (mobileW * 90) / 100,
                                justifyContent: 'flex-start',
                                alignSelf: 'center',
                                alignItems: 'flex-start',
                                marginTop: (mobileW * 9) / 100,
                              }}>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.4) / 100,
                                  fontFamily: Font.fontsemibold,
                                  color: Colors.red,
                                  textAlign: 'center',
                                }}>
                                {Lang_chg.shopClose[config.language]}
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                )}
                {this.state.day_choose == 1 &&
                  this.state.today_arr != 'Close' && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: Colors.appColor,
                        width: (mobileW * 80) / 100,
                        borderRadius: 25,
                        marginTop: (mobileH * 6) / 100,
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        this.navigationFun();
                      }}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          alignSelf: 'center',
                          fontSize: (mobileW * 4) / 100,
                          fontFamily: Font.fontmedium,
                          paddingVertical: (mobileW * 2.5) / 100,
                        }}>
                        {Lang_chg.continue_txt[config.language]}
                      </Text>
                    </TouchableOpacity>
                  )}

                {this.state.day_choose == 2 &&
                  (this.state.tomarrow_arr != 'Close' ||
                    this.state.tomarrow_slots != 'NA') &&
                  this.state.tomarrow_arr.service_boy_id != 'NA' && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: Colors.appColor,
                        width: (mobileW * 80) / 100,
                        borderRadius: 25,
                        marginTop: (mobileH * 6) / 100,
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        this.navigationFun1();
                      }}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          alignSelf: 'center',
                          fontSize: (mobileW * 4) / 100,
                          fontFamily: Font.fontmedium,
                          paddingVertical: (mobileW * 2.5) / 100,
                        }}>
                        {Lang_chg.continue_txt[config.language]}
                      </Text>
                    </TouchableOpacity>
                  )}

                {this.state.date_slots != 'NA' &&
                  this.state.date_arr != 'Close' &&
                  this.state.day_choose == 3 && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: Colors.appColor,
                        width: (mobileW * 80) / 100,
                        borderRadius: 25,
                        marginTop: (mobileH * 6) / 100,
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        this.navigationFun2();
                      }}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          alignSelf: 'center',
                          fontSize: (mobileW * 4) / 100,
                          fontFamily: Font.fontmedium,
                          paddingVertical: (mobileW * 2.5) / 100,
                        }}>
                        {Lang_chg.continue_txt[config.language]}
                      </Text>
                    </TouchableOpacity>
                  )}
              </KeyboardAwareScrollView>
            ) : (
              <Nodata_foundimage />
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
  timeStyle: {
    width: '23%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
    marginTop: (mobileW * 3) / 100,
    marginLeft: (mobileW * 1.5) / 100,
    borderRadius: (mobileW * 1.5) / 100,
  },
  timeStyle1: {
    width: '23%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appColor,
    marginTop: (mobileW * 3) / 100,
    marginLeft: (mobileW * 1.5) / 100,
    borderRadius: (mobileW * 1.5) / 100,
  },
  timeStyletxt: {
    paddingVertical: (mobileW * 1.5) / 100,
    color: Colors.black_color,
  },
  timeStyletxt1: {
    paddingVertical: (mobileW * 1.5) / 100,
    color: Colors.whiteColor,
  },
  unactiveColor: {
    backgroundColor: '#E5E5E5',
    borderRadius: (mobileW * 0.5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: (mobileW * 1) / 100,
  },
  activeColor: {
    backgroundColor: Colors.appColor,
    borderRadius: (mobileW * 0.5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: (mobileW * 1) / 100,
  },
});
