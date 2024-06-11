import apiSauce from '../../API/apiSauce';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function paymentTab(amount) {
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;

  let res = await apiSauce.get(
    `/payment/paytab/pay?user_id=${user_id}&amount=${amount}`,
  );
  if (res.data.status === 'success') {
    return res.data.payment_url;
  } else {
    msgProvider.alert(res.data.msg);
  }
}
