import apiSauce from "../../API/apiSauce";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function getServiceDetails(id) {
    var user_arr = await localStorage.getItemObject('user_arr');

    try {
      let res= await apiSauce.get(`/get_service/${user_arr.user_id}/${id}/main`)
        return(res.data.service_details)
}catch(err) {

}
}

  