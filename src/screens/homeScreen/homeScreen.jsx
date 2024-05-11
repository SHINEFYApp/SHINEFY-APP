import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import SearchInput from '../../components/searchInput/searchInput';
import SaleBox from '../../components/saleBox/saleBox';
import { ScrollView } from 'react-native';
import locationIcon from '../../assets/icons/locationIcon.png';
import WashServicesCard from '../../components/washServicesCard/washServicesCard';

import MapComponent from '../../components/mapComponent/mapComponent';
import { localStorage } from '../../Provider/localStorageProvider';
import apiSauce from '../../API/apiSauce';
import getServices from '../../Features/getServices/getServices';
// import getServices from '../../Features/getServices/getServices';
export default function HomeScreen({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState({});
  const [services , SetServices] = useState([])
  const [specialOffers , SetSpecialOffers] = useState([])
  
  useEffect(()=>{
    const fetchData = async () => {
    const data =await getServices()
    SetServices(data.all_service_arr.service_arr)
    SetSpecialOffers(data.all_service_arr.extra_service_arr)
    localStorage.setItemObject("services" , data.all_service_arr)
  }
  fetchData()
  },[])


  return (
    <View className="flex-1 ">
     
      <ScrollView>
        <View className="p-4 pt-[85px]">
          <SearchInput placeholder={'what are you looking for ?'} />
        </View>
        <View>
          <View className="mt-2 flex-row items-center px-4">
            <Text className="text-[#000] text-xl ">Special Offers </Text>
            <Text className="text-mainColor flex-1 text-right" onPress={() => {
              navigation.navigate("specialOffersScreen")
            }}>See All</Text>
          </View>
          <ScrollView
            horizontal={true}
            className="pl-3 mt-3"
            showsHorizontalScrollIndicator={false}>
              {
                specialOffers?.map((offer)=>{
                  return(
                    <SaleBox offer={offer} />
                  )
                })
              }
          </ScrollView>
        </View>
        <View className={'p-4'}>
          <View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Image className="w-10 h-6" source={locationIcon} />
                <Text className="font-bold text-lg">Location</Text>
              </View>
              <Text>Cairo,Egypt</Text>
            </View>

            <View className="h-[165px] mt-1 rounded-lg overflow-hidden">
              <MapComponent />
            </View>
          </View>
        </View>
        <View className={'px-4'}>
          <View className="mt-2 flex-row items-center">
            <Text className="text-[#000] text-xl ">Wash Services </Text>
            <Text className="text-mainColor flex-1 text-right" onPress={() => {
              navigation.navigate("WashServicesScreen")
            }}>See All</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              services?.map((service , index)=> {
              
                return (
                  <WashServicesCard navigation={navigation} id={index} service={service}/>
                )
              })
            }
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
