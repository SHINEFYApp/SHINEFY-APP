import apiSauce from "../../API/apiSauce"
import { localStorage } from "../../Provider/localStorageProvider";

export default async function getBookking() {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    let booking_id = 'NA';
    var url = '/get_booking/' + user_id + '/' + booking_id;
    let res = await apiSauce.get(url)
    return res.data
}