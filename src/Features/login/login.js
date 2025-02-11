import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function loginAuth(data, navigation, closeLoginModal , setIsLoading) {
  var formData = new FormData(data);
  formData.append('phone_number', data.phone_number);
  formData.append('password', data.password);
  formData.append('device_type', config.device_type);
  formData.append('player_id', config.player_id);
  formData.append('login_type', 'app');
  formData.append('user_type', 1);


  let url = config.baseURL + 'Login';

  apifuntion
  .postApi(url, formData)
  .then(obj => {
    setIsLoading(false)
    if (obj.success == 'true') {
      
      closeLoginModal();
        var user_arr = obj.user_details;
        let user_id = user_arr.user_id;
        let otp_verify = user_arr.otp_verify;
        let admin_status = user_arr.admin_status;
        let user_value = {
          user_id: user_id,
          otp: user_arr.otp,
          phone_number: data.phone_number,
          password: data.password,
          login_type: 'app',
          user_type: 1,
        };
        localStorage.setItemObject('user_arr', user_arr);
        localStorage.setItemObject('user_value', user_value);
        localStorage.setItemObject('user_pass', user_value.password);

        if (otp_verify == 0) {
    
          navigation.navigate('OTPScreen', {
            check: 1,
            phone_number: user_value.phone_number,
          });
          return false;
        }
        // if (this.state.passwordhide == true) {
        //   localStorage.setItemString('remember_email', data.phone_number);
        //   localStorage.setItemString('remember_password', data.password);
        //   localStorage.setItemString('remember_me', 'yes');
        // } else {
        //   this.setState({
        //     passwordhide: false,
        //     phone_number: '',
        //     password: '',
        //   });
        // }
        localStorage.setItemString('password', data.password);
        localStorage.setItemString('email', data.phone_number);
        navigation.navigate('HomeScreen', {home_status: 1});
      } else {
        setTimeout(() => {
          if (obj?.msg) {
            msgProvider.alert(
              Lang_chg.information[config.language],
              obj.msg[config.language],
              false,
            );
          }
        }, 200);
        if (obj.account_active_status == 'deactivate') {
          config.checkUserDeactivate(navigation);
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
        return false;
      } else {
        msgProvider.alert(
          Lang_chg.msgTitleServerNotRespond[config.language],
          Lang_chg.serverNotRespond[config.language],
          false,
        );
        return false;
      }
    });
}
