import BookingCard from '../BookingCard/bookingCard';
import React from 'react';
import {FlatList, RefreshControl, ScrollView} from 'react-native-gesture-handler';
import EmptyBooking from '../emptyBooking/emptyBooking';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {useCallback, useState} from 'react';
import PackageCardSkeleton from '../packageCard/packageCardSkeleton';
import { View } from 'react-native-ui-lib';

export default function Bookings({navigation, bookings, currentPage,isLoading}) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <ScrollView
      className="mt-4"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {
          isLoading ?<FlatList
           data={[...Array(5).keys()]}
           renderItem={({item, index}) => (
             <View key={item.id} className="w-[350px] h-[160px] m-2">
                 <PackageCardSkeleton/>
               </View>
           )}
         /> 
         :
      <FlatList
          ListEmptyComponent={
          <EmptyBooking />
          }
          data={bookings[currentPage] != "NA" ? bookings[currentPage]?.reverse() : []}
          
          keyExtractor={item => item.booking_id}
          renderItem={({item}) => (
            <BookingCard
            book={item}
            progress={currentPage}
            ButtonTitle={
              currentPage == 'inprogress_booking'
                ? Lang_chg.accepted_txt[config.language]
                : currentPage == 'completed_booking'
                ? Lang_chg.review_txt[config.language]
                : Lang_chg.cancel[config.language]
            }
            navigation={navigation}
          />
          )}
        />
        }
  
    </ScrollView>
  );
}
