import { create } from "apisauce";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function getSavedLocation(){
        var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    var url = config.baseURL + 'get_user_saved_location/' + user_id;
    const api = create({
  baseURL: config.baseURL,
  headers: { Accept: 'application/vnd.github.v3+json' },
})
try {
    api
        .get('get_user_saved_location/' + user_id)
        .then(res => console.log(res.data))
}catch(err) {
    console.log(err)
}
}