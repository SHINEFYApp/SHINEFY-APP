import { atom } from "recoil";

export default subTotalAtom = atom({
    key: 'subTotalAtom', // unique ID (with respect to other atoms/selectors)
    default: "0", // default value (aka initial value)
  });