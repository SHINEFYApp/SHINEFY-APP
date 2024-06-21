import {Alert} from 'react-native';
import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';

export default async function subscripePackage(
  package_id,
  total_price,
  wallet_amount,
  payment_method,
) {
  let data = new FormData();
  let url = config.baseURL + 'packages_subscription';
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;

  data.append('user_id', user_id);
  data.append('package_id', package_id);
  data.append('total_price', total_price);
  data.append('wallet_amount', 0);
  data.append('payment_method', 1);
  global.props.showLoader();

  let res = await apifuntion.postApi(url, data);
  console.log(res);
  if (res.success === 'true') {
    return true;
  } else {
    msgProvider.alert(res.msg[config.language]);
    return false;
  }
}
