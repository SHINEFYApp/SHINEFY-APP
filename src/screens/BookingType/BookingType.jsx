import React from 'react';
import {View} from 'react-native-ui-lib';
import {Lang_chg} from '../../Provider/Language_provider';
import SelectVechileCard from '../../components/selectVechileCard.jsx/selectVechileCard';
import {config} from '../../Provider/configProvider';

export default function BookingType({navigation, route}) {
  return (
    <View className="flex-1 px-4 bg-white pt-[80]">
      <SelectVechileCard
        text={Lang_chg.normalBooking[config.language]}
        screen="RequestDetails"
        navigation={navigation}
        location={{
          params: route.params,
          BookingType: Lang_chg.normalBooking[config.language],
        }}
      />
      <SelectVechileCard
        text={Lang_chg.packageBooking[config.language]}
        screen="RequestDetails"
        navigation={navigation}
        location={{
          params: route.params,
          BookingType: Lang_chg.packageBooking[config.language],
        }}
      />
    </View>
  );
}
