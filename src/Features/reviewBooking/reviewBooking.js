import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import { notification } from '../../Provider/NotificationProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';
import getHome from '../getHome/getHome';

export async function reviewBooking(data , navigation) {
  if (data.rating <= 0) {
    msgProvider.toast(Lang_chg.emptyRating[config.language], 'center');
    return false;
  }
  if(data.order_type == 0) {
    if(data.behavior_status == undefined || 
      data.work_status == undefined ||
      data.nature_status == undefined
    ) {
      msgProvider.toast(Lang_chg.emptyQuestions[config.language], 'center');
      return false
    }
  }
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  var fd = new FormData();

  fd.append('user_id', user_id);
  fd.append('service_boy_id', data.order_type);
  fd.append('booking_id', data.booking_id);
  fd.append('behavior_status', data.behavior_status);
  fd.append('work_status', data.work_status);
  fd.append('nature_status', data.nature_status);
  fd.append('rating', data.rating);
 
  let url = config.baseURL + 'user_rating';

  apifuntion
    .postApi(url, fd)
    .then(obj => {
      if (obj.success == 'true') {
        msgProvider.alert(obj.msg[0])
        getHome().then((isRating)=>{
          if (isRating.isRate) {
            navigation.navigate("Review" , {...isRating})
          }
        })
        
        navigation.navigate('HomeScreen');
        if (obj.notification_arr != 'NA') {
          notification.notification_arr_schedule(obj.notification_arr);
        }
      } else {
        msgProvider.alert(
          Lang_chg.information[config.language],
          obj.msg[config.language],
          false,
        );
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
