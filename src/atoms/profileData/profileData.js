import { atom } from "recoil";

export default profileData = atom({
    key: 'profileDate', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
  });