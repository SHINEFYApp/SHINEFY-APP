import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function notificationStatus(state) {
    console.log("fjkhdn")
        var send_status = 0;
    if (state== true) {
      send_status = 2;
    } else {
      send_status = 1;
    }
    var user_arr = await localStorage.getItemObject('user_arr');
    var user_id = user_arr.user_id;

    let url =
      config.baseURL +
      'update_notification_status/' +
      user_id +
      '/' +
      send_status;
    apifuntion
      .getApi(url)
      .then(obj => {
        console.log(obj)
        if (obj.success == 'true') {
          var user_arr = obj.user_details;
          localStorage.setItemObject('user_arr', user_arr);
          this.setMyProfile();
        } else {
          if (obj.account_active_status[0] == 'deactivate') {
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