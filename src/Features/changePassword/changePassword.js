import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function changePassword(data) {
    //--------------------old password------------------
    if (data.old_password.indexOf(' ') != -1) {
        msgProvider.toast(Lang_chg.PasswordSpace[config.language], 'center');
        return false;
    }
    if (data.old_password.length <= 0) {
        msgProvider.toast(Lang_chg.emptyoldPassword[config.language], 'center');
        return false;
    }
    if (data.old_password.length <= 5) {
        msgProvider.toast(
            Lang_chg.PasswordoldMinLength[config.language],
            'center',
        );
        return false;
    }
    if (data.old_password.length > 16) {
        msgProvider.toast(
            Lang_chg.PasswordoldMaxLength[config.language],
            'center',
        );
        return false;
    }
    //--------------------new password------------------
    if (data.new_password.indexOf(' ') != -1) {
        msgProvider.toast(Lang_chg.PasswordSpace[config.language], 'center');
      return false;
    }

    if (data.new_password.length <= 0) {
        msgProvider.toast(Lang_chg.emptyNewPassword[config.language], 'center');
        return false;
    }
    if (data.new_password.length <= 5) {
        msgProvider.toast(
            Lang_chg.PasswordNewMinLength[config.language],
            'center',
        );
        return false;
    }
    if (data.new_password.length > 16) {
        msgProvider.toast(
            Lang_chg.PasswordNewMaxLength[config.language],
            'center',
        );
        return false;
    }
    
    if (data.old_password == data.new_password) {
        msgProvider.toast(Lang_chg.diffrentPassword[config.language], 'center');
        return false;
    }
    //--------------------Confirm password------------------
    if (data.con_password.indexOf(' ') != -1) {
      msgProvider.toast(Lang_chg.PasswordSpace[config.language], 'center');
      return false;
    }
    
    if (data.con_password.length <= 0) {
        msgProvider.toast(Lang_chg.emptyConfirmPWD[config.language], 'center');
        return false;
    }
    if (data.con_password.length <= 5) {
        msgProvider.toast(
            Lang_chg.ConfirmPWDMinLength[config.language],
            'center',
        );
        return false;
    }
    if (data.con_password.length > 16) {
        msgProvider.toast(
            Lang_chg.ConfirmPWDMaxLength[config.language],
            'center',
        );
        return false;
    }
    if (data.con_password != data.new_password) {
        msgProvider.toast(Lang_chg.ConfirmPWDMatch[config.language], 'center');
        return false;
    }
    
    var user_arr = await localStorage.getItemObject('user_arr');
    var user_id = user_arr.user_id;
    var fd = new FormData();
    console.log("kjndf")
    fd.append('old_password', data.old_password);
    fd.append('new_password', data.new_password);
    fd.append('user_type', 1);
    fd.append('user_id', user_id);
    let url = config.baseURL + 'change_password';
    apifuntion
      .postApi(url, fd)
      .then(obj => {
        console.log(obj)
        if (obj.success == 'true') {
          var user_arr = obj.user_details;
          localStorage.setItemObject('user_arr', obj.user_details);
          localStorage.setItemString('password', data.new_password);
          var userValue = {
            name: user_arr.name,
            phone_number: user_arr.phone_number,
            password: data.new_password,
            user_id: user_arr.user_id,
            login_type: 'app',
            user_type: 1,
          };
          localStorage.setItemObject('user_value', userValue);
          msgProvider.toast(obj.msg[config.language], 'center');
          this.props.navigation.goBack();
        } else {
          msgProvider.alert(
            Lang_chg.information[config.language],
            obj.msg[config.language],
            false,
          );
          if (obj.account_active_status == 'deactivate') {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          }

          return false;
        }
      })
      .catch(err => {
        this.setState({loading: false});
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