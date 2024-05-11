import { atom } from "recoil";

export default updateCar = atom({
    key: 'updateCar', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
  });