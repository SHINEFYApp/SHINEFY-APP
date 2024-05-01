import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import transparentSquare from '../../assets/icons/TransparentSquare.png'
import editIcon from '../../assets/icons/editIconVehicle.png'
import deleteIcon from '../../assets/icons/deleteIcon.png'
import { ImageBackground, StyleSheet } from "react-native";
import img from '../../assets/vehicleCard.png'
import Modal from 'react-native-modal';

import ConfirmationPopUp from '../../components/confirmationPopUp/ConfirmationPopUp';
import { useState } from "react";

export default function VehicleCard () {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }

  console.log(isPopUpOpen)

    return (
        <View  className="w-full relative bg-white rounded-xl p-4 flex-row mb-7" style={style.box}>
             <Modal avoidKeyboard={true} hasBackdrop={true} isVisible={isPopUpOpen}>
        <ConfirmationPopUp
          closePopUp={handleClosePopUp}
          onConfirm={() => {handleClosePopUp()}}
          heading={'Delete'}
          p={'Are you sure , you want to delete your car ?'}
          buttonTitle={'Delete'}
        />
      </Modal>
            <View className="items-center pr-2 border-r border-[#ccc] mr-5">
                <Text className="text-xl font-semibold mb-2">Cross over</Text>
                <Image source={img} />
            </View>
            <View className="gap-2 justify-end w-1/2 mb-3">
                <View className="flex-row justify-between">
                    <Text className="text-[#888]">PlateNumber:</Text>
                    <Text>د ق ر 6543</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-[#888]">Brand:</Text>
                    <Text>ABARTH</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-[#888]">model:</Text>
                    <Text>595 SERIES</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-[#888]">Color:</Text>
                    <Text>Black</Text>
                </View>
            </View>
           <TouchableOpacity className="absolute top-3 right-3" onPress={()=>{setIsPopUpOpen(true)}}>
            <Image source={deleteIcon}/>
           </TouchableOpacity>
           <TouchableOpacity className="absolute -bottom-2 pb-0 -right-2 bg-[#FFFAF2] p-2 rounded-tl-3xl" >
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