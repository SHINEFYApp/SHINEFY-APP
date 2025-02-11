import {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import img from '../../assets/extraService.png';
import globalStyle from '../../assets/globalStyle';
import {config} from '../../Provider/configProvider';
import { useRecoilState } from 'recoil';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import { msgProvider } from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import calcSubTotal from '../../utlites/calcSubTotal';
import { Lang_chg } from '../../Provider/Language_provider';
export default function SelectExtraService({extraService , isPackage ,quan}) {
  const [bookingDetails, setBookingDetails] = useRecoilState(bookingDetailsAtom)
  const [counter, setCounter] = useState(0);




  useEffect(()=>{
    if(bookingDetails?.extraData?.extraServices){
      if(bookingDetails?.extraData?.extraServices[extraService?.extra_service_name[0]]){
        
        setCounter(bookingDetails?.extraData?.extraServices[extraService?.extra_service_name[0]].quantity)
      }
    } else{
      setCounter(0)
    }
  },[bookingDetails.service_id])
  
  function handleExtraService(quan) {

      setBookingDetails({
                      ...bookingDetails , 
                      extraData : {
                        ...bookingDetails.extraData ,
                        extraServices :{
                          ...bookingDetails.extraData.extraServices ,
                          [extraService.extra_service_name[0]] : {
                            ...extraService ,
                            quantity : quan
                          }
                        } 
                      }
      })
  }
  return (
    <View
      className="bg-white rounded-lg p-2 flex-row mb-3"
      style={globalStyle.boxShadow}>
      <Image source={{uri: config.img_url3 + extraService.extra_service_image}} className="mr-2 w-[70px] h-[70px]" resizeMode='contain' />
      <View>
        <Text className="font-bold text-md">
          {extraService.extra_service_name[config.language]}
        </Text>
        <View className="flex-row gap-3 items-center mt-[1px]">
          {
            isPackage ? 
          <Text className="text-mainColor font-bold">
            {extraService.remind_quantity} {Lang_chg.of_txt[config.language]} {extraService.quantity}
          </Text>
          :
            <View>
                {
                  extraService.extra_service_discount != null &&
                <Text
                  className={`
                   
                    text-mainColor
                   font-bold`}>
                  {extraService.extra_service_price} EGP
                </Text>
                }
                <Text
                  className={`
                    text-mainColor
                  } font-bold ${extraService.extra_service_discount != null && "line-through"} `}>
                  {extraService.extra_service_price_before_discount} EGP
                </Text>
              </View>
         
          }
          <View className="flex-row items-center">
            <TouchableOpacity
              className="bg-[#DD992345] items-center px-2 rounded-md"
              onPress={() => {
                if (counter != 0) {
                  setCounter(counter - 1);
                  if (counter - 1!= 0) {
                    handleExtraService(counter - 1)
                  } else {
                    
                    
                    const { [extraService.extra_service_name[0]]: _, ...newExtraData } = bookingDetails.extraData.extraServices;
                    setBookingDetails({
                    ...bookingDetails , 
                    extraData : {
                      ...bookingDetails.extraData ,
                      extraServices : newExtraData
                    }
                  })


                    
                  }
                }
              }}>
              <Text className="font-semibold text-xl">-</Text>
            </TouchableOpacity>
            <Text className="mx-3">{counter}</Text>
            <TouchableOpacity
              className="bg-[#DD992345] items-center px-2 rounded-md"
              onPress={() => {
                if (!bookingDetails['service_id']) {
                  msgProvider.toast('Please Select Main service to Select Extra Service', 'center');     
                }else if (bookingDetails.extraData.service.apply_add_extra_service == 0) {
                  msgProvider.alert(Lang_chg.disableExtraServiceTitle[config.language] , Lang_chg.disableExtraService[config.language].quantity)     
                } 
                else {
                  if(isPackage) {
                    if(extraService.remind_quantity > counter) {
                      setCounter(counter + 1);
                      handleExtraService(counter + 1)
                    } else {
                      msgProvider.toast('you select all remind extra service', 'center');     

                    }
                  }else {
                    setCounter(counter + 1);
                    handleExtraService(counter + 1)
                  }
                }
              }}>
              <Text className="font-semibold text-xl">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
