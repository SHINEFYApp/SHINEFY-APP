import {Image, Text, View} from 'react-native-ui-lib';
import Button from '../mainButton/Button';
import Img from '../../assets/cardCar.png';
import timeIcon from '../../assets/icons/timeIcon2.png';
import {config} from '../../Provider/configProvider';
import {Lang_chg} from '../../Provider/Language_provider';

export default function BookingCard({progress, ButtonTitle, navigation, book}) {

  console.log(book)

  return (
    <View className="bg-white p-3 mb-3">
      <View className="flex-row border-b pb-3 border-[#ccc] mb-3">
        <Image source={Img} />
        <View className="flex-row justify-between ml-2 flex-1">
          <View className="gap-2 mt-2">
            <Text
              className={`text-xs text-center p-1 rounded-full ${
                progress == 'pending_booking'
                  ? 'text-[#E15249] bg-[#E1524945]'
                  : progress == 'inprogress_booking'
                  ? 'text-[#5ABC7B] bg-[#5ABC7B45]'
                  : null
              }`}>
              {book?.service_name[config.language]}
            </Text>
            <Text className="font-bold">Rapid Shine Auto Spa</Text>
            <View className="flex-row items-center">
              <Image source={timeIcon} />
              <Text className="ml-2">30 {Lang_chg.mins[config.language]}</Text>
            </View>
          </View>

          <View className={'mt-1'}>
            <Button
              Title={ButtonTitle}
              smallButton={true}
              buttonColor={
                progress == 'pending_booking'
                  ? '#E15249'
                  : progress == 'inprogress_booking'
                  ? '#5ABC7B'
                  : null
              }
              onPress={() => {
                if (progress == 'pending_booking') {
                  navigation.navigate('Cancel Booking', {
                    book_id: book.booking_id,
                  });
                } else if (progress == 'completed_booking') {
                  navigation.navigate('Review', {book_id: book.booking_id , service_boy_id : book.service_boy_id});
                }
              }}
            />
          </View>
        </View>
      </View>
      <View className="flex-row justify-between">
        <View className="gap-2">
          <Text>{Lang_chg.order_id[config.language]}</Text>
          <Text>{book.booking_no}</Text>
        </View>
        <View className="gap-2">
          <Text>{Lang_chg.order_date[config.language]}</Text>
          <Text>{book.createtime.split(",")[0]}</Text>
        </View>
        <View className="gap-2">
          <Text>{Lang_chg.total_payment[config.language]}</Text>
          <Text>500 EGY</Text>
        </View>
      </View>
    </View>
  );
}
