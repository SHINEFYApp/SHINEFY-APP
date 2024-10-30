import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";

export default async function cancelPackage(userPackageId , packageId ,navigation) {
  let user_arr = await localStorage.getItemObject('user_arr');
  var data = new FormData();
  
  data.append('user_id', user_arr.user_id);
  data.append('user_package_id', userPackageId);
  data.append('package_id', packageId);
    
  let url = config.baseURL + 'delete_packages_subscription';
    
    let res = await apifuntion.postApi(url , data)
    msgProvider.toast(res.msg[config.language], 'center');
      navigation.navigate("HomeScreen")
        
}