import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';
import sortDate from '../../utlites/sortDate';

export default async function cashBooking(bookingDetails, navigation ,setIsPopUpOpen ,setBookingDetails) {
  var vehicle_data = await localStorage.getItemObject('booking_vehicle_arr');
  var location_data = await localStorage.getItemObject('location_arr');
  var all_service_data = await localStorage.getItemObject(
    'booking_service_arr',
  );
  // let service_data = all_service_data.service_data;
  // var extra_service_all_id = [];
  // let extra_service_data = all_service_data.extra_service_data;
  // for (let i = 0; i < extra_service_data.length; i++) {
    //   extra_service_all_id[i] = extra_service_data[i].extra_service_id;
    // }
    // let extra_id = extra_service_all_id.toString();
    // var vat_data = await localStorage.getItemObject('vat_data');
    // var slot_data = await localStorage.getItemObject('booking_time_slots');
    // var discount_arr = await localStorage.getItemObject('discount_arr');
    // this.setState({bookingPrice: discount_arr.new_amount});
    var user_arr = await localStorage.getItemObject('user_arr');
    // this.setState({user_id: user_arr.user_id});
    
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
        console.log(value.quantity)
        console.log(value.extra_service_id)
        data.append(`extra_service_id[${index}]`, value.extra_service_id);
        data.append(`extra_services_quantity[${index}]`,value.quantity);
      })
    }
    // data.append(`extra_service_id`, "NA");
    // data.append(`extra_service_quantity[${index}]`,value.quantity);
    data.append('free_status', '0'); // false=0 true=1 is Free
    data.append('service_id', bookingDetails.service_id);
    data.append('service_price', bookingDetails.service_price);
    data.append(
      'sub_total',
      bookingDetails.total_amount
      ? bookingDetails.total_amount
      : bookingDetails.service_price,
    );
    // data.append('vat_amount', vat_data.amount); //no validation
    // data.append('vat_per', vat_data.commission_amt);// no v/aliation
    // data.append('service_boy_id', slot_data.service_boy_id);
    data.append(
      'total_price',
      bookingDetails.total_amount
      ? bookingDetails.total_amount
      : bookingDetails.service_price,
    );
    data.append(
      'coupan_id',
      bookingDetails.coupan_id ? bookingDetails.coupan_id : 'NA',
    );
    data.append(
      'discount_amount',
      bookingDetails.dis_amount ? bookingDetails.dis_amount : 'NA',
    );
    data.append('service_time', bookingDetails.service_time); // selected srvice time + extra service time
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

    console.log(data)
    try {
      let obj = await apifuntion.postApi(url, data)
      console.log(obj)

      if(obj.success == "true") {
        if(bookingDetails.payment_method == 1) {
          return obj.online_payment_url
        }else {
          setIsPopUpOpen(true)
          // navigation.navigate('HomeScreen')
          let date = new Date();
          //  setBookingDetails({
          //     booking_date: sortDate(date.toLocaleDateString())
          //  })
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
