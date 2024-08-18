import {Text, View} from 'react-native-ui-lib';
import React from 'react';
import SelectDateBox from '../../components/selectDateBox/selectDateBox';
import {useEffect, useState} from 'react';
import {
  Lang_chg,
  config,
  mobileW,
  msgProvider,
} from '../../Provider/utilslib/Utils';
import DateTimePicker from 'react-native-ui-datepicker';
import {StyleSheet} from 'react-native';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import {useRecoilState} from 'recoil';
import getTimeSlots from '../../Features/getTimeSlots/getTimeSlots';
import sortDate from '../../utlites/sortDate';
import SubTotalBooking from '../../components/subTotalBooking/SubTotalBooking';
import SafeAreaView from '../../components/SafeAreaView';
import Button from '../../components/mainButton/Button';
import editTimeBooking from '../../Features/reschedule/reschedule';

export default function SelectDateTime({navigation , route}) {
  const [date, setDate] = useState(Lang_chg.today_txt[config.language]);
  const [time, setTime] = useState('');
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectDate, setSelectDate] = useState(new Date());
  const [bookingDetails, setBookingDetails] =
    useRecoilState(bookingDetailsAtom);

  function handleSelectDate(selectedDate) {
    setDate(selectedDate);
    let date = new Date();
    if (selectedDate == Lang_chg.today_txt[config.language]) {
      if (isCustomDate) {
        setIsCustomDate(false);
      }
      setBookingDetails({
        ...bookingDetails,
        booking_date: sortDate(date.toLocaleDateString()),
      });
    } else if (selectedDate == Lang_chg.tomorrow_txt[config.language]) {
      if (isCustomDate) {
        setIsCustomDate(false);
      }
      setBookingDetails({
        ...bookingDetails,
        booking_date: sortDate(
          date.toLocaleDateString(date.setDate(date.getDate() + 1)),
        ),
      });
    } else if (selectedDate !== '') {
      setBookingDetails({
        ...bookingDetails,
        booking_date: sortDate(selectedDate),
      });
    }
  }
  function handleSelectTime(selectedTime) {
    setTime(selectedTime);
    setBookingDetails({
      ...bookingDetails,
      booking_time: selectedTime,
      area_id: slots.area_id,
    });
  }


  useEffect(() => {
    const fetchDate = async () => {
      setSlots(await getTimeSlots(route.params?.isEdit ? {
        longitude : route.params.longitude,
        latitude : route.params.latitude,
        booking_date : bookingDetails.booking_date,
        service_time : route.params.service_hours,
        service_price : 0
      } :bookingDetails));
    };
    fetchDate();
    setTime('');
  }, [date]);


  return (
    <SafeAreaView>
      <View className="pt-[50] px-5 relative h-full">
        <View>
          <Text className={'font-semibold my-3'}>
            {Lang_chg.Selectdatetime_txt[config.language]}
          </Text>
          <View className="flex-row justify-between">
            <SelectDateBox
              title={Lang_chg.today_txt[config.language]}
              onPress={() =>
                handleSelectDate(Lang_chg.today_txt[config.language])
              }
              selected={date}
            />
            <SelectDateBox
              title={Lang_chg.tomorrow_txt[config.language]}
              onPress={() =>
                handleSelectDate(Lang_chg.tomorrow_txt[config.language])
              }
              selected={date}
            />
            <SelectDateBox
              title={Lang_chg.Selectdatetime_txt[config.language]}
              onPress={() => {
                setIsCustomDate(true);
                setDate('');
              }}
              selected={isCustomDate}
            />
          </View>
          {isCustomDate && (
            <View className="mt-8 bg-white p-5 rounded-2xl" style={style.box}>
              <DateTimePicker
                mode="single"
                date={selectDate}
                onChange={prams => {
                  let x = new Date(prams.date);
                  handleSelectDate(x.toLocaleDateString());
                  setSelectDate(prams.date);
                }}
                selectedItemColor="#DD9923"
                headerButtonsPosition="right"
                headerButtonColor="#DD9923"
                minDate={new Date()}
                headerTextStyle={{
                  color: '#DD9923',
                }}
                calendarTextStyle={{
                  color: '#DD9923',
                  fontSize: 18,
                }}
                selectedTextStyle={{
                  fontSize: 18,
                }}
                height={mobileW - 80}
              />
            </View>
          )}
        </View>
        <View>
          <Text className={'mt-3 font-semibold'}>
            {Lang_chg.selecttime1_txt[config.language]}
          </Text>
          <View className="flex-row  flex-wrap">
            {slots?.slot_arr?.map(slot => {
              return (
                <SelectDateBox
                  key={slot.time}
                  title={slot.time}
                  onPress={handleSelectTime}
                  selected={time}
                />
              );
            })}
          </View>
        </View>
        {
          !route.params?.isEdit ?
        <View className="flex-row bg-white justify-between absolute bottom-0 right-0 w-[100vw] rounded-t-3xl">
          <SubTotalBooking
            Press={subtotal => {
              if (!bookingDetails.booking_date) {
                msgProvider.toast('Please Select Date', 'center');
                } else if (!bookingDetails.booking_time) {
                  msgProvider.toast('Please Select Time', 'center');
              } else {
                navigation.push('Booking Overview', {price: subtotal});
              }
            }}
          />
        </View> :
         <Button
          onPress={() => {
             if (!bookingDetails.booking_time) {
                msgProvider.toast('Please Select time', 'center');
              } else {
                editTimeBooking({
                  service_price : 0,
                  booking_id: route.params.book_id,
                  booking_date: bookingDetails.booking_date,
                  booking_time: bookingDetails.booking_time,
                  area_id: route.params.area_id,
                  service_time: route.params.service_hours,
                  service_boy_id: route.params.service_boy_id,
                  longitude : route.params.longitude,
                  latitude : route.params.latitude,
                  address_loc:route.params.address_loc
                },navigation)
              }
          }}
          Title={Lang_chg.reschedule_txt[config.language]}
      
        />
        }
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  box: {
    shadowColor: 'rgba(221, 153, 35, 0.3)',
    shadowOffset: {
      width: 8,
      height: 4,
    },
    shadowOpacity: 5.19,
    shadowRadius: 5.62,
    elevation: 9,
  },
});
