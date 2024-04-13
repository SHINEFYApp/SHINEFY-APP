import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {notification} from '../../Provider/NotificationProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default function signupAuth(data, navigation) {
  console.log(data);
  if (data.checkboxPolicy == false) {
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

  console.log(formData);

  let url = config.baseURL + 'signup';
  apifuntion
    .postApi(url, formData)
    .then(obj => {
      console.log(obj);
      if (obj.success == 'true') {
        localStorage.setItemObject('user_arr', obj.user_details);
        if ('app' == 'app') {
          var user_value = {
            user_id: JSON.stringify(obj.user_details.user_id),
            otp: obj.user_details.otp,
            phone_number: data.phone_number,
            password: data.password,
          };
          localStorage.setItemObject('user_value', user_value);
          localStorage.setItemString('password', data.password);
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
