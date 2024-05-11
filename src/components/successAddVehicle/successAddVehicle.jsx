import { Image, Text, View } from "react-native-ui-lib";
import img from '../../assets/addVehicle.png'
export default function SuccessAddVehicle({closePopUp}) {
    return (
        <View className="bg-white w-11/12 mx-auto p-4 rounded-2xl">
            <View className="items-center">
                <Text className=" text-3xl font-bold mt-5">Congratulation</Text>
                <Text className=" text-xl  my-5">Your vehicle added successfully</Text>
                <Image className="my-4" source={img}/>
            </View>
        </View>
    )
}