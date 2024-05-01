import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import editIcon from '../../assets/icons/editIconVehicle.png'
import deleteIcon from '../../assets/icons/deleteIcon.png'
import img from '../../assets/vehicleCard.png'
import globalStyle from "../../assets/globalStyle";

export default function SelectVehicle ({title ,selected}) {
    return (
        <View  className={`${title=== selected ? "bg-mainColor" : "bg-white"} mx-1 rounded-xl p-2 flex-row self-baseline`} style={globalStyle.boxShadow}>
            <View className="items-center pr-2 border-r border-[#ccc] mr-5">
                <Text className="text-xl font-semibold mb-2">Cross over</Text>
                <Image source={img} />
            </View>
            <View className="gap-2 justify-end  mb-3">
                <View className="flex-row justify-between">
                    <Text className={`${title===selected ? "text-white" : "text-[#888]"}`}>PlateNumber:</Text>
                    <Text>د ق ر 6543</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className={`${title===selected ? "text-white" : "text-[#888]"}`}>Brand:</Text>
                    <Text>ABARTH</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className={`${title===selected ? "text-white" : "text-[#888]"}`}>model:</Text>
                    <Text>595 SERIES</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className={`${title===selected ? "text-white" : "text-[#888]"}`}>Color:</Text>
                    <Text>Black</Text>
                </View>
            </View>
        </View>
    )
}