import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";
import AppLogout from "../logout/Logout";

export default async function deleteAccount() {

    let user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    var data = new FormData();
    data.append('user_id', user_id);
    data.append('message', "other");
    data.append('user_type', user_arr.user_type);
    let url = config.baseURL + 'delete_account';
    apifuntion
      .postApi(url, data)
      .then(obj => {
   
        if (obj.success == 'true') {
          AppLogout();
        } else {
          setTimeout(() => {
            msgProvider.alert(
              Lang_chg.information[config.language],
              obj.msg[config.language],
              false,
            );
          }, 300);
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
      })
}