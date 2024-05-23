import { Text, View } from "react-native-ui-lib";
import { Lang_chg } from "../../Provider/Language_provider";
import { config } from "../../Provider/configProvider";
import { msgProvider } from "../../Provider/Messageconsolevalidationprovider/messageProvider";
import Button from "../mainButton/Button";
import bookingDetailsAtom from "../../atoms/bookingDetails/bookingDetails.atom";

import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import subTotalAtom from "../../atoms/subTotal/subTotal.atom";

export default function SubTotalBooking({verfiy , nextPage,Press}) {

  const [bookingDetails , setBookingDetails] = useRecoilState(bookingDetailsAtom);
  const [subTotal , setSubTotal] = useState(0)
  console.log(bookingDetails?.extraData?.extraServices)
  
  useEffect(()=>{
    let sum = +bookingDetails?.service_price
    // bookingDetails?.extraData?.extraServices?.map((extra)=>{

    // })
    for (let key in bookingDetails?.extraData?.extraServices) {
      let quan = bookingDetails?.extraData?.extraServices[key]?.quantity
      let price = bookingDetails?.extraData?.extraServices[key]?.extra_service_price
      if(!price) {
        sum += 0
      } else {
        sum +=  +quan * +price
      }
  }
  setSubTotal(sum)
  },[bookingDetails])

  // useEffect(()=>{
  // setTotal(subTotal)

  // },[subTotal])

  return(
         <View className="flex-row bg-white justify-between  w-full rounded-t-3xl p-5">
        <View>
          <Text className="text-md">{Lang_chg.subTotal[config.language]}</Text>
          <Text className="font-bold text-xl">{subTotal} EGP</Text>
        </View>
        <Button
          Title={Lang_chg.continue[config.language]}
          smallButton
          onPress={() => {
            Press(subTotal)
          }}
        />
      </View>
    )
}