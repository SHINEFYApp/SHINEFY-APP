import BookingCard from "../BookingCard/bookingCard";
import { ScrollView } from "react-native-gesture-handler";
import EmptyBooking from "../emptyBooking/emptyBooking";

export default function PendingBooking({navigation , bookings}) {
    
    return (
        <>
            {
                bookings?.length == 0 ?
                    <EmptyBooking />
                    :
                    <ScrollView className="mt-4">
                        {
                            bookings?.map((book)=>{
                                return (      
                                    <BookingCard book={book} progress={"pending"} ButtonTitle="Cancel" onPress={()=> navigation.navigate('Cancel Booking' , {book_id : book.booking_id})}/>
                                )
                            })
                        }
                    </ScrollView>

            }
        </>
    )
}