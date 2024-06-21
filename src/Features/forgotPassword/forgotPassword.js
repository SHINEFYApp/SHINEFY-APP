import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {validationprovider} from '../../Provider/Validation_provider';
import {config} from '../../Provider/configProvider';

export default async function forgotPassword(navigation, phone_number) {
  //-----------------mobile number--------------------
  if (phone_number.length <= 0) {
    msgProvider.toast(Lang_chg.emptyMobile[config.language], 'center');
    return false;
  }
  if (phone_number.length < 7) {
    msgProvider.toast(Lang_chg.MobileMinLength[config.language], 'center');
    return false;
  }
  if (phone_number.length > 15) {
    msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center');
    return false;
  }
  if ((await validationprovider.digitCheck(phone_number)) != true) {
    msgProvider.toast(Lang_chg.validMobile[config.language], 'center');
    return false;
  }
  var data = new FormData();
  data.append('phone_number', phone_number);
  data.append('user_type', 1);
  let url = config.baseURL + 'forgot_password';
  let res = await apifuntion.postApi(url, data);

  navigation.navigate('OTPScreen', {
    check: 2,
    phone_number,
    user_id: res.user_id,
  });
}
