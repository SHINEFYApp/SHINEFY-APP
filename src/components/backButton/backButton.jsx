import {Image, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import leftArrow from '../../assets/icons/leftArrow.png';
import {config} from '../../Provider/configProvider';
export default function BackButton({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.pop();
      }}
      className={
        'h-[30px] w-[30px] relative rounded-full left-4 top-0 items-center justify-center border-[#ccc] border z-10'
      }>
      <View>
        <Image
          source={leftArrow}
          className={`${config.language === 0 ? '' : 'rotate-180'}`}
        />
      </View>
    </TouchableOpacity>
  );
}
