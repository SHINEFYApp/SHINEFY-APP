import React from 'react';
import {View} from 'react-native-ui-lib';
import RadioButton from '../../components/RadioButton/RadioButton';

export default function LanguageScreen() {
  const radioButtons = [
    {
      id: 1,
      title: 'Arabic',
    },
    {
      id: 2,
      title: 'English',
    },
  ];

  return (
    <View className="mt-[80] p-5">
      <RadioButton buttons={radioButtons} currentActive={2}/>
    </View>
  );
}
