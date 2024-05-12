import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Image, View} from 'react-native-ui-lib';
import {config} from '../../Provider/configProvider';

const ContactUsInput = ({icon, placeholder, onChange}) => {
  return (
    <View
      className={
        'bg-transparent border border-[#c3c3c3] px-4 flex-row overflow-hidden items-center rounded-xl mt-5 h-10'
      }>
      <Image source={icon} className={'w-[20px] h-[20px]'} />
      <TextInput
        onChange={e => {
          onChange(e);
        }}
        placeholderTextColor={'#000'}
        placeholder={placeholder}
        className={`w-full px-3 text-black ${
          config.language === 0 ? 'placeholder:text-left' : 'text-right'
        }`}
      />
    </View>
  );
};

export default ContactUsInput;
