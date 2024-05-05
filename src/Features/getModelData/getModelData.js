import apiSauce from '../../API/apiSauce';
import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function getModelData(branId) {
  var user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  try {
    let res = await apiSauce.get(`/get_modal_data/${branId}/`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
