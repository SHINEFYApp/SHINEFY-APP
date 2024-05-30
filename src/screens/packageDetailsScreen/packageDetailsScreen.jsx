import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import img from '../../assets/detailsCar.png';
import Button from '../../components/mainButton/Button';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {ScrollView} from 'react-native-gesture-handler';
import apiSauce from '../../API/apiSauce';

export default function PackageDetailsScreen({navigation, route}) {
  console.log(route);

  useEffect(() => {
    apiSauce.get(`/get_package_details/${route}`).then(res => console.log);
  }, []);

  return (
    <View className="flex-1">
      <ScrollView>
        <Image source={img} className="w-full" />
        <View className="bg-white flex-1 rounded-3xl px-5 py-10 -mt-2 justify-between">
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-semibold">Shine Plus</Text>
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
                molestie lectus. Nulla est iaculis hendrerit risus. Urna
                sagittis tortor proin id duis morbi. Scelerisque pulvinar eget
                scelerisque venenatis vel et nisi neque euismod.
              </Text>
            </View>
            <View>
              <Text className="text-xl font-bold mb-5">
                5 {Lang_chg.other_services[config.language]}
              </Text>
            </View>
            <View className="gap-3">
              <Text className="text-xl font-bold">
                5 {Lang_chg.other_services[config.language]}
              </Text>
              <Text>Car Detailing</Text>
              <Text>Exterior Cleaning</Text>
              <Text>Vacuum Cleaning</Text>
            </View>
          </View>
          <Button Title={Lang_chg.claim[config.language]} />
        </View>
      </ScrollView>
    </View>
  );
}
