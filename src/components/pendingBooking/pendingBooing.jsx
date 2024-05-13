import BookingCard from '../BookingCard/bookingCard';
import {ScrollView} from 'react-native-gesture-handler';
import EmptyBooking from '../emptyBooking/emptyBooking';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function PendingBooking({navigation, bookings, currentPage}) {
  return (
    <>
      {bookings[currentPage]?.length == 0 ? (
        <EmptyBooking />
      ) : (
        <ScrollView className="mt-4">
          {bookings[currentPage]?.map(book => {
            console.log(book)
            return (
              <BookingCard
                book={book}
                progress={currentPage}
                ButtonTitle={
                  currentPage == 'inprogress_booking'
                    ? 'Accepted'
                    : currentPage == 'completed_booking'
                    ? 'Review'
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
