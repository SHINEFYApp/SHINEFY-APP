import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function create_package_booking (bookingDetails, navigation) {

    
    var vehicle_data = await localStorage.getItemObject('booking_vehicle_arr');
    var location_data = await localStorage.getItemObject('location_arr');
    var all_service_data = await localStorage.getItemObject('booking_service_arr',);

  var user_arr = await localStorage.getItemObject('user_arr');

  var data = new FormData();
  data.append('user_id', user_arr.user_id);
  data.append('user_package_id', bookingDetails.package_id );
  data.append('package_id', bookingDetails.package_user_id);
 
  
      bookingDetails.extraData.allSelectedCars.map((ele,index)=>{
  
        data.append(`vehicle_id[${index}]`, ele);
      })
    

  
 
  data.append('service_id', bookingDetails.service_id);
  data.append('service_time', bookingDetails.service_time); // selected srvice time + extra service time
  data.append('address_loc', bookingDetails.address_loc);
  data.append('latitude', bookingDetails.latitude);
  data.append('longitude', bookingDetails.longitude);
  let newDate = bookingDetails.booking_date.split('-');
  data.append('booking_date', `${newDate[0]}-${newDate[1]}-${newDate[2]}`);
  data.append('booking_time', bookingDetails.booking_time);
  data.append('free_status', '0'); // false=0 true=1 is Free
  data.append('extra_service_id', 'NA'); 
  data.append('payment_method', 0);
  data.append('area_id', bookingDetails.area_id);
  data.append('note', bookingDetails.notes ? bookingDetails.notes : 'NA');
  // data.append('online_amount', this.state.netpay);
  let jsonData= {}
  let url = config.baseURL + 'create_package_booking';
  
  try {
    apifuntion.postApi(url, data).then(obj => {
  
      if(obj.success == "true") {
        navigation.navigate('HomeScreen');
      }
    });
  } catch (err) {
    if (err === 'noNetwork') {
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