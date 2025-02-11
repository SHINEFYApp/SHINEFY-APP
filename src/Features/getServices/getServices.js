import apiSauce from '../../API/apiSauce';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function getServices() {
  var user_arr = await localStorage.getItemObject('user_arr');
 try {
    let res = await apiSauce.get(`/get_service/${user_arr.user_id}`);
   if (res.status === 423) {
                alert('Must update app version first');
                return false
              } 
    return res.data;
  } catch (err) {}
}
