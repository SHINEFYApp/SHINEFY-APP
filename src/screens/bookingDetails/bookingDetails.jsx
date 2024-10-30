import React, { useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import BookingOverviewTextDetails from "../../components/bookingOverview/BookingOverviewTextDetails";
import locationMark from '../../assets/icons/bookingOverview/locationMark.png';
import { config } from "../../Provider/configProvider";
import SelectVehicle from "../../components/selectVehicle/SelectVehicle";
import { Lang_chg } from "../../Provider/Language_provider";
import getBooking from "../../Features/getBooking/getBooking";
import Button from "../../components/mainButton/Button";
import StarRating from "react-native-star-rating";
import { localimag, mobileW } from "../../Provider/utilslib/Utils";
import { Linking } from "react-native";


export default function BookingDetails({route , navigation}) {
    
  
  const [bookingData , setBookingData] = useState()
  const [vehicleArr , setVehiclesArr] = useState([])
  const extraServices = useMemo(()=>{
   return Object.values(bookingData?.extra_services ? bookingData?.extra_services : {})
    
  },[bookingData])

  

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


    console.log(bookingData)

    return(
         <View className={'pt-[10px] px-5'}>
      <ScrollView className={'pb-16'}>
        <View className={'bg-mainColor py-4 w-full rounded'}>
          <Text className={'font-bold text-center text-lg'}>
            {bookingData?.booking_date}{' '}
            , {bookingData?.booking_time[0]}
          </Text>
        </View>
          <View
            className={
              'bg-white py-4 px-3 w-full rounded mt-4 flex flex-row items-center mb-2'
            }>
            <Image source={locationMark} className={'w-6 h-6 mr-4'} />
            <Text className={'font-bold text-lg mr-2'}>
              {config.language === 0 ? 'Location' : 'الموقع'}:
            </Text>
            <Text className={'text-mainColor'}>
              {bookingData?.address_loc}
            </Text>
          </View>
          {
            bookingData && 
            <Button 
              secondStyle={false}
              buttonColor={bookingData.status == 3 ? "#E15249" : "#5ABC7B"}
              Title={bookingData.status == 3 ? Lang_chg.cancel_by_you[config.language] : Lang_chg.trackyourbooking_txt[config.language]}
              onPress={()=>{
                if(bookingData.status == 3) {
                  
                }else {
                  navigation.navigate("ServiceTrackingScreen" , {
                    latitude: bookingData?.lat,
                    longitude: bookingData?.lon,
                    arrive : bookingData?.arrive_status ,
                    onWay : bookingData?.on_the_way_status,
                    washingStatus : bookingData?.washing_status,
                    status : bookingData?.status,
                    bookingId: bookingData?.booking_no,
                    price :bookingData?.total_price
                  })
                }
              }}
            />
          }
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
          {
            bookingData?.note != "NA" &&
            <>
            
            <BookingOverviewTextDetails
              title={Lang_chg.note_txt[config.language]}
              value={bookingData?.note}
              price={""}
            />
            <View
              className={
                'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
              }
            />
            </>
            }
          <FlatList 
            data={extraServices}
          renderItem={({item:extraService}) => {
            
            return (
              <React.Fragment>
                <BookingOverviewTextDetails
                  title={Lang_chg.extraservice_txt[config.language]}
                  value={extraService?.extra_service_name[config.language]}
                  price={` ${extraService.extra_services_quantity} X ${
                    extraService.extra_service_price
                  } = ${
                    extraService.extra_services_quantity * extraService.extra_service_price
                  }EGP`}
                />
                <View
                  className={
                    'flex bg-[#C3C3C3] w-[80%] h-[1px] items-center my-5 mx-auto justify-center'
                  }
                />
              </React.Fragment>
            )
          }}
          keyExtractor={item => item.extra_service_id}
          />

    
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
        
        <FlatList 
        className="mt-3"
          numColumns={'4'}
          data={bookingData?.booking_images}
          renderItem={({item:bookingImage})=>{

            return (
              <Image className=" w-1/4 h-[25vw] mb-3" source={{
                uri: config.img_url3 + bookingImage.image
              }}/>
            )
          }}
          keyExtractor={(item)=>{item.booking_image_id}}
        />
        {
          bookingData?.status >= 1 && bookingData?.rating_status == 0 && bookingData?.status != 3 &&
          <View className=" bg-white p-3 mt-2 rounded ">
              <Text className="mb-3">{Lang_chg.serviceboy_txt[config.language]}</Text>
            <View className="flex-row  items-center">

              <Image className="w-[60] h-[60] " source={{uri:config.img_url3 + bookingData?.service_boy_image}}></Image>
            
            <View className="mx-2">
              <Text>{bookingData?.service_boy_name}</Text>
                <View className="flex-row">

                  <StarRating
                          containerStyle={{width: (mobileW * 22) / 100}}
                          fullStar={localimag.star_rating}
                          emptyStar={localimag.unactiverating_icon}
                          halfStarColor={'#FFC815'}
                          disabled={true}
                          maxStars={5}
                          starSize={(mobileW * 4) / 100}
                          rating={bookingData?.service_boy_rating}
                          />
                    <Text className="mx-2">({bookingData?.service_boy_rating})</Text>
                </View>
              </View>
              <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      `tel:+20${bookingData?.service_boy_phone_number}`,
                    );
                  }}
                  activeOpacity={0.7}
                  className="mx-4"
                  style={{
                
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                      <Image
                        source={localimag.active_call_icon}
                        style={{
                          height: (mobileW * 7) / 100,
                          width: (mobileW * 7) / 100,
                        }}
                      />
                </TouchableOpacity>
            </View>

          </View>
        }
        {
          bookingData?.status == 2 && bookingData?.rating_status == 1 &&
        <View className="bg-white p-3 mt-2 rounded">
            <Text>{Lang_chg.your_review[config.language]}</Text>
            <View className="flex-row mt-4">

                <StarRating
                        containerStyle={{width: (mobileW * 22) / 100}}
                        fullStar={localimag.star_rating}
                        emptyStar={localimag.unactiverating_icon}
                        halfStarColor={'#FFC815'}
                        disabled={true}
                        maxStars={5}
                        starSize={(mobileW * 4) / 100}
                        rating={bookingData?.user_rating?.rating}
                        />
                  <Text className="mx-2">({bookingData?.user_rating?.rating})</Text>
              </View>
              <View>
                <View className="flex-row justify-between items-center ">
                  <Text className="text-[10px] w-[80%] my-2">{`1. ${Lang_chg.your_satisfied_with_work[config.language]}`}</Text>
                  <Text className="text-[10px]">{bookingData?.user_rating?.behavior_status == 1 ? Lang_chg.yes_txt[config.language] : Lang_chg.no_txt[config.language]}</Text>
                </View>
                <View className="flex-row justify-between items-center ">
                  <Text className="text-[10px] w-[80%] my-2">{`2. ${Lang_chg.agian_serive_with_worker[config.language]} ${bookingData?.service_boy_name} ${Lang_chg.agian_serive_with_worker2[config.language]}`}</Text>
                  <Text className="text-[10px]">{bookingData?.user_rating?.work_status == 1 ? Lang_chg.yes_txt[config.language] : Lang_chg.no_txt[config.language]}</Text>
                </View>
                <View className="flex-row justify-between items-center ">
                  <Text className="text-[10px] w-[80%] my-2">{`3. ${Lang_chg.worker_nature_txt[config.language]} ${bookingData?.service_boy_name} ${Lang_chg.worker_nature_txt2[config.language]}`}</Text>
                  <Text className="text-[10px]">{bookingData?.user_rating?.nature_status == 1 ? Lang_chg.yes_txt[config.language] : Lang_chg.no_txt[config.language]}</Text>
                </View>
              </View>
        </View>
        }
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