import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {config} from '../../Provider/configProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {localStorage} from '../../Provider/localStorageProvider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';

export default async function (data , navigation) {
  let userdata = await localStorage.getItemObject('user_arr');
  var fd = new FormData();
  fd.append('user_id', userdata.user_id);
  fd.append('name', data.name);
  fd.append('email', data.email);
  fd.append('phone_number', data.phone_number);
  fd.append('user_type', 1);
if (data.profile_image != 'NA') {
      fd.append('image', {
        uri: data.profile_image,
        type: 'image/jpg',
        name: 'image.jpg',
      });
    }
  let url = config.baseURL + 'edit_profile';
  const res = await apifuntion.postApi(url, fd);
  msgProvider.toast(res.msg[config.language], 'center');
  if(res.success == "true"){
    navigation.goBack()
  }
  
}
