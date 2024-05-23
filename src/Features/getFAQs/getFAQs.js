import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

 export default async function setFAQS() {
    let user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    let url = config.baseURL + 'get_faqs/' + 1 + '/' + user_id;
    console.log("jonfsojnujn")
    let obj = await apifuntion.getApi(url)
    try{
        if (obj.success == 'true') {
            return obj.faqs 
        } else {
            msgProvider.alert(
                Lang_chg.information[config.language],
                obj.msg[config.language],
                false,
            );
            if (obj.account_active_status == 'deactivate') {
                config.checkUserDeactivate(this.props.navigation);
                return false;
            }
            
          return false;
        }

}catch(err) {
     if (err == 'noNetwork') {
          msgProvider.alert(
            Lang_chg.msgTitleNoNetwork[config.language],
            Lang_chg.noNetwork[config.language],
            false,
          );
          return false;
        } else {
          msgProvider.alert(
            Lang_chg.msgTitleServerNotRespond[config.language],
            Lang_chg.serverNotRespond[config.language],
            false,
          );
          return false;
        }
}
  };
