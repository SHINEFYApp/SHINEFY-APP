import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native-ui-lib";
import BookingOverviewTextDetails from "../../components/bookingOverview/BookingOverviewTextDetails";
import locationMark from '../../assets/icons/bookingOverview/locationMark.png';
import { config } from "../../Provider/configProvider";
import SelectVehicle from "../../components/selectVehicle/SelectVehicle";
import { Lang_chg } from "../../Provider/Language_provider";
import getBooking from "../../Features/getBooking/getBooking";
import Button from "../../components/mainButton/Button";

export default function BookingDetails({route , navigation}) {
    
  
  const [bookingData , setBookingData] = useState()
  const [vehicleArr , setVehiclesArr] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await getBooking(route.params)
            setBookingData(res.booking_arr)
            if(res.booking_arr.vehicles_arr.length == 0) {
              setVehiclesArr([{
                vehicle_name : res.booking_arr.vehicle_name ,
                vehicle_id : res.booking_arr.vehicle_id ,
                vehicle_image : res.booking_arr.vehicle_image ,
                model_name : res.booking_arr.model_name,
                color_name : res.booking_arr.color_name,
                make_name : res.booking_arr.make_name
              }])
            } else {
              setVehiclesArr(res.booking_arr.vehicles_arr)
            }
        }
        fetchData()
    },[])



    return(
         <View className={'pt-[120px] px-5'}>
      <ScrollView className={'pb-16'}>
        <View className={'bg-mainColor py-4 w-full rounded'}>
          <Text className={'font-bold text-center text-lg'}>
            {bookingData?.booking_date}{' '}
            , {bookingData?.booking_time[0]}
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
              {bookingData?.address_loc}
            </Text>
          </View>
        </ScrollView>
       <FlatList
          data={vehicleArr}
          renderItem={({item}) => <SelectVehicle car={item} />}
          keyExtractor={item => item.vehicle_id}
        />
        {/* <SelectVehicle car={bookingDetails.extraData.car} /> */}
        <View className={'mt-4 py-2 px-6 w-full bg-white rounded-lg'}>
          <BookingOverviewTextDetails
            title={'services'}
            value={
              bookingData?.service_name[config.language]
            }
            price={`${bookingData?.service_price} EGP`}
          />
          <View
            className={
              'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
            }
          />
          <BookingOverviewTextDetails
            title={Lang_chg.car_txt[config.language]}
            value={Lang_chg.carsCount_txt[config.language]}
            price={`X ${vehicleArr.length} `}
          />
          <View
            className={
              'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
            }
          />
          {bookingData?.extraServiceData?.map(extraService => {
            return (
              <React.Fragment key={extraService.extra_service_id}>
                <BookingOverviewTextDetails
                  title={Lang_chg.extraservice_txt[config.language]}
                  value={extraService?.extra_service_name[config.language]}
                  price={` ${extraService.quantity} X ${
                    extraService.extra_service_price
                  } = ${
                    extraService.quantity * extraService.extra_service_price
                  }EGP`}
                />
                <View
                  className={
                    'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
                  }
                />
              </React.Fragment>
            );
          })}
    
        </View>
        <View
          className={
            'bg-mainColor py-4 w-full rounded mt-4 flex flex-row justify-between px-4'
          }>
          <Text className={'font-bold text-center text-lg'}>
            {Lang_chg.totalservicecharges_txt[config.language]}
          </Text>
          <Text className={'font-bold text-center text-lg'}>
            {bookingData?.total_price} EGP
          </Text>
        </View>
        {
          bookingData?.status == 0 ? 
        <>
        <Button
          onPress={() => {
             navigation.navigate('SavedLocationScreen', {
                    editLocation : true ,
                    book_id: bookingData.booking_id,
                    lat : bookingData.lat , 
                    lon : bookingData.lon ,
                    address_loc : bookingData.address_loc
                  });
          }}
          Title={Lang_chg.edit_location[config.language]}
      
        />
        <Button
          onPress={() => {
             navigation.navigate('SelectDateTime', {
                    book_id: bookingData.booking_id,
                    isEdit: true,
                    latitude : bookingData.lat,
                    longitude : bookingData.lon,
                    service_hours: bookingData.service_hours ,
                    service_price : 0 ,
                    area_id:bookingData.area_id,
                    service_boy_id : bookingData.service_boy_id,
                    address_loc: bookingData.address_loc
                  });
          }}
          Title={Lang_chg.reschedule_txt[config.language]}
      
        />
        <Button
          buttonColor={'#D04E46'}
          onPress={() => {
             navigation.navigate('Cancel Booking', {
                    book_id: bookingData.booking_id,
                  });
          }}
          Title={Lang_chg.cancelBooking_txt[config.language]}
      
        />
        </> : bookingData?.status == 2 && bookingData?.rating_status == 0 &&
        <Button
          onPress={() => {
             navigation.navigate('Review', {
                    book_id: bookingData.booking_id,
                    service_boy_id: bookingData.service_boy_id,
                  });
          }}
          Title={Lang_chg.ratenow_txt[config.language]}
      
        />
        }
        <View className={'py-3'} />
      </ScrollView>
    </View>
    )
}