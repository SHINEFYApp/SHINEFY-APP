import { Image, Text, View } from "react-native-ui-lib";
import Button from "../mainButton/Button";
import Img from '../../assets/cardCar.png'
import timeIcon from '../../assets/icons/timeIcon2.png'

export default function BookingCard({ progress, ButtonTitle }) {
    return (
        <View className="bg-white p-3 mb-3">
            <View className="flex-row border-b pb-3 border-[#ccc] mb-3">
                <Image source={Img} />
                <View className="flex-row justify-between ml-4 flex-1">
                    <View className="gap-2 mt-2">
                        <Text className={`text-xs text-center p-1 rounded-full ${progress == "pending" ? "text-[#E15249] bg-[#E1524945]" : progress == "in progress" ? "text-[#5ABC7B] bg-[#5ABC7B45]" : null}`}>Car Washing Service</Text>
                        <Text className="font-bold">Rapid Shine Auto Spa</Text>
                        <View className="flex-row items-center">
                            <Image source={timeIcon} />
                            <Text className="ml-2">30 min</Text>
                        </View>
                    </View>
                    <Button Title={ButtonTitle} smallButton buttonColor={progress == "pending" ? "#E15249" : progress == "in progress" ? "#5ABC7B" : null} />
                </View>
            </View>
            <View className="flex-row justify-between">
                <View className="gap-2">
                    <Text>Order ID</Text>
                    <Text>#CARGJNSK43</Text>
                </View>
                <View className="gap-2">
                    <Text>Order Date</Text>
                    <Text>05 Des</Text>
                </View>
                <View className="gap-2">
                    <Text>Total Payment</Text>
                    <Text>500 EGY</Text>
                </View>
            </View>
        </View>
    )
}