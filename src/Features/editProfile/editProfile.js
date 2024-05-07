import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export default editProfile = async (data) =>{
    let userdata = await localStorage.getItemObject('user_arr');
    var fd = new FormData();
    fd.append('user_id', userdata.user_id);
    let nameStr = data.firstname + ' ' + data.lastname;
    fd.append('name', nameStr)
    fd.append('email', data.email);
    fd.append('phone_number', data.phone_number)
    fd.append('user_type', 1)
    console.log("ghhf")
    let url = config.baseURL + 'edit_profile';
    const res = await apifuntion.postApi(url , fd)
    console.log(res)
}