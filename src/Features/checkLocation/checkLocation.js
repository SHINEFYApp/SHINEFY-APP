import apiSauce from "../../API/apiSauce";
import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { localStorage } from "../../Provider/localStorageProvider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";

export default async function checkLocation (location) {

    var user_arr = await localStorage.getItemObject('user_arr');
    var user_id = user_arr.user_id;

    try {
        var url =

          'check_location/' +
          location.latitude +
          '/' +
          location.longitude +
          '/' +
          user_id;
       
          const {data:obj} = await apiSauce.get(url)
          if (obj.success == 'true') {
              localStorage.setItemObject('user_arr', obj.user_details);
              return true
            }else {
                msgProvider.alert(Lang_chg.location_text[config.language] ,obj.msg[config.language])
            }
        
    }catch(err) {
      
    }

  };