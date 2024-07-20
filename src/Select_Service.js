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
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
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
import {Nodata_foundimage} from '../src/Provider/Nodata_foundimage';
import ContinueButton from './Components/ContinueButton';

export default class Select_Service extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      service_arr: 'NA',
      notes: '',
      extra_service_arr: 'NA',
      data_length: '',
      Details: 'NA',
      details_model: false,
      mainServiceID: '',
      service_data: 'NA',
      extra_service_data: [],
      subTotal: 0,
      service_amount: 0,
      extra_service_amount: 0,
      service_time: 0,
      extra_service_time: 0,
      total_service_time: 0,
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
      //         this.getServices();
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
      this.getServices();
    }, 500);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    localStorage.removeItem('booking_service_arr');
    return true;
  };

  getProfile = async callback => {
    var user_arr = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + 'get_profile?user_id=' + user_arr.user_id;
    apifuntion
      .getApi(url)
      .then(obj => {
        this.setState({loadingProfile: false});
        if (obj.success == 'true') {
          let user_arr = obj.user_details;
          localStorage.setItemObject('user_arr', user_arr);
          callback(user_arr);
        } else {
          msgProvider.alert(
            Lang_chg.serverNotRespond[config.language],
            obj.msg ?? Lang_chg.serverNotRespond[config.language],
            false,
          );
        }
      })
      .catch(error => {
        msgProvider.alert(
          Lang_chg.msgTitleNoNetwork[config.language],
          Lang_chg.noNetwork[config.language],
          false,
        );
      });
  };

  getServices = async () => {
    var user_arr = await localStorage.getItemObject('user_arr');
    var booking_service_arr = await localStorage.getItemObject(
      'booking_service_arr',
    );
    let user_id = user_arr.user_id;
    this.setState({user_id: user_id});
    var url = config.baseURL + 'get_service/' + user_id;

    var get_service = await localStorage.getItemObject('all_service_arr');
    if (get_service == null) {
      apifuntion
        .getApi(url)
        .then(obj => {
          if (obj.success == 'true') {
            localStorage.setItemObject('user_arr', obj.user_details);
            let data = obj.all_service_arr;
            localStorage.setItemObject('all_service_arr', data);
            localStorage.setItemObject('service_arr', data.service_arr);
            let arrangeService = data.service_arr.points.sort(
              (a, b) => b.service_price - a.service_price,
            );
            let arrangeExtra = data.service_arr.points.sort(
              (a, b) => b.service_price - a.service_price,
            );
            this.setState({
              service_arr: arrangeService,
              extra_service_arr: arrangeExtra,
              service_data: data.service_arr[0],
              service_amount: data.service_arr[0].service_price,
              subTotal: Number(data.service_arr[0].service_price).toFixed(2),
              service_time: data.service_arr[0].service_time,
              total_service_time: data.service_arr[0].service_time,
            });
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
          } else {
            msgProvider.alert(
              Lang_chg.msgTitleServerNotRespond[config.language],
              Lang_chg.serverNotRespond[config.language],
              false,
            );
          }
        });
    } else {
      if (booking_service_arr == null) {
        this.setState({
          service_arr: get_service.service_arr,
          extra_service_arr: get_service.extra_service_arr,
          service_data: get_service.service_arr[0],
          service_amount: parseFloat(get_service.service_arr[0].service_price),
          subTotal: Number(get_service.service_arr[0].service_price).toFixed(2),
          service_time: get_service.service_arr[0].service_time,
          total_service_time: get_service.service_arr[0].service_time,
        });
      } else {
        let service_data = booking_service_arr.service_data;
        let newExtra = [];
        let extra_service_data = booking_service_arr.extra_service_data;
        let getService = get_service.service_arr;
        let getExtraService = get_service.extra_service_arr;
        for (let i = 0; i < getService.length; i++) {
          if (service_data.service_id == getService[i].service_id) {
            getService[i].status = true;
          } else {
            getService[i].status = false;
          }
        }
        for (let j = 0; j < getExtraService.length; j++) {
          getExtraService[j].status = false;
        }

        for (let x = 0; x < extra_service_data.length; x++) {
          for (let y = 0; y < getExtraService.length; y++) {
            if (
              extra_service_data[x].extra_service_id ==
              getExtraService[y].extra_service_id
            ) {
              getExtraService[y].status = true;
              break;
            }
          }
        }

        this.setState({
          service_arr: getService,
          extra_service_arr: getExtraService,
        });
      }
      apifuntion
        .getApi(url, 1)
        .then(obj => {
          if (obj.success == 'true') {
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject('all_service_arr', obj.all_service_arr);
            localStorage.setItemObject(
              'service_arr',
              obj.all_service_arr.service_arr,
            );
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

  checkMainService = async (item, index) => {
    let data = this.state.service_arr;
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
      // parseFloat
    }
    var new_amount =
      Number(this.state.extra_service_amount) + Number(item.service_price);

    var extra_time = Number(this.state.extra_service_time);
    var new_time = extra_time + Number(item.service_time);
    data[index].status = true;
    this.setState({
      mainServiceID: data[index].service_id,
      service_arr: data,
      service_data: item,
      subTotal: Number(new_amount).toFixed(2),
      service_amount: data[index].service_price,
      total_service_time: new_time,
      service_time: data[index].service_time,
    });
    await localStorage.setItemObject('service_arr', data);
  };

  checkExtraService = async (item, index, notChangeSelect) => {
    var extra_amount = 0;
    var extra_time = 0;
    let data = this.state.extra_service_arr;
    var data2 = [...this.state.extra_service_data];
    if (notChangeSelect) {
    } else {
      data[index].status = !data[index].status;
    }

    if (data[index].status) {
      if (
        data2.filter(x => x.extra_service_id === item.extra_service_id)
          .length === 0
      ) {
        data2.push(item);
      }
      extra_amount =
        Number(
          data[index].extra_service_price *
            (data[index].extra_serivce_qty ?? 1),
        ) + Number(this.state.service_amount);
      var amount = Number(
        data[index].extra_service_price * (data[index].extra_serivce_qty ?? 1),
      );

      extra_time =
        Number(data[index].extra_service_time) +
        Number(this.state.extra_service_time);
      var time =
        Number(this.state.total_service_time) +
        Number(data[index].extra_service_time);
    } else {
      for (let i = 0; i < data2.length; i++) {
        if (data2[i].extra_service_id == item.extra_service_id) {
          data2.splice(i, 1);
          var amount = Number(item.extra_service_price);

          extra_time =
            Number(item.extra_service_time) -
            Number(this.state.extra_service_time);
          var time =
            Number(this.state.total_service_time) -
            Number(item.extra_service_time);
        }
      }
    }
    if (time === undefined || time === null) {
      time = 0;
    }
    extra_amount = data2.reduce(
      (a, b) => a + Number(b.extra_service_price * (b.extra_serivce_qty ?? 1)),
      0,
    );
    console.log('extra_amount', extra_amount);
    let myExtraTime = data2.reduce(
      (a, b) => (a + b.status === true ? Number(item.extra_service_time) : 0),
      0,
    );

    let total_extra = extra_amount * Number(myExtraTime);
    let total_time = Number(this.state.service_time) + total_extra;
    let subTotal = (
      Number(this.state.service_amount) + Number(extra_amount)
    ).toFixed(2);
    //
    this.setState({
      extra_service_arr: data,
      extra_service_data: data2,
      subTotal: subTotal,
      extra_service_amount: extra_amount,
      total_service_time: total_time,
      extra_service_time: total_extra,
    });
  };

  navigationFun = async () => {
    //-----------------notes--------------------
    this.getProfile(userdata => {
      var status = 1;
      if (
        userdata.has_company_email === '1' &&
        userdata.is_email_verified === '1'
      ) {
        status = 1;
      } else {
        if (
          userdata.has_company_email === '1' &&
          userdata.is_email_verified !== '1'
        ) {
          status = 2;
        } else {
          status = 1;
        }
      }
      if (status === 1) {
        let {
          service_data,
          extra_service_data,
          subTotal,
          service_amount,
          extra_service_amount,
          notes,
          total_service_time,
        } = this.state;
        let all_service_arr = {
          service_data: service_data,
          extra_service_data: extra_service_data,
          subTotal: subTotal,
          service_amount: service_amount,
          extra_service_amount: extra_service_amount,
          notes: notes,
          totalServiceTime: total_service_time,
        };
        localStorage.setItemObject('booking_service_arr', all_service_arr);
        this.props.navigation.navigate('Select_Date', {date_check: 2});
      } else {
        msgProvider.alert(
          Lang_chg.information[config.language],
          Lang_chg.verifyCompanyEmailMsg[config.language],
          false,
        );
      }
    });
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
            backgroundColor={Colors.statusbar_color}
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
          {/*Category Modal Open */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.details_model}
            onRequestClose={() => {
              this.setState({details_model: false});
            }}>
            <SafeAreaView
              style={{backgroundColor: Colors.theme_color, flex: 0}}
            />
            <View style={styles.container}>
              <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.statusbar_color}
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
                        this.setState({details_model: false});
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
                        paddingRight: (mobileW * 13) / 100,
                      }}>
                      <Text
                        style={{
                          fontFamily: Font.fontsemibold,
                          fontSize: (mobileW * 5.5) / 100,
                          color: Colors.whiteColor,
                        }}>
                        {Lang_chg.Details[config.language]}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

                <ScrollView
                  contentContainerStyle={{}}
                  showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      alignSelf: 'center',
                      marginTop: (mobileH * 1.2) / 100,
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.2) / 100,
                        color: Colors.black_color,
                        fontFamily: Font.fontmedium,
                        textAlign: 'justify',
                      }}>
                      {this.state.Details}
                    </Text>
                  </View>
                </ScrollView>
              </ImageBackground>
            </View>
          </Modal>
          {/*Category Modal Colse */}
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
                    paddingRight: (mobileW * 13) / 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.fontsemibold,
                      fontSize: (mobileW * 5.5) / 100,
                      color: Colors.whiteColor,
                    }}>
                    {Lang_chg.Select_service[config.language]}
                  </Text>
                </View>
              </View>
            </ImageBackground>

            {this.state.service_arr != 'NA' ? (
              <KeyboardAwareScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: (mobileW * 20) / 100}}>
                {this.state.service_arr != 'NA' && (
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      alignSelf: 'center',
                      marginTop: (mobileW * 4) / 100,
                      backgroundColor: Colors.whiteColor,
                      shadowOffset: {width: 1, height: 1},
                      shadowColor: Colors.shadow_color,
                      shadowOpacity: 0.24,
                      shadowRadius: 2.22,
                      elevation: 3,
                      borderRadius: (mobileW * 1) / 100,
                    }}>
                    <View
                      style={{
                        width: '93%',
                        alignSelf: 'center',
                        marginTop: (mobileW * 3.5) / 100,
                      }}>
                      <Text
                        style={{
                          fontFamily: Font.fontsemibold,
                          color: Colors.appColor,
                          fontSize: (mobileW * 3.7) / 100,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.select_main_service[config.language]}
                      </Text>
                    </View>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      data={this.state.service_arr}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{
                        paddingBottom: (mobileW * 6) / 100,
                      }}
                      renderItem={({index, item}) => {
                        return (
                          <View
                            style={
                              item.borderStatus == true
                                ? styles.serviceContainer
                                : styles.serviceContainer1
                            }>
                            <View style={{width: '21%'}}>
                              <Image
                                source={{
                                  uri: config.img_url3 + item.service_image,
                                }}
                                style={{
                                  height: (mobileW * 12) / 100,
                                  width: (mobileW * 13) / 100,
                                  borderRadius: (mobileW * 1.5) / 100,
                                }}
                              />
                            </View>
                            <View style={{width: '59%'}}>
                              <Text
                                style={{
                                  fontFamily: Font.fontmedium,
                                  fontSize: (mobileW * 3.5) / 100,
                                  textAlign: config.textRotate,
                                }}>
                                {item.service_name[config.language]}
                              </Text>
                              <View
                                style={{width: '100%', flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 3.5) / 100,
                                    color: Colors.appColor,
                                    width: '45%',
                                    textAlign: config.textRotate,
                                  }}>
                                  {item.service_price} EGP
                                </Text>
                                <View
                                  style={{
                                    width: '36%',
                                    backgroundColor: '#EAA351',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: Font.fontsemibold,
                                      fontSize: (mobileW * 2.1) / 100,
                                      color: Colors.whiteColor,
                                      paddingVertical: (mobileW * 0.2) / 100,
                                    }}>
                                    {item.service_label[config.language]}
                                  </Text>
                                </View>
                              </View>
                              {((item.service_discount ?? 0) > 0 ||
                                (item.company_discount_value ?? 0) > 0) && (
                                <Text
                                  style={{
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 3.5) / 100,
                                    color: Colors.appColor,
                                    width: '45%',
                                    textAlign: config.textRotate,
                                    textDecorationLine: 'line-through',
                                  }}>
                                  {item.service_price_before_discount} EGP
                                </Text>
                              )}
                            </View>
                            <View style={{width: '20%', flexDirection: 'row'}}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({
                                    Details:
                                      item.service_description[config.language],
                                    details_model: true,
                                  });
                                }}
                                activeOpacity={0.7}
                                style={{
                                  width: '50%',
                                  justifyContent: 'center',
                                  alignItems: 'flex-end',
                                }}>
                                <Image
                                  source={localimag.details_icon}
                                  style={{
                                    height: (mobileW * 5) / 100,
                                    width: (mobileW * 5) / 100,
                                  }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                  this.checkMainService(item, index);
                                }}
                                style={{
                                  width: '50%',
                                  justifyContent: 'center',
                                  alignItems: 'flex-end',
                                }}>
                                {item.status == true ? (
                                  <Image
                                    source={localimag.checkbox}
                                    style={{
                                      height: (mobileW * 5) / 100,
                                      width: (mobileW * 5) / 100,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={localimag.checkbox1}
                                    style={{
                                      height: (mobileW * 5) / 100,
                                      width: (mobileW * 5) / 100,
                                    }}
                                  />
                                )}
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      }}
                    />
                  </View>
                )}
                {this.state.extra_service_arr != 'NA' && (
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      alignSelf: 'center',
                      marginTop: (mobileW * 4) / 100,
                      backgroundColor: Colors.whiteColor,
                      shadowOffset: {width: 1, height: 1},
                      shadowColor: Colors.shadow_color,
                      shadowOpacity: 0.24,
                      shadowRadius: 2.22,
                      elevation: 3,
                      borderRadius: (mobileW * 1) / 100,
                    }}>
                    <View
                      style={{
                        width: '93%',
                        alignSelf: 'center',
                        marginTop: (mobileW * 3.5) / 100,
                      }}>
                      <Text
                        style={{
                          fontFamily: Font.fontsemibold,
                          color: Colors.appColor,
                          fontSize: (mobileW * 3.7) / 100,
                          textAlign: config.textRotate,
                        }}>
                        {Lang_chg.select_extra_service[config.language]}
                      </Text>
                    </View>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      data={this.state.extra_service_arr}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{
                        paddingBottom: (mobileW * 6) / 100,
                      }}
                      renderItem={({index, item}) => {
                        return (
                          <View
                            style={
                              item.borderStatus == true
                                ? styles.serviceContainer
                                : styles.serviceContainer1
                            }>
                            <View style={{width: '21%'}}>
                              <Image
                                source={{
                                  uri:
                                    config.img_url3 + item.extra_service_image,
                                }}
                                style={{
                                  height: (mobileW * 12) / 100,
                                  width: (mobileW * 13) / 100,
                                  borderRadius: (mobileW * 1.5) / 100,
                                }}
                              />
                            </View>
                            <View style={{width: '59%'}}>
                              <Text
                                style={{
                                  fontFamily: Font.fontmedium,
                                  fontSize: (mobileW * 3.5) / 100,
                                  textAlign: config.textRotate,
                                }}>
                                {item.extra_service_name[config.language]}
                              </Text>
                              <View
                                style={{width: '100%', flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 3.5) / 100,
                                    color: Colors.appColor,
                                    width: '45%',
                                  }}>
                                  {item.extra_service_price *
                                    (item.extra_serivce_qty ?? 1)}{' '}
                                  EGP
                                </Text>
                              </View>

                              {((item.extra_service_discount ?? 0) > 0 ||
                                (item.extra_services_company_price ?? 0) >
                                  0) && (
                                <Text
                                  style={{
                                    fontFamily: Font.fontsemibold,
                                    fontSize: (mobileW * 3.5) / 100,
                                    color: Colors.appColor,
                                    width: '45%',
                                    textAlign: config.textRotate,
                                    textDecorationLine: 'line-through',
                                  }}>
                                  {item.extra_service_price_before_discount *
                                    (item.extra_serivce_qty ?? 1)}{' '}
                                  EGP
                                </Text>
                              )}
                              <View
                                style={{
                                  width: '100%',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                  style={{marginEnd: 10}}
                                  onPress={() => {
                                    if ((item.extra_serivce_qty ?? 1) > 1) {
                                      item.extra_serivce_qty =
                                        (item.extra_serivce_qty ?? 1) - 1;
                                      this.checkExtraService(item, index, true);
                                    }
                                  }}>
                                  <Image source={localimag.grayminus} />
                                </TouchableOpacity>
                                <Text>{item.extra_serivce_qty ?? 1}</Text>
                                <TouchableOpacity
                                  style={{marginStart: 10}}
                                  onPress={() => {
                                    if ((item.extra_serivce_qty ?? 1) < 3) {
                                      item.extra_serivce_qty =
                                        (item.extra_serivce_qty ?? 1) + 1;
                                      this.checkExtraService(item, index, true);
                                    }
                                  }}>
                                  <Image source={localimag.grayplus} />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={{width: '20%', flexDirection: 'row'}}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({
                                    Details:
                                      item.extra_service_description[
                                        config.language
                                      ],
                                    details_model: true,
                                  });
                                }}
                                activeOpacity={0.7}
                                style={{
                                  width: '50%',
                                  justifyContent: 'center',
                                  alignItems: 'flex-end',
                                }}>
                                <Image
                                  source={localimag.details_icon}
                                  style={{
                                    height: (mobileW * 5) / 100,
                                    width: (mobileW * 5) / 100,
                                  }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                  this.checkExtraService(item, index);
                                }}
                                style={{
                                  width: '50%',
                                  justifyContent: 'center',
                                  alignItems: 'flex-end',
                                }}>
                                {item.status == true ? (
                                  <Image
                                    source={localimag.checkbox}
                                    style={{
                                      height: (mobileW * 5) / 100,
                                      width: (mobileW * 5) / 100,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={localimag.checkbox1}
                                    style={{
                                      height: (mobileW * 5) / 100,
                                      width: (mobileW * 5) / 100,
                                    }}
                                  />
                                )}
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      }}
                    />
                  </View>
                )}
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 4) / 100,
                    backgroundColor: Colors.whiteColor,
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: Colors.shadow_color,
                    shadowOpacity: 0.24,
                    shadowRadius: 2.22,
                    elevation: 3,
                    borderRadius: (mobileW * 1) / 100,
                  }}>
                  <View
                    style={{
                      width: '89%',
                      alignSelf: 'center',
                      marginTop: (mobileW * 3.5) / 100,
                    }}>
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        color: Colors.appColor,
                        fontSize: (mobileW * 3.7) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.your_services[config.language]}
                    </Text>
                  </View>
                  {this.state.service_data != 'NA' && (
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        paddingTop: (mobileW * 3) / 100,
                        paddingLeft: (mobileW * 1) / 100,
                      }}>
                      <View style={{width: '17%'}}>
                        <Image
                          source={{
                            uri:
                              config.img_url3 +
                              this.state.service_data.service_image,
                          }}
                          style={{
                            height: (mobileW * 9.5) / 100,
                            width: (mobileW * 9.5) / 100,
                            borderRadius: (mobileW * 1.5) / 100,
                          }}
                        />
                      </View>
                      <View style={{width: '53%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontmedium,
                            fontSize: (mobileW * 3.5) / 100,
                            textAlign: config.textRotate,
                          }}>
                          {
                            this.state.service_data.service_name[
                              config.language
                            ]
                          }
                        </Text>
                      </View>
                      <View style={{width: '30%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontFamily: Font.fontbold,
                            fontSize: (mobileW * 3.5) / 100,
                            textAlign: 'right',
                          }}>
                          {this.state.service_data.service_price} EGP
                        </Text>
                      </View>
                    </View>
                  )}
                  {this.state.extra_service_data != 'NA' && (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      data={this.state.extra_service_data}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{
                        paddingBottom: (mobileW * 6) / 100,
                      }}
                      renderItem={({index, item}) => {
                        return (
                          <View
                            style={{
                              width: '90%',
                              alignSelf: 'center',
                              flexDirection: 'row',
                              paddingTop: (mobileW * 3) / 100,
                              paddingLeft: (mobileW * 1) / 100,
                            }}>
                            <View style={{width: '17%'}}>
                              <Image
                                source={{
                                  uri:
                                    config.img_url3 + item.extra_service_image,
                                }}
                                style={{
                                  height: (mobileW * 9.5) / 100,
                                  width: (mobileW * 9.5) / 100,
                                  borderRadius: (mobileW * 1.5) / 100,
                                }}
                              />
                            </View>
                            <View
                              style={{width: '53%', justifyContent: 'center'}}>
                              <Text
                                style={{
                                  fontFamily: Font.fontmedium,
                                  fontSize: (mobileW * 3.5) / 100,
                                }}>
                                {item.extra_service_name[config.language]}
                              </Text>
                            </View>
                            <View
                              style={{width: '30%', justifyContent: 'center'}}>
                              <Text
                                style={{
                                  fontFamily: Font.fontbold,
                                  fontSize: (mobileW * 3.5) / 100,
                                  textAlign: 'right',
                                }}>
                                {item.extra_service_price *
                                  (item.extra_serivce_qty ?? 1)}{' '}
                                EGP
                              </Text>
                            </View>
                          </View>
                        );
                      }}
                    />
                  )}
                </View>

                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 4) / 100,
                    backgroundColor: Colors.whiteColor,
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: Colors.shadow_color,
                    shadowOpacity: 0.24,
                    shadowRadius: 2.22,
                    elevation: 3,
                    borderRadius: (mobileW * 1) / 100,
                  }}>
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      paddingVertical: (mobileW * 3.5) / 100,
                    }}>
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.7) / 100,
                        width: '50%',
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.subTotal[config.language]}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Font.fontbold,
                        fontSize: (mobileW * 3.6) / 100,
                        width: '50%',
                        textAlign: 'right',
                        color: Colors.appColor,
                      }}>
                      {this.state.subTotal} EGP
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 9) / 100,
                    backgroundColor: Colors.whiteColor,
                    shadowOffset: {width: 1, height: 1},
                    shadowColor: Colors.shadow_color,
                    shadowOpacity: 0.24,
                    shadowRadius: 2.22,
                    elevation: 3,
                    borderRadius: (mobileW * 1) / 100,
                    paddingBottom: (mobileW * 5) / 100,
                  }}>
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      paddingTop: (mobileW * 3.5) / 100,
                    }}>
                    <Text
                      style={{
                        fontFamily: Font.fontsemibold,
                        fontSize: (mobileW * 3.5) / 100,
                        color: '#FF0505',
                      }}>
                      {Lang_chg.add_note_to_book[config.language]} (
                      {Lang_chg.Optional_txt[config.language]})
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      borderBottomWidth: (mobileW * 0.3) / 100,
                      borderBottomColor: Colors.bottom_border,
                    }}>
                    <View
                      style={{width: '8%', paddingTop: (mobileW * 3) / 100}}>
                      <Image
                        source={localimag.pen1}
                        style={{
                          height: (mobileW * 3.7) / 100,
                          width: (mobileW * 3.7) / 100,
                        }}
                      />
                    </View>
                    <TextInput
                      style={styles.notesInput}
                      placeholder=""
                      placeholderTextColor={'#B3B3B3'}
                      value={this.state.notes}
                      keyboardType="default"
                      maxLength={250}
                      multiline={true}
                      textAlignVertical="top"
                      returnKeyLabel="done"
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                      autoCompleteType="off"
                      onChangeText={txt => {
                        this.setState({notes: txt});
                      }}
                    />
                  </View>
                </View>
                <ContinueButton onPress={() => this.navigationFun()} />
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
  serviceContainer: {
    width: '93%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: (mobileW * 4.5) / 100,
    borderBottomColor: Colors.bottom_border,
    borderBottomWidth: (mobileW * 0.3) / 100,
    paddingBottom: (mobileW * 6) / 100,
  },
  serviceContainer1: {
    width: '93%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: (mobileW * 4.5) / 100,
  },
  continueText: {
    color: Colors.whiteColor,
    alignSelf: 'center',
    fontSize: (mobileW * 4) / 100,
    fontFamily: Font.fontmedium,
    paddingVertical: (mobileW * 2) / 100,
  },
  continueButton: {
    backgroundColor: Colors.appColor,
    width: (mobileW * 80) / 100,
    borderRadius: 25,
    marginTop: (mobileH * 3) / 100,
    alignSelf: 'center',
  },
  notesInput: {
    fontFamily: Font.outfit_regular,
    textAlign: config.textalign,
    fontSize: (mobileW * 3.5) / 100,
    width: '90%',
    height: (mobileW * 26) / 100,
    color: Colors.textBlack_color,
  },
});
