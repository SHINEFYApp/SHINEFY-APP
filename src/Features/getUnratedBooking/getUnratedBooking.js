import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function getUnratedBooking(book_id) {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    var url = config.baseURL + `get_unrated_booking/${user_id}/${book_id}`;
    let obj = await apifuntion.getApi(url)

   return(obj.service_boys[0])
 
}