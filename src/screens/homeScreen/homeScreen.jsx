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
export default function HomeScreen({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState({});

  async function getServices () {
    var user_arr = await localStorage.getItemObject('user_arr');
    console.log(user_arr.user_id)
    try {
    apiSauce
        .get(`/get_user_vehicle/${user_arr.user_id}/NA`)
        .then(res => console.log(res.data))
}catch(err) {
    console.log(err)
}
  }

  useEffect(()=>{
    getServices ()
  })

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
            <SaleBox />
            <SaleBox />
            <SaleBox />
            <SaleBox />
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
            <WashServicesCard navigation={navigation} id={1} />
            <WashServicesCard navigation={navigation} id={2} />
            <WashServicesCard navigation={navigation} id={3} />
            <WashServicesCard navigation={navigation} id={4} />
            <WashServicesCard navigation={navigation} id={6} />
          </ScrollView>
        </View>
      </ScrollView>
 

    </View>
  );
}
