import { ImageBackground } from "react-native";
import { Text, View } from "react-native-ui-lib";
import img from '../../assets/carWashing.png'

export default function WashServicesCard({page}) {
    return (
        <View className={`h-[152px] w-full overflow-hidden rounded-lg mr-2 ${page ? "w-full" : "w-[125px]"} mb-3`}>
            <ImageBackground source={img} className={'flex-1 justify-end'}>
                <Text className={'text-lg text-white pl-1 pr-4 leading-5 pb-2 bg-[#00000087]'}>Regular Car Wash</Text>
            </ImageBackground>
        </View>
    )
}