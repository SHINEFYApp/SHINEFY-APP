import {Platform} from 'react-native';
import base64 from 'react-native-base64';
import {msgProvider, localStorage} from './utilslib/Utils';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
global.player_id_me1 = '123456';
//--------------------------- Config Provider Start -----------------------
class configProvider {
  burl = 'https://mobile-shinefy.co/app';
  baseURL = this.burl + '/admin/api/';
  baseURL1 = this.burl + '/webservice/';
  baseURL2 = this.burl + '/payment/paytab/';
  img_url = this.burl + '/admin/api/200X200/';
  img_url1 = this.burl + '/admin/api/images/400X400/';
  img_url2 = this.burl + '/admin/api/images/700X700/';
  img_url3 = this.burl + '/webservice/images/';
  // img_url4 	= 'https://shinefy.co/app/admin/api/image_signature/';
  login_type = 'app';
  // onesignalappid = '7dd35b3b-98c9-4c41-a0e9-a9cffc4a88ad'
  onesignalappid = '7dd35b3b-98c9-4c41-a0e9-a9cffc4a88ad';
  oneSignalAuthorization = 'NGRiN2M5NmUtYmY2Yy00YzJkLWI3YjktZWRiYzkxNTFjMThm';
  driveronesignalappid = '46ca1692-e2d6-49df-8ab2-c5ce9073994c';
  driveroneSignalAuthorization =
    'YTE1ZGU0ODItZTA5Mi00NzA5LTk2N2UtM2YwZGM3MjM4ZDdm';
  mapkey = 'AIzaSyDJvk86-9xlB4AdKzKKfjH0-R6pG4FTg_w';
  maplanguage = 'En';
  language = 0;
  player_id = '123456';
  player_id_me = '123456';
  device_type = Platform.OS;
  loading_type = false;
  latitude = '26.911588824432545';
  longitude = '29.3977009691298';
  textalign = 'left';
  textRotate = 'left';
  textIos = 'left';
  facebook_hide_android = 0; // 0 means show 1 means hide
  facebook_hide_ios = 0;
  google_hide_android = 0;
  google_hide_ios = 0;
  payment_hide_android = 0;
  payment_hide_ios = 0;
  headersapi = {
    Authorization:
      'Basic ' +
      base64.encode(base64.encode('mario') + ':' + base64.encode('carbonell')),
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-cache,no-store,must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  };
  GetPlayeridfunctin = player_id => {
    player_id_me1 = player_id;
  };

  checkUserDeactivate = async navigation => {
    // msgProvider.toast('Your account deactivated by admin', 'long')
    setTimeout(() => {
      this.AppLogout(navigation);
    }, 200);
    return false;
  };
  checkUserAproval = async navigation => {
    msgProvider.toast(
      'Your account has been deactivate by admin, please wait for the approval.',
      'long',
    );
    return false;
  };

  checkUserDelete = async navigation => {
    // msgProvider.toast('Your account deleted', 'long')
    setTimeout(() => {
      this.AppLogout(navigation);
    }, 200);
    return false;
  };
  AppLogout = async navigation => {
    var userdata = await localStorage.getItemObject('user_arr');
    var password = await localStorage.getItemString('password');
    var email = await localStorage.getItemString('email');
    var remember_me = await localStorage.getItemString('remember_me');
    var language = await localStorage.getItemString('language');

    if (userdata != null) {
      if (userdata.login_type == 'app') {
        localStorage.clear();
        if (remember_me == 'yes') {
          localStorage.setItemString('password', password);
          localStorage.setItemString('email', email);
          localStorage.setItemString('remember_me', remember_me);
          localStorage.setItemString('language', JSON.stringify(language));
        } else {
          localStorage.setItemString('password', password);
          localStorage.setItemString('email', email);
          localStorage.setItemString('language', JSON.stringify(language));
        }
        navigation.navigate('Login');
      } else if (userdata.login_type == 1) {
        LoginManager.logOut();
        localStorage.clear();
        navigation.navigate('Login');
      } else if (userdata.login_type == 2) {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        } catch (error) {
          alert(error);
        }
        localStorage.clear();
        navigation.navigate('Login');
      } else if (userdata.login_type == 5) {
      }
    } else {
    }
  };
}
//--------------------------- Config Provider End -----------------------

export const config = new configProvider();
