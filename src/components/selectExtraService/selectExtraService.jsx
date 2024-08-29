import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import img from '../../assets/extraService.png';
import globalStyle from '../../assets/globalStyle';
import {config} from '../../Provider/configProvider';
import { useRecoilState } from 'recoil';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import { msgProvider } from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import calcSubTotal from '../../utlites/calcSubTotal';
export default function SelectExtraService({extraService , isPackage}) {
  const [bookingDetails, setBookingDetails] = useRecoilState(bookingDetailsAtom)
  const [counter, setCounter] = useState(0);

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
      <Image source={img} className="mr-2" />
      <View>
        <Text className="font-bold text-md">
          {extraService.extra_service_name[config.language]}
        </Text>
        <View className="flex-row gap-3 items-center mt-[1px]">
          <Text className="text-mainColor font-bold">
            {extraService.extra_service_price} EGP
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="bg-[#DD992345] items-center px-2 rounded-md"
              onPress={() => {
                if (counter != 0) {
                  setCounter(counter - 1);
                  if (counter - 1!= 0) {
                    handleExtraService(counter - 1)
                  } else {
                      setBookingDetails({
                      ...bookingDetails , 
                      extraData : {
                        ...bookingDetails.extraData ,
                        extraServices :{
                          ...bookingDetails.extraData.extraServices ,
                          [extraService.extra_service_name[0]] : null
                        } 
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
                  msgProvider.toast('Please Select Main service to Select Extra Service', 'center');     
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
