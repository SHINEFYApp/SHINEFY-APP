/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Image,
  BackHandler,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
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
  Lang_chg,
  msgProvider,
} from './Provider/utilslib/Utils';
import {notification} from './Provider/NotificationProvider';
import {WebView} from 'react-native-webview';
import ContinueButton from './Components/ContinueButton';

export default class Payment_option extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      lang_arr: [
        {status: true, language: Lang_chg.cash_txt[config.language]},
        {status: false, language: Lang_chg.debit_credit_card[config.language]},
      ],
      payment_method: 0,
      wallet_amount: this.props.route.params.wallet_amount,
      redemwallet: this.props.route.params.redemwallet,
      bookingPrice: 0,
      user_id: 0,
      webviewshow: false,
      netpay: this.props.route.params.netpay,
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({lang_arr: this.state.lang_arr});
      this.getUserdata();
    });
    this._willBlurSubscription = this.props.navigation.addListener(
      'blur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
    );
    this.getUserdata();
  }

  languageCheck = index => {
    let data = this.state.lang_arr;
    data = data.filter(function (element) {
      return element !== undefined;
    });
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
    }
    data[index].status = true;
    this.setState({lang_arr: data, payment_method: index});
  };
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  PaymentMethod = async () => {
    if (this.state.payment_method == 0) {
      this.cashBooking();
    } else if (this.state.payment_method == 1 && this.state.netpay == 0) {
      this.cashBooking();
    } else {
      let url =
        config.baseURL +
        `payment/paytab/pay?amount=${this.state.netpay}&user_id=${this.state.user_id}`;
      apifuntion.getApi(url).then(linkResponse => {
        this.setState({
          webviewshow: true,
          paymentUrl: linkResponse.payment_url,
        });
      });
    }
  };

  getUserdata = async () => {
    var discount_arr = await localStorage.getItemObject('discount_arr');
    this.setState({bookingPrice: discount_arr.new_amount});
    var user_arr = await localStorage.getItemObject('user_arr');
    this.setState({user_id: user_arr.user_id});
  };

  _onNavigationStateChange(webViewState) {
    webViewState.canGoBack = false;

    if (webViewState.loading == false) {
      var t = webViewState.url.split('/').pop().split('?')[0];

      if (typeof t != null) {
        var p = webViewState.url.split('?').pop().split('&');

        if (t.includes('payment_success')) {
          var payment_id = 0;

          var payment_date = '';

          var payment_time = '';

          // for (var i = 0; i < p.length; i++) {
          //   var val = p[i].split('=');
          //   if (val[0] == 'payment_id') {
          //     payment_id = val[1];
          //   }
          //   this.setState({transaction_id: payment_id});
          // }
          this.setState({webviewshow: false});
          setTimeout(() => {
            this.cashBooking();
          }, 300);

          // if (payment_id) {
          //   this.setState({webviewshow: false});
          //   setTimeout(() => {
          //     this.cashBooking();
          //   }, 300);
          // } else {
          //   this.handleBackPress();
          // }
        } else if (t.includes('payment_cancel')) {
          msgProvider.toast(Lang_chg.payment_fail[config.language], 'center');

          this.setState({webviewshow: false});

          return false;
        }
      }
    }
  }

  cashBooking = async () => {
    var vehicle_data = await localStorage.getItemObject('booking_vehicle_arr');
    var location_data = await localStorage.getItemObject('location_arr');
    var all_service_data = await localStorage.getItemObject(
      'booking_service_arr',
    );
    let service_data = all_service_data.service_data;
    var extra_service_all_id = [];
    let extra_service_data = all_service_data.extra_service_data;
    for (let i = 0; i < extra_service_data.length; i++) {
      extra_service_all_id[i] = extra_service_data[i].extra_service_id;
    }
    let extra_id = extra_service_all_id.toString();
    var vat_data = await localStorage.getItemObject('vat_data');
    var slot_data = await localStorage.getItemObject('booking_time_slots');
    var discount_arr = await localStorage.getItemObject('discount_arr');
    this.setState({bookingPrice: discount_arr.new_amount});
    var user_arr = await localStorage.getItemObject('user_arr');
    this.setState({user_id: user_arr.user_id});

    var data = new FormData();
    if ((extra_service_data?.length ?? 0) > 0) {
      let qty = extra_service_data[0].extra_serivce_qty ?? 1;
      let totalExtraService =
        Number(extra_service_data[0].extra_serivce_qty ?? 1) *
        Number(extra_service_data[0].extra_service_price ?? '0');
      data.append('extra_services_quantity', qty);
      data.append('extra_services_total_price', totalExtraService);
    }
    data.append('user_id', user_arr.user_id);
    data.append('vehicle_id', vehicle_data.vehicle_id);
    data.append('free_status', slot_data.free_status);
    data.append('service_id', service_data.service_id);
    data.append('service_price', service_data.service_price);
    data.append('extra_service_id', extra_id);
    data.append('extra_service_price', all_service_data.extra_service_amount);
    data.append('sub_total', all_service_data.subTotal);
    data.append('vat_amount', vat_data.amount);
    data.append('vat_per', vat_data.commission_amt);
    data.append('service_boy_id', slot_data.service_boy_id);
    data.append('total_price', this.state.netpay);
    data.append('coupan_id', discount_arr.coupan_id);
    data.append('discount_amount', discount_arr.dis_amount);
    data.append('service_time', all_service_data.totalServiceTime);
    data.append('address_loc', location_data.location);
    data.append('latitude', location_data.latitude);
    data.append('longitude', location_data.longitude);
    data.append('booking_date', slot_data.booking_date);
    data.append('booking_time', slot_data.booking_time);
    data.append('area_id', slot_data.area_id);
    data.append('note', all_service_data.notes);
    data.append('payment_method', this.state.payment_method);
    data.append('wallet_amount', this.state.redemwallet);
    data.append('online_amount', this.state.netpay);
    let url = config.baseURL + 'create_booking';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        if (obj.success == 'true') {
          localStorage.setItemObject('user_arr', obj.user_details);
          localStorage.setItemObject('booking_number', obj.booking_number);
          localStorage.removeItem('booking_vehicle_arr');
          localStorage.removeItem('user_vehicle_arr');
          localStorage.removeItem('location_arr');
          localStorage.removeItem('booking_service_arr');
          localStorage.removeItem('vat_data');
          localStorage.removeItem('user_all_bookings');
          localStorage.removeItem('all_slots');
          localStorage.removeItem('booking_time_slots');
          localStorage.removeItem('page_status');
          localStorage.removeItem('discount_arr');
          if (obj.notification_arr != 'NA') {
            notification.notification_arr_schedule(obj.notification_arr);
          }
          if (obj.notification_arr1 != 'NA') {
            notification.notification_arr(obj.notification_arr1);
          }

          this.props.navigation.navigate('Success', {success_status: 2});
        } else {
          if (obj.slotNotAvailable == 'yes') {
            setTimeout(() => {
              msgProvider.alert(
                Lang_chg.information[config.language],
                obj.msg[config.language],
                false,
              );
            }, 200);
            this.props.navigation.navigate('Select_Date');
            localStorage.removeItem('booking_time_slots');
            localStorage.removeItem('all_slots');
            return false;
          }
          setTimeout(() => {
            msgProvider.alert(
              Lang_chg.information[config.language],
              obj.msg,
              false,
            );
          }, 200);
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
        this.setState({loading: false});
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
            transparent={false}
            visible={this.state.webviewshow}
            onRequestClose={() => {
              this.setState({webviewshow: false});
            }}>
            <View style={{flex: 1}}>
              <SafeAreaView
                style={{flex: 0, backgroundColor: Colors.statusbarcolor}}
              />
              <StatusBar
                barStyle="dark-content"
                hidden={false}
                translucent={false}
                networkActivityIndicatorVisible={true}
                backgroundColor={Colors.statusbarcolor}
              />
              <View
                style={{
                  width: (mobileW * 100) / 100,
                  backgroundColor: Colors.statusbarcolor,
                  paddingVertical: (mobileH * 3) / 100,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: (mobileW * 90) / 100,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.setState({webviewshow: false});
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: 25,
                        height: 25,
                        transform: [
                          config.textalign == 'right'
                            ? {scaleX: -1}
                            : {scaleX: 1},
                        ],
                      }}
                      source={localimag.goback}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: Font.Nexa_bold,
                      fontSize: (mobileH * 2.5) / 100,
                      color: Colors.white_color,
                    }}>
                    {Lang_chg.payment_txt[config.language]}
                  </Text>

                  <Text />
                </View>
              </View>

              <View style={{flex: 1, backgroundColor: 'white'}}>
                {/* <View
                  style={{
                    marginTop: (mobileH * 1) / 100,
                    width: (mobileW * 95) / 100,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.Nexa_bold,
                      fontSize: (mobileH * 2) / 100,
                      color: '#FF0000',
                    }}>
                    {Lang_chg.dont_press_back[config.language]}
                  </Text>
                </View> */}
                {/* <WebView
                  source={{
                    uri:
                      config.baseURL2 +
                      'payment_url.php?user_id=' +
                      this.state.user_id +
                      '&amount=' +
                      parseFloat(parseFloat(this.state.netpay)).toFixed(2),
                  }}
                  onNavigationStateChange={this._onNavigationStateChange.bind(
                    this,
                  )}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={false}
                  containerStyle={{marginTop: 20, flex: 1}}
                  textZoom={100}
                /> */}

                <WebView
                  source={{
                    uri: this.state.paymentUrl,
                  }}
                  onNavigationStateChange={this._onNavigationStateChange.bind(
                    this,
                  )}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={false}
                  containerStyle={{marginTop: 20, flex: 1}}
                  originWhitelist={['http://*', 'https://*', 'intent://*']}
                  textZoom={100}
                />
              </View>
            </View>
          </Modal>
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
                  width: '13%',
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
                  {Lang_chg.Payment_Option[config.language]}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View
            style={{
              width: (mobileW * 90) / 100,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: (mobileW * 5.5) / 100,
            }}>
            <Text
              style={{
                fontFamily: Font.fontmedium,
                fontSize: (mobileW * 4) / 100,
              }}>
              {Lang_chg.select_payment_method[config.language]}
            </Text>
            <Text
              style={{
                fontFamily: Font.fontmedium,
                fontSize: (mobileW * 3) / 100,
                color: 'grey',
              }}>
              {Lang_chg.select_payment_method_for_bills[config.language]}
            </Text>
          </View>
          <View style={{marginTop: (mobileW * 3) / 100}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.lang_arr}
              renderItem={({index, item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.languageCheck(index);
                    }}
                    style={{
                      width: (mobileW * 88) / 100,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderBottomColor: Colors.bottom_border,
                      borderBottomWidth: (mobileW * 0.5) / 100,
                      flexDirection: 'row',
                      paddingVertical: (mobileW * 5) / 100,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '10%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      {item?.status == true ? (
                        <Image
                          source={localimag.readio_check}
                          style={{
                            height: (mobileW * 4) / 100,
                            width: (mobileW * 4) / 100,
                          }}
                        />
                      ) : (
                        <Image
                          source={localimag.readio_uncheck}
                          style={{
                            height: (mobileW * 4) / 100,
                            width: (mobileW * 4) / 100,
                          }}
                        />
                      )}
                    </View>
                    <View style={{width: '90%', justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: (mobileW * 3.5) / 100,
                          fontFamily: Font.fontmedium,
                        }}>
                        {item?.language}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <ContinueButton
            onPress={() => {
              this.PaymentMethod();
            }}
          />
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
