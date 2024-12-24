import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';
import sortDate from '../../utlites/sortDate';

export default async function cashBooking(bookingDetails, navigation ,setIsPopUpOpen ,setBookingDetails) {
  let extraServicesTime = 0
   if(bookingDetails?.extraData?.extraServices) {

     Object.entries(bookingDetails?.extraData?.extraServices).forEach(([key, value] , index)=>{
       let time = (value.extra_service_time * value.quantity)   
       extraServicesTime += +time
      })
    }
  var vehicle_data = await localStorage.getItemObject('booking_vehicle_arr');
  var location_data = await localStorage.getItemObject('location_arr');
  var all_service_data = await localStorage.getItemObject(
    'booking_service_arr',
  );
    var user_arr = await localStorage.getItemObject('user_arr');
    var data = new FormData();
    data.append('user_id', user_arr.user_id);
    if (bookingDetails.extraData.allSelectedCars.length == 1) {
      data.append('vehicle_id', bookingDetails.extraData.allSelectedCars[0]);
    } else if (bookingDetails.extraData.allSelectedCars.length > 1) {
      let obj = {}
      bookingDetails.extraData.allSelectedCars.map((ele,index)=>{
        obj = {
          ...obj , 
          [index]: ele 
        }
        data.append(`vehicles_ids[${index}]`, ele);
      })
      
    }
    if(bookingDetails?.extraData?.extraServices) {
      Object.entries(bookingDetails?.extraData?.extraServices).forEach(([key, value] , index)=>{
        data.append(`extra_service_id[${index}]`, value.extra_service_id);
        data.append(`extra_services_quantity[${index}]`,value.quantity);
      })
    }else {
      data.append(`extra_services_id`, "NA");
      
    }


    data.append('free_status', '0'); // false=0 true=1 is Free
    data.append('service_id', bookingDetails.service_id);
    data.append('service_price', bookingDetails.service_price);
    data.append(
      'sub_total',
      bookingDetails.total_amount
      ? bookingDetails.total_amount
      : bookingDetails.service_price,
    );
    data.append(
      'total_price',
      bookingDetails.total_amount
      ? bookingDetails.total_amount
      : bookingDetails.service_price,
    );
    data.append(
      'coupan_id',
      bookingDetails.coupon_id ? bookingDetails.coupon_id : 'NA',
    );
    data.append(
      'discount_amount',
      bookingDetails.discount_amount ? bookingDetails.discount_amount : 'NA',
    );
    data.append('service_time', (bookingDetails.service_time * bookingDetails.extraData.allSelectedCars.length) + extraServicesTime); // selected srvice time + extra service time
    data.append('address_loc', bookingDetails.address_loc);
    data.append('latitude', bookingDetails.latitude);
    data.append('longitude', bookingDetails.longitude);
    let newDate = bookingDetails.booking_date.split('-');
    data.append('booking_date', `${newDate[0]}-${newDate[1]}-${newDate[2]}`);
    data.append('booking_time', bookingDetails.booking_time);
    data.append('area_id', bookingDetails.area_id);
    data.append('note', bookingDetails.notes ? bookingDetails.notes : 'NA');
    data.append('payment_method', bookingDetails.payment_method);
    data.append('wallet_amount', bookingDetails.redemwallet ? bookingDetails.redemwallet : 0 );
    // data.append('online_amount', this.state.netpay);
    let jsonData= {}
    let url;
    if (bookingDetails.extraData.allSelectedCars.length == 1) {
      url = config.baseURL + 'create_booking';
    } else if (bookingDetails.extraData.allSelectedCars.length > 1) {
      data._parts.map((ele)=>{
        jsonData = {...jsonData , 
          [ele[0]] : ele[1]
        }
      })
      
      url = config.baseURL + 'create_booking_multi';
    }
   

    try {
      let obj = await apifuntion.postApi(url, data)

      if(obj.success == "true") {
        if(bookingDetails.payment_method == 1) {
          return obj.online_payment_url
        }else {
          setIsPopUpOpen(true)
          navigation.replace('HomeScreen')
          let date = new Date();
           setBookingDetails({
              booking_date: sortDate(date.toLocaleDateString("en-us"))
           })
          }
        } else {
          msgProvider.alert("", obj.msg[config.language])
        }

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
