import apiSauce from "../../API/apiSauce";
import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

const getProfile = async () => {
    let userdata = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + 'get_profile?user_id=' + userdata.user_id;

    const res = await apiSauce.get(`/get_profile?user_id=${userdata.user_id}`)
    return res.data.user_details
};

  export default getProfile