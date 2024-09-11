import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";

export default function callsocailweb (result, navigation) {
    console.log(result)
    var data = new FormData();
    data.append('social_email', result.social_email);
    data.append('social_id', result.social_id);
    data.append('device_type', config.device_type);
    data.append('player_id', player_id_me1);
    data.append('social_type', result.social_type);
    localStorage.setItemObject('socialdata', result);
    var url = config.baseURL1 + 'social_login.php';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        if (obj.success == 'true') {
          if (obj.user_exist == 'yes') {
            if (obj.user_details.otp_verify === 0) {
              var user_arr = obj.user_details;
              let user_value = {
                user_id: JSON.stringify(user_arr.user_id),
                phone_number: JSON.stringify(user_arr.phone_number),
                login_type: JSON.stringify(user_arr.login_type),
                user_type: JSON.stringify(user_arr.user_type),
              };
              localStorage.setItemObject('user_value', user_value);
              navigation.navigate('Otp_verify', {check: 1});
            } else {
              // firebaseprovider.firebaseUserCreate();
              // firebaseprovider.getMyInboxAllData();
              localStorage.setItemObject('user_arr', obj.user_details);
              setTimeout(() => {
                navigation.navigate('Home', {home_status: 3});
              }, 500);
            }
          } else {
            navigation.navigate('Signup');
          }
        } else {
          if (
            obj.msg[config.language] == msgTitle.deactivate_msg[0] ||
            obj.msg[config.language] == msgTitle.usernotexit[0]
          ) {
            this.socaillogout(result.social_type, navigation);
          }
          msgProvider.alert(
            msgTitle.information[config.language],
            obj.msg[config.language],
            false,
          );
        }
      })
      .catch(error => {
        msgProvider.alert(
          msgTitle.server[config.language],
          msgText.servermessage[config.language],
          false,
        );
      });
  };