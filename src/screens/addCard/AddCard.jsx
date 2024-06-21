import React from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import creditCard from '../../assets/creditCard.png';
import AddCardInput from '../../components/addCard/AddCardInput';
import {TextInput} from 'react-native';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import {useState} from 'react';
import Button from '../../components/mainButton/Button';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

const AddCard = () => {
  const [activeButton, setActiveButton] = useState();

  const toggleCheckBox = () => setActiveButton(prev => !prev);

  return (
    <View className={'mt-[90px] mx-5'}>
      <ScrollView>
        <Image
          source={creditCard}
          className={'h-[230px] w-[100%] mx-auto mb-4'}
        />
        <AddCardInput label={Lang_chg.card_holder[config.language]} />
        <AddCardInput label={Lang_chg.card_number[config.language]} />
        <View className={'flex flex-row items-center justify-center w-full'}>
          <View className={'mb-4 w-[48%] mr-2'}>
            <Text className={'font-bold text-base mb-2'}>
              {Lang_chg.expiry_date[config.language]}
            </Text>
            <TextInput
              className={
                'border-[2px] border-[#C3C3C3] rounded-lg w-full bg-white px-2 h-8'
              }
            />
          </View>
          <View className={'mb-4 w-[48%] ml-1'}>
            <Text className={'font-bold text-base mb-2'}>CVV</Text>
            <TextInput
              className={
                'border-[2px] border-[#C3C3C3] rounded-lg w-full bg-white px-2 h-8'
              }
            />
          </View>
        </View>
        <TouchableHighlight
          className="mt-3 mb-24 w-fit"
          underlayColor={'transparent'}
          onPress={toggleCheckBox}>
          <View className="flex-row gap-3 items-center">
            <View
              className={`w-[25] h-[25] border border-mainColor  rounded ${
                activeButton && 'bg-mainColor'
              }`}
            />
            <Text className={'font-bold text-base'}>
              {Lang_chg.save_card[config.language]}
            </Text>
          </View>
        </TouchableHighlight>
        <Button
          Title={Lang_chg.add_card[config.language]}
          btnStyle={'font-semibold text-base'}
        />
      </ScrollView>
    </View>
  );
};

export default AddCard;
