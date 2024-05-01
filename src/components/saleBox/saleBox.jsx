import { ImageBackground } from "react-native";
import { Text, View } from "react-native-ui-lib";
import WashCar from '../../assets/car-wash-detailing-station.png'
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SaleBox({offer}) {
    console.log(offer)
    return (
        <View className={"rounded-xl overflow-hidden min-w-[300px] mr-2 mb-2"}>
            <ImageBackground source={WashCar} className="p-4 relative">
                <Text className="bg-white p-1 rounded-lg inline-block w-[100px]">Limtied time!</Text>
                <Text className="text-white text-2xl mt-1 font-semibold">{offer.extra_service_name[0]}</Text>
                <View className="flex-row items-start mt-2 relative">
                <Text className="text-white text-lg">Up to </Text>
                <View>
                    <Text className="text-white text-4xl mt-2 relative">{offer.extra_service_discount}</Text>
                    <Text className="absolute items-center justify-center text-sm font-extrabold bg-mainColor -right-2 rounded-full px-1 bottom-0">%</Text>
                </View>
                </View>
                <TouchableOpacity className="bg-mainColor absolute py-2 px-4  bottom-1 right-1 rounded-lg">
                    <Text className="text-white">Claim</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}