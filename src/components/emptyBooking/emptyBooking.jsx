import { Image, Text, View } from "react-native-ui-lib";
import emptyImage from '../../assets/emptyBooking.png'
export default function EmptyBooking() {
    return (
        <View className="items-center justify-center flex-1">
            <Text>No Booking added Yet</Text>
            <Image source={emptyImage} />
        </View>
    )
}