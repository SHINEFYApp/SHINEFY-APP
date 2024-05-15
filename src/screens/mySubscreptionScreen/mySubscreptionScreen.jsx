import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import SaleBox from '../../components/saleBox/saleBox';
import PackageCard from '../../components/packageCard/packageCard';
import getServices from '../../Features/getServices/getServices';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function MySubscreptionScreen({navigation}) {
  const [specialOffers, SetSpecialOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServices();
      SetSpecialOffers(data.all_service_arr.extra_service_arr);
      localStorage.setItemObject('services', data.all_service_arr);
    };
    fetchData();
  }, []);

  return (
    <View className="pt-[80]">
      <View>
        <View className="mt-2 flex-row items-center px-4">
          <Text className="text-[#000] text-xl ">
            {Lang_chg.special_offers[config.language]}
          </Text>
          <Text
            className="text-mainColor flex-1 text-right"
            onPress={() => {
              navigation.navigate('specialOffersScreen');
            }}>
            {Lang_chg.see_all[config.language]}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          className="pl-3 mt-3"
          showsHorizontalScrollIndicator={false}>
          {specialOffers?.map(offer => {
            return <SaleBox offer={offer} />;
          })}
        </ScrollView>
      </View>
      <View>
        <View className="mt-2 flex-row items-center px-4">
          <Text className="text-[#000] text-xl ">
            {Lang_chg.packages[config.language]}
          </Text>
          <Text
            className="text-mainColor flex-1 text-right"
            onPress={() => {
              navigation.navigate('specialOffersScreen');
            }}>
            {Lang_chg.see_all[config.language]}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          className="pl-3 mt-3"
          showsHorizontalScrollIndicator={false}>
          <View className="w-[350px]">
            <PackageCard navigation={navigation} />
          </View>
          <View className="w-[350px]">
            <PackageCard navigation={navigation} />
          </View>
          <View className="w-[350px]">
            <PackageCard navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
