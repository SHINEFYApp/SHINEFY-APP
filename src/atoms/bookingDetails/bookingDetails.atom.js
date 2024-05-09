import { atom } from "recoil";

export default bookingDetails = atom({
    key: 'bookingDetails', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
  });