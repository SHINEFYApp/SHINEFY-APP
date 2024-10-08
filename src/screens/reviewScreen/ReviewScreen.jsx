import React, {useEffect, useState} from 'react';
import {BackHandler, Text, View} from 'react-native';
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
import ReviewQuestion from '../../components/reviewQuestion/ReviewQuestion';
import getServiceBoyData from '../../Features/getServiceBoy/getServiceBoy';
import getBooking from '../../Features/getBooking/getBooking';
import { reviewBooking } from '../../Features/reviewBooking/reviewBooking';
import getUnratedBooking from '../../Features/getUnratedBooking/getUnratedBooking';

const ReviewScreen = ({route , navigation}) => {
  const [userRating, setUserRating] = useState(0);
  const [servicesBoy , setServiceBoy] = useState([])
  const [answers , setAnswers] = useState([])
  const [data , setData] = useState({})

  useEffect(()=>{
    const fetchData = async ()=>{
    
    setData(await getBooking(route.params.book_id))
    if (route.params.service_boy_id != 0) {
      setServiceBoy(await getServiceBoyData(route.params.service_boy_id))
      
    } 
    if (route.params.order_type == 0) {

      setServiceBoy(await getUnratedBooking(route.params.book_id))

    }
    }
    fetchData()
    if(route.params.isRate){

     const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      
    });



    }
  },[])



  return (
    <View className={'flex-1'}>
      <ScrollView>
        <Image source={reviewImage} className={'w-[100vw] h-[320px]'} />
        <View
          className={
            'w-full bg-white px-4 py-10 rounded-t-[50px] flex-1 -mt-12'
          }>
          <View className={'pl-5 w-fit'}>
            <View
              className={
                'bg-[#DD992345] rounded-lg p-2 self-start font-semibold text-base'
              }>
                <Text className="text-mainColor">

              {data.booking_arr?.service_name[config.language]}
                </Text>
            </View>
            <View className={'mt-8'}>
              {/* <Text className={'font-semibold text-lg'}>
                Rapid Shine Auto Spa
              </Text> */}
              <View className={'flex flex-row items-center mt-3'}>
                <Image source={locationMark} className={'w-6 h-6 mr-3'} />
                <Text className={'text-[#787575]'}>
                  {data.booking_arr?.address_loc}
                </Text>
              </View>
            </View>
          </View>
          <View
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
          </View>
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
          {
         (   route.params.order_type == 0 
            ||
            route.params.service_boy_id != 0 )
             &&
            <View className={'mt-4'}>
              <ReviewQuestion
                question={`1. ${Lang_chg.your_satisfied_with_work[config.language]}`}
                setAnswers = {setAnswers}
                questionKey = {"behavior_status"}
              />
              <ReviewQuestion
                question={
                `  2. ${Lang_chg.agian_serive_with_worker[config.language]} ${servicesBoy?.name} ${Lang_chg.agian_serive_with_worker2[config.language]}`
                }
                setAnswers = {setAnswers}
                questionKey = {"work_status"}
              />
              <ReviewQuestion
                question={
                  `3. ${Lang_chg.worker_nature_txt[config.language]} ${servicesBoy?.name} ${Lang_chg.worker_nature_txt2[config.language]}`
                }
                setAnswers = {setAnswers}
                questionKey = {"nature_status"}
              />
            </View>
          }
          <View className={'mt-12'}>
            <Button
              Title={Lang_chg.Submit[config.language]}
              btnStyle={'font-bold text-lg'}
              onPress={()=>{
                reviewBooking({
                  service_boy_id:route.params.service_boy_id , 
                  booking_id:route.params.book_id,
                  behavior_status : answers.behavior_status ,
                  work_status: answers.work_status,
                  nature_status:answers.nature_status ,
                  rating: userRating,
                  order_type :route.params.order_type ? route.params.order_type :  route.params.service_boy_id == 0 ? 1 : route.params.service_boy_id 
                },navigation)
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewScreen;
