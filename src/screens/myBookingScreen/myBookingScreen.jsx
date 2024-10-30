import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import Bookings from '../../components/Bookings/Bookings';
import getBooking from '../../Features/getBooking/getBooking';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MyBookingScreen({navigation}) {
  const [data, setData] = useState([]);
  const [isLoading , setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('pending_booking');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let fetchData = async () => {
      setIsLoading(true)
      let data = await getBooking();

      setData(data.booking_arr);
      setIsLoading(false)

    };
    fetchData();
  }, [currentPage]);


  return (
    <View style={{paddingTop: insets.top + 10}} className=" px-4 flex-1">
      <View
        className="bg-[#FFFAF2] py-3 px-8 flex-row justify-between rounded-xl"
        style={style.tabStyle}>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('pending_booking');
          }}>
          <Text
            className={
              `${currentPage === 'pending_booking' && 'text-mainColor'} text-[12px]`
            }>
            {Lang_chg.pending_txt[config.language]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('inprogress_booking');
          }}>
          <Text
            className={
              `${currentPage === 'inprogress_booking' && 'text-mainColor'} text-[12px]`
            }>
            {Lang_chg.inprogress_txt[config.language]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('completed_booking');
          }}>
          <Text
            className={
              `${currentPage === 'completed_booking' && 'text-mainColor'} text-[12px]`
            }>
            {Lang_chg.complete_txt[config.language]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('cancelled_bookings');
          }}>
          <Text
            className={
              `${currentPage === 'cancelled_bookings' && 'text-mainColor'} text-[12px]`
            }>
            {Lang_chg.cancel_by_you[config.language]}
          </Text>
        </TouchableOpacity>
      </View>
      <Bookings
        isLoading={isLoading}
        currentPage={currentPage}
        bookings={data}
        navigation={navigation}
      />
    </View>
  );
}

const style = StyleSheet.create({
  tabStyle: {
    shadowColor: '#dd9923',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 9,
  },
});
