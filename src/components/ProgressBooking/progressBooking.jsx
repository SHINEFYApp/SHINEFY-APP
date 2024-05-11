import { Text, View } from "react-native-ui-lib";
import BookingCard from "../BookingCard/bookingCard";
import { ScrollView } from "react-native-gesture-handler";
import EmptyBooking from "../emptyBooking/emptyBooking";

export default function ProgressBooking() {
    const data = [1]
    return (
        <>
            {
                data.length == 0 ?
                    <EmptyBooking /> :

                    <ScrollView className="mt-4">
                        <BookingCard progress={"in progress"} ButtonTitle="Accepted" />
                    </ScrollView>
            }
        </>
    )
}