import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {
  msgProvider,
  msgTitle,
} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function getNotification(page) {
  let user_details = await localStorage.getItemObject('user_arr');
  let user_id = user_details.user_id;
  let url = config.baseURL + 'get_notification?user_id=' + user_id;
  console.log(url)

  try {
    let obj = await apifuntion.getApi(url);
    if (obj.success == 'true') {
      return obj;
      this.setState({
        notification_arr: obj.notification_arr,
        refresh: false,
      });
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
  }catch (err) {
    console.log(err)
  }
}
