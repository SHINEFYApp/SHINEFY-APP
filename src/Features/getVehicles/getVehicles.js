import apiSauce from '../../API/apiSauce';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function getMyVehicles() {
  var user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  try {
    let res = await apiSauce.get(`/get_user_vehicle/${user_id}/NA`);
if (res.status === 423) {
                alert('Must update app version first');
                return false
              } 
    return res.data;
  } catch (err) {}
  //  apifuntion
  //         .getApi(url)
  //         .then(obj => {
  //           if (obj.success == 'true') {
  //             localStorage.setItemObject('user_arr', obj.user_details);
  //             localStorage.setItemObject('add_car_arr', obj.car_arr);
  //             let car_arr = obj.car_arr;
  //             return obj
  //           } else {
  //             msgProvider.alert(
  //               Lang_chg.information[config.language],
  //               obj.msg[config.language],
  //               false,
  //             );
  //             if (obj.account_active_status == 'deactivate') {
  //               config.checkUserDeactivate(this.props.navigation);
  //               return false;
  //             }
  //             return false;
  //           }
  //         })
  //         .catch(err => {
  //           if (err == 'noNetwork') {
  //             msgProvider.alert(
  //               Lang_chg.msgTitleNoNetwork[config.language],
  //               Lang_chg.noNetwork[config.language],
  //               false,
  //             );
  //             return false;
  //           } else {
  //             msgProvider.alert(
  //               Lang_chg.msgTitleServerNotRespond[config.language],
  //               Lang_chg.serverNotRespond[config.language],
  //               false,
  //             );
  //             return false;
  //           }
  //         });
}
