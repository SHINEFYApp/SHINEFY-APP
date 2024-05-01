import { create } from "apisauce";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";
import apiSauce from "../../API/apiSauce";

export default async function getSavedLocation(){
    let user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    
    try {
        apiSauce.get(`/get_user_saved_location/${user_id}`)
        .then(res=>{
            console.log(res)
        })
         return(res.data)
}catch(err) {
    console.log(err)
}
}