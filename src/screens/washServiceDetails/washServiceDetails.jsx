import { Image, Text, View } from "react-native-ui-lib";
import img from '../../assets/detailsCar.png'
import timeIcon from '../../assets/icons/timeIcon.png'
import Button from "../../components/mainButton/Button";
export default function WashServiceDetails({ navigation, route }) {

    return (
        <View className="flex-1">
            <Image source={img} className="w-full" />
            <View className="bg-white flex-1 rounded-3xl px-5 py-10 -mt-2 justify-between">
                <View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-xl font-semibold">Rapid Shine Auto Spa {route.params.id}</Text>
                        <Text className="text-mainColor bg-[#DD992345] p-2 rounded-full font-bold">Car Washing Service</Text>
                    </View>
                    <View className="flex-row justify-between items-center my-5 border-b border-[#ccc] pb-2">
                        <View className="flex-row items-center gap-2">
                            <Image source={timeIcon} />
                            <Text className="text-lg"> 30 Mins</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-xl">200EGP  </Text>
                            <Text>/Services</Text>
                        </View>
                    </View>
                    <View className="pb-2 border-b border-[#ccc] mb-5">
                        <Text className="text-xl font-bold mb-3">Description :</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur. Nulla nisi lacinia molestie lectus. Nulla est iaculis hendrerit risus. Urna sagittis tortor proin id duis morbi. Scelerisque pulvinar eget scelerisque venenatis vel et nisi neque euismod.</Text>
                    </View>
                    <View className="gap-3">
                        <Text className="text-xl font-bold">Services :</Text>
                        <Text>Car Detailing</Text>
                        <Text>Exterior Cleaning</Text>
                        <Text>Vacuum Cleaning</Text>
                    </View>
                </View>
                <Button Title={"Book"} />
            </View>
        </View>
    )
}