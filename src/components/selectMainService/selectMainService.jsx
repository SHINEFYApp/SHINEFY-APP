import { useState } from "react";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native-ui-lib";
import img from '../../assets/extraService.png'
import globalStyle from "../../assets/globalStyle";
export default function SelectMainService({selected , title , onPress}) {
    
    return(
        <TouchableHighlight underlayColor={"white"}  onPress={()=>{
            onPress(title)
        }}>
           <View style={globalStyle.boxShadow}  className={`${selected === title ? "bg-mainColor" : "bg-white"} rounded-lg p-2 mb-3 flex-row`}>

            <Image source={img} className="mr-2"/>
            <View>
                <Text className="font-bold text-md">{title}</Text>
                <View className="flex-row gap-3 items-center mt-[1px]">
                    <Text className={`${selected === title ? "text-white" : "text-mainColor"} font-bold`}>100 EGP</Text>
                    <View className="flex-row items-center">
                       <Text className={`text-xs text-center p-1 rounded-full ${selected === title ? "text-white" : "text-mainColor"} bg-[#DD992345]  `}>Car Detailing</Text>
                    </View>
                </View>
            </View>
           </View>

        </TouchableHighlight>
    )
}