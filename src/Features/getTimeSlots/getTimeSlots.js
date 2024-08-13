import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';
import sortDate from '../../utlites/sortDate';

export default async function getTimeSlots(data) {
  var user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  let latitude = data.latitude;
  let longitude = data.longitude;
  let service_time = data.service_time;
  let amount = data.service_price;
  let date = data.booking_date;
  

  var url =
    config.baseURL +
    'get_slots/' +
    latitude +
    '/' +
    longitude +
    '/' +
    date +
    '/' +
    service_time+
    '/' +
    user_id +
    '/' +
    amount;
  let res = await apifuntion.getApi(url, 0);
  
  return res.slots_arr.date_slots;
  // .then(obj => {
  //   return obj;
  //   if (obj.success == 'true') {
  //     localStorage.setItemObject('all_slots', obj.slots_arr);
  //     localStorage.setItemObject('user_arr', obj.user_details);
  //     localStorage.setItemObject('vat_data', obj.vat_data);
  //     this.setState({
  //       slots_arr: data,
  //       booking_date: 'NA',
  //       booking_day: 'NA',
  //       booking_time: 'NA',
  //       refresh: false,
  //       free_status: obj.free_booking,
  //     });
  //     if (data.today_slots != 'Close') {
  //       this.setState({
  //         today_arr: data.today_slots,
  //         today_slots: data.today_slots.slot_arr,
  //       });
  //     } else {
  //       this.setState({today_arr: data.today_slots, today_slots: 'NA'});
  //     }

  //     if (data.tomarrow_slots != 'Close') {
  //       this.setState({
  //         tomarrow_arr: data.tomarrow_slots,
  //         tomarrow_slots: data.tomarrow_slots.slot_arr,
  //       });
  //     } else {
  //       this.setState({
  //         tomarrow_arr: data.tomarrow_slots,
  //         tomarrow_slots: 'NA',
  //       });
  //     }

  //     if (data.date_slots != 'Close') {
  //       this.setState({
  //         date_arr: data.date_slots,
  //         date_slots: data.date_slots.slot_arr,
  //       });
  //     } else {
  //       this.setState({date_arr: data.date_slots, date_slots: 'NA'});
  //     }
  //   } else {
  //     if (obj.area_status == 'NA') {
  //       this.NoAreaFound(obj.msg);
  //       return false;
  //     }
  //     msgProvider.alert(
  //       Lang_chg.information[config.language],
  //       obj.msg[config.language],
  //       false,
  //     );
  //     if (obj.acount_delete_status == 'deactivate') {
  //       config.checkUserDelete(this.props.navigation);
  //       return false;
  //     }
  //     if (obj.account_active_status == 'deactivate') {
  //       config.checkUserDeactivate(this.props.navigation);
  //       return false;
  //     }

  //     return false;
  //   }
  // })
  // .catch(err => {
  //   if (err == 'noNetwork') {
  //     msgProvider.alert(
  //       Lang_chg.msgTitleNoNetwork[config.language],
  //       Lang_chg.noNetwork[config.language],
  //       false,
  //     );
  //   } else {
  //     msgProvider.alert(
  //       Lang_chg.msgTitleServerNotRespond[config.language],
  //       Lang_chg.serverNotRespond[config.language],
  //       false,
  //     );
  //   }
  // });
}
