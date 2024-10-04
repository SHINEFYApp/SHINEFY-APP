import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";

export default async function getServiceBoyData(service_boy_id , navigation)  {
    var url = config.baseURL + 'getServiceBoy/' + service_boy_id;
    try{
        const res = await apifuntion.getApi(url)
    
        if (res.success == 'true') {
          return res.service_boy_arr
        } else {
          if (obj.account_active_status[0] == 'deactivate') {
            config.checkUserDeactivate(navigation);
            return false;
          }

          if (res.acount_delete_status[0] == 'deactivate') {
            config.checkUserDelete(navigation);
            return false;
          }

          return false;
        }
      }catch(err){
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
      };
  };