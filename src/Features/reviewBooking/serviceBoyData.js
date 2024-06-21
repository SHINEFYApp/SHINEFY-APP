import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {config} from '../../Provider/configProvider';

export default async function setServiceBoyData(service_boy_id, booking_id) {
  var url = config.baseURL + 'getServiceBoy/' + service_boy_id;
  apifuntion
    .getApi(url)
    .then(obj => {
      if (obj.success == 'true') {
      } else {
        if (obj.account_active_status[0] == 'deactivate') {
          config.checkUserDeactivate(this.props.navigation);
          return false;
        }

        if (obj.acount_delete_status[0] == 'deactivate') {
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
}
