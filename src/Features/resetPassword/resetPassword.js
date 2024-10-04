import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";
import { config } from "../../Provider/configProvider";
import AppLogout from "../logout/Logout";

export default async function resetPassword(data , user_id , navigation){
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
    //--------------------Confirm password------------------
    if (data.con_password.indexOf(' ') != -1) {
        msgProvider.toast(Lang_chg.PasswordSpace[config.language], 'center');
        return false;
    }
    
    if (data.con_password.length <= 0) {
        msgProvider.toast(Lang_chg.emptyConfirmNewPWD[config.language], 'center');
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
    if (data.con_password !== data.new_password) {
        msgProvider.toast(Lang_chg.ConfirmPWDMatch[config.language], 'center');
        return false;
    }
    var fd = new FormData();
    fd.append('new_password', data.new_password);
    fd.append('user_id', user_id);
    let url = config.baseURL + 'set_fogot_password';
   
    apifuntion
      .postApi(url, fd)
      .then(obj => {
        
        if (obj.success == 'true') {
          msgProvider.toast(
            Lang_chg.successUpdatePass[config.language],
            'center',
          );
          AppLogout(navigation)
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
          // msgProvider.alert(
          //   Lang_chg.msgTitleServerNotRespond[config.language],
          //   Lang_chg.serverNotRespond[config.language],
          //   false,
          // );
          return false;
        }
      });
}