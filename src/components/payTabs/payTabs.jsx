import React from 'react';
import {useEffect, useState} from 'react';
import {localStorage} from '../../Provider/localStorageProvider';
import {Colors, Image, Modal, Text, View} from 'react-native-ui-lib';
import {StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {localimag} from '../../Provider/Localimage';
import {config} from '../../Provider/configProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import cashBooking from '../../Features/createBooking/createBooking';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {Font, mobileH, mobileW} from '../../Provider/utilslib/Utils';
import WebView from 'react-native-webview';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import {useRecoilValue} from 'recoil';

export default function PayTabs({setWebView, webView, navigation, url}) {

  const [userData, setUserData] = useState();
  const bookingDetails = useRecoilValue(bookingDetailsAtom);
  useEffect(() => {
    let getUser = async () => {
      setUserData(await localStorage.getItemObject('user_arr'));
    };
    getUser();
  }, []);

  function onNavigationStateChange(webViewState) {
    webViewState.canGoBack = false;
 
    // if (webViewState.loading == false) {
    //   var t = webViewState.url.split('/').pop().split('?')[0];

    //   if (typeof t != null) {
    //     var p = webViewState.url.split('?').pop().split('&');

    //     if (t.includes('payment_success')) {
    //       var payment_id = 0;

    //       var payment_date = '';

    //       var payment_time = '';

    //       setWebView(false);
    //       setTimeout(() => {
    //         cashBooking(bookingDetails, navigation);
    //       }, 300);
    //     } else if (t.includes('payment_cancel')) {
    //       msgProvider.toast(Lang_chg.payment_fail[config.language], 'center');

    //       setWebView(false);

    //       return false;
    //     }
    //   }
    // }
  }
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={webView}
      onRequestClose={() => {
        setWebView(false);
      }}>
      <View style={{flex: 1}}>
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
                setWebView(false);
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  transform: [
                    config.textalign == 'right' ? {scaleX: -1} : {scaleX: 1},
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
          <WebView
            source={{
              uri: url,
            }}
            onNavigationStateChange={onNavigationStateChange.bind(this)}
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
  );
}
