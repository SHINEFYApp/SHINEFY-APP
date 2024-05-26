import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native-ui-lib';
import Button from '../mainButton/Button';

import closeIcon from '../../assets/icons/closeIcon.png';
import deleteVehicle from '../../Features/deleteVehicle/deleteVehicle';

export default function ConfirmationPopUp({
  heading,
  p,
  onConfirm,
  icon,
  buttonTitle,
  closePopUp,
  itemId,
}) {
  async function deleteItem() {
    try {
      deleteVehicle(itemId);
    } catch (err) {}
  }

  return (
    <View className="bg-white p-5 rounded-lg ">
      <TouchableOpacity className="ml-auto my-2" onPress={closePopUp}>
        <Image source={closeIcon} />
      </TouchableOpacity>
      <Text className="text-center text-2xl font-bold">{heading}</Text>
      <Text className="text-center my-8 text-lg">{p}</Text>
      <Button
        buttonColor={'#D04E46'}
        onPress={() => {
          deleteItem();
          onConfirm();
          closePopUp();
        }}
        Title={buttonTitle}
        icon={icon && icon}
      />
    </View>
  );
}
