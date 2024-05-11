import { Image, Text, View } from "react-native-ui-lib";
import locationIcon from '../../assets/icons/currenLocation.png'
import editIcon from '../../assets/icons/editIcon.png'
import deleteIcon from '../../assets/icons/deleteIcon.png'
import ConfirmationPopUp from "../confirmationPopUp/ConfirmationPopUp";
import Modal from 'react-native-modal';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import deleteLocation from "../../Features/deleteLocation/deleteLocation";
export default function LocationCard({location, navigation}) {
    const [isPopUpOpenDelete , setIsPopUpOpenDelete] = useState(false)
    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate("RequestDetails" , location)
        }}> 
            <View className='flex-row items-center mx-4 my-2 pb-3 justify-between border-b border-[#c3c3c3]'>
            <Modal avoidKeyboard={true} hasBackdrop={true} isVisible={isPopUpOpenDelete}>
        <ConfirmationPopUp
          closePopUp={()=>{
            setIsPopUpOpenDelete(false)
          }}
          onConfirm={async() => {
              await deleteLocation(location.user_location_id)
          }}
          heading={'Delete Location ?'}
          p={`Are you sure , you want to Delete ${location.user_address_name} Location ? `}
          buttonTitle={'Delete'}
        />
            </Modal>
            <View className='flex-row items-center gap-5'>

                <View>
                    <Image source={locationIcon}/>
                </View>
                <View>
                    <Text className="font-bold text-lg">{location.user_address_name}</Text>
                    <Text>{location.location.length > 45 ? location.location.split(" ").slice(0 , 8).join(" ") + "....." : location.location}</Text>
                </View>
            </View>
            <View className="flex-row gap-2">
                    <TouchableOpacity onPress={()=>{
                        setIsPopUpOpenDelete(true)
                    }} source={editIcon}>
                        <Image source={deleteIcon}/>
                    </TouchableOpacity>
            </View>
            </View>
        </TouchableOpacity>
    )
}