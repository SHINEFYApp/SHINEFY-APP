import {Image, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import leftArrow from '../../assets/icons/leftArrow.png';
import {config} from '../../Provider/configProvider';
export default function BackButton({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      className={
        'h-[30px] w-[30px] rounded-full left-4 top-4 items-center justify-center border-[#ccc] border absolute z-10'
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
