import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native-ui-lib";
import img from '../../assets/extraService.png'
import globalStyle from "../../assets/globalStyle";
export default function SelectExtraService({extraService }) {
    
    const [counter , setCounter] = useState(0)
    return(
        <View className="bg-white rounded-lg p-2 flex-row mb-3" style={globalStyle.boxShadow}>
            <Image source={img} className="mr-2"/>
            <View>
                <Text className="font-bold text-md">{extraService.extra_service_name[0]}</Text>
                <View className="flex-row gap-3 items-center mt-[1px]">
                    <Text className="text-mainColor font-bold">{extraService.extra_service_price} EGP</Text>
                    <View className="flex-row items-center">
                        <TouchableOpacity className="bg-[#DD992345] items-center px-2 rounded-md" onPress={()=> {
                            if(counter != 0) {
                                setCounter(counter-1)
                            }
                        }}>
                            <Text className="font-semibold text-xl">
                                -

                            </Text>
                        </TouchableOpacity>
                        <Text className="mx-3">{counter}</Text>
                        <TouchableOpacity className="bg-[#DD992345] items-center px-2 rounded-md" onPress={()=> {
                            
                                setCounter(counter+1)
                            
                        }}   >
                            <Text className="font-semibold text-xl">
                            +
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}