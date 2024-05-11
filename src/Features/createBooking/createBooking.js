  cashBooking = async () => {
    var vehicle_data = await localStorage.getItemObject('booking_vehicle_arr');
    var location_data = await localStorage.getItemObject('location_arr');
    var all_service_data = await localStorage.getItemObject(
      'booking_service_arr',
    );
    let service_data = all_service_data.service_data;
    var extra_service_all_id = [];
    let extra_service_data = all_service_data.extra_service_data;
    for (let i = 0; i < extra_service_data.length; i++) {
      extra_service_all_id[i] = extra_service_data[i].extra_service_id;
    }
    let extra_id = extra_service_all_id.toString();
    var vat_data = await localStorage.getItemObject('vat_data');
    var slot_data = await localStorage.getItemObject('booking_time_slots');
    var discount_arr = await localStorage.getItemObject('discount_arr');
    this.setState({bookingPrice: discount_arr.new_amount});
    var user_arr = await localStorage.getItemObject('user_arr');
    this.setState({user_id: user_arr.user_id});

    var data = new FormData();
    data.append('user_id', user_arr.user_id);
    data.append('vehicle_id', vehicle_data.vehicle_id);
    data.append('free_status', slot_data.free_status); // false=0 true=1 is Free
    data.append('service_id', service_data.service_id);
    data.append('service_price', service_data.service_price);
    data.append('extra_service_id', extra_id);
    data.append('extra_service_price', all_service_data.extra_service_amount);
    data.append('sub_total', all_service_data.subTotal);
    data.append('vat_amount', vat_data.amount); //no validation 
    data.append('vat_per', vat_data.commission_amt);// no valiation 
    data.append('service_boy_id', slot_data.service_boy_id); 
    data.append('total_price', this.state.bookingPrice);
    data.append('coupan_id', discount_arr.coupan_id);
    data.append('discount_amount', discount_arr.dis_amount);
    data.append('service_time', all_service_data.totalServiceTime);// selected srvice time + extra service time 
    data.append('address_loc', location_data.location);
    data.append('latitude', location_data.latitude);
    data.append('longitude', location_data.longitude);
    data.append('booking_date', slot_data.booking_date);
    data.append('booking_time', slot_data.booking_time);
    data.append('area_id', slot_data.area_id);
    data.append('note', all_service_data.notes);
    data.append('payment_method', this.state.payment_method);
    data.append('wallet_amount', this.state.redemwallet);
    data.append('online_amount', this.state.netpay);
    let url = config.baseURL + 'create_booking';

    console.log(data , "dataaa booking")

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
  };