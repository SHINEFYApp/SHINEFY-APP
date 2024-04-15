import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import Button from "../mainButton/Button";
import img from '../../assets/addVehicle.png'
import closeIcon from '../../assets/icons/closeIcon.png'
export default function AddVehiclePopup({closePopUp , nextScreen}) {
    return (
        <View className="bg-white w-11/12 mx-auto p-4 rounded-2xl">
            <View className="items-center">
                <TouchableOpacity className="ml-auto my-2" onPress={closePopUp}>
                    <Image source={closeIcon}/>
                </TouchableOpacity>
                <Text className=" text-2xl font-bold my-5">Wash Fast , with SHINEFY</Text>
                <Image className="my-4" source={img}/>
            </View>
            <Button Title={"ADD Your Vehicle"} onPress={()=>{
                nextScreen()
                closePopUp()
            }}/>
        </View>
    )
}