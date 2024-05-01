import React from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import img from '../../assets/detailsCar.png';
import timeIcon from '../../assets/icons/timeIcon.png';
import Button from '../../components/mainButton/Button';

export default function PackageDetailsScreen({navigation, route}) {
  return (
    <View className="flex-1">
      <Image source={img} className="w-full" />
      <View className="bg-white flex-1 rounded-3xl px-5 py-10 -mt-2 justify-between">
        <View>
            <View className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold">
             Shine Plus
            </Text>
            <Text className="bg-mainColor text-white py-1 px-2 rounded-lg font-bold text-xl">
              200 EGP
            </Text>
            </View>
          <View className="items-start">
            <Text className="text-mainColor  bg-[#DD992345] py-1 px-2 mt-3 rounded-lg font-bold ">
              Car Detailng
            </Text>
          </View>
          <View className="py-2 border-y border-[#ccc] my-5">
            <Text>
              Lorem ipsum dolor sit amet consectetur. Nulla nisi lacinia
              molestie lectus. Nulla est iaculis hendrerit risus. Urna sagittis
              tortor proin id duis morbi. Scelerisque pulvinar eget scelerisque
              venenatis vel et nisi neque euismod.
            </Text>
          </View>
          <View>
            <Text className="text-xl font-bold mb-5">5 Other Services</Text>
          </View>
          <View className="gap-3">
            <Text className="text-xl font-bold">5 Other Services</Text>
            <Text>Car Detailing</Text>
            <Text>Exterior Cleaning</Text>
            <Text>Vacuum Cleaning</Text>
          </View>
        </View>
        <Button Title={'Book'} />
      </View>
    </View>
  );
}
