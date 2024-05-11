import React from 'react';
import {View} from 'react-native-ui-lib';
import RadioButton from '../../components/RadioButton/RadioButton';
import changeLanguage from '../../Features/changeLanguage/changeLanguage';

export default function LanguageScreen() {
  const radioButtons = [
    {
      id: 0,
      title: 'English',
    },
    {
      id: 1,
      title: 'Arabic',
    },
  ];

  return (
    <View className="mt-[80] p-5">
      <RadioButton buttons={radioButtons} currentActive={2} onPress={changeLanguage}/>
    </View>
  );
}
