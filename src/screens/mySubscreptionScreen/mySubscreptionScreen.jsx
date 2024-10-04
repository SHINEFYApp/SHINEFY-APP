import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import SaleBox from '../../components/saleBox/saleBox';
import PackageCard from '../../components/packageCard/packageCard';
import getServices from '../../Features/getServices/getServices';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import getPackages from '../../Features/getPackages/getPackages';
import getUserPackages from '../../Features/getUserPackages/getUserPackages';
import {localStorage} from '../../Provider/localStorageProvider';

export default function MySubscreptionScreen({navigation} , route) {
  const [specialOffers, SetSpecialOffers] = useState([]);
  const [packages, setPackages] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      // const data = await getServices();
      const myPackage = await getUserPackages();
      // SetSpecialOffers(data.all_service_arr.extra_service_arr);
      setPackages(myPackage.packageSubscription);
    };
    fetchData();
  }, []);
  
  return (
    <View className="pt-[10]">
      <View>
        <View className="mt-2 flex-row items-center px-4">
          <Text className="text-[#000] text-xl ">
            {Lang_chg.packages[config.language]}
          </Text>
          <Text
            className="text-mainColor flex-1 text-right"
            onPress={() => {
              navigation.navigate('PackageScreen');
            }}>
            {Lang_chg.see_all[config.language]}
          </Text>
        </View>
        <ScrollView
          className="pl-3 mt-3"
          showsHorizontalScrollIndicator={false}>
          <View className="w-[350px]">
           {packages?.map(pack => {
            return <PackageCard navigation={navigation} pack={pack} isUse={true} route={route.params} profile={true}/>;
          })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
