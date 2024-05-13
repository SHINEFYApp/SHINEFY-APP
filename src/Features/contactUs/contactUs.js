import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";
import { validationprovider } from "../../Provider/Validation_provider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function contactUs(data) {
    var user_arr = await localStorage.getItemObject('user_arr');
    if (data.email.trim().length <= 0) {
        msgProvider.toast(Lang_chg.emptyEmail[config.language], 'center');
        return false;
    }
    if (data.email.trim().length > 100) {
        msgProvider.toast(Lang_chg.emailMaxLength[config.language], 'center');
      return false;
    }
    if ((validationprovider.emailCheck(data.email)) != true) {
        msgProvider.toast(Lang_chg.validEmail[config.language], 'center');
        return false;
    }

    //-------------------------Message-------------------------
    if (data.message.trim().length <= 0) {
        msgProvider.toast(Lang_chg.emptyMessage[config.language], 'center');
      return false;
    }
    if (data.message.trim().length <= 2) {
      msgProvider.toast(Lang_chg.minlenMessage[config.language], 'center');
      return false;
    }
    if (data.message.trim().length > 250) {
      msgProvider.toast(Lang_chg.maxlenMessage[config.language], 'center');
      return false;
    }
    var fd = new FormData();
    fd.append('name', data.name);
    fd.append('phone_number', user_arr.phone_number);
    fd.append('user_type', 1);
    fd.append('user_id', user_arr.user_id);
    fd.append('email', data.email);
    fd.append('message', data.message);
    let url = config.baseURL + 'contact_us';
    let res  = await apifuntion.postApi(url, fd)
  msgProvider.toast(res.msg[config.language], 'center')
}