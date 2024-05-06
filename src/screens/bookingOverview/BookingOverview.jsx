import React from "react";
import { TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native-ui-lib";
import locationMark from '../../assets/icons/bookingOverview/locationMark.png'
import car from '../../assets/icons/bookingOverview/carImage.png'
import CrossoverElement from "../../components/bookingOverview/crossoverElement";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import BookingOverviewTextDetails from "../../components/bookingOverview/BookingOverviewTextDetails";
import Button from "../../components/mainButton/Button";

const BookingOverview = () => {
    return <View className={'pt-[90px] px-5'}>
        <ScrollView className={'pb-16'}>
            <View className={'bg-mainColor py-4 w-full rounded'}>
                <Text className={'font-bold text-center text-lg'}>28 Jan 2024 ,  09:00 AM</Text>
            </View>
            <View className={'bg-white py-4 px-3 w-full rounded mt-4 flex flex-row items-center'}>
                <Image source={locationMark} className={'w-6 h-6 mr-4'} />
                <Text className={'font-bold text-lg mr-2'}>Location:</Text>
                <Text className={'text-mainColor'}>198 st, Talaat Moha, Cairo, Egypt</Text>
            </View>
            <View className={'bg-white mt-4 py-8 px-3 w-full rounded-xl flex flex-row items-end'}>
                <View className={'w-fit pr-10 border-r border-r-[#C3C3C3]'}>
                    <Text className={'font-bold text-2xl text-center mb-3'}>Crossover</Text>
                    <Image source={car} className={'h-[135px] w-[135px]'} />
                </View>
                <View className={'w-full mx-2'}>
                    <CrossoverElement title={'plate number:'} value={'د ق ر 6543'} />
                    <CrossoverElement title={'brand:'} value={'ABARTH'} />
                    <CrossoverElement title={'model:'} value={'595 SERIES'} />
                    <CrossoverElement title={'color:'} value={'Black'} color={'#000'} />

                </View>
            </View>
            <View className={'mt-4 py-2 px-8 w-full bg-white rounded-lg'}>
                <BookingOverviewTextDetails
                    title={'services'}
                    value={'SHINIEFY Plus'}
                    price={'150.00 EGP'} />
                <View className={'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'}></View>
                <BookingOverviewTextDetails
                    title={'services'}
                    value={'SHINIEFY Plus'}
                    price={'150.00 EGP'} />
                <View className={'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'}></View>
                <BookingOverviewTextDetails
                    title={'services'}
                    value={'SHINIEFY Plus'}
                    price={'150.00 EGP'} />
            </View>
            <View className={'bg-mainColor py-4 w-full rounded mt-4 flex flex-row justify-between px-4'}>
                <Text className={'font-bold text-center text-lg'}>Total Service Charge</Text>
                <Text className={'font-bold text-center text-lg'}>500.00 EGP</Text>
            </View>
            <View className={'bg-white items-center w-full rounded mt-4 flex flex-row justify-between px-4 border-2 border-[#C3C3C3] mb-1'}>
                <TextInput
                    className={'h-[40px] w-[70%] font-bold pr-4 border-r border-r-[#C3C3C3]'}
                    placeholder="Enter Your Promo Code"
                    placeholderTextColor={'#C3C3C3'} />
                <View className={'w-[25%]'}>
                    <Button Title={'Apply'} />
                </View>
            </View>
            <Button Title={'Confirm Booking'} btnStyle={'font-semibold text-lg'} />
            <Button Title={'Cancel Booking'} secondStyle={true} textColor={"#dd9923"} btnStyle={'font-semibold text-lg'} />
            <View className={'py-3'}></View>
        </ScrollView>
    </View>
};

export default BookingOverview;
