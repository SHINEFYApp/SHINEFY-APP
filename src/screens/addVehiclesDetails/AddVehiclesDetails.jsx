import {View} from 'react-native-ui-lib';
import React from 'react';
import SelectDetailsVeicles from '../../components/selectDetailsVeicles/SelectDetailsVeicles';
import Button from '../../components/mainButton/Button';

export default function AddVehiclesDetails({navigation, route}) {
  return (
    <View className="pt-[80] px-5">
      <SelectDetailsVeicles title={route.params} />
      <Button
        Title={'DONE'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}
