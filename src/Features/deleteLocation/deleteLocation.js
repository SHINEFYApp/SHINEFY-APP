import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";

const deleteLocation = async (locationId) => {
    console.log(locationId)
    let user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    var url = config.baseURL + 'delete_location/' + user_id + '/' + locationId;
    console.log(`${config.baseURL}delete_location/${user_id}/${locationId}`)
    apifuntion
    .getApi(url)
    .then(obj => {
        if (obj.success == 'true') {
          setTimeout(() => {
            global.props.hideLoader();
          }, 500);
          this.setState({location_arr: obj.saved_location_arr});
          localStorage.setItemObject(
            'saved_location_arr',
            obj.saved_location_arr,
          );
        } else {
          if (obj.account_active_status == 'deactivate') {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          }

          if (obj.acount_delete_status == 'deactivate') {
            config.checkUserDelete(this.props.navigation);
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
        } else {
          msgProvider.alert(
            Lang_chg.msgTitleServerNotRespond[config.language],
            Lang_chg.serverNotRespond[config.language],
            false,
          );
        }
      });
  };


  export default deleteLocation