import React, {useEffect, useState} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import img from '../../assets/detailsCar.png';
import Button from '../../components/mainButton/Button';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import apiSauce from '../../API/apiSauce';
import PayTabs from '../../components/payTabs/payTabs';
import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import subscripePackage from '../../Features/subscripePackage/subscripePackage';
import SuccessAddVehicle from '../../components/successAddVehicle/successAddVehicle';
import {Alert, StyleSheet} from 'react-native';
import paymentTab from '../../Features/paymentTab/paymntTab';
import getUserPackageDetails from '../../Features/getPackageUserDetails/getPackageUserDetails';
import Bookings from '../../components/Bookings/Bookings';
import cancelPackage from '../../Features/cancelPackage/cancelPackage';

export default function MyPackageDetailsScreen({navigation, route}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('pending_booking');


  useEffect(() => {
    async function fetchDate () {

      let res = await getUserPackageDetails(route.params.packID)
      setData(res.data);
      setIsLoading(false)
    }
    fetchDate()
  }, []);

  
  return (
    <View className="flex-1">
      <ScrollView>
        <Image source={img} className="w-full" />
        <View className="bg-white flex-1  rounded-3xl px-5 py-10 -mt-2 justify-between">
          <View>
            {
              data?.can_cancel_package == 1 && 
              <Button
              buttonColor={'#D04E46'}
              onPress={() => {
                cancelPackage(data?.user_package.id, data?.user_package.package_id , navigation)
              }}
              Title={Lang_chg.cancelSubscribe_txt[config.language]}
              className="w-full"
            />
            }
           
            <View className=" mb-5 ">
              <View className="justify-between flex-row mb-3 items-center">
                <Text className="text-black text-xl font-bold">{Lang_chg.dateOfPackage[config.language]}</Text>
                <Text className="text-black">{data?.user_package.available_from}</Text>
              </View>
              <View className="justify-between flex-row mb-3 items-center">
                <Text className="text-black text-xl font-bold">{Lang_chg.dateOfPackageEnd[config.language]}</Text>
                <Text className="text-black">{data?.user_package.available_to}</Text>
              </View>
            </View>
            <View>
              <Text className="text-xl font-bold mb-5">
                {data?.extra_services?.length}{' '}
                {Lang_chg.extraservice_txt[config.language]}
              </Text>
              

              {data?.extra_services?.map(service => {
                return (
                  <View className="flex-row">
                  <Text>
                    {service.extra_service_name[config.language]
                     }
                  </Text>
                  <Text className="ml-4">
                    {service.remind_quantity
                     } {Lang_chg.of_txt[config.language]} {service.quantity}
                  </Text>

                     </View>
                );
              })}
           
            </View>
            <View className="gap-3 mt-5">
              <Text className="text-xl font-bold">
                {data?.main_services?.length}{' '}
                {Lang_chg.mainservice_txt[config.language]}
              </Text>
              {data?.main_services?.map(service => {
  
                return (
                  <View className="flex-row">
                  <Text>
                    {service.service_name[config.language]
                     }
                  </Text>
                  <Text className="ml-4">
                    {service.remind_quantity
                     } {Lang_chg.of_txt[config.language]} {service.quantity}
                  </Text>

                     </View>
                );
              })}
            </View>
          </View>
          <View
        className="bg-[#FFFAF2] py-3 px-8 flex-row justify-between rounded-xl mt-5"
        style={style.tabStyle}>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('pending_booking');
          }}>
          <Text
            className={
              `${currentPage === 'pending_booking' && 'text-mainColor'} text-[12px]`
            }>
            {Lang_chg.pending_txt[config.language]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('inprogress_booking');
          }}>
          <Text
            className={
              `${currentPage === 'inprogress_booking' && 'text-mainColor'} text-[12px]`
            }>
            {Lang_chg.inprogress_txt[config.language]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('completed_booking');
          }}>
          <Text
            className={
              `${currentPage === 'completed_booking' && 'text-mainColor'} text-[12px]`
            }>
            {Lang_chg.complete_txt[config.language]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('cancelled_bookings');
          }}>
          <Text
            className={
              `${currentPage === 'cancelled_bookings' && 'text-mainColor'} text-[12px]`
            }>
            {Lang_chg.cancel_by_you[config.language]}
          </Text>
        </TouchableOpacity>
      </View>
      <Bookings
        isLoading={isLoading}
        currentPage={currentPage}
        bookings={data?.bookings_arr}
        navigation={navigation}
      />
        </View>
      </ScrollView>
    </View>
  );
}



const style = StyleSheet.create({
  tabStyle: {
    shadowColor: '#dd9923',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 9,
  },
});

