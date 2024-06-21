import React from 'react';
//import OneSignal from 'react-native-onesignal';
import {config} from './configProvider';
import {localStorage} from './localStorageProvider';
// import { msgProvider, msgTitle, msgText } from './messageProvider';
import {notification} from './NotificationProvider';
import PushNotification from 'react-native-push-notification';
global.propsnavigation = '';
class Pushnotificationredirection {
  //----------------- message buttons
  constructor() {}
  redirectfun = async props => {
    var userdata = await localStorage.getItemObject('user_arr');
    propsnavigation = props;

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {},

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        if (notification.userInteraction == true) {
          // Redirect wherever you want
          let mydata = notification.data;
          let action = mydata.action;
          let action_id = mydata.action_id;
          let user_id = mydata.user_id;
          let other_user_id = mydata.other_user_id;
          if (userdata != null) {
            if (action == 'on the way') {
              props.navigation.navigate('Bookings_Details', {
                booking_id: action_id,
              });
            } else if (action == 'booking') {
              props.navigation.navigate('Bookings_Details', {
                booking_id: action_id,
              });
            } else if (action == 'credit') {
              props.navigation.navigate('My_Wallet');
            } else if (action == 'debit') {
              props.navigation.navigate('My_Wallet');
            } else if (action == 'arrived') {
              props.navigation.navigate('Bookings_Details', {
                booking_id: action_id,
              });
            } else if (action == 'start washing') {
              props.navigation.navigate('Bookings_Details', {
                booking_id: action_id,
              });
            } else if (action == 'booking completed') {
              props.navigation.navigate('Bookings_Details', {
                booking_id: action_id,
              });
            } else if (action == 'collect amount') {
              props.navigation.navigate('Bookings_Details', {
                booking_id: action_id,
              });
            } else if (action == 'broadcast') {
              props.navigation.navigate('Notification');
            }
          } else {
            props.navigation.navigate('Login');
          }
        }
      },
    });
  };
  onOpened = async openResult => {
    let navigation = propsnavigation;

    var datajson = openResult.notification.additionalData.action_json;
    var user_id = datajson.user_id;
    var other_user_id = datajson.other_user_id;
    var action_id = datajson.action_id;
    var action = datajson.action;
    var userdata = await localStorage.getItemObject('user_arr');

    if (userdata.user_id == other_user_id) {
      other_user_id = datajson.user_id;
    }

    // this.setState({loading:false})
    if (userdata != null) {
      if (userdata.user_id != other_user_id) {
        if (action == 'broadcast') {
          navigation.navigate('Notification', {user_id: action_id});
        } else if (action == 'on the way') {
          navigation.navigate('Bookings_Details', {booking_id: action_id});
        } else if (action == 'arrived') {
          navigation.navigate('Bookings_Details', {booking_id: action_id});
        } else if (action == 'start washing') {
          navigation.navigate('Bookings_Details', {booking_id: action_id});
        } else if (action == 'booking completed') {
          navigation.navigate('Bookings_Details', {booking_id: action_id});
        } else if (action == 'collect amount') {
          navigation.navigate('Bookings_Details', {booking_id: action_id});
        }
      }
    } else {
      navigation.navigation.navigate('Login');
    }
  };
  onIds(device) {
    player_id_me1 = device.userId;
  }
}

export const pushnotification = new Pushnotificationredirection();
