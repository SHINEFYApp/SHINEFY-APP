import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";
import { msgProvider, msgTitle } from "../../Provider/Messageconsolevalidationprovider/messageProvider";
import getNotification from "../getNotfication/getNotfication";

 export async function notification_delete_click(item , setNotfi) {

    let user_details = await localStorage.getItemObject('user_arr');
    let user_id = user_details.user_id;
    let notification_message_id = item.notification_message_id;
    let url =
      config.baseURL +
      'delete_single_notification?user_id=' +
      user_id +
      '&notification_message_id=' +
      notification_message_id;

    apifuntion
      .getApi(url)
      .then(obj => {
      
        if (obj.success == 'true') {  
            async function getNewNotfication() {
              let res = await getNotification(1);
              setNotfi(res.notification_arr);
            }
            getNewNotfication()
   
        } else {
          if (
            obj.active_status == msgTitle.deactivate[config.language] ||
            obj.msg[config.language] == msgTitle.usernotexit[config.language]
          ) {
            // usernotfound.loginFirst(this.props, obj.msg[config.language]);
          } else {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false,
            );
          }
          return false;
        }
      })
      .catch(error => {});
  };
export async function delete_all_notification_click  (navigation) {
    let user_details = await localStorage.getItemObject('user_arr');
    let user_id = user_details.user_id;
    let url =
      config.baseURL + 'delete_all_notification?user_id=' + user_id;
    apifuntion
      .getApi(url)
      .then(obj => {
   
        if (obj.success == 'true') {
          msgProvider.toast(obj.msg , "center")
          navigation.navigate("HomeScreen")
        } else {
          if (
            obj.active_status == msgTitle.deactivate[config.language] ||
            obj.msg[config.language] == msgTitle.usernotexit[config.language]
          ) {
            usernotfound.loginFirst(this.props, obj.msg[config.language]);
          } else {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false,
            );
          }
          return false;
        }
      })
      .catch(error => {});
  };