import { Image, Text, View } from "react-native-ui-lib";
import Button from "../mainButton/Button";
import Img from '../../assets/cardCar.png'
import timeIcon from '../../assets/icons/timeIcon2.png'
import { StyleSheet } from "react-native";

export default function PackageCard({navigation}) {
    return (
        <View className="bg-white p-3 rounded-xl m-2" style={style.box}>
            <View className="flex-row mb-3">
                <Image source={Img} />
                <View className="flex-row justify-between ml-4 flex-1">
                        <Text className={`text-xs text-center p-1 rounded-full text-[#DD9923] bg-[#DD992345] absolute right-0 `}>Car Detailing</Text>
                    <View className="gap-2">
                        <Text className="font-bold text-xl">Shine Plus</Text>
                        <View className="flex-row items-center">
                            <Image source={timeIcon} />
                            <Text className="ml-2 font-bold">One Wash (SHINEFY Plus)</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image source={timeIcon} />
                            <Text className="ml-2">5 Other Services</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image source={timeIcon} />
                            <Text className="ml-2">30 min</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="absolute bottom-0 right-5">
                    <Button Title={"Claim"} smallButton onPress={()=>{
                        navigation.navigate("PackageDetailsScreen" , 2)
                    }}/>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    box : {
        shadowColor: "#dd9923",
        shadowOffset: {
          width: 8,
          height: 4,
        },
        shadowOpacity:  5.19,
        shadowRadius: 5.62,
        elevation: 9
    }
})