import { atom } from "recoil";
import sortDate from "../../utlites/sortDate";
    let date = new Date();

export default bookingDetails = atom({
    key: 'bookingDetails', // unique ID (with respect to other atoms/selectors)
    default: {
        booking_date: sortDate(date.toLocaleDateString("en-us")),

    }, // default value (aka initial value)
  });