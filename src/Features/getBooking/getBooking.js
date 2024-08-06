import apiSauce from '../../API/apiSauce';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function getBooking(currentBooking = "NA") {
  var user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  var url = '/get_booking/' + user_id + '/' + currentBooking;
  let res = await apiSauce.get(url);
  console.log(res)
  return res.data;
}
