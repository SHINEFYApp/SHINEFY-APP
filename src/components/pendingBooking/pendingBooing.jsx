import BookingCard from "../BookingCard/bookingCard";
import { ScrollView } from "react-native-gesture-handler";
import EmptyBooking from "../emptyBooking/emptyBooking";

export default function PendingBooking({navigation}) {
    const data = [1]
    return (
        <>
            {
                data.length == 0 ?
                    <EmptyBooking />
                    :
                    <ScrollView className="mt-4">
                        <BookingCard progress={"pending"} ButtonTitle="Cancel" onPress={()=> navigation.navigate('Cancel Booking')}/>
                        <BookingCard progress={"pending"} ButtonTitle="Cancel" onPress={()=> navigation.navigate('Cancel Booking')} />
                        <BookingCard progress={"pending"} ButtonTitle="Cancel" onPress={()=> navigation.navigate('Cancel Booking')} />
                        <BookingCard progress={"pending"} ButtonTitle="Cancel" onPress={()=> navigation.navigate('Cancel Booking')} />
                        <BookingCard progress={"pending"} ButtonTitle="Cancel" onPress={()=> navigation.navigate('Cancel Booking')} />
                        
                    </ScrollView>

            }
        </>
    )
}