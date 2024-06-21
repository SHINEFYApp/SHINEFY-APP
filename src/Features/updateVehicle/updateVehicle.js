import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function updateVehicle(currentCar) {
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  const fd = new FormData();
  fd.append(
    'car_category_id',
    currentCar?.car_category?.car_category_id || 'NA',
  );
  fd.append('model_id', currentCar?.modal?.model_id || 'NA');
  fd.append('make_id', currentCar?.car_make?.make_id || 'NA');
  fd.append('color_id', currentCar?.car_color?.color_id || 'NA');
  fd.append('vehicle_id', currentCar.carID);
  fd.append('plate_number', currentCar.plate_number);
  fd.append('user_id', user_id);

  let url = config.baseURL + 'update_vehicle';
  try {
    let res = await apifuntion.postApi(url, fd);
    msgProvider.toast(Lang_chg.vehicleUpdateSuccess[config.language], 'center');
    return res.success;
  } catch (err) {}
  // apifuntion
  //   .postApi(url, fd)
  //   .then(obj => {
  //     if (obj.success == 'true') {
  //       localStorage.removeItem('saved_vehicle_arr');
  //       localStorage.removeItem('user_home_data');
  //       localStorage.setItemObject('user_arr', obj.user_details);
  //       msgProvider.toast(
  //         Lang_chg.vehicleUpdateSuccess[config.language],
  //         'center',
  //       );
  //       this.props.navigation.navigate('My_Vehicles');
  //     } else {
  //       if (obj.account_active_status[0] == 'deactivate') {
  //         config.checkUserDeactivate(this.props.navigation);
  //         return false;
  //       }
  //       if (obj.acount_delete_status[0] == 'deactivate') {
  //         config.checkUserDelete(this.props.navigation);
  //         return false;
  //       }

  //       return false;
  //     }
  //   })
  //   .catch(err => {
  //     if (err == 'noNetwork') {
  //       msgProvider.alert(
  //         Lang_chg.msgTitleNoNetwork[config.language],
  //         Lang_chg.noNetwork[config.language],
  //         false,
  //       );
  //       return false;
  //     } else {
  //       msgProvider.alert(
  //         Lang_chg.msgTitleServerNotRespond[config.language],
  //         Lang_chg.serverNotRespond[config.language],
  //         false,
  //       );
  //       return false;
  //     }
  //   });
}
