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
import Booking_overview1 from './Booking_overview1';

export default class Success extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      booking_number: 'NA',
      page_status: this.props.route.params.success_status,
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    if (this.state.page_status != 3) {
      setTimeout(() => {
        this.setbooking();
      }, 500);
    }
    this.props.navigation.addListener('focus', () => {
      if (this.state.page_status != 3) {
        setTimeout(() => {
          this.setbooking();
        }, 500);
      }
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

  navigationFun = async () => {
    if (this.state.page_status == 1) {
      localStorage.removeItem('booking_number');
      let booking_id = await localStorage.getItemObject('booking_id');
      this.props.navigation.navigate('Bookings_Details', {
        my_booking_check: 1,
        booking_id: booking_id,
      });
    } else if (this.state.page_status == 2) {
      this.props.navigation.navigate('Home', {home_status: 2});
    } else {
      localStorage.removeItem('booking_number');
      this.props.navigation.navigate('Home', {home_status: 2});
    }
  };

  setbooking = async () => {
    let booking_number = await localStorage.getItemObject('booking_number');
    this.setState({booking_number: booking_number});
  };

  handleBackPress = () => {
    return true;
  };
  render() {
    return (
      <View style={Styles.container}>
        <SafeAreaView style={{backgroundColor: Colors.theme_color, flex: 0}} />
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.statusbar_color}
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <ImageBackground
          source={localimag.full_background_icon}
          style={{height: (mobileH * 100) / 100, width: (mobileW * 100) / 100}}
          resizeMode="stretch">
          <Image
            style={{
              width: (mobileW * 43) / 100,
              height: (mobileW * 43) / 100,
              alignSelf: 'center',
              marginTop: (mobileW * 50) / 100,
            }}
            source={localimag.washing1}
          />
          <View
            style={{
              alignSelf: 'center',
              marginTop: (mobileW * 2) / 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white_color,
                fontSize: (mobileW * 5.9) / 100,
                fontFamily: Font.fontsemibold,
                paddingTop: (mobileW * 1) / 100,
              }}>
              {this.state.page_status == 1
                ? Lang_chg.sucess1_txt[config.language]
                : Lang_chg.Congratulations[config.language]}
            </Text>
          </View>
          <View
            style={{
              width: (mobileW * 80) / 100,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white_color,
                fontSize: (mobileW * 4) / 100,
                fontFamily: Font.fontsemibold,
              }}>
              {this.state.page_status == 1
                ? Lang_chg.youhavesuceessfully_txt[config.language]
                : this.state.page_status == 2
                ? Lang_chg.successbookingTxt[config.language]
                : Lang_chg.vehicle_added_success_msg[config.language]}
            </Text>
            {this.state.page_status == 1 && (
              <Text
                style={{
                  color: Colors.white_color,
                  fontSize: (mobileW * 4) / 100,
                  fontFamily: Font.fontsemibold,
                  lineHeight: (mobileW * 4.5) / 100,
                }}>
                {Lang_chg.yourbooking_txt[config.language]}
              </Text>
            )}
          </View>
          {this.state.page_status != 3 && (
            <View
              style={{
                width: (mobileW * 80) / 100,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white_color,
                  fontSize: (mobileW * 4) / 100,
                  fontFamily: Font.fontsemibold,
                }}>
                {Lang_chg.bookingid1_txt[config.language]} :{' '}
                {this.state.booking_number}
              </Text>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: Colors.whiteColor,
              width: (mobileW * 25) / 100,
              borderRadius: 25,
              marginTop: (mobileH * 1.5) / 100,
              alignSelf: 'center',
            }}
            onPress={() => {
              this.navigationFun();
            }}>
            <Text
              style={{
                color: Colors.appColor,
                alignSelf: 'center',
                fontSize: (mobileW * 4) / 100,
                fontFamily: Font.fontmedium,
                paddingVertical: (mobileW * 1) / 100,
              }}>
              {Lang_chg.Done[config.language]}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
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
