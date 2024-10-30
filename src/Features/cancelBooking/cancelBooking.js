import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function cancelBooking(booking_id , message , navigation) {
  let user_arr = await localStorage.getItemObject('user_arr');
  var data = new FormData();
  data.append('user_id', user_arr.user_id);
  data.append('booking_id', booking_id);
  data.append('message', message);
  // data.append('status', 3);
  let url = config.baseURL + 'cancel_booking';
  if (message.length <= 0) {
    msgProvider.toast(Lang_chg.emptyMessage[config.language], 'center');
    return false;
  }
    if (message.length <= 3) {
      msgProvider.toast(Lang_chg.minlenMessage[config.language], 'center');
      return false;
    }
    if (message.length > 250) {
      msgProvider.toast(Lang_chg.maxlenMessage[config.language], 'center');
      return false;
    }
    let res = await apifuntion.postApi(url , data)
    msgProvider.toast(res.msg[config.language], 'center');

    if(res.msg[0] == "Success") {
      navigation.navigate("HomeScreen")
    }
        
    
}