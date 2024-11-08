import {ImageBackground, Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import WashCar from '../../assets/car-wash-detailing-station.png';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function SaleBox({offer, navigation}) {
  return (
    <TouchableOpacity onPress={()=>{
      if(offer.link ) {
        navigation.navigate(offer.link)
      }
    }} className={' overflow-hidden w-[100vw] mb-2 h-[200px]'}>
      <ImageBackground source={{uri:offer.image}} className="pt-0 relative h-full" resizeMode='cover'>
        <View className="bg-[#00000059] h-[200px] w-full p-2 justify-center items-center">
          <Text className="p-1 rounded-lg inline-block text-white">
            {offer.title}
          </Text>
          <Text className=" text-2xl font-semibold text-white">
            {offer.description}
          </Text>
        </View>
    
     
      </ImageBackground>
    </TouchableOpacity>
  );
}
