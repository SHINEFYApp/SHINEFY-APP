import apiSauce from "../../API/apiSauce";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function getWallet(){
    let userdata = await localStorage.getItemObject('user_arr');
    let endPoint = '/get_user_wallet/' + userdata.user_id;
    let res = await apiSauce.get(endPoint)
if (res.status === 423) {
                alert('Must update app version first');
                return false
              } 
    return res.data
}