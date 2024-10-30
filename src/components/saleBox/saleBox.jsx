import {ImageBackground, Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import WashCar from '../../assets/car-wash-detailing-station.png';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function SaleBox({offer, navigation}) {
  return (
    <TouchableOpacity onPress={()=>{
      Linking.openURL(offer.link)
    }} className={' overflow-hidden w-[100vw] mb-2'}>
      <ImageBackground source={{uri:offer.image}} className="p-4 relative min-h-[120px]" resizeMode='cover'>
        <Text className="p-1 rounded-lg inline-block w-[100px]">
          {offer.title}
        </Text>
        <Text className=" text-2xl mt-1 font-semibold">
          {offer.description}
        </Text>
        <View className="flex-row items-start mt-2 relative">
          {/* <Text className="text-white text-lg">
            {Lang_chg.up_to[config.language]}
          </Text> */}
          <View>
            {/* <Text className="text-white text-4xl mt-2 relative">
              {offer.extra_service_discount}
            </Text> */}
            {/* <Text className="absolute items-center justify-center text-sm font-extrabold bg-mainColor -right-2 rounded-full px-1 bottom-0">
              %
            </Text> */}
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={() => navigation.push('SavedLocationScreen')}
          className="bg-mainColor absolute py-2 px-4  bottom-2 right-2 rounded-lg">
          <Text className="text-white">{Lang_chg.claim[config.language]}</Text>
        </TouchableOpacity> */}
      </ImageBackground>
    </TouchableOpacity>
  );
}
