import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import editIcon from '../../assets/icons/editIconVehicle.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import {StyleSheet} from 'react-native';
import img from '../../assets/vehicleCard.png';
import Modal from 'react-native-modal';

import ConfirmationPopUp from '../../components/confirmationPopUp/ConfirmationPopUp';
import {useState} from 'react';
import {useSetRecoilState} from 'recoil';
import updateCar from '../../atoms/currentCar/currentCar';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import deleteVehicle from '../../Features/deleteVehicle/deleteVehicle';
import myCarsList, {fetchMyCars} from '../../atoms/carsList/myCarsList';
import addNewCar from '../../atoms/addNewCar/addNewCar';

export default function VehicleCard({car, navigation}) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const setNewCar = useSetRecoilState(addNewCar);
  const setUpdateCar = useSetRecoilState(updateCar);
  const setMyCarsList = useSetRecoilState(myCarsList);
  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }

  return (
    <View
      className="w-full relative bg-white rounded-xl p-4 flex-row mb-7"
      style={style.box}>
      <Modal avoidKeyboard hasBackdrop isVisible={isPopUpOpen}>
        <ConfirmationPopUp
          itemId={car.vehicle_id}
          closePopUp={handleClosePopUp}
          onConfirm={async () => {
            await deleteVehicle(car, car.vehicle_id);
            fetchMyCars(setMyCarsList);
            setTimeout(() => {
              handleClosePopUp();
            }, 1000);
          }}
          heading={Lang_chg.delete[config.language]}
          p={Lang_chg.sure_to_delete_car[config.language]}
          buttonTitle={Lang_chg.delete[config.language]}
        />
      </Modal>
      <View className="items-center pr-2 border-r border-[#ccc] mr-5 w-1/3">
        <Text className="text-xl font-semibold mb-2">
          {car.vehicle_name[config.language]}
        </Text>
        <Image source={img} />
      </View>
      <View className="gap-2 flex-row w-2/3 mb-3 pt-7 pr-2">
      <View>
          <Text className="text-[#888]">
            {Lang_chg.platenumber_txt[config.language]}:
          </Text>
          <Text className="text-[#888]">
            {Lang_chg.brand_txt[config.language]}:
          </Text>
          <Text className="text-[#888]">
            {Lang_chg.model_txt[config.language]}:
          </Text>
          <Text className="text-[#888]">
            {Lang_chg.color1_txt[config.language]}:
          </Text>

      </View>
      <View className="align-baseline">

          <Text>{car.plate_number != "undefined" ? car.plate_number : ""}</Text>
          <Text>{car.make_name[config.language]}</Text>
          <Text >  {car.model_name[config.language]}</Text>
        <View className="flex-row justify-between">
          <View className="flex-row gap-2">
            <View
              className={'w-[20] h-[20] rounded-full'}
              style={{backgroundColor: car.color_code}}
            />
            <Text>{car.color_name[config.language]}</Text>
          </View>
        </View>
        </View>

      </View>
      <TouchableOpacity
        className="absolute top-3 right-3 z-50"
        onPress={() => {
          setIsPopUpOpen(true);
        }}>
        <Image source={deleteIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setUpdateCar(car);
          setNewCar(car);
          navigation.push('updateVehicle', 'updateVehicle');
        }}
        className="absolute -bottom-8 pb-0 -right-2 bg-[#FFFAF2] p-2 rounded-tl-3xl">
        <Image source={editIcon} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    shadowColor: '#dd9923',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 5,
  },
});
