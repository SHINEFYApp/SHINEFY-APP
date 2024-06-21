import {View} from 'react-native-ui-lib';
import React from 'react';
import Button from '../components/mainButton/Button';
import PlateInput from '../components/PlateInput';

export default function CarPlateNumberScreen({navigation, route}) {
  return (
    <View className="pt-[80] px-5">
      <PlateInput />
      <Button
        Title={'DONE'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}
