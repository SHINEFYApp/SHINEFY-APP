import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import transparentSquare from '../../assets/icons/TransparentSquare.png'
import editIcon from '../../assets/icons/editIconVehicle.png'
import deleteIcon from '../../assets/icons/deleteIcon.png'
import { ImageBackground, StyleSheet } from "react-native";
import img from '../../assets/vehicleCard.png'
import Modal from 'react-native-modal';

import ConfirmationPopUp from '../../components/confirmationPopUp/ConfirmationPopUp';
import { useState } from "react";
import { useRecoilState } from "recoil";
import updateCar from "../../atoms/currentCar/currentCar";

export default function VehicleCard ({car , navigation}) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [currentCar , setCurrentCar] = useRecoilState(updateCar)
    console.log(car)

  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }

  console.log(isPopUpOpen)

    return (
        <View  className="w-full relative bg-white rounded-xl p-4 flex-row mb-7" style={style.box}>
             <Modal avoidKeyboard={true} hasBackdrop={true} isVisible={isPopUpOpen}>
        <ConfirmationPopUp
            itemId={car.vehicle_id}
          closePopUp={handleClosePopUp}
          onConfirm={() => {handleClosePopUp()}}
          heading={'Delete'}
          p={'Are you sure , you want to delete your car ?'}
          buttonTitle={'Delete'}
        />
      </Modal>
            <View className="items-center pr-2 border-r border-[#ccc] mr-5">
                <Text className="text-xl font-semibold mb-2">{car.vehicle_name[0]}</Text>
                <Image source={img} />
            </View>
            <View className="gap-2 justify-end w-1/2 mb-3">
                <View className="flex-row justify-between">
                    <Text className="text-[#888]">PlateNumber:</Text>
                    <Text>{car.plate_number}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-[#888]">Brand:</Text>
                    <Text>ABARTH</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-[#888]">model:</Text>
                    <Text>{car.model_name[0]}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-[#888]">Color:</Text>
                    <View className="flex-row gap-2">
                        <View className={`w-[20] h-[20] rounded-full`} style={{backgroundColor:car.color_code}}></View>
                        <Text>Black</Text>
                    </View>
                </View>
            </View>
           <TouchableOpacity className="absolute top-3 right-3" onPress={()=>{setIsPopUpOpen(true)}}>
            <Image source={deleteIcon}/>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{
            setCurrentCar(car)
            navigation.navigate("updateVehicle" ,"updateVehicle")
           }} className="absolute -bottom-2 pb-0 -right-2 bg-[#FFFAF2] p-2 rounded-tl-3xl" >
            <Image source={editIcon} />
           </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    box : {
        shadowColor: "#dd9923",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity:  0.19,
        shadowRadius: 5.62,
        elevation: 5
    }
})