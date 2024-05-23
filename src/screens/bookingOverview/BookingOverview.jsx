import React, {useEffect, useMemo, useState} from 'react';
import {TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import locationMark from '../../assets/icons/bookingOverview/locationMark.png';
import car from '../../assets/icons/bookingOverview/carImage.png';
import CrossoverElement from '../../components/bookingOverview/crossoverElement';
import BookingOverviewTextDetails from '../../components/bookingOverview/BookingOverviewTextDetails';
import Button from '../../components/mainButton/Button';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import {useRecoilState} from 'recoil';
import {reverseSortDate} from '../../utlites/sortDate';
import {config} from '../../Provider/configProvider';
import SelectVehicle from '../../components/selectVehicle/SelectVehicle';
import {Lang_chg} from '../../Provider/Language_provider';
import subTotalAtom from "../../atoms/subTotal/subTotal.atom";
import applyCoupon from '../../Features/applyCoupon/applyCoupon';

const BookingOverview = ({navigation,route}) => {
  const [bookingDetails, setBookingDetails] =
    useRecoilState(bookingDetailsAtom);
  let date = new Date(reverseSortDate(bookingDetails.booking_date));
  const [coupon, setCoupon] = useState();
  const extraServiceData = useMemo(()=>{
    let extraData = []  
    for (let key in bookingDetails?.extraData?.extraServices) {
      extraData.push( bookingDetails?.extraData?.extraServices[key])
     }
     return extraData
  },[]) 
  console.log(extraServiceData , "rfoijdfokgpndfjgn")

  useEffect(()=>{
   if(coupon?.couponName == "") { 
      setCoupon()
       setBookingDetails({
                  ...bookingDetails,
                  coupon_id: "NA",
                  discount_amount: "NA",
                });
   }
  },[coupon])
  useEffect(()=>{
    setBookingDetails({
                  ...bookingDetails,
                 total_amount : route.params.price
                });
  },[])

  return (
    <View className={'pt-[90px] px-5'}>
      <ScrollView className={'pb-16'}>
        <View className={'bg-mainColor py-4 w-full rounded'}>
          <Text className={'font-bold text-center text-lg'}>
            {date.toLocaleDateString(
              {language: 'en'},
              {month: 'short', year: 'numeric', day: 'numeric'},
            )}{' '}
            , {bookingDetails.booking_time}
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            className={
              'bg-white py-4 px-3 w-full rounded mt-4 flex flex-row items-center mb-6'
            }>
            <Image source={locationMark} className={'w-6 h-6 mr-4'} />
            <Text className={'font-bold text-lg mr-2'}>
              {config.language === 0 ? 'Location' : 'الموقع'}:
            </Text>
            <Text className={'text-mainColor'}>
              {bookingDetails.address_loc}
            </Text>
          </View>
        </ScrollView>
        <SelectVehicle car={bookingDetails.extraData.car} />
        <View className={'mt-4 py-2 px-6 w-full bg-white rounded-lg'}>
          <BookingOverviewTextDetails
            title={'services'}
            value={
              bookingDetails.extraData.service.service_name[config.language]
            }
            price={`${bookingDetails.extraData.service.service_price} EGP`}
          />
          <View
            className={
              'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
            }></View>
            {
              extraServiceData.map((extraService)=>{
                return (
                   <>
              <BookingOverviewTextDetails
                title={""}
                value={extraService.extra_service_name[config.language]}
                price={` ${extraService.quantity} X ${extraService.extra_service_price} = ${extraService.quantity * extraService.extra_service_price}EGP`}
              />
              <View
                className={
                  'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
                }></View>
            </>
                )
              })
            }
          {coupon?.couponName != '' && coupon && (
            <>
              <BookingOverviewTextDetails
                title={'Coupon'}
                value={coupon.couponName}
                price={`-${coupon.dis_amount }`}
              />
              <View
                className={
                  'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
                }></View>
            </>
          )}
        </View>
        <View
          className={
            'bg-mainColor py-4 w-full rounded mt-4 flex flex-row justify-between px-4'
          }>
          <Text className={'font-bold text-center text-lg'}>
            {Lang_chg.totalservicecharges_txt[config.language]}
          </Text>
          <Text className={'font-bold text-center text-lg'}>
            {coupon?.total_amount ? coupon?.total_amount :bookingDetails.total_amount} EGP
          </Text>
        </View>
        <View
          className={
            'bg-white items-center w-full rounded mt-4 flex flex-row justify-between px-4 border-2 border-[#C3C3C3] mb-1'
          }>
          <TextInput
            className={`h-[40px] w-[70%] font-bold pr-4 border-r border-r-[#C3C3C3] ${
              config.language === 0
                ? 'placeholder:text-left'
                : 'placeholder:text-right'
            }`}
            placeholder={Lang_chg.enter_promo_code[config.language]}
            placeholderTextColor={'#C3C3C3'}
            onChange={e => {
              setCoupon({
                ...coupon,
                couponName: e.nativeEvent.text,
              });
            }}
          />
          <View className={'w-[25%]'}>
            <Button
              Title={Lang_chg.Apply[config.language]}
              onPress={async () => {
                let res = await applyCoupon(
                  bookingDetails.total_amount,
                  coupon.couponName,
                );

                setCoupon({
                  ...coupon,
                  dis_amount: res.dis_amount,
                  total_amount: res.total_amount,
                });
                setBookingDetails({
                  ...bookingDetails,
                  coupon_id: res.coupan_id,
                  discount_amount: res.dis_amount,
                });
              }}
            />
          </View>
        </View>
        <Button
          Title={Lang_chg.confirm_booking[config.language]}
          btnStyle={'font-semibold text-lg'}
          onPress={() => navigation.navigate('PaymentMethod')}
        />
        <Button
          Title={Lang_chg.cancelBooking_txt[config.language]}
          secondStyle={true}
          textColor={'#dd9923'}
          btnStyle={'font-semibold text-lg'}
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <View className={'py-3'}></View>
      </ScrollView>
    </View>
  );
};

export default BookingOverview;
