import { Image, Text, View } from "react-native-ui-lib";
import emptyImage from '../../assets/emptyBooking.png'
export default function EmptyBooking({title}) {
    return (
        <View className="items-center justify-center flex-1">
            <Text>{ title ? title : "No Booking added Yet"}</Text>
            <Image source={emptyImage} />
        </View>
    )
}