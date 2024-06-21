import React from 'react';
import {View} from 'react-native-ui-lib';
import RadioButton from '../../components/RadioButton/RadioButton';
import changeLanguage from '../../Features/changeLanguage/changeLanguage';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function LanguageScreen() {
  const radioButtons = [
    {
      id: 0,
      title: Lang_chg.english_txt[config.language],
    },
    {
      id: 1,
      title: Lang_chg.arabic_txt[config.language],
    },
  ];


  return (
    <View className="mt-[80] p-5">
      <RadioButton
        buttons={radioButtons}
        currentActive={
          config.language == 0
            ? Lang_chg.english_txt[config.language]
            : Lang_chg.arabic_txt[config.language]
        }
        onPress={changeLanguage}
      />
    </View>
  );
}
