import BookingCard from '../BookingCard/bookingCard';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import EmptyBooking from '../emptyBooking/emptyBooking';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import { useCallback, useState } from 'react';

export default function PendingBooking({navigation, bookings, currentPage}) {

    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      {bookings[currentPage]?.length == 0 ? (
        <EmptyBooking />
      ) : (
        <ScrollView className="mt-4"
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          {bookings[currentPage]?.map((book , index) => {
            console.log(book)
            return (
              <BookingCard
                key={book.booking_id}
                book={book}
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
            );
          })}
        </ScrollView>
      )}
    </>
  );
}
