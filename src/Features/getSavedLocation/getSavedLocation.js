import { create } from "apisauce";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";
import apiSauce from "../../API/apiSauce";

export default async function getSavedLocation(){
    let user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    
    try {
        let res = await apiSauce.get(`/get_user_saved_location/${user_id}`)
        if (res.status === 423) {
                alert('Must update app version first');
                return false
              } 
        return(res.data.saved_location_arr)
}catch(err) {
}
}