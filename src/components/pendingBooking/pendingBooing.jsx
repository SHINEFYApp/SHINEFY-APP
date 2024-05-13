import BookingCard from "../BookingCard/bookingCard";
import { ScrollView } from "react-native-gesture-handler";
import EmptyBooking from "../emptyBooking/emptyBooking";

export default function PendingBooking({navigation , bookings ,currentPage}) {
    
    return (
        <>
            {
                bookings[currentPage]?.length == 0 ?
                    <EmptyBooking />
                    :
                    <ScrollView className="mt-4">
                        {
                            bookings[currentPage]?.map((book)=>{
                                return (      
                                    <BookingCard book={book} progress={currentPage} ButtonTitle={currentPage== "inprogress_booking" ? "Accepted" : currentPage == "completed_booking" ? "Review" : "Cancel"} navigation={navigation}/>
                                )
                            })
                        }
                    </ScrollView>

            }
        </>
    )
}