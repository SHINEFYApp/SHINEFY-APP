import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { localStorage } from "../../Provider/localStorageProvider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";

export default async function editTimeBooking(data , navigation) {
    
    var user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
      var fd = new FormData();
      fd.append('user_id', user_id);
      fd.append('booking_id', data.booking_id);
      fd.append('booking_date', data.booking_date);
      fd.append('booking_time', data.booking_time);
      fd.append('area_id', data.area_id);
      fd.append('latitude', data.latitude);
      fd.append('longitude', data.longitude);
      fd.append('service_time', data.service_time);
      fd.append('service_boy_id', data.service_boy_id);
      fd.append('address_loc', data.address_loc);


      let url = config.baseURL + 'reschedule_booking';
        try {
          let obj = await apifuntion.postApi(url, fd)
        
          if (obj.success == 'true') {
            msgProvider.toast("your booking reschedule successfuly" , "center")
            navigation.navigate("HomeScreen")
            localStorage.removeItem('reschedule_arr');
            localStorage.removeItem('user_all_bookings');
          } else {
            if (obj.slotNotAvailable == 'yes') {
              setTimeout(() => {
                msgProvider.alert(
                  Lang_chg.information[config.language],
                  obj.msg[config.language],
                  false,
                );
              }, 200);
              return false;
            }
            setTimeout(() => {
              msgProvider.alert(
                Lang_chg.information[config.language],
                obj.msg[config.language],
                false,
              );
            }, 200);
            return false;
          }
        }catch(err) {
          this.setState({loading: false});
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
        }
}