import { atom } from "recoil";

export default addVehiclePopUpState = atom({
    key: 'addVehiclePopUpState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });