import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Image } from "react-native-ui-lib";
import reviewImage from '../../assets/reviewImage.png';
import locationMark from '../../assets/locationMark.png'
import StarRating from "../../components/starRating/StarRating";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import messageIcon from '../../assets/icons/ContactUs/message.png'
import Button from "../../components/mainButton/Button";
import setServiceBoyData from "../../Features/reviewBooking/serviceBoyData";
import { reviewBooking } from "../../Features/reviewBooking/reviewBooking";

const ReviewScreen = ({route}) => {
    console.log(route.params.book_id)
    const [userRating, setUserRating] = useState(0);
    return <>
        <Image source={reviewImage} className={'w-[100vw] h-[320px]'} />
        <View className={'relative h-full'}>
            <View className={'w-full bg-white px-4 py-10 rounded-[50px] h-full absolute top-[-30px]'}>
                <View className={'pl-5 w-fit'}>
                    <Text className={'bg-[#DD992345] rounded-lg p-2 w-[170px] text-mainColor font-semibold text-base'}>Car Washing Service</Text>
                    <View className={'mt-8'}>
                        <Text className={'font-semibold text-lg'}>Rapid Shine Auto Spa</Text>
                        <View className={'flex flex-row items-center mt-3'}>
                            <Image source={locationMark} className={'w-6 h-6 mr-3'} />
                            <Text className={'text-[#787575]'}>198 st, Talaat Moha, Cairo, Egypt</Text>
                        </View>
                    </View>
                </View>
                <SafeAreaView className={'py-6 border-t border-t-[#C3C3C3] border-b border-b-[#C3C3C3] mt-4'}>
                    <Text className={'text-center text-[#787575]'}>Your Overall rating of this progress</Text>
                    <View className={'mx-auto mt-2'}>
                        <StarRating
                            initialRating={userRating}
                            onRatingChange={setUserRating}
                        />
                    </View>
                </SafeAreaView>
                <View className={'mt-6'}>
                    <Text className={'font-bold text-lg text-black'}>Add Detailed Review</Text>
                    <View
                        className={"bg-transparent border border-[#c3c3c3] px-4 flex-row overflow-hidden items-start rounded-xl mt-5"}>
                        <Image
                            source={messageIcon}
                            className={'w-[25px] h-[25px] mt-2'}
                        />
                        <TextInput
                            placeholderTextColor={"#818181"}
                            placeholder='Enter Here'
                            className={"w-full px-3 text-[#818181] "}
                        />
                    </View>
                </View>
                <View className={'mt-12'}>
                    <Button Title={'Submit'} btnStyle={'font-bold text-lg'} onPress={()=>{
                        reviewBooking({booking_id : route.params.book_id , rating :  userRating , service_boy_id : route.params.service_boy_id})
                    }}/>
                </View>
            </View>
        </View>
    </>;
}

export default ReviewScreen;
