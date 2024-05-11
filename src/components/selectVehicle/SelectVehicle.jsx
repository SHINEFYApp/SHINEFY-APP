import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import editIcon from '../../assets/icons/editIconVehicle.png'
import deleteIcon from '../../assets/icons/deleteIcon.png'
import img from '../../assets/vehicleCard.png'
import globalStyle from "../../assets/globalStyle";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function SelectVehicle ({car ,selected , onPress}) {
    return (
        <TouchableHighlight underlayColor={"white"} onPress={()=>{
            onPress()
        }}>
            <View  className={`${car.vehicle_id === selected ? "bg-mainColor" : "bg-white"} mx-1 rounded-xl p-2 flex-row self-baseline`} style={globalStyle.boxShadow}>
                <View className="items-center pr-2 border-r border-[#ccc] mr-5">
                    <Text className="text-xl font-semibold mb-2">{car.vehicle_name[0]}</Text>
                    <Image source={img} />
                </View>
                <View className="gap-2 justify-end  mb-3">
                    <View className="flex-row justify-between">
                        <Text className={`${car.vehicle_id===selected ? "text-white" : "text-[#888]"}`}>PlateNumber:</Text>
                        <Text>{car.plate_number}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className={`${car.vehicle_id===selected ? "text-white" : "text-[#888]"}`}>Brand:</Text>
                        <Text>ABARTH</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className={`${car.vehicle_id===selected ? "text-white" : "text-[#888]"}`}>model:</Text>
                        <Text>{car.model_name[0]}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className={`${car.vehicle_id===selected ? "text-white" : "text-[#888]"}`}>Color:</Text>
                        <Text>Black</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>

    )
}