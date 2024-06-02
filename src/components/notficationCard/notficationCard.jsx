import {Image, View} from 'react-native-ui-lib';
import React from 'react';
import dataIcon from '../../assets/icons/dateIcon.png';
import {Text} from 'react-native';
import {config} from '../../Provider/configProvider';

export default function NotficationCard({notfi}) {
  return (
    <View className="flex flex-row items-center justify-start my-2 pb-4 relative border-b-0.5 border-[#c3c3c3]">
      <View className="flex w-12">
        <Image source={dataIcon} />
      </View>
      <View className="flex flex-1 flex-col">
        <View className="flex items-center justify-between flex-row">
          <Text className="text-lg font-bold">
            {config.language === 0 ? notfi.title : notfi.title_2}
          </Text>
          <Text className="text-xs font-bold">{notfi.createtime}</Text>
        </View>
        <View className="flex w-full">
          <Text className="text-xs text-wrap overflow-hidden ">
            {config.language === 0 ? notfi.message : notfi.message_2}
          </Text>
        </View>
      </View>
    </View>
  );
}
