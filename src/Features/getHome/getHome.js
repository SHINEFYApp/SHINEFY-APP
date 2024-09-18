import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function getHome() {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    var url = config.baseURL + 'get_user_home/' + user_id;
    let obj = await apifuntion.getApi(url)
    console.log(obj)
     if (
              obj.home_arr.review_arr != 'NA' &&
              obj.home_arr.review_arr.service_boy_id.toString() != '0' &&
              obj.home_arr.review_arr.service_boy_id != null &&
              obj.home_arr.review_arr.booking_id.toString() != '0' &&
              obj.home_arr.review_arr.booking_id != null
            ) {
             return true
            }
}