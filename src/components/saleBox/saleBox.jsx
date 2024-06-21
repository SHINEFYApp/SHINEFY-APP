import {ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import WashCar from '../../assets/car-wash-detailing-station.png';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function SaleBox({offer, navigation}) {
  return (
    <View className={'rounded-xl overflow-hidden min-w-[300px] mr-2 mb-2'}>
      <ImageBackground source={WashCar} className="p-4 relative">
        <Text className="bg-white p-1 rounded-lg inline-block w-[100px]">
          {Lang_chg.limited_time[config.language]}
        </Text>
        <Text className="text-white text-2xl mt-1 font-semibold">
          {offer.extra_service_name[config.language]}
        </Text>
        <View className="flex-row items-start mt-2 relative">
          <Text className="text-white text-lg">
            {Lang_chg.up_to[config.language]}
          </Text>
          <View>
            <Text className="text-white text-4xl mt-2 relative">
              {offer.extra_service_discount}
            </Text>
            <Text className="absolute items-center justify-center text-sm font-extrabold bg-mainColor -right-2 rounded-full px-1 bottom-0">
              %
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.push('SavedLocationScreen')}
          className="bg-mainColor absolute py-2 px-4  bottom-2 right-2 rounded-lg">
          <Text className="text-white">{Lang_chg.claim[config.language]}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
