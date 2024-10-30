import {Image, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import dataIcon from '../../assets/icons/dateIcon.png';
import {Text} from 'react-native';
import {config} from '../../Provider/configProvider';
import { Swipeable } from 'react-native-gesture-handler';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import { notification_delete_click } from '../../Features/deleteNotfication/deleteNotfication';

export default function NotficationCard({notfi , setNotfi}) {

  return (
    <Swipeable renderLeftActions={()=>{
      return (
        <TouchableOpacity className="p-2 self-center -mt-5" onPress={()=>{
          notification_delete_click(notfi , setNotfi)
        }}>
          <Image source={deleteIcon} />
        </TouchableOpacity>
      )
    }}>

    <View className="flex flex-row items-center justify-start my-2 pb-4 relative border-b-0.5 border-[#c3c3c3]">
      <View className="flex w-12">
        <Image source={dataIcon} />
      </View>
      <View className="flex flex-1 flex-col">
        <View className="flex items-center justify-between flex-row">
          <Text className="text-lg font-bold text-black">
            {config.language === 0 ? notfi.title : notfi.title_2}
          </Text>
          <Text className="text-xs font-bold text-black">{notfi.createtime}</Text>
        </View>
        <View className="flex w-full">
          <Text className="text-xs text-wrap overflow-hidden text-black ">
            {config.language === 0 ? notfi.message : notfi.message_2}
          </Text>
        </View>
      </View>
    </View>
    </Swipeable>

  );
}
