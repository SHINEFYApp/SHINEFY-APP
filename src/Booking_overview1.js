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
  Alert,
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
import DashedLine from 'react-native-dashed-line';
import StarRating from 'react-native-star-rating';
import {notification} from './Provider/NotificationProvider';

export default class Booking_overview1 extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      coupan_status: false,
      page_status: true,
      vehicle_data: 'NA',
      location_data: 'NA',
      service_data: 'NA',
      service_amount: 'NA',
      extra_service_amount: 'NA',
      total_amount: 'NA',
      extra_service_data: 'NA',
      vat_data: 'NA',
      slot_data: 'NA',
      coupan_id: 'NA',
      coupan_code: '',
      dis_amount: 0,
      new_grand_total_amount: 'NA',
      validStatus: true,
      free_status: 0,
      wallet_amount: 0,
      redemwallet: 0,
      netpay: 0,
      discountApplied: false,
      wallet_apply: false,
      canUseWallet: false,
      isLoadedWallet: false,
      userdata: null,
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      // this.setOverview();
      // this.getWalletamount()
    });
    this.setOverview();
    this.getWalletamount();

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
    localStorage.removeItem('discount_arr');
    return true;
  };

  removeWallet = didFinish => {
    global.props.showLoader();
    this.setState({
      wallet_amount: 0,
      wallet_apply: false,
    });
    this.checkwalletamount(0);
    setTimeout(() => {
      if (didFinish) {
        didFinish();
      } else {
        global.props.hideLoader();
      }
    }, 1000);
  };

  checkwalletamount = async amount => {
    if (amount == null) {
      amount = this.state.wallet_amount;
    }
    if (amount <= 0) {
      this.state.wallet_amount = 0;
    }
    if (amount > this.state.new_grand_total_amount) {
      this.state.wallet_amount = this.state.new_grand_total_amount;
    }
    var mytotal = parseFloat(this.state.new_grand_total_amount);
    consolepro.consolelog('mytotal', mytotal);
    consolepro.consolelog('mywalllet', amount);

    if (mytotal <= amount) {
      this.setState({netpay: 0, redemwallet: mytotal});
      consolepro.consolelog('netpay123', this.state.netpay);
      consolepro.consolelog('redemwallet', this.state.redemwallet);
    } else {
      // total_pay=total-wallet ;
      this.setState({
        netpay: parseFloat(mytotal) - parseFloat(amount),
        redemwallet: amount,
        new_grand_total_amount: mytotal,
      });

      setTimeout(() => {
        consolepro.consolelog(
          'new_grand_total_amount1344',
          this.state.new_grand_total_amount,
        );
      }, 3000);
    }
  };

  getWalletamount = async () => {
    let userdata = await localStorage.getItemObject('user_arr');
    this.setState({userdata: userdata});
    console.log('user_id', userdata.user_id);
    let url = config.baseURL + 'get_user_wallet/' + userdata.user_id;
    console.log('urlllllllll', url);
    apifuntion
      .getApi(url, 1)
      .then(obj => {
        consolepro.consolelog('oqqqqqqqqqqqbj', obj);
        if (obj.success == 'true') {
          if (obj.canUseWallet === true) {
            this.setState({
              my_total_wallet: obj.userwallet,
              canUseWallet: true,
            });
          }
          this.setState({isLoadedWallet: true});
          this.checkwalletamount();
        } else {
          if (
            obj.active_status == 0 ||
            obj.msg == msgTitle.usernotexit[config.language]
          ) {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false,
            );
            config.checkUserDeactivate(this.props.navigation);
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
      .catch(error => {
        consolepro.consolelog('-------- error ------- ' + error);
        this.setState({loading: false});
      });
  };

  setOverview = async () => {
    var vehicle_data = await localStorage.getItemObject('booking_vehicle_arr');
    var location_data = await localStorage.getItemObject('location_arr');
    var all_service_data = await localStorage.getItemObject(
      'booking_service_arr',
    );
    var discount_arr = await localStorage.getItemObject('discount_arr');
    let service_data = all_service_data.service_data;
    let extra_service_data = all_service_data.extra_service_data;
    let total_amount = all_service_data.subTotal;
    let service_amount = all_service_data.service_amount;
    let extra_service_amount = all_service_data.extra_service_amount;
    var vat_data = await localStorage.getItemObject('vat_data');
    var slot_data = await localStorage.getItemObject('booking_time_slots');
    var new_grand_total_amount = vat_data.grand_total_amount;
    consolepro.consolelog('vehicle_data', vehicle_data);
    consolepro.consolelog('location_data', location_data);
    consolepro.consolelog('all_service_data', all_service_data);
    consolepro.consolelog('vat_data', vat_data);
    consolepro.consolelog('slot_data', slot_data);
    if (discount_arr != null) {
      new_grand_total_amount = discount_arr.new_amount;
    }

    this.setState({
      vehicle_data: vehicle_data,
      location_data: location_data,
      service_data: service_data,
      vat_data: vat_data,
      slot_data: slot_data,
      free_status: slot_data.free_status,
      extra_service_data: extra_service_data,
      total_amount: total_amount,
      service_amount: service_amount,
      extra_service_amount: extra_service_amount,
      new_grand_total_amount: new_grand_total_amount,
    });

    consolepro.consolelog(
      'this.state.slot_data.booking_time',
      this.state.slot_data.booking_time,
    );
    consolepro.consolelog(
      'this.state.slot_data.booking_day',
      this.state.slot_data.booking_day,
    );
  };

  coupanApply = async () => {
    Keyboard.dismiss();
    let user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    console.log(parseFloat(this.state.service_amount));
    console.log(parseFloat(this.state.extra_service_amount));
    console.log(parseFloat(this.state.wallet_amount));
    let amount = parseFloat(this.state.service_amount);
    let coupan_code = this.state.coupan_code;
    let vat_amount = this.state.vat_data.amount;
    //-----------------Coupan code--------------------
    if (coupan_code.length <= 0) {
      msgProvider.toast(Lang_chg.coupanCode[config.language], 'center');
      return false;
    }
    var data = new FormData();
    data.append('user_id', user_id);
    data.append('amount', amount);
    data.append('coupan_code', coupan_code);
    data.append('vat_amount', vat_amount);
    consolepro.consolelog('data', data);
    let url = config.baseURL + 'apply_coupan';
    consolepro.consolelog('urlurl', url);

    apifuntion
      .postApi(url, data)
      .then(obj => {
        console.log('obj', obj);
        console.log('couponobj', obj);
        if (obj.success == 'true') {
          if (obj.coupan_id == 'NA' && obj.status == false) {
            this.setState({
              validStatus: false,
              dis_amount: parseFloat(parseFloat(obj.dis_amount)),
              new_grand_total_amount: parseFloat(
                parseFloat(obj.total_amount) +
                  parseFloat(this.state.extra_service_amount),
              ),
              coupan_id: obj.coupan_id,
              discountApplied: true,
            });
          } else {
            let walletAmount = this.state.redemwallet;
            this.removeWallet(async () => {
              global.props.showLoader();
              localStorage.setItemObject('user_arr', obj.user_details);
              this.setState(
                {
                  validStatus: true,
                  dis_amount: parseFloat(obj.dis_amount),
                  new_grand_total_amount:
                    parseFloat(obj.total_amount) +
                    parseFloat(this.state.extra_service_amount),
                  netpay:
                    parseFloat(obj.total_amount) +
                    parseFloat(this.state.extra_service_amount) -
                    parseFloat(this.state.wallet_amount),
                  coupan_id: obj.coupan_id,
                  discountApplied: true,
                },
                () => {
                  if (walletAmount > 0) {
                    this.state.wallet_amount = walletAmount;
                    this.checkwalletamount(walletAmount);
                    setTimeout(() => {
                      this.setState({wallet_apply: true});
                      global.props.hideLoader();
                    }, 500);
                  } else {
                    global.props.hideLoader();
                  }
                },
              );
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
      .catch(err => {
        consolepro.consolelog('err', err);
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

  removeDiscount = () => {
    consolepro.consolelog('netpay', this.state.netpay);
    consolepro.consolelog('dis_amount', this.state.dis_amount);
    let dis_amount =
      parseFloat(this.state.netpay) + parseFloat(this.state.dis_amount);
    this.setState({
      netpay: parseFloat(dis_amount.toFixed(2)),
      new_grand_total_amount:
        parseFloat(dis_amount.toFixed(2)) +
        parseFloat(this.state.wallet_amount),
      dis_amount: 0,
      discountApplied: false,
      coupan_code: '',
      coupan_id: 'NA',
      validStatus: true,
    });
  };

  bookingBtn = async () => {
    global.props.showLoader();
    setTimeout(() => {
      global.props.hideLoader();
      let {new_grand_total_amount, coupan_id, dis_amount} = this.state;
      let dis_arr = {
        new_amount: new_grand_total_amount,
        coupan_id: coupan_id,
        dis_amount: dis_amount,
      };
      localStorage.setItemObject('discount_arr', dis_arr);
      if (this.state.free_status == 1) {
        this.cashBooking();
      } else {
        this.props.navigation.navigate('Payment_option', {
          netpay: this.state.netpay,
          wallet_amount: this.state.wallet_amount,
          redemwallet: this.state.redemwallet,
        });
      }
    }, 2000);
  };

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
    consolepro.consolelog('extra_service_data', extra_service_all_id);
    var vat_data = await localStorage.getItemObject('vat_data');
    var slot_data = await localStorage.getItemObject('booking_time_slots');
    var discount_arr = await localStorage.getItemObject('discount_arr');
    this.setState({bookingPrice: discount_arr.new_amount});
    var user_arr = await localStorage.getItemObject('user_arr');
    this.setState({user_id: user_arr.user_id});

    consolepro.consolelog('vehicle_data', vehicle_data);
    consolepro.consolelog('location_data', location_data);
    consolepro.consolelog('all_service_data', all_service_data);
    consolepro.consolelog('vat_data', vat_data);
    consolepro.consolelog('slot_data', slot_data);
    consolepro.consolelog('discount_arr', discount_arr);
    var data = new FormData();
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
    data.append('total_price', this.state.bookingPrice);
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
    console.log('datadatadatadata', data);
    let url = config.baseURL + 'create_booking';
    console.log('url', url);

    this.setState({loading: false});
    consolepro.consolelog('err', err);
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
  };

  editBooking = async () => {
    let getStatus = await localStorage.getItemObject('page_status');
    if (getStatus == 1) {
      this.props.navigation.navigate('Search_Location');
      localStorage.removeItem('booking_service_arr');
      localStorage.removeItem('booking_time_slots');
      localStorage.removeItem('all_slots');
    } else {
      this.props.navigation.navigate('Home', {home_status: 2});
    }
  };

  deleteBooking = async () => {
    localStorage.removeItem('booking_vehicle_arr');
    localStorage.removeItem('location_arr');
    localStorage.removeItem('booking_service_arr');
    localStorage.removeItem('vat_data');
    localStorage.removeItem('all_slots');
    localStorage.removeItem('booking_time_slots');
    localStorage.removeItem('page_status');
    localStorage.removeItem('discount_arr');
    this.props.navigation.navigate('Home', {home_status: 2});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <SafeAreaView style={{backgroundColor: Colors.appColor, flex: 0}} />
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
            style={{flex: 1}}>
            <ImageBackground
              source={localimag.new_header}
              style={{
                width: (mobileW * 100) / 100,
                height: (mobileW * 20) / 100,
              }}>
              {this.state.page_status == false ? (
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
                      paddingRight: (mobileW * 11) / 100,
                    }}>
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 5.5) / 100,
                        color: Colors.whiteColor,
                      }}>
                      {Lang_chg.Booking_overview[config.language]}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{width: (mobileW * 100) / 100}}>
                  <View
                    style={{
                      width: (mobileW * 97) / 100,
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

                    <View style={{width: '72%', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 5.5) / 100,
                          color: Colors.whiteColor,
                          paddingLeft: (mobileW * 2.5) / 100,
                        }}>
                        {Lang_chg.Booking_overview[config.language]}
                      </Text>
                    </View>

                    <View style={{width: '18%', flexDirection: 'row'}}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this.deleteBooking();
                        }}
                        style={{
                          justifyContent: 'center',
                          width: '50%',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={localimag.delete1}
                          style={{
                            height: (mobileW * 5.5) / 100,
                            width: (mobileW * 5.5) / 100,
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this.editBooking();
                        }}
                        style={{
                          justifyContent: 'center',
                          width: '50%',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={localimag.message1}
                          style={{
                            height: (mobileW * 5.5) / 100,
                            width: (mobileW * 5.5) / 100,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </ImageBackground>
            {this.state.vehicle_data != 'NA' && (
              <KeyboardAwareScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{marginBottom: (mobileH * 10) / 100}}>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    borderRadius: (mobileW * 1) / 100,
                    marginTop: (mobileW * 4) / 100,
                    elevation: 5,
                    backgroundColor: Colors.whiteColor,
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: Colors.shadow_color,
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    paddingBottom: (mobileW * 15) / 100,
                  }}>
                  <View
                    style={{
                      width: '95%',
                      alignItems: 'center',
                      backgroundColor: Colors.appColor,
                      borderRadius: (mobileW * 1) / 100,
                      marginTop: (mobileW * 4) / 100,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.5) / 100,
                        paddingVertical: (mobileW * 2.3) / 100,
                      }}>
                      {this.state.slot_data.booking_day[config.language]} ,{' '}
                      {this.state.slot_data.booking_time}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '94%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingTop: (mobileW * 4.3) / 100,
                      alignItems: 'center',
                    }}>
                    <View style={{width: '50%', alignItems: 'flex-start'}}>
                      <Text
                        style={{
                          color: Colors.appColor,
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.6) / 100,
                          textAlign: 'center',
                        }}>
                        {Lang_chg.cardetails_txt[config.language]}
                      </Text>
                    </View>
                    {this.state.vehicle_data != 'NA' && (
                      <View style={{width: '50%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            color: Colors.appColor,
                            fontFamily: Font.fontsemibold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: 'center',
                          }}>
                          {this.state.vehicle_data.model_name[config.language]}
                        </Text>
                      </View>
                    )}
                  </View>
                  {this.state.vehicle_data != 'NA' && (
                    <View
                      style={{
                        width: '92%',
                        paddingTop: (mobileW * 2.2) / 100,
                        flexDirection: 'row',
                        alignSelf: 'center',
                        borderBottomColor: Colors.bottom_border,
                        borderBottomWidth: 0.5,
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
                          {
                            this.state.vehicle_data.vehicle_name[
                              config.language
                            ]
                          }
                        </Text>
                        <Image
                          source={{
                            uri:
                              config.img_url3 +
                              this.state.vehicle_data.vehicle_image,
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
                            {this.state.vehicle_data.plate_number}
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
                        <View style={{paddingVertical: (mobileW * 2) / 100}}>
                          <Text style={styles.text_style}>
                            {Lang_chg.make_txt[config.language]}
                          </Text>
                        </View>
                        <View style={{}}>
                          <Image
                            source={{
                              uri:
                                config.img_url3 +
                                this.state.vehicle_data.make_image,
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
                            paddingVertical: (mobileW * 1.5) / 100,
                            alignSelf: 'flex-end',
                          }}>
                          <Text style={styles.text_style}>
                            {Lang_chg.color1_txt[config.language]}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingVertical: (mobileW * 2.5) / 100,
                            alignSelf: 'center',
                            marginLeft: (mobileW * 6) / 100,
                          }}>
                          <View
                            style={{
                              backgroundColor:
                                this.state.vehicle_data.color_code,
                              borderRadius: (mobileW * 2) / 100,
                              height: (mobileW * 3.5) / 100,
                              width: (mobileW * 3.5) / 100,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.7) / 100,
                        color: Colors.appColor,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.services[config.language]}
                    </Text>
                  </View>
                  {this.state.service_data != 'NA' && (
                    <View
                      style={{
                        width: '93%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingVertical: (mobileW * 2) / 100,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.fontregular,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: config.textRotate,
                          }}>
                          {
                            this.state.service_data.service_name[
                              config.language
                            ]
                          }
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.fontbold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: 'right',
                          }}>
                          {this.state.service_data.service_price}{' '}
                          {Lang_chg.sar_txt[config.language]}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View
                    style={{
                      width: '93%',
                      flexDirection: 'row',
                      paddingVertical: (mobileW * 1) / 100,
                      alignSelf: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 3.8) / 100,
                          color: Colors.appColor,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.extraservice_txt[config.language]}
                      </Text>
                    </View>
                  </View>
                  {this.state.extra_service_data != 'NA' && (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      data={this.state.extra_service_data}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{}}
                      renderItem={({index, item}) => {
                        return (
                          <View
                            style={{
                              width: '93%',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              paddingVertical: (mobileW * 1) / 100,
                            }}>
                            <View style={{width: '60%'}}>
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.fontregular,
                                  fontSize: (mobileW * 3.4) / 100,
                                  textAlign: config.textRotate,
                                }}>
                                {item.extra_service_name[config.language]}
                              </Text>
                            </View>
                            <View style={{width: '40%'}}>
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.fontbold,
                                  fontSize: (mobileW * 3.6) / 100,
                                  textAlign: 'right',
                                }}>
                                {item.extra_service_price}
                                {' X'}
                                {item.extra_serivce_qty ?? 1}{' '}
                                {Lang_chg.sar_txt[config.language]}
                              </Text>
                            </View>
                          </View>
                        );
                      }}
                    />
                  )}

                  <DashedLine
                    axis="horizontal"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 2) / 100,
                    }}
                    Length={7}
                    dashColor={Colors.bottom_border}
                    dashThickness={0.7}
                  />

                  {this.state.total_amount != 'NA' && (
                    <View
                      style={{
                        width: '93%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingVertical: (mobileW * 2) / 100,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.fontsemibold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: config.textRotate,
                          }}>
                          {Lang_chg.subtotal_txt[config.language]}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.fontbold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: 'right',
                          }}>
                          {this.state.total_amount}{' '}
                          {Lang_chg.sar_txt[config.language]}
                        </Text>
                      </View>
                    </View>
                  )}
                  <DashedLine
                    axis="horizontal"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 2) / 100,
                    }}
                    Length={7}
                    dashColor={'#DDDDDD'}
                    dashThickness={0.7}
                  />
                  {this.state.vat_data != 'NA' &&
                    this.state.vat_data.amount != '0.00' && (
                      <View
                        style={{
                          width: '93%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          paddingTop: (mobileW * 2) / 100,
                        }}>
                        <View style={{width: '50%'}}>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.fontsemibold,
                              fontSize: (mobileW * 3.6) / 100,
                              textAlign: config.textRotate,
                            }}>
                            {Lang_chg.vat_txt[config.language]}
                          </Text>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text
                            style={{
                              color: Colors.red,
                              fontFamily: Font.fontbold,
                              fontSize: (mobileW * 3.6) / 100,
                              textAlign: 'right',
                            }}>
                            {this.state.vat_data.amount}{' '}
                            {Lang_chg.sar_txt[config.language]}
                          </Text>
                        </View>
                      </View>
                    )}
                  {this.state.vat_data != 'NA' &&
                    this.state.vat_data.amount != '0.00' && (
                      <View
                        style={{
                          width: '93%',
                          flexDirection: 'row',
                          paddingVertical: (mobileW * 2) / 100,
                          alignSelf: 'center',
                        }}>
                        <View style={{width: '50%', flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontFamily: Font.fontmedium,
                              fontSize: (mobileW * 3) / 100,
                              color: Colors.black_color,
                              textAlign: config.textRotate,
                            }}>
                            {Lang_chg.varid_txt[config.language]} :{' '}
                          </Text>
                          <Text
                            style={{
                              fontFamily: Font.fontmedium,
                              fontSize: (mobileW * 3) / 100,
                              color: Colors.black_color,
                              textAlign: config.textRotate,
                            }}>
                            #{this.state.vat_data.vet_id}
                          </Text>
                        </View>
                      </View>
                    )}

                  <DashedLine
                    axis="horizontal"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      paddingTop: (mobileW * 2) / 100,
                    }}
                    Length={7}
                    dashColor={'#DDDDDD'}
                    dashThickness={0.7}
                  />
                  {this.state.vat_data != 'NA' && (
                    <View
                      style={{
                        width: '95%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: (mobileW * 4) / 100,
                        backgroundColor: Colors.appColor,
                        alignItems: 'center',
                        borderRadius: (mobileW * 1) / 100,
                        marginLeft: (mobileW * 2) / 100,
                      }}>
                      <View
                        style={{
                          width: '50%',
                          paddingVertical: (mobileW * 2) / 100,
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: Font.fontsemibold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: 'center',
                          }}>
                          {Lang_chg.totalservicecharges_txt[config.language]}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '50%',
                          paddingRight: (mobileW * 2) / 100,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: Font.fontbold,
                            fontSize: (mobileW * 3.6) / 100,
                            textAlign: 'right',
                          }}>
                          {this.state.vat_data.grand_total_amount}{' '}
                          {Lang_chg.sar_txt[config.language]}
                        </Text>
                      </View>
                    </View>
                  )}
                  {this.state.page_status == false ? (
                    <View style={{width: '100%'}}>
                      {this.state.free_status == 0 &&
                        this.state.userdata.has_company_email != '1' && (
                          <View
                            style={{
                              width: '93%',
                              flexDirection: 'row',
                              marginTop: (mobileW * 3.5) / 100,
                              alignSelf: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontFamily: Font.fontmedium,
                                fontSize: (mobileW * 3.6) / 100,
                                color: Colors.appColor,
                              }}>
                              {Lang_chg.enter_promo_code[config.language]}
                            </Text>
                            {this.state.coupan_id != 'NA' && (
                              <Text
                                style={{
                                  fontFamily: Font.fontmedium,
                                  fontSize: (mobileW * 3.3) / 100,
                                  color: '#FF3535',
                                  textAlign: config.textRotate,
                                }}>
                                {' '}
                                ({Lang_chg.coupon_txt[config.language]})
                              </Text>
                            )}
                          </View>
                        )}
                      {this.state.free_status == 0 &&
                        this.state.userdata.has_company_email != '1' && (
                          <View
                            style={{
                              width: '94%',
                              flexDirection: 'row',
                              marginTop: (mobileW * 3.2) / 100,
                              alignSelf: 'center',
                              borderColor: Colors.appColor,
                              borderWidth: (mobileW * 0.5) / 100,
                              marginLeft: (mobileW * 1) / 100,
                            }}>
                            <TextInput
                              style={{
                                fontFamily: Font.fontmedium,
                                fontSize: (mobileW * 3.5) / 100,
                                textAlign: config.textalign,
                                paddingLeft: (mobileW * 2) / 100,
                                width: '75%',
                                color: Colors.black_color,
                                height: (mobileW * 10.5) / 100,
                              }}
                              placeholder={
                                Lang_chg.enter_promo_code[config.language]
                              }
                              placeholderTextColor={Colors.appColor}
                              value={this.state.coupan_code}
                              keyboardType="default"
                              maxLength={50}
                              returnKeyLabel="done"
                              returnKeyType="done"
                              onSubmitEditing={() => {
                                Keyboard.dismiss();
                              }}
                              autoCompleteType="off"
                              onChangeText={txt => {
                                this.setState({coupan_code: txt});
                              }}
                            />
                            <View
                              style={{
                                borderLeftColor: Colors.bottom_border,
                                borderLeftWidth: (mobileW * 0.5) / 100,
                                height: (mobileW * 8) / 100,
                                marginTop: (mobileW * 1) / 100,
                              }}
                            />
                            {this.state.discountApplied == false && (
                              <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                  this.coupanApply();
                                }}
                                style={{
                                  width: '25%',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontbold,
                                    fontSize: (mobileW * 4) / 100,
                                    color: Colors.appColor,
                                  }}>
                                  {Lang_chg.Apply[config.language]}
                                </Text>
                              </TouchableOpacity>
                            )}
                            {this.state.discountApplied == true && (
                              <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                  this.removeDiscount();
                                }}
                                style={{
                                  width: '25%',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontbold,
                                    fontSize: (mobileW * 4) / 100,
                                    color: Colors.appColor,
                                  }}>
                                  {Lang_chg.Remove[config.language]}
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        )}
                      {this.state.validStatus == false && (
                        <View style={{width: '93%', alignSelf: 'center'}}>
                          <Text
                            style={{
                              fontFamily: Font.fontregular,
                              fontSize: (mobileW * 3) / 100,
                              color: 'red',
                            }}>
                            {Lang_chg.invalidCoupanCode[config.language]}
                          </Text>
                        </View>
                      )}
                      {this.state.vat_data != 'NA' && (
                        <View
                          style={{
                            width: '93%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingTop: (mobileW * 4) / 100,
                          }}>
                          <View style={{width: '50%'}}>
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.fontsemibold,
                                fontSize: (mobileW * 3.6) / 100,
                                textAlign: config.textRotate,
                              }}>
                              {
                                Lang_chg.totalservicecharges_txt[
                                  config.language
                                ]
                              }
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.fontbold,
                                fontSize: (mobileW * 3.6) / 100,
                                textAlign: 'right',
                              }}>
                              {this.state.vat_data.grand_total_amount}{' '}
                              {Lang_chg.sar_txt[config.language]}
                            </Text>
                          </View>
                        </View>
                      )}
                      {this.state.coupan_id != 'NA' && (
                        <View
                          style={{
                            width: '93%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingTop: (mobileW * 3) / 100,
                          }}>
                          <View style={{width: '50%'}}>
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.fontsemibold,
                                fontSize: (mobileW * 3.6) / 100,
                              }}>
                              {Lang_chg.coupon_txt[config.language]}
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.fontbold,
                                fontSize: (mobileW * 3.6) / 100,
                                textAlign: 'right',
                              }}>
                              -{this.state.dis_amount}{' '}
                              {Lang_chg.sar_txt[config.language]}
                            </Text>
                          </View>
                        </View>
                      )}
                      {!this.state.isLoadedWallet && (
                        <Text
                          style={{
                            marginTop: 15,
                            marginStart: 15,
                            fontFamily: Font.fontbold,
                            fontSize: 16,
                            color: Colors.black,
                          }}>
                          {Lang_chg.is_loading[config.language]}{' '}
                          {Lang_chg.wallet[config.language]}
                        </Text>
                      )}
                      {!this.state.wallet_apply &&
                        this.state.my_total_wallet && (
                          <View style={{flex: 1}}>
                            <Text
                              style={{
                                marginTop: 15,
                                marginStart: 15,
                                fontFamily: Font.fontbold,
                                fontSize: 16,
                                color: Colors.black,
                              }}>
                              {Lang_chg.wallet[config.language]} ({' '}
                              {this.state.my_total_wallet ??
                                Lang_chg.is_loading[config.language]}{' '}
                              {Lang_chg.sar_txt[config.language]})
                            </Text>
                            <View
                              style={{
                                width: '94%',
                                flexDirection: 'row',
                                marginTop: (mobileW * 3.2) / 100,
                                alignSelf: 'center',
                                borderColor: Colors.appColor,
                                borderWidth: (mobileW * 0.5) / 100,
                                marginLeft: (mobileW * 1) / 100,
                              }}>
                              <TextInput
                                style={{
                                  fontFamily: Font.fontmedium,
                                  fontSize: (mobileW * 3.5) / 100,
                                  textAlign: config.textalign,
                                  paddingLeft: (mobileW * 2) / 100,
                                  width: '75%',
                                  color: Colors.black_color,
                                  height: (mobileW * 10.5) / 100,
                                }}
                                placeholder={
                                  Lang_chg.use_wallet_title[config.language]
                                }
                                placeholderTextColor={Colors.appColor}
                                value={this.state.wallet_amount}
                                keyboardType="number-pad"
                                maxLength={50}
                                returnKeyLabel="done"
                                returnKeyType="done"
                                onSubmitEditing={() => {
                                  Keyboard.dismiss();
                                  global.props.showLoader();
                                  this.checkwalletamount();
                                  setTimeout(() => {
                                    this.setState({wallet_apply: true});
                                  }, 500);
                                  setTimeout(() => {
                                    global.props.hideLoader();
                                  }, 1000);
                                }}
                                autoCompleteType="off"
                                onChangeText={txt => {
                                  this.setState({wallet_amount: txt});
                                }}
                              />
                              <View
                                style={{
                                  borderLeftColor: Colors.bottom_border,
                                  borderLeftWidth: (mobileW * 0.5) / 100,
                                  height: (mobileW * 8) / 100,
                                  marginTop: (mobileW * 1) / 100,
                                }}
                              />
                              <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                  global.props.showLoader();
                                  this.checkwalletamount();
                                  setTimeout(() => {
                                    this.setState({wallet_apply: true});
                                  }, 500);
                                  setTimeout(() => {
                                    global.props.hideLoader();
                                  }, 1000);
                                }}
                                style={{
                                  width: '25%',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontbold,
                                    fontSize: (mobileW * 4) / 100,
                                    color: Colors.appColor,
                                  }}>
                                  {Lang_chg.Apply[config.language]}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      {this.state.wallet_apply && (
                        <View
                          style={{
                            width: '93%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingTop: (mobileW * 3) / 100,
                          }}>
                          <View style={{width: '50%'}}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontFamily: Font.fontsemibold,
                                fontSize: (mobileW * 3.6) / 100,
                              }}>
                              {Lang_chg.wallet[config.language]}
                              {/* {parseFloat(this.state.wallet_amount.toFixed(2))} */}
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <View
                              style={{
                                justifyContent: 'flex-end',
                                flexDirection: 'row',
                              }}>
                              <TouchableOpacity
                                style={{marginEnd: 5}}
                                onPress={() => {
                                  this.removeWallet();
                                }}>
                                <Text
                                  style={{
                                    color: Colors.appColor,
                                    fontFamily: Font.fontbold,
                                    fontSize: (mobileW * 3.6) / 100,
                                    textAlign: 'right',
                                  }}>
                                  {/* {-parseFloat(this.state.redemwallet.toFixed(2))} */}
                                  {Lang_chg.Remove[config.language]}
                                </Text>
                              </TouchableOpacity>

                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.fontbold,
                                  fontSize: (mobileW * 3.6) / 100,
                                  textAlign: 'right',
                                }}>
                                {/* {-parseFloat(this.state.redemwallet.toFixed(2))} */}
                                - {this.state.redemwallet}{' '}
                                {Lang_chg.sar_txt[config.language]}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}

                      <DashedLine
                        axis="horizontal"
                        style={{
                          width: '95%',
                          alignSelf: 'center',
                          paddingTop: (mobileW * 4) / 100,
                        }}
                        Length={7}
                        dashColor={'#DDDDDD'}
                        dashThickness={0.7}
                      />

                      <View
                        style={{
                          width: '93%',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          flexDirection: 'row',
                          marginTop: (mobileW * 4.5) / 100,
                        }}>
                        {this.state.isLoadedWallet && (
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '55%'}}>
                              <TouchableOpacity
                                onPress={() => this.bookingBtn()}
                                activeOpacity={0.7}
                                style={{
                                  width: '95%',
                                  backgroundColor: Colors.appColor,
                                  paddingVertical: (mobileW * 2.2) / 100,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                  borderRadius: (mobileW * 10) / 100,
                                }}>
                                <Text
                                  style={{
                                    color: Colors.whiteColor,
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 4) / 100,
                                    textAlign: 'center',
                                  }}>
                                  {Lang_chg.Book[config.language]}
                                </Text>
                              </TouchableOpacity>
                            </View>

                            <View
                              style={{
                                width: '45%',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  fontFamily: Font.fontsemibold,
                                  fontSize: (mobileW * 2.5) / 100,
                                  textAlign: 'center',
                                  color: Colors.black_color,
                                }}>
                                {Lang_chg.grand_txt[config.language]}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: Font.fontbold,
                                  fontSize: (mobileW * 5) / 100,
                                  textAlign: 'center',
                                  color: Colors.black_color,
                                }}>
                                {this.state.vat_data != 'NA'
                                  ? parseFloat(this.state.netpay.toFixed(2))
                                  : '0.00'}{' '}
                                {Lang_chg.sar_txt[config.language]}
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: Colors.appColor,
                        width: (mobileW * 80) / 100,
                        borderRadius: 25,
                        marginTop: (mobileH * 3.5) / 100,
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        this.setState({page_status: false});
                      }}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          alignSelf: 'center',
                          fontSize: (mobileW * 4) / 100,
                          fontFamily: Font.fontmedium,
                          paddingVertical: (mobileW * 2) / 100,
                        }}>
                        {Lang_chg.confirm_booking[config.language]}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </KeyboardAwareScrollView>
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
