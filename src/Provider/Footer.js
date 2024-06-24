import React, {Component} from 'react';
import {
  Text,
  ImageBackground,
  View,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
  BackHandler,
} from 'react-native';
import {
  localStorage,
  msgProvider,
  config,
  msgText,
  msgTitle,
  Colors,
  Font,
  mobileH,
  mobileW,
  localimag,
  Lang_chg,
  consolepro,
} from './utilslib/Utils';
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      modalVisible: false,
      loading: false,
      isConnected: true,
      userimage: '',
    };
  }

  componentDidMount() {}

  modalFun = async () => {
    this.props.navigation.navigate('Search_Location');
  };
  CheckVehicle = () => {
    Alert.alert(
      Lang_chg.alert_txt[config.language],
      Lang_chg.vehicle_add_alert[config.language],
      [
        {
          text: Lang_chg.ok[config.language],
          // onPress: () =>  this.btnPageLoginCall(),
          onPress: () => {
            this.props.navigation.navigate('Add_your_vehicle');
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          height: (mobileH * 8) / 100,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: Colors.appColor,
            alignItems: 'center',
            paddingVertical: (mobileW * 2) / 100,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={Styles.footericoncontainer}
            onPress={() => {
              this.props.navigation.navigate('Home', {home_status: 1});
            }}>
            {this.props.page == 'Home' ? (
              <View style={Styles.imageview}>
                <Image
                  source={localimag.active_home}
                  style={{
                    height: (mobileW * 5.5) / 100,
                    width: (mobileW * 5.5) / 100,
                  }}
                />
                <Text style={Styles.txthead}>
                  {Lang_chg.Home[config.language]}
                </Text>
              </View>
            ) : (
              <View style={Styles.imageview}>
                <Image
                  source={localimag.unactive_home}
                  style={{
                    height: (mobileW * 5.5) / 100,
                    width: (mobileW * 5.5) / 100,
                  }}
                />
                <Text style={Styles.txthead1}>
                  {Lang_chg.Home[config.language]}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.footericoncontainer}
            onPress={() => {
              this.props.navigation.navigate('My_Vehicles');
            }}>
            {this.props.page == 'My_Vehicles' ? (
              <View style={Styles.imageview}>
                <Image
                  source={localimag.myvehicle_active}
                  style={{
                    height: (mobileW * 5.5) / 100,
                    width: (mobileW * 11.5) / 100,
                  }}
                />
                <Text style={Styles.txthead}>
                  {Lang_chg.Vehicles_txt[config.language]}
                </Text>
              </View>
            ) : (
              <View style={Styles.imageview}>
                <Image
                  source={localimag.myvehicle_unactive}
                  style={{
                    height: (mobileW * 5.5) / 100,
                    width: (mobileW * 11.5) / 100,
                  }}
                />
                <Text style={Styles.txthead1}>
                  {Lang_chg.Vehicles_txt[config.language]}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.footericoncontainer1}
            onPress={() => {
              this.modalFun();
            }}>
            <View style={[Styles.imageview]}>
              {config.language == 0 ? (
                <Image
                  source={localimag.booking_active}
                  style={Styles.footerimageaddbotton}
                />
              ) : (
                <Image
                  source={localimag.booking_arabic}
                  style={Styles.footerimageaddbotton}
                />
              )}
              {/* <ImageBackground source={localimag.booking_nontext} style={Styles.footerimageaddbotton} >
                              <Text style={Styles.txthead}>{Lang_chg.Book[config.language]}</Text>
                            </ImageBackground> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.footericoncontainer}
            onPress={() => {
              this.props.navigation.navigate('My_Bookings', {booking_check: 1});
            }}>
            {this.props.page == 'My_Bookings' ? (
              <View style={Styles.imageview}>
                <Image
                  source={localimag.user_booking_active}
                  style={{
                    height: (mobileW * 5.5) / 100,
                    width: (mobileW * 5.5) / 100,
                  }}
                />
                <Text style={Styles.txthead}>
                  {Lang_chg.bookings_txt[config.language]}
                </Text>
              </View>
            ) : (
              <View style={Styles.imageview}>
                <Image
                  source={localimag.user_booking_unactive}
                  style={{
                    height: (mobileW * 5.5) / 100,
                    width: (mobileW * 5.5) / 100,
                  }}
                />
                <Text style={Styles.txthead1}>
                  {Lang_chg.bookings_txt[config.language]}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.footericoncontainer}
            onPress={() => {
              this.props.navigation.navigate('Profile');
            }}>
            {this.props.page == 'Profile' ? (
              <View style={Styles.imageview}>
                <Image
                  source={localimag.profile_active}
                  style={{
                    height: (mobileW * 5.5) / 100,
                    width: (mobileW * 5.5) / 100,
                  }}
                />
                <Text style={Styles.txthead}>
                  {Lang_chg.profile_txt[config.language]}
                </Text>
              </View>
            ) : (
              <View style={Styles.imageview}>
                <Image
                  source={localimag.profile_unactive}
                  style={{
                    height: (mobileW * 5.5) / 100,
                    width: (mobileW * 5.5) / 100,
                  }}
                />
                <Text style={Styles.txthead1}>
                  {Lang_chg.profile_txt[config.language]}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  txthead1: {
    marginTop: 3,
    fontSize: (mobileW * 3) / 100,
    color: Colors.whiteColor,
    fontFamily: Font.fontsemibold,
  },
  txthead: {
    marginTop: 3,
    fontSize: (mobileW * 3) / 100,
    color: Colors.whiteColor,
    fontFamily: Font.fontsemibold,
  },
  footericoncontainer: {
    width: '19%',
    height: (mobileH * 7) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footericoncontainer1: {
    width: '24%',
    height: (mobileH * 7) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageview: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageview1: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerimage: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
    resizeMode: 'contain',
  },
  footerimageaddbotton: {
    width: (mobileW * 14) / 100,
    height: (mobileW * 14) / 100,
    resizeMode: 'contain',
    marginBottom: (mobileH * 0.6) / 100,
  },
});
