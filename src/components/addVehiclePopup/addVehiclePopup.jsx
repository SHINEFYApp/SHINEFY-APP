import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import Button from '../mainButton/Button';
import img from '../../assets/addVehicle.png';
import closeIcon from '../../assets/icons/closeIcon.png';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import MapComponent from '../mapComponent/mapComponent';
import { useState } from 'react';
import { getLocationName } from '../../Features/addLocation/addLocation';
import checkLocation from '../../Features/checkLocation/checkLocation';
export default function AddVehiclePopup({closePopUp, nextScreen , Map , navigation}) {
  const [currentLocation , setCurrentLocation] = useState({})
  

  
  return (
    <View className="bg-white w-full mx-auto p-4 rounded-2xl">
      <View className="items-center">
        <TouchableOpacity className="ml-auto my-2" onPress={closePopUp}>
          <Image source={closeIcon} />
        </TouchableOpacity>
        <Text className=" text-2xl font-bold my-5">
          {Lang_chg.confirm_booking_location[config.language]}
        </Text>
        {/* <Image className="my-4" source={img} /> */}
      </View>
      <View className="h-[165px] mt-1 rounded-lg overflow-hidden">
              <MapComponent setCurrentLocation={setCurrentLocation}/>
        </View>
      <Button
        Title={Lang_chg.yes_confirm[config.language]}
        onPress={async() => {
          const state = await checkLocation(currentLocation)

          if(state) {
            let location = await getLocationName(currentLocation)
            navigation.push('BookingTypeScreen', {...currentLocation ,
              location 
            });
          closePopUp();

          }
        }}
      />
      <Button
        Title={Lang_chg.no_confirm[config.language]}
        onPress={() => {
          nextScreen();
          closePopUp();
        }}
      />
    </View>
  );
}
