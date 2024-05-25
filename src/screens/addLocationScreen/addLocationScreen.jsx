import {View} from 'react-native-ui-lib';
import MapComponent from '../../components/mapComponent/mapComponent';
import React from 'react';

export default function AddLocationScreen({navigation}) {
  return (
    <View className="flex-1">
      <MapComponent isNewLocation={true} navigation={navigation} />
    </View>
  );
}
