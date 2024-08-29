import apiSauce from '../../API/apiSauce';
import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function getUserPackageDetails(package_id) {
  var user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  let data = new FormData();
  data.append('user_id', user_id);
  var url = `user_package_details?user_id=${user_id}&user_package_id=${package_id}`;
  let res = await apiSauce.get(url, {user_id});
  
  return res.data;
}