import {
  apifuntion,
  config,
  localStorage,
  Lang_chg,
  msgProvider,
} from '../Provider/utilslib/Utils';

export const setVehicleData = async (component, navigation) => {
  var user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  component.setState({user_id: user_id});
  let vehicle_id = 'NA';
  var url = config.baseURL + 'get_user_vehicle/' + user_id + '/' + vehicle_id;
  // var user_vehicle_arr = await localStorage.getItemObject('saved_vehicle_arr');
  // localStorage.setItemObject('booking_vehicle_arr', user_vehicle_arr[0]);
  // if (user_vehicle_arr == null) {
  apifuntion
    .getApi(url)
    .then(obj => {
      if (obj.success == 'true') {
        localStorage.setItemObject('user_arr', obj.user_details);
        if (obj?.vehicle_arr === 'NA') {
          obj.vehicle_arr = [];
        }
        localStorage.setItemObject('saved_vehicle_arr', obj?.vehicle_arr || []);
        localStorage.setItemObject('booking_vehicle_arr', obj.vehicle_arr[0]);
        component.setState({
          vehical_arr: obj?.vehicle_arr || [],
          refresh: false,
        });
      } else {
        if (obj.account_active_status[0] == 'deactivate') {
          config.checkUserDeactivate(navigation);
          return false;
        }

        if (obj.acount_delete_status[0] == 'deactivate') {
          config.checkUserDelete(navigation);
          return false;
        }

        return false;
      }
    })
    .catch(err => {
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
    });
  // } else {
  //   component.setState({vehical_arr: user_vehicle_arr || [], refresh: false});
  //   localStorage.setItemObject('booking_vehicle_arr', user_vehicle_arr[0]);
  //   apifuntion
  //     .getApi(url, 1)
  //     .then(obj => {
  //       if (obj.success == 'true') {
  //         localStorage.setItemObject('user_arr', obj.user_details);
  //         localStorage.setItemObject(
  //           'saved_vehicle_arr',
  //           obj?.vehicle_arr || [],
  //         );
  //       } else {
  //         if (obj.account_active_status[0] == 'deactivate') {
  //           config.checkUserDeactivate(navigation);
  //           return false;
  //         }
  //         if (obj.acount_delete_status[0] == 'deactivate') {
  //           config.checkUserDelete(navigation);
  //           return false;
  //         }

  //         return false;
  //       }
  //     })
  //     .catch(err => {
  //       if (err === 'noNetwork') {
  //         msgProvider.alert(
  //           Lang_chg.msgTitleNoNetwork[config.language],
  //           Lang_chg.noNetwork[config.language],
  //           false,
  //         );
  //         return false;
  //       } else {
  //         msgProvider.alert(
  //           Lang_chg.msgTitleServerNotRespond[config.language],
  //           Lang_chg.serverNotRespond[config.language],
  //           false,
  //         );
  //         return false;
  //       }
  //     });
  // }
};
