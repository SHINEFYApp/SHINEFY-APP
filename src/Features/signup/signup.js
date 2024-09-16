import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {notification} from '../../Provider/NotificationProvider';
import {validationprovider} from '../../Provider/Validation_provider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default function signupAuth(
  data,
  navigation,
  closeSignup,
  checkboxPolicy,
  _,
  setIsLoading
) {
  if (data.firstName?.length <= 0 || data.firstName == undefined) {
    msgProvider.toast(Lang_chg.emptyFirstName[config.language], 'center');
    return false;
  }
  if (data.lastname?.trim().length <= 0 || data.lastName == undefined) {
    msgProvider.toast(Lang_chg.emptyLastName[config.language], 'center');
    return false;
  }
  if (data.email?.trim().length <= 0 || data.email == undefined) {
    msgProvider.toast(Lang_chg.emptyEmail[config.language], 'center');
    return false;
  }

  if (data.email?.trim().length > 0) {
    if (validationprovider.emailCheck(data.email) != true) {
      msgProvider.toast(Lang_chg.validEmail[config.language], 'center');
      return false;
    }
  }
  //-----------------mobile number--------------------
  if (data.phone_number?.trim().length <= 0 || data.phone_number == undefined) {
    msgProvider.toast(Lang_chg.emptyMobile[config.language], 'center');
    return false;
  }
  if (data.phone_number?.trim().length < 7) {
    msgProvider.toast(Lang_chg.MobileMinLength[config.language], 'center');
    return false;
  }
  if (data.phone_number?.trim().length > 15) {
    msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center');
    return false;
  }
  // if (validationprovider.digitCheck(data.phone_number) != true) {
  //   msgProvider.toast(Lang_chg.validMobile[config.language], 'center');
  //   return false;
  // }
  if (data.password?.trim().length <= 0 || !data.password) {
    msgProvider.toast(Lang_chg.emptyPassword[config.language], 'center');
    return false;
  }
  if (data.password?.trim().length <= 5) {
    msgProvider.toast(Lang_chg.PasswordMinLength[config.language], 'center');
    return false;
  }
  if (data.password?.trim().length > 16) {
    msgProvider.toast(Lang_chg.PasswordMaxLength[config.language], 'center');
    return false;
  }
  //----------------confirm password---------------------------
  if (data.con_password?.indexOf(' ') != -1) {
    msgProvider.toast(Lang_chg.PasswordSpace[config.language], 'center');
    return false;
  }
  if (data.con_password?.trim().length <= 0 || !data.password) {
    msgProvider.toast(Lang_chg.emptyConfirmPWD[config.language], 'center');
    return false;
  }
  if (data.con_password?.trim().length <= 5) {
    msgProvider.toast(Lang_chg.ConfirmPWDMinLength[config.language], 'center');
    return false;
  }
  if (data.con_password?.trim().length > 16) {
    msgProvider.toast(Lang_chg.ConfirmPWDMaxLength[config.language], 'center');
    return false;
  }
  if (data.con_password !== data.password) {
    msgProvider.toast(Lang_chg.ConfirmPWDMatch[config.language], 'center');
    return false;
  }

  if (checkboxPolicy == false) {
    msgProvider.toast(Lang_chg.acceptTermsPolicy[config.language], 'center');
    return false;
  }

  let formData = new FormData();
  formData.append('name', data.firstName + ' ' + data.lastName);
  formData.append('f_name', data.firstName);
  formData.append('l_name', data.lastName);
  formData.append('email', data.email);
  formData.append('phone_number', data.phone_number);
  formData.append('player_id', config.player_id);
  formData.append('device_type', config.device_type);
  formData.append('social_type', data.social_type);
  formData.append('password', data.password);

  let url = config.baseURL + 'signup';
  setIsLoading(true)
  apifuntion
    .postApi(url, formData)
    .then(obj => {
      setIsLoading(false)
      if (obj.success == 'true') {
        localStorage.setItemObject('user_arr', obj.user_details);
        if ('app' === 'app') {
          var user_value = {
            user_id: JSON.stringify(obj.user_details.user_id),
            otp: obj.user_details.otp,
            phone_number: data.phone_number,
            password: data.password,
          };
          localStorage.setItemObject('user_value', user_value);
          localStorage.setItemString('password', data.password);
          closeSignup();
          navigation.navigate('OTPScreen', {
            check: 1,
            phone_number: data.phone_number,
            navigation: navigation,
          });
        } else {
          if (obj.notification_arr != 'NA') {
            notification.notification_arr(obj.notification_arr);
          }
          this.props.navigation.navigate('Home', {home_status: 1});
        }
      } else {
        if (obj.msg.constructor === Array) {
          msgProvider.alert(
            Lang_chg.information[config.language],
            obj.msg[config.language],
            false,
          );
        } else {
          msgProvider.alert(
            Lang_chg.information[config.language],
            obj.msg,
            false,
          );
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
