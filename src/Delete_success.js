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

export default class Delete_success extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {});
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
              {Lang_chg.sucess1_txt[config.language]}
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
              {Lang_chg.delete_success_txt[config.language]}
            </Text>
            <Text
              style={{
                color: Colors.white_color,
                fontSize: (mobileW * 4) / 100,
                fontFamily: Font.fontsemibold,
                lineHeight: (mobileW * 4.5) / 100,
              }}>
              {Lang_chg.account[config.language]}
            </Text>
          </View>

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
              this.props.navigation.navigate('Login');
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
