import { Keyboard } from "react-native";
import { atom } from "recoil";
import { localStorage } from "../Provider/localStorageProvider";


async function getValue() {
    let storageValue = await localStorage.getItemObject('user_arr')
    let value = false
    if(storageValue?.user_id == "0000") {
        value = true
    }
    return value
}


const isGuestAtom = atom({
    default:getValue(), 
    key : "isGuestAtomm"
})

export default isGuestAtom