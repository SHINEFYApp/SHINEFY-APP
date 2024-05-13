import {useEffect, useState} from 'react';
import {StyleSheet, Touchable, TouchableHighlight} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import EmptyBooking from '../../components/emptyBooking/emptyBooking';
import ProgressBooking from '../../components/ProgressBooking/progressBooking';
import PendingBooking from '../../components/pendingBooking/pendingBooing';
import CompleteBooking from '../../components/completeBooking/completeBooking';
import getBookking from '../../Features/getBooking/getBooking';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function MyBookingScreen({navigation}) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState('pending_booking');

  useEffect(() => {
    let fetchData = async () => {
      let data = await getBookking();
      console.log(data.booking_arr);
      setData(data.booking_arr);
    };
    fetchData();
  }, [currentPage]);

  return (
    <View className="pt-[80] px-5 flex-1">
      <View
        className="bg-[#FFFAF2] py-3 px-8 flex-row justify-between rounded-xl"
        style={style.tabStyle}>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('pending_booking');
          }}>
          <Text
            className={
              currentPage == 'pending_booking' && 'text-mainColor font-bold'
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
              currentPage == 'inprogress_booking' && 'text-mainColor font-bold'
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
              currentPage == 'completed_booking' && 'text-mainColor font-bold'
            }>
            {Lang_chg.complete_txt[config.language]}
          </Text>
        </TouchableOpacity>
      </View>
      <PendingBooking
        currentPage={currentPage}
        bookings={data}
        navigation={navigation}
      />
      {/* {
                currentPage === "pending"
                    ? 
                        
                    :
                    currentPage === "in progress"
                        ?
                        <ProgressBooking bookings={data?.pending_booking} navigation={navigation}/>
                        :
                        <CompleteBooking navigation={navigation} bookings={data?.pending_booking}/>

            } */}
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
