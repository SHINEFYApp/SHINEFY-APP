import apiSauce from '../../API/apiSauce';
import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function getUserPackages() {
  var user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  let data = new FormData();
  data.append('user_id', user_id);
  var url =  'my_subscription_package/';
  let res = await apiSauce.get(url, {user_id});
  console.log(res)

  return res.data;
}
