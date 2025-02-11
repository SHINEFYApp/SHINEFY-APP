import {Keyboard} from 'react-native';
import {localStorage} from '../../Provider/localStorageProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';

export async function getLocationName(location) {
  let locationName = await fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      location.latitude +
      ',' +
      location.longitude +
      '&key=' +
      config.mapkey +
      '&language=' +
      config.maplanguage,
  )
    .then(res => res.json())
    .then(data => {
      return data.results[2].formatted_address;
    });
  return locationName;
}

export default async function addLocation(location, name) {
  Keyboard.dismiss();
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  //---------------------------check for address------------------------
  if (name.length <= 0) {
    msgProvider.toast(Lang_chg.emptyaddress[config.language], 'center');
    return false;
  }
  if (name.length <= 2) {
    msgProvider.toast(Lang_chg.minlenaddress[config.language], 'center');
    return false;
  }
  let status = location.status;
  var data = new FormData();
  data.append('user_type', 1);
  data.append('status', status);
  data.append('user_id', user_id);
  data.append('user_location_id', location.locationID);
  data.append('name', name);
  data.append('latitude', location.latitude);
  data.append('longitude', location.longitude);
  data.append('location', await getLocationName(location));
2
  let url = config.baseURL + 'save_user_location';

  try {
    let obj = await apifuntion.postApi(url, data);
   
    if (obj.success == 'true') {
      localStorage.removeItem('saved_location_arr');
      localStorage.setItemObject('user_arr', obj.user_details);
      if (status == 1) {
        msgProvider.toast(
          Lang_chg.LocationaddSuccess[config.language],
          'center',
        );
      } else {
        msgProvider.toast(
          Lang_chg.LocationUpdateSuccess[config.language],
          'center',
        );
      }
      return obj.success;
    } else {
      msgProvider.alert(
        Lang_chg.information[config.language],
        obj.msg[config.language],
        false,
      );
      if (obj.acount_delete_status == 'deactivate') {
        config.checkUserDelete(this.props.navigation);
        return false;
      }
      if (obj.account_active_status == 'deactivate') {
        config.checkUserDeactivate(this.props.navigation);
        return false;
      }
      return false;
    }
  } catch (err) {
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
}
