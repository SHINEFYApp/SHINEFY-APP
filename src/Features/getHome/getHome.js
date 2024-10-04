import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function getHome() {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    var url = config.baseURL + 'get_unrated_bookings/' + user_id;
    let obj = await apifuntion.getApi(url)
try {

  if (obj.unrated_bookings.length > 0) {
    return {
      isRate : true , 
      book_id: obj.unrated_bookings[0].booking_id,
      order_type: obj.unrated_bookings[0].order_type,
    }
  }else {
    return {
      isRate : false
    }
  }
} catch (e) {
  
}

 
}