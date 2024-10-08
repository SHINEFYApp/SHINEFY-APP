import {Text, View} from 'react-native-ui-lib';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import Button from '../mainButton/Button';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';

import { useRecoilValue} from 'recoil';
import { useMemo} from 'react';

export default function SubTotalBooking({verfiy, nextPage, Press}) {
  const bookingDetails =
    useRecoilValue(bookingDetailsAtom);
  const totalAmount = useMemo(() => {
    let sum = +bookingDetails?.service_price;

    for (let key in bookingDetails?.extraData?.extraServices) {
      let quan = bookingDetails?.extraData?.extraServices[key]?.quantity;
      let price =
        bookingDetails?.extraData?.extraServices[key]?.extra_service_price;
      if (!price) {
        sum += 0;
      } else {
        sum += +quan * +price;
      }
    }
     if (bookingDetails?.extraData?.allSelectedCars && bookingDetails?.extraData?.allSelectedCars.length > 0  ){
      sum = sum * bookingDetails.extraData.allSelectedCars.length

    }
    return (sum);
  }, [bookingDetails])



  return (
    <View className="flex-row bg-white justify-between  w-full rounded-t-3xl p-5">
      <View>
        <Text className="text-md">{Lang_chg.subTotal[config.language]}</Text>
        <Text className="font-bold text-xl">{totalAmount ? totalAmount : 0} EGP</Text>
      </View>
      <Button
        Title={Lang_chg.continue[config.language]}
        smallButton
        onPress={() => {
          Press(totalAmount);
        }}
      />
    </View>
  );
}
