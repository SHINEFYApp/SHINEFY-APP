import { apifuntion } from "../../Provider/Apicallingprovider/apiProvider";
import { config } from "../../Provider/configProvider";
import { localStorage } from "../../Provider/localStorageProvider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";

export default async function editBookingLocation (data ,navigation) {
      var user_arr = await localStorage.getItemObject('user_arr');
      let user_id = user_arr.user_id;
      var fd = new FormData();
      fd.append('user_id', user_id);
      fd.append('booking_id', data.bookingId);
      fd.append('latitude', data.lat);
      fd.append('longitude', data.lon);
      fd.append('address_loc', data.address_loc);

      let url = config.baseURL + 'edit_booking_location';
      let res = await apifuntion.postApi(url, fd)
      if(res.success== "true") {
        navigation.navigate("HomeScreen")
        msgProvider.toast("your booking location updated succesfully" , "center")
      }
}