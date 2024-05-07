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
import {Nodata_foundimage} from '../src/Provider/Nodata_foundimage';

export default class Add_your_vehicle extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      category_modal: false,
      logo_modal: false,
      color_modal: false,
      car_modal_modal: false,
      category_arr: 'NA',
      category_arr1: 'NA',
      make_arr: 'NA',
      make_arr1: 'NA',
      modal_name_arr: 'NA',
      modal_name_arr1: 'NA',
      color_arr: 'NA',
      color_arr1: 'NA',
      user_id: '',
      category_data_name: 'NA',
      category_data_img: 'NA',
      category_data_id: 'NA',
      make_data_name: 'NA',
      make_data_img: 'NA',
      make_data_id: 'NA',
      color_name: 'NA',
      color_code: 'NA',
      color_id: 'NA',
      modal_name: 'NA',
      modal_id: 'NA',
      plate_number: '',
      category_srch: '',
      make_srch: '',
      model_srch: '',
      color_srch: '',
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
      //         this.setData();
      //    },300);
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
      this.setData();
    }, 300);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  setCategory = async (item, index) => {
    this.setState({
      category_data_name: item.car_category[config.language],
      category_data_img: item.car_category_image,
      category_data_id: item.car_category_id,
    });
  };

  setMake = async (item, index) => {
    this.setState({
      make_data_name: item.car_make[config.language],
      make_data_img: item.image,
      make_data_id: item.make_id,
      modal_name_arr: 'NA',
      modal_name_arr1: 'NA',
      modal_name: 'NA',
      modal_id: 'NA',
    });
    setTimeout(() => {
      this.getModal(item.make_id);
    }, 500);
  };

  setColor = async (item, index) => {
    this.setState({
      color_name: item.car_color[config.language],
      color_code: item.color_code,
      color_id: item.color_id,
    });
  };

  setModal = async (item, index) => {
    this.setState({
      modal_name: item.modal[config.language],
      modal_id: item.model_id,
    });
  };

  getModal = async id => {
    var url = config.baseURL + 'get_modal_data/' + id;
    apifuntion
      .getApi(url)
      .then(obj => {
        if (obj.success == 'true') {
          setTimeout(() => {
            this.setState({
              modal_name_arr: obj.modal_arr,
              modal_name_arr1: obj.modal_arr,
            });
            global.props.hideLoader();
          }, 500);
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

  setData = async () => {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    this.setState({user_id: user_id});
    var url = config.baseURL + 'get_add_vehical/' + user_id;
    var add_car_arr = await localStorage.getItemObject('add_car_arr');
    if (add_car_arr == null) {
      apifuntion
        .getApi(url)
        .then(obj => {
          if (obj.success == 'true') {
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject('add_car_arr', obj.car_arr);
            let car_arr = obj.car_arr;
            this.setState({
              category_arr: car_arr.category_arr,
              category_arr1: car_arr.category_arr,
              color_arr: car_arr.color_arr,
              color_arr1: car_arr.color_arr,
              make_arr: car_arr.make_arr,
              make_arr1: car_arr.make_arr,
            });
          } else {
            msgProvider.alert(
              Lang_chg.information[config.language],
              obj.msg[config.language],
              false,
            );
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
    } else {
      this.setState({
        category_arr: add_car_arr.category_arr,
        category_arr1: add_car_arr.category_arr,
        color_arr: add_car_arr.color_arr,
        color_arr1: add_car_arr.color_arr,
        make_arr: add_car_arr.make_arr,
        make_arr1: add_car_arr.make_arr,
      });
      apifuntion
        .getApi(url, 1)
        .then(obj => {
          if (obj.success == 'true') {
            localStorage.setItemObject('user_arr', obj.user_details);
            localStorage.setItemObject('add_car_arr', obj.car_arr);
          } else {
            msgProvider.alert(
              Lang_chg.information[config.language],
              obj.msg[config.language],
              false,
            );
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
    }
  };

  SearchCategory = txt => {
    this.setState({category_srch: txt});
    let data1 = this.state.category_arr1;
    if (data1 != 'NA') {
      const newData = data1.filter(function (item) {
        const textData = txt.toLowerCase();
        const textData1 = textData.trim();
        return (
          //declare name here.....................
          item.car_category[config.language].toLowerCase().indexOf(textData1) >=
          0
        );
      });
      if (newData.length > 0) {
        this.setState({category_arr: newData});
      } else {
        this.setState({category_arr: 'NA'});
      }
    }
  };

  SearchMake = txt => {
    this.setState({make_srch: txt});
    let data1 = this.state.make_arr1;
    if (data1 != 'NA') {
      const newData = data1.filter(function (item) {
        const textData = txt.toLowerCase();
        const textData1 = textData.trim();
        return (
          //declare name here.....................
          item.car_make[config.language].toLowerCase().indexOf(textData1) >= 0
        );
      });
      if (newData.length > 0) {
        this.setState({make_arr: newData});
      } else {
        this.setState({make_arr: 'NA'});
      }
    }
  };

  SearchColor = txt => {
    this.setState({color_srch: txt});
    let data1 = this.state.color_arr1;
    if (data1 != 'NA') {
      const newData = data1.filter(function (item) {
        const textData = txt.toLowerCase();
        const textData1 = textData.trim();
        return (
          //declare name here.....................
          item.car_color[config.language].toLowerCase().indexOf(textData1) >= 0
        );
      });
      if (newData.length > 0) {
        this.setState({color_arr: newData});
      } else {
        this.setState({color_arr: 'NA'});
      }
    }
  };

  SearchModel = txt => {
    this.setState({model_srch: txt});
    let data1 = this.state.modal_name_arr1;
    if (data1 != 'NA') {
      const newData = data1.filter(function (item) {
        const textData = txt.toLowerCase();
        const textData1 = textData.trim();
        return (
          //declare name here.....................
          item.modal[config.language].toLowerCase().indexOf(textData1) >= 0
        );
      });
      if (newData.length > 0) {
        this.setState({modal_name_arr: newData});
      } else {
        this.setState({modal_name_arr: 'NA'});
      }
    }
  };

  addVehical = async add_status => {
    Keyboard.dismiss();
    let {
      category_data_id,
      make_data_id,
      color_id,
      modal_id,
      plate_number,
      user_id,
    } = this.state;
    //-------------------------Check for category--------------------
    if (category_data_id == 'NA') {
      msgProvider.toast(Lang_chg.emptyCarCategory[config.language], 'center');
      return false;
    }
    //-------------------------Check for make--------------------
    if (make_data_id == 'NA') {
      msgProvider.toast(Lang_chg.emptyCarMake[config.language], 'center');
      return false;
    }
    //-------------------------Check for modal--------------------
    if (modal_id == 'NA') {
      msgProvider.toast(Lang_chg.emptyCarModal[config.language], 'center');
      return false;
    }
    //-------------------------Check for color--------------------
    if (color_id == 'NA') {
      msgProvider.toast(Lang_chg.emptyCarColor[config.language], 'center');
      return false;
    }
    var data = new FormData();
    data.append('car_category_id', category_data_id);
    data.append('model_id', modal_id);
    data.append('make_id', make_data_id);
    data.append('plate_number', plate_number);
    data.append('color_id', color_id);
    data.append('user_id', user_id);
    let url = config.baseURL + 'add_vehicle';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        console.log(data)
        console.log(obj)
        if (obj.success == 'true') {
          localStorage.removeItem('saved_vehicle_arr');
          localStorage.removeItem('user_home_data');
          localStorage.setItemObject('user_arr', obj.user_details);
          if (add_status == 1) {
            this.props.navigation.navigate('Success', {success_status: 3});
          }
          this.setState({
            category_data_name: 'NA',
            category_data_img: 'NA',
            category_data_id: 'NA',
            make_data_name: 'NA',
            make_data_img: 'NA',
            make_data_id: 'NA',
            color_name: 'NA',
            color_code: 'NA',
            color_id: 'NA',
            modal_name: 'NA',
            modal_id: 'NA',
            plate_number: '',
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
          {/*Category Modal Open */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.category_modal}
            onRequestClose={() => {
              this.setState({category_modal: false});
            }}>
            <SafeAreaView
              style={{backgroundColor: Colors.theme_color, flex: 0}}
            />
            <View style={Styles.container}>
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
                        this.setState({category_modal: false}),
                          this.SearchCategory('');
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
                        {Lang_chg.selectcategory_txt[config.language]}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: (mobileW * 88) / 100,
                      alignSelf: 'center',
                      alignItems: 'center',
                      backgroundColor: '#F5F5F5',
                      marginTop: (mobileW * 2.8) / 100,
                    }}>
                    <View
                      style={{
                        width: '8%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: (mobileW * 2) / 100,
                      }}>
                      <Image
                        source={localimag.search_icon}
                        resizeMode="contain"
                        style={{
                          height: (mobileW * 6) / 100,
                          width: (mobileW * 6) / 100,
                        }}
                      />
                    </View>
                    <TextInput
                      style={{
                        fontFamily: Font.outfit_regular,
                        textAlign: config.textalign,
                        fontSize: (mobileW * 3.7) / 100,
                        width: '80%',
                        color: Colors.black_color,
                        height: (mobileW * 11) / 100,
                      }}
                      placeholder={Lang_chg.service_txt[config.language]}
                      placeholderTextColor={'#B8B8B8'}
                      value={this.state.category_srch}
                      keyboardType="default"
                      maxLength={50}
                      returnKeyLabel="done"
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                      autoCompleteType="off"
                      onChangeText={txt => this.SearchCategory(txt)}
                    />
                    {this.state.category_srch.length > 0 && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this.SearchCategory('');
                        }}
                        style={{
                          width: '10%',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            width: (mobileW * 4) / 100,
                            height: (mobileW * 4) / 100,
                          }}
                          source={localimag.cross_icon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View
                    style={{width: (mobileW * 100) / 100, alignSelf: 'center'}}>
                    {this.state.category_arr != 'NA' ? (
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={this.state.category_arr}
                        contentContainerStyle={{
                          paddingBottom: (mobileW * 15) / 100,
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        renderItem={({index, item}) => {
                          return (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => {
                                this.setState({category_modal: false}),
                                  this.setCategory(item, index);
                              }}
                              style={{
                                width: '34%',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: (mobileW * 6) / 100,
                                borderRightColor: Colors.bottom_border,
                                borderRightWidth: (mobileW * 0.3) / 100,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '90%',
                                  alignSelf: 'center',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontmedium,
                                    fontSize: (mobileW * 3.4) / 100,
                                  }}
                                  numberOfLines={1}>
                                  {item.car_category[config.language]}
                                </Text>
                              </View>
                              <View
                                style={{
                                  height: (mobileW * 18) / 100,
                                  marginTop: (mobileW * 2.5) / 100,
                                }}>
                                <Image
                                  source={{
                                    uri:
                                      config.img_url3 + item.car_category_image,
                                  }}
                                  style={{
                                    height: (mobileW * 15) / 100,
                                    width: (mobileW * 18) / 100,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  width: '40%',
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: Colors.appColor,
                                  alignItems: 'center',
                                  borderRadius: (mobileW * 1) / 100,
                                  marginTop: (mobileW * 1) / 100,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontmedium,
                                    fontSize: (mobileW * 2.5) / 100,
                                    color: Colors.whiteColor,
                                    paddingVertical: (mobileW * 0.6) / 100,
                                  }}>
                                  Select
                                </Text>
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
          </Modal>
          {/*Category Modal Close */}

          {/*Car Logo Modal Open */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.logo_modal}
            onRequestClose={() => {
              this.setState({logo_modal: false});
            }}>
            <SafeAreaView
              style={{backgroundColor: Colors.theme_color, flex: 0}}
            />
            <View style={Styles.container}>
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
                        this.setState({logo_modal: false}), this.SearchMake('');
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
                        {Lang_chg.selectmake_txt[config.language]}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: (mobileW * 88) / 100,
                      alignSelf: 'center',
                      alignItems: 'center',
                      backgroundColor: '#F5F5F5',
                      marginTop: (mobileW * 2.8) / 100,
                    }}>
                    <View
                      style={{
                        width: '8%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: (mobileW * 2) / 100,
                      }}>
                      <Image
                        source={localimag.search_icon}
                        resizeMode="contain"
                        style={{
                          height: (mobileW * 6) / 100,
                          width: (mobileW * 6) / 100,
                        }}
                      />
                    </View>
                    <TextInput
                      style={{
                        fontFamily: Font.outfit_regular,
                        textAlign: config.textalign,
                        fontSize: (mobileW * 3.7) / 100,
                        width: '80%',
                        color: Colors.black_color,
                        height: (mobileW * 11) / 100,
                      }}
                      placeholder={Lang_chg.search_txt[config.language]}
                      placeholderTextColor={'#B8B8B8'}
                      value={this.state.make_srch}
                      keyboardType="default"
                      maxLength={50}
                      returnKeyLabel="done"
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                      autoCompleteType="off"
                      onChangeText={txt => this.SearchMake(txt)}
                    />
                    {this.state.make_srch.length > 0 && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this.SearchMake('');
                        }}
                        style={{
                          width: '10%',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            width: (mobileW * 4) / 100,
                            height: (mobileW * 4) / 100,
                          }}
                          source={localimag.cross_icon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View
                    style={{width: (mobileW * 100) / 100, alignSelf: 'center'}}>
                    {this.state.make_arr != 'NA' ? (
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                          paddingBottom: (mobileW * 15) / 100,
                        }}
                        data={this.state.make_arr}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        renderItem={({index, item}) => {
                          return (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => {
                                this.setState({logo_modal: false}),
                                  this.setMake(item, index);
                              }}
                              style={{
                                width: '34%',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: (mobileW * 6) / 100,
                                borderRightColor: Colors.bottom_border,
                                borderRightWidth: (mobileW * 0.3) / 100,
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontmedium,
                                    fontSize: (mobileW * 3.4) / 100,
                                  }}>
                                  {item.car_make[config.language]}
                                </Text>
                              </View>
                              <View style={{}}>
                                <Image
                                  source={{uri: config.img_url3 + item.image}}
                                  style={{
                                    height: (mobileW * 15.5) / 100,
                                    width: (mobileW * 15.5) / 100,
                                    marginTop: (mobileW * 4) / 100,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  width: '40%',
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: Colors.appColor,
                                  alignItems: 'center',
                                  borderRadius: (mobileW * 1) / 100,
                                  marginTop: (mobileW * 3) / 100,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: Font.fontmedium,
                                    fontSize: (mobileW * 2.5) / 100,
                                    color: Colors.whiteColor,
                                    paddingVertical: (mobileW * 0.6) / 100,
                                  }}>
                                  Select
                                </Text>
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
          </Modal>
          {/*Car Logo Modal Close */}

          {/*Car Modal Modal Open */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.car_modal_modal}
            onRequestClose={() => {
              this.setState({car_modal_modal: false});
            }}>
            <SafeAreaView
              style={{backgroundColor: Colors.theme_color, flex: 0}}
            />
            <View style={Styles.container}>
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
                    paddingLeft: (mobileW * 1) / 100,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      justifyContent: 'center',
                      width: '15%',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.setState({car_modal_modal: false}),
                        this.SearchModel('');
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
                      {Lang_chg.selectmodel_txt[config.language]}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: (mobileW * 88) / 100,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                    marginTop: (mobileW * 2.8) / 100,
                  }}>
                  <View
                    style={{
                      width: '8%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: (mobileW * 2) / 100,
                    }}>
                    <Image
                      source={localimag.search_icon}
                      resizeMode="contain"
                      style={{
                        height: (mobileW * 6) / 100,
                        width: (mobileW * 6) / 100,
                      }}
                    />
                  </View>
                  <TextInput
                    style={{
                      fontFamily: Font.outfit_regular,
                      textAlign: config.textalign,
                      fontSize: (mobileW * 3.7) / 100,
                      width: '80%',
                      color: Colors.black_color,
                      height: (mobileW * 11) / 100,
                    }}
                    placeholder={Lang_chg.search_txt[config.language]}
                    placeholderTextColor={'#B8B8B8'}
                    value={this.state.model_srch}
                    keyboardType="default"
                    maxLength={50}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    autoCompleteType="off"
                    onChangeText={txt => this.SearchModel(txt)}
                  />
                  {this.state.model_srch.length > 0 && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        this.SearchModel('');
                      }}
                      style={{
                        width: '10%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: (mobileW * 4) / 100,
                          height: (mobileW * 4) / 100,
                        }}
                        source={localimag.cross_icon}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{
                    width: (mobileW * 100) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 4) / 100,
                  }}>
                  {this.state.modal_name_arr != 'NA' ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        paddingBottom: (mobileW * 15) / 100,
                      }}
                      data={this.state.modal_name_arr}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({index, item}) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                              this.setState({car_modal_modal: false}),
                                this.setModal(item, index);
                            }}
                            style={{
                              width: (mobileW * 88) / 100,
                              alignSelf: 'center',
                              marginTop: (mobileW * 6.5) / 100,
                              borderBottomColor: Colors.bottom_border,
                              borderBottomWidth: (mobileW * 0.5) / 100,
                              flexDirection: 'row',
                              paddingBottom: (mobileW * 2) / 100,
                            }}>
                            <View style={{width: '84%'}}>
                              <Text>{item.modal[config.language]}</Text>
                            </View>
                            <View
                              style={{
                                width: '16%',
                                alignItems: 'flex-end',
                                backgroundColor: Colors.appColor,
                                alignItems: 'center',
                                borderRadius: (mobileW * 1) / 100,
                              }}>
                              <Text
                                style={{
                                  fontFamily: Font.fontmedium,
                                  fontSize: (mobileW * 2.5) / 100,
                                  color: Colors.whiteColor,
                                  paddingVertical: (mobileW * 0.6) / 100,
                                }}>
                                Select
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  ) : (
                    <Nodata_foundimage />
                  )}
                </View>
                {/* </ImageBackground> */}
              </ScrollView>
            </View>
          </Modal>
          {/*Car Modal Modal Close */}

          {/*Car Color Modal Open */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.color_modal}
            onRequestClose={() => {
              this.setState({color_modal: false});
            }}>
            <SafeAreaView
              style={{backgroundColor: Colors.theme_color, flex: 0}}
            />
            <View style={Styles.container}>
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
                      this.setState({color_modal: false}), this.SearchColor('');
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
                      {Lang_chg.selectcolor_txt[config.language]}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
              <ImageBackground
                source={localimag.bacKground1}
                resizeMode="stretch"
                style={{
                  width: (mobileW * 100) / 100,
                  height: (mobileH * 85) / 100,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: (mobileW * 88) / 100,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                    marginTop: (mobileW * 2.8) / 100,
                  }}>
                  <View
                    style={{
                      width: '8%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: (mobileW * 2) / 100,
                    }}>
                    <Image
                      source={localimag.search_icon}
                      resizeMode="contain"
                      style={{
                        height: (mobileW * 6) / 100,
                        width: (mobileW * 6) / 100,
                      }}
                    />
                  </View>
                  <TextInput
                    style={{
                      fontFamily: Font.outfit_regular,
                      textAlign: config.textalign,
                      fontSize: (mobileW * 3.7) / 100,
                      width: '80%',
                      color: Colors.black_color,
                      height: (mobileW * 11) / 100,
                    }}
                    placeholder={Lang_chg.search_txt[config.language]}
                    placeholderTextColor={'#B8B8B8'}
                    value={this.state.color_srch}
                    keyboardType="default"
                    maxLength={50}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    autoCompleteType="off"
                    onChangeText={txt => this.SearchColor(txt)}
                  />
                  {this.state.color_srch.length > 0 && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        this.SearchColor('');
                      }}
                      style={{
                        width: '10%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: (mobileW * 4) / 100,
                          height: (mobileW * 4) / 100,
                        }}
                        source={localimag.cross_icon}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{width: (mobileW * 100) / 100, alignSelf: 'center'}}>
                  {this.state.color_arr != 'NA' ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      data={this.state.color_arr}
                      contentContainerStyle={{
                        paddingBottom: (mobileW * 15) / 100,
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={3}
                      renderItem={({index, item}) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                              this.setState({color_modal: false}),
                                this.setColor(item, index);
                            }}
                            style={{
                              width: '34%',
                              alignSelf: 'center',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: (mobileW * 6) / 100,
                              borderRightColor: Colors.bottom_border,
                              borderRightWidth: (mobileW * 0.3) / 100,
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontFamily: Font.fontmedium,
                                  fontSize: (mobileW * 3.4) / 100,
                                }}>
                                {item.car_color[config.language]}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: '40%',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.appColor,
                                alignItems: 'center',
                                borderRadius: (mobileW * 1) / 100,
                                marginTop: (mobileW * 3) / 100,
                              }}>
                              <Text
                                style={{
                                  fontFamily: Font.fontmedium,
                                  fontSize: (mobileW * 2.5) / 100,
                                  color: Colors.whiteColor,
                                  paddingVertical: (mobileW * 0.6) / 100,
                                }}>
                                Select
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  ) : (
                    <Nodata_foundimage />
                  )}
                </View>
              </ImageBackground>
            </View>
          </Modal>
          {/*Car Color Modal Close */}
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
                    width: (mobileW * 5.5) / 100,
                    height: (mobileW * 5.5) / 100,
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
                  paddingRight: (mobileW * 11) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontsemibold,
                    fontSize: (mobileW * 5.5) / 100,
                    color: Colors.whiteColor,
                  }}>
                  {Lang_chg.add_your_vehicle[config.language]}
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
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileW * 7) / 100,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontFamily: Font.fontmedium,
                    color: Colors.appColor,
                    fontSize: (mobileW * 3.7) / 100,
                    textAlign: config.textRotate,
                  }}>
                  {Lang_chg.selectcategory_txt[config.language]}
                </Text>
              </View>

              {this.state.category_data_id != 'NA' ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({category_modal: !this.state.category_modal}),
                      this.SearchCategory('');
                  }}
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 3) / 100,
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.5) / 100,
                    paddingBottom: (mobileW * 1) / 100,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '15%'}}>
                    <Image
                      source={{
                        uri: config.img_url3 + this.state.category_data_img,
                      }}
                      style={{
                        height: (mobileW * 8) / 100,
                        width: (mobileW * 10) / 100,
                      }}
                    />
                  </View>
                  <View style={{width: '77%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {this.state.category_data_name}
                    </Text>
                  </View>
                  <View style={{width: '9%', justifyContent: 'center'}}>
                    <Image
                      source={localimag.rightArrowIocn}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                        transform: [
                          config.textalign == 'right'
                            ? {scaleX: -1}
                            : {scaleX: 1},
                        ],
                      }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({category_modal: !this.state.category_modal}),
                      this.SearchCategory('');
                  }}
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 7) / 100,
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.5) / 100,
                    paddingBottom: (mobileW * 1) / 100,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '91%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 3.5) / 100,
                        color: '#C9C9C9',
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.selectcategory_txt[config.language]}
                    </Text>
                  </View>
                  <View style={{width: '9%', justifyContent: 'center'}}>
                    <Image
                      source={localimag.rightArrowIocn}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                        transform: [
                          config.textalign == 'right'
                            ? {scaleX: -1}
                            : {scaleX: 1},
                        ],
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )}
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileW * 7) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontmedium,
                    color: Colors.appColor,
                    fontSize: (mobileW * 3.7) / 100,
                    textAlign: config.textRotate,
                  }}>
                  {Lang_chg.selectmake_txt[config.language]}
                </Text>
              </View>
              {this.state.make_data_id != 'NA' ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({logo_modal: !this.state.logo_modal}),
                      this.SearchMake('');
                  }}
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 1) / 100,
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.5) / 100,
                    paddingBottom: (mobileW * 1) / 100,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '17%'}}>
                    <Image
                      source={{uri: config.img_url3 + this.state.make_data_img}}
                      style={{
                        height: (mobileW * 10) / 100,
                        width: (mobileW * 13) / 100,
                      }}
                    />
                  </View>
                  <View style={{width: '74%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {this.state.make_data_name}
                    </Text>
                  </View>
                  <View style={{width: '9%', justifyContent: 'center'}}>
                    <Image
                      source={localimag.rightArrowIocn}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                        transform: [
                          config.textalign == 'right'
                            ? {scaleX: -1}
                            : {scaleX: 1},
                        ],
                      }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({logo_modal: !this.state.logo_modal}),
                      this.SearchMake('');
                  }}
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 7) / 100,
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.5) / 100,
                    paddingBottom: (mobileW * 1) / 100,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '91%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 3.5) / 100,
                        color: '#C9C9C9',
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.selectmake_txt[config.language]}
                    </Text>
                  </View>
                  <View style={{width: '9%', justifyContent: 'center'}}>
                    <Image
                      source={localimag.rightArrowIocn}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                        transform: [
                          config.textalign == 'right'
                            ? {scaleX: -1}
                            : {scaleX: 1},
                        ],
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )}

              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileW * 7) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontmedium,
                    color: Colors.appColor,
                    fontSize: (mobileW * 3.7) / 100,
                    textAlign: config.textRotate,
                  }}>
                  {Lang_chg.selectmodel_txt[config.language]}
                </Text>
              </View>
              {this.state.modal_id != 'NA' && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({
                      car_modal_modal: !this.state.car_modal_modal,
                    }),
                      this.SearchModel('');
                  }}
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 5) / 100,
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.5) / 100,
                    paddingBottom: (mobileW * 1) / 100,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '91%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {this.state.modal_name}
                    </Text>
                  </View>
                  <View style={{width: '9%', justifyContent: 'center'}}>
                    <Image
                      source={localimag.rightArrowIocn}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                        transform: [
                          config.textalign == 'right'
                            ? {scaleX: -1}
                            : {scaleX: 1},
                        ],
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )}
              {this.state.modal_id == 'NA' && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.state.make_data_id != 'NA' &&
                      this.setState({
                        car_modal_modal: !this.state.car_modal_modal,
                      }),
                      this.SearchModel('');
                  }}
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 7) / 100,
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.5) / 100,
                    paddingBottom: (mobileW * 1) / 100,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '91%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 3.5) / 100,
                        color: '#C9C9C9',
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.selectmodel_txt[config.language]}
                    </Text>
                  </View>
                  <View style={{width: '9%', justifyContent: 'center'}}>
                    <Image
                      source={localimag.rightArrowIocn}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                        transform: [
                          config.textalign == 'right'
                            ? {scaleX: -1}
                            : {scaleX: 1},
                        ],
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )}

              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileW * 7) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontmedium,
                    color: Colors.appColor,
                    fontSize: (mobileW * 3.7) / 100,
                    textAlign: config.textRotate,
                  }}>
                  {Lang_chg.selectcolor_txt[config.language]}
                </Text>
              </View>
              {this.state.color_id != 'NA' ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({color_modal: !this.state.color_modal}),
                      this.SearchColor('');
                  }}
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 5) / 100,
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.5) / 100,
                    paddingBottom: (mobileW * 1) / 100,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '10%'}}>
                    <View
                      style={{
                        height: (mobileW * 6.5) / 100,
                        width: (mobileW * 6.5) / 100,
                        borderRadius: (mobileW * 8) / 100,
                        backgroundColor: this.state.color_code,
                      }}
                    />
                  </View>
                  <View style={{width: '81%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 3.5) / 100,
                        textAlign: config.textRotate,
                      }}>
                      {this.state.color_name}
                    </Text>
                  </View>
                  <View style={{width: '9%', justifyContent: 'center'}}>
                    <Image
                      source={localimag.rightArrowIocn}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                        transform: [
                          config.textalign == 'right'
                            ? {scaleX: -1}
                            : {scaleX: 1},
                        ],
                      }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({color_modal: !this.state.color_modal}),
                      this.SearchColor('');
                  }}
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    marginTop: (mobileW * 7) / 100,
                    borderBottomColor: Colors.bottom_border,
                    borderBottomWidth: (mobileW * 0.5) / 100,
                    paddingBottom: (mobileW * 1) / 100,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '91%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Font.fontmedium,
                        fontSize: (mobileW * 3.5) / 100,
                        color: '#C9C9C9',
                        textAlign: config.textRotate,
                      }}>
                      {Lang_chg.selectcolor_txt[config.language]}
                    </Text>
                  </View>
                  <View style={{width: '9%', justifyContent: 'center'}}>
                    <Image
                      source={localimag.rightArrowIocn}
                      style={{
                        height: (mobileW * 4.5) / 100,
                        width: (mobileW * 4.5) / 100,
                        transform: [
                          config.textalign == 'right'
                            ? {scaleX: -1}
                            : {scaleX: 1},
                        ],
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )}
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileW * 7) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.fontmedium,
                    color: Colors.appColor,
                    fontSize: (mobileW * 3.7) / 100,
                    textAlign: config.textRotate,
                  }}>
                  {Lang_chg.platenumber_txt[config.language]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: (mobileW * 1.5) / 100,
                  width: (mobileW * 90) / 100,
                  alignSelf: 'center',
                  borderBottomWidth: (mobileW * 0.3) / 100,
                  borderBottomColor: Colors.bottom_border,
                }}>
                <TextInput
                  style={{
                    fontFamily: Font.fontmedium,
                    textAlign: config.textalign,
                    fontSize: (mobileW * 3.5) / 100,
                    width: '90%',
                    color: Colors.black_color,
                    paddingVertical: (mobileW * 1.5) / 100,
                  }}
                  placeholder={Lang_chg.platenumber_txt[config.language]}
                  placeholderTextColor={'#C9C9C9'}
                  value={this.state.plate_number}
                  keyboardType="default"
                  returnKeyLabel="done"
                  maxLength={7}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  autoCompleteType="off"
                  onChangeText={txt => {
                    this.setState({plate_number: txt});
                  }}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.addVehical(1);
                }}
                style={{
                  backgroundColor: Colors.appColor,
                  width: (mobileW * 80) / 100,
                  borderRadius: 25,
                  marginTop: (mobileH * 5) / 100,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.whiteColor,
                    alignSelf: 'center',
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.fontmedium,
                    paddingVertical: (mobileW * 2) / 100,
                  }}>
                  {Lang_chg.addvechicle_txt[config.language]}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.addVehical(2);
                }}
                style={{
                  backgroundColor: Colors.whiteColor,
                  width: (mobileW * 80) / 100,
                  borderRadius: 25,
                  marginTop: (mobileH * 4) / 100,
                  alignSelf: 'center',
                  borderColor: Colors.appColor,
                  borderWidth: (mobileW * 0.5) / 100,
                }}>
                <Text
                  style={{
                    color: Colors.appColor,
                    alignSelf: 'center',
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.fontmedium,
                    paddingVertical: (mobileW * 2) / 100,
                  }}>
                  {Lang_chg.add_another_vehicle[config.language]}
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
