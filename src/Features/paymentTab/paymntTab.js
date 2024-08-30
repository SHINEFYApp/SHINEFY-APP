import apiSauce from '../../API/apiSauce';
import { apifuntion } from '../../Provider/Apicallingprovider/apiProvider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function paymentTab(amount) {
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  let res = await apiSauce.get(
    `/payment/paytab/pay?amount=${amount}&user_id=${user_id}`,
  );
 
  if (res.data.status === 'success') {
    return res.data.payment_url;
  } else {
    msgProvider.alert(res.data.msg);
  }
}
