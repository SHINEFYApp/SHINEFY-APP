import apiSauce from "../../API/apiSauce";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function getWallet(){
    let userdata = await localStorage.getItemObject('user_arr');
    let endPoint = '/get_user_wallet/' + userdata.user_id;
    let res = await apiSauce.get(endPoint)

    return res.data
}