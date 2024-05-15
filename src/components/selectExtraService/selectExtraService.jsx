import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import img from '../../assets/extraService.png';
import globalStyle from '../../assets/globalStyle';
import {config} from '../../Provider/configProvider';
import { useRecoilState } from 'recoil';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import { msgProvider } from '../../Provider/Messageconsolevalidationprovider/messageProvider';
export default function SelectExtraService({extraService}) {
  const [bookingDetails, setBookingDetails] = useRecoilState(bookingDetailsAtom)
  const [counter, setCounter] = useState(0);
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
                }else {
                  setCounter(counter + 1);
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
