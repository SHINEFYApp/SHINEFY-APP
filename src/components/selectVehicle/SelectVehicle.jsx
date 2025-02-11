import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import img from '../../assets/vehicleCard.png';
import globalStyle from '../../assets/globalStyle';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function SelectVehicle({car, selected, onPress}) {
  return (
    <TouchableHighlight
      underlayColor={'white'}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}>
      <View
        className={`${
          selected?.includes(car.vehicle_id) ? 'bg-mainColor' : 'bg-white'
        } w-full justify-around mx-1 rounded-xl mb-5 p-2 flex-row self-baseline items-center`}
        style={globalStyle.boxShadow}>
        <View className="items-center pr-2 border-r border-[#ccc] mr-5">
          <Text className="text-xl font-semibold mb-2">
            {car.vehicle_name[config.language]}
          </Text>
          <Image
            source={img}
            className={!onPress && 'w-[150] h-[150]'}
            resizeMode="contain"
          />
        </View>
        <View className="gap-2 mb-3">
          <View className="flex-row justify-between">
            <Text
              className={`${
                selected?.includes(car.vehicle_id) ? 'text-white' : 'text-[#888]'
              }`}>
              {Lang_chg.platenumber_txt[config.language]}:
            </Text>
            <Text>{car.plate_number != "undefined" ? car.plate_number : ""}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text
              className={`${
                selected?.includes(car.vehicle_id) ? 'text-white' : 'text-[#888]'
              }`}>
              {Lang_chg.brand_txt[config.language]}:
            </Text>
            <Text>{car.make_name[config.language]}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text
              className={`${
                selected?.includes(car.vehicle_id) ? 'text-white' : 'text-[#888]'
              }`}>
              {Lang_chg.model_txt[config.language]}:
            </Text>
            <Text> {car.model_name[config.language]}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text
              className={`${
                selected?.includes(car.vehicle_id) ? 'text-white' : 'text-[#888]'
              }`}>
              {Lang_chg.color1_txt[config.language]}:
            </Text>
            <Text>{car.color_name[config.language]}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
