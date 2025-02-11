import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export async function sendOTP(OTP , phoneNumber , userId , navigation) {
  let user_value = await localStorage.getItemObject('user_value');
  if (OTP.length <= 0) {
    msgProvider.toast(Lang_chg.Otp_validation[config.language], 'center');
    return false;
  }
  if (OTP.length <= 3) {
    msgProvider.toast(Lang_chg.Enter_otp[config.language], 'center');
    return false;
  }
  var data = new FormData();
  data.append('user_id', user_value.user_value);
  data.append('otp', OTP);
  data.append('user_type', 1);
  data.append('device_type', config.device_type);
  // data.append('player_id', global.player_id_me1);
  // data.append("player_id", player_id_me1)
  data.append('status', 1);

  var url = config.baseURL + 'otp_verify';
  apifuntion
    .postApi(url, data)
    .then(obj => {
   
      if (obj.success == 'true') {
        navigation.navigate('ChangePassword' , userId)
        if (check == 1) {
          if (obj.notification_arr != 'NA') {
            notification.notification_arr(obj.notification_arr);
          }
          localStorage.setItemObject('user_arr', obj.user_details);
          this.props.navigation.navigate('Home', {home_status: 3});
        } else {
          this.props.navigation.navigate('New_password');
        }
      } else {
        // msgProvider.alert(
        //   Lang_chg.information[config.language],
        //   obj.msg[config.language],
        //   false,
        // );
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
        // msgProvider.alert(
        //   Lang_chg.msgTitleServerNotRespond[config.language],
        //   Lang_chg.serverNotRespond[config.language],
        //   false,
        // );
      }
    });
}
