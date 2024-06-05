import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-ui-lib';
import reviewImage from '../../assets/reviewImage.png';
import locationMark from '../../assets/locationMark.png';
import StarRating from '../../components/starRating/StarRating';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import messageIcon from '../../assets/icons/ContactUs/message.png';
import Button from '../../components/mainButton/Button';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

const ReviewScreen = () => {
  const [userRating, setUserRating] = useState(0);

  return (
    <View className={'flex-1'}>
      <ScrollView>
        <Image source={reviewImage} className={'w-[100vw] h-[320px]'} />
        <View
          className={
            'w-full bg-white px-4 py-10 rounded-t-[50px] flex-1 -mt-12'
          }>
          <View className={'pl-5 w-fit'}>
            <Text
              className={
                'bg-[#DD992345] rounded-lg p-2 w-[60%] text-mainColor font-semibold text-base'
              }>
              Car Washing Service
            </Text>
            <View className={'mt-8'}>
              <Text className={'font-semibold text-lg'}>
                Rapid Shine Auto Spa
              </Text>
              <View className={'flex flex-row items-center mt-3'}>
                <Image source={locationMark} className={'w-6 h-6 mr-3'} />
                <Text className={'text-[#787575]'}>
                  198 st, Talaat Moha, Cairo, Egypt
                </Text>
              </View>
            </View>
          </View>
          <SafeAreaView
            className={
              'py-6 border-t border-t-[#C3C3C3] border-b border-b-[#C3C3C3] mt-4'
            }>
            <Text className={'text-center text-[#787575]'}>
              {Lang_chg.your_rating[config.language]}
            </Text>
            <View className={'mx-auto mt-2'}>
              <StarRating
                initialRating={userRating}
                onRatingChange={setUserRating}
              />
            </View>
          </SafeAreaView>
          <View className={'mt-6'}>
            <Text className={'font-bold text-lg text-black'}>
              {Lang_chg.detailed_review[config.language]}
            </Text>
            <View
              className={
                'bg-transparent border border-[#c3c3c3] px-4 flex-row overflow-hidden items-center rounded-xl mt-5 py-3'
              }>
              <Image source={messageIcon} className={'w-[20px] h-[20px]'} />
              <TextInput
                placeholderTextColor={'#818181'}
                placeholder={Lang_chg.enter_here[config.language]}
                className={`w-full px-3 text-[#818181] ${
                  config.language === 0 ? 'text-left' : 'text-right'
                }`}
              />
            </View>
          </View>
          <View className={'mt-12'}>
            <Button
              Title={Lang_chg.Submit[config.language]}
              btnStyle={'font-bold text-lg'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewScreen;
