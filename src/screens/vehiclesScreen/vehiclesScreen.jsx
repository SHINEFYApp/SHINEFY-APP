import { Image, Text, View } from "react-native-ui-lib";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/mainButton/Button";
import emptyImg from '../../assets/emptyVehicle.png'
import { useEffect } from "react";
import getMyVehicles from "../../Features/getVehicles/getVehicles";

export default function VehiclesScreen() {
    const cars = [1]


    return (
        <View className="pt-[80] px-5 relative flex-1">
        
        {
            cars.length == 0 ?
            <View className='flex-1 justify-center items-center p-10'>
                <Text>No Vehicle Yet</Text>
            <Image source={emptyImg}/>
            <View className="w-full mt-10">
                <Button Title={"Add Vehicle"} />
            </View>
        </View>
            : 
            <ScrollView>
                <VehicleCard />
                <VehicleCard />
            <View>
                <Button Title={"Add Vehicle"}/>
            </View>
            </ScrollView>
        }

           
        </View>
    )
}