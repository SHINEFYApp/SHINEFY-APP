import {Image, Text, View} from 'react-native-ui-lib';
import Button from '../mainButton/Button';
import timeIcon from '../../assets/icons/timeIcon2.png';
import {config} from '../../Provider/configProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BookingCard({progress, ButtonTitle, navigation, book}) {

  return (
    <TouchableOpacity onPress={()=>{
      navigation.navigate("BookingDetailsScreen" , book.booking_id)
    }} className="bg-white p-3 mb-3">
      <View className="flex-row border-b pb-3 border-[#ccc] mb-3">
        <Image className="w-[100px]" resizeMode='contain' source={{uri :`${config.img_url3}${book.vehicle_image}`}} />
        <View className="flex-row justify-between ml-2 flex-1">
          <View className="gap-2 mt-2">
            <Text
              className={`text-[10px] text-center p-1 rounded-full  ${
                progress == 'pending_booking'
                  ? 'text-[#005eff] bg-[#005eff45]'
                  : progress == 'inprogress_booking'
                  ? 'text-[#5ABC7B] bg-[#5ABC7B45]'
                  : progress == 'cancelled_bookings'? 'text-[#E15249] bg-[#E1524945]' :'text-mainColor bg-[#dd992343]'
              }`} >
              {book.order_pay_type == "normal" ? Lang_chg.normalBooking[config.language] : Lang_chg.packageBooking[config.language]}
            </Text>
            <Text className="font-bold"> {book?.service_name[config.language]}</Text>
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
                  ? '#005eff'
                  : progress == 'inprogress_booking'
                  ? '#5ABC7B'
                  : progress == 'cancelled_bookings' ? '#E15249' :null
              }
              onPress={() => {
                if (progress == 'pending_booking') {
                  navigation.navigate('Cancel Booking', {
                    book_id: book.booking_id,
                  });
                } else if (progress == 'completed_booking') {
                  navigation.navigate('Review', {
                    book_id: book.booking_id,
                    service_boy_id: book.service_boy_id,
                  });
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
          <Text>{book?.booking_date}</Text>
        </View>
        <View className="gap-2 justify-center">
          <Text>{Lang_chg.total_payment[config.language]}</Text>
          <Text>{book.total_price} EGY</Text>
        </View>
      </View>
      { 
        book.status_text.length != 0 &&
        <Text className="text-center my-2">{book.status_text[config.language]}</Text>
      }
    </TouchableOpacity>
  );
}
