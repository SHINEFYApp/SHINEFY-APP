import {Image, View} from 'react-native-ui-lib';
import React from 'react';
import searchIcon from '../../assets/icons/searchIcon.png';
import {TextInput} from 'react-native';
import {config} from '../../Provider/configProvider';
export default function SearchInput({placeholder, onChange, value}) {
  return (
    <View
      className={
        'bg-white border border-[#c3c3c3] px-4 flex-row overflow-hidden items-center rounded-xl'
      }>
      <Image source={searchIcon} />
      <TextInput
        value={value}
        placeholderTextColor={'#c3c3c3'}
        placeholder={placeholder}
        className={`w-full px-3 text-black h-9 ${
          config.language === 0
            ? 'placeholder:text-left text-left'
            : 'placeholder:text-right text-right'
        }`}
        onChangeText={text => {
          onChange(text);
        }}
      />
    </View>
  );
}
