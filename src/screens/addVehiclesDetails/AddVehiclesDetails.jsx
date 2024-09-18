import {View} from 'react-native-ui-lib';
import React from 'react';
import SelectDetailsVeicles from '../../components/selectDetailsVeicles/SelectDetailsVeicles';
import Button from '../../components/mainButton/Button';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddVehiclesDetails({navigation, route}) {
  return (
    <ScrollView className="mt-[110] px-5 pb-[500]">
      <SelectDetailsVeicles title={route.params.screenTitle} />
      <Button
        Title={'DONE'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </ScrollView>
  );
}
