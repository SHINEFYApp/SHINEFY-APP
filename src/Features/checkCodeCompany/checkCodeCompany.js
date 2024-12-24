import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { localStorage } from "../../Provider/localStorageProvider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";

export default async function checkCodeCompanyc() {
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    var url = config.baseURL + 'check_user_company_code/?user_id=' + user_id;
    let obj = await apifuntion.getApi(url)

  if(obj.success == "false" ){
    msgProvider.alert(Lang_chg.companyCodeTitleTxt[config.language] , obj.msg[config.language])
  }
}

 