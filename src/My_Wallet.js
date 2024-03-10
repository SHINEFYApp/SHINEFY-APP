import React, {Component} from 'react';
import {
  View,
  Image,
  BackHandler,
  Keyboard,
  Text,
  Modal,
  RefreshControl,
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
import {Nodata_foundimage} from './Provider/Nodata_foundimage';

const wallet_arr = [
  {
    status: true,
    trans_id: '#75908473920',
    date_time: '15/Feb/22 , 03:00PM',
    money: '120 EGP',
  },
  {
    status: false,
    trans_id: '#75908475620',
    date_time: '15/Feb/22 , 11:00AM',
    money: '100 EGP',
  },
  {
    status: true,
    trans_id: '#75908775620',
    date_time: '13/Feb/22 , 11:00AM',
    money: '100 EGP',
  },
  {
    status: false,
    trans_id: '#75908475625',
    date_time: '12/Feb/22 , 03:00PM',
    money: '120 EGP',
  },
  {
    status: false,
    trans_id: '#75908473928',
    date_time: '10/Feb/22 , 01:00PM',
    money: '100 EGP',
  },
  {
    status: true,
    trans_id: '#75908474950',
    date_time: '05/Feb/22 , 11:00AM',
    money: '100 EGP',
  },
  {
    status: true,
    trans_id: '#75908475980',
    date_time: '01/Feb/22 , 06:00PM',
    money: '100 EGP',
  },
];

export default class My_Wallet extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      wallet_arr: 'NA',
      wallet_arr1: 'NA',
      total_wallet: 0,
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      //  this.getWallet(0);
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
      this.getWallet(0);
    }, 300);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  getWallet = async page => {
    let userdata = await localStorage.getItemObject('user_arr');
    consolepro.consolelog('user_id', userdata.user_id);
    let url = config.baseURL + 'get_user_wallet/' + userdata.user_id;
    consolepro.consolelog('url', url);
    apifuntion
      .getApi(url, page)
      .then(obj => {
        consolepro.consolelog('obj', obj);
        if (obj.success == 'true') {
          this.setState({
            wallet_arr: obj.wallet_arr,
            wallet_arr1: obj.wallet_arr,
            total_wallet: obj.userwallet,
            refresh: false,
          });
          consolepro.consolelog('wallet_arr', this.state.wallet_arr);
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
  _onRefresh = () => {
    this.setState({refresh: true});
    this.getWallet(1);
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
          {/* -----------------------------Header------------------------------------ */}
          <ImageBackground
            style={{
              width: (mobileW * 100) / 100,
              height: (mobileW * 60) / 100,
              alignItems: 'center',
            }}
            source={localimag.profile1}>
            <KeyboardAwareScrollView
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={this._onRefresh}
                  tintColor="black"
                />
              }>
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
                        config.textalign == 'right'
                          ? {scaleX: -1}
                          : {scaleX: 1},
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
                    {Lang_chg.mywallet_txt[config.language]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: (mobileW * 100) / 100,
                  paddingBottom: (mobileW * 15) / 100,
                  paddingTop: (mobileW * 6) / 100,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 12) / 100,
                    }}>
                    {this.state.total_wallet.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.fontregular,
                      fontSize: (mobileW * 6) / 100,
                    }}>
                    {Lang_chg.sar_txt[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: (mobileW * -2) / 100,
                  }}>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.fontmedium,
                      fontSize: (mobileW * 3.5) / 100,
                    }}>
                    {Lang_chg.totalamount_txt[config.language]}
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </ImageBackground>
          {/* -----------------------------End Header------------------------------------ */}
          <View style={{flex: 1}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.wallet_arr}
              contentContainerStyle={{paddingBottom: (mobileW * 10) / 100}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                if (this.state.wallet_arr != 'NA') {
                  return (
                    <View
                      style={{
                        width: (mobileW * 90) / 100,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: (mobileW * 6) / 100,
                        borderBottomColor: Colors.bottom_border,
                        borderBottomWidth: (mobileW * 0.2) / 100,
                        flexDirection: 'row',
                        paddingBottom: (mobileW * 5) / 100,
                      }}>
                      <View
                        style={{
                          height: (mobileW * 10) / 100,
                          width: (mobileW * 10) / 100,
                          backgroundColor: '#F5F5F5',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: (mobileW * 2.5) / 100,
                        }}>
                        {item.amount_type == 0 ? (
                          <Image
                            source={localimag.trans_succ_icon}
                            style={{
                              height: (mobileW * 8) / 100,
                              width: (mobileW * 8) / 100,
                            }}
                          />
                        ) : (
                          <Image
                            source={localimag.trans_unsucc_icon}
                            style={{
                              height: (mobileW * 8) / 100,
                              width: (mobileW * 8) / 100,
                            }}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          width: '88%',
                          flexDirection: 'row',
                          paddingLeft: (mobileW * 2.5) / 100,
                        }}>
                        <View style={{width: '60%', justifyContent: 'center'}}>
                          <Text
                            style={{
                              fontFamily: Font.fontsemibold,
                              color: Colors.trans_txt,
                              fontSize: (mobileW * 3) / 100,
                              textAlign: config.textRotate,
                            }}>
                            {item.booking_number}
                          </Text>
                          <Text
                            style={{
                              fontFamily: Font.fontmedium,
                              color: Colors.signup_text_title,
                              fontSize: (mobileW * 2.7) / 100,
                              textAlign: config.textRotate,
                            }}>
                            {item.createtime}
                          </Text>
                        </View>
                        <View style={{width: '40%', justifyContent: 'center'}}>
                          {item.amount_type == 0 ? (
                            <Text
                              style={{
                                textAlign: 'right',
                                color: '#16BC3A',
                                fontSize: (mobileW * 4) / 100,
                                fontFamily: Font.fontsemibold,
                              }}>
                              +{item.amount}
                              {Lang_chg.sar_txt[config.language]}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                textAlign: 'right',
                                color: '#FF0000',
                                fontSize: (mobileW * 4) / 100,
                                fontFamily: Font.fontsemibold,
                              }}>
                              -{item.amount}
                              {Lang_chg.sar_txt[config.language]}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  );
                }
              }}
            />
          </View>
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
