import apiSauce from "../../API/apiSauce";
import { localStorage } from "../../Provider/localStorageProvider";
export default async function getPackages() {
  try {
      var user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
    let res = await apiSauce.get(`/packages/` , {user_id});
    if (res.status === 423) {
                alert('Must update app version first');
                return false
              } 
            
    return res.data;
  } catch (err) {
  }
}