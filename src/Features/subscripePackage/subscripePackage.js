import {Alert} from 'react-native';
import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import changeLanguage from '../changeLanguage/changeLanguage';
import { Lang_chg } from '../../Provider/Language_provider';

export default async function subscripePackage(
  package_id,
  payment_method,
) {
  let data = new FormData();
  let url = config.baseURL + 'packages_subscription';
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;

  data.append('user_id', user_id);
  data.append('package_id', package_id);
  data.append('payment_method', payment_method);

  let res = await apifuntion.postApi(url, data);

  if (res.success === 'true') {
    return res.online_payment_url;
  } else {
    msgProvider.alert(res.msg[config.language]);

  }
}
