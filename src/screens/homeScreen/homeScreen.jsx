import React, {useEffect, useState} from 'react';
import {Image, Text, View, KeyboardAwareScrollView} from 'react-native-ui-lib';
import {FlatList, ScrollView} from 'react-native';
import SearchInput from '../../components/searchInput/searchInput';
import SaleBox from '../../components/saleBox/saleBox';
import locationIcon from '../../assets/icons/locationIcon.png';
import WashServicesCard from '../../components/washServicesCard/washServicesCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MapComponent from '../../components/mapComponent/mapComponent';
import {localStorage} from '../../Provider/localStorageProvider';
import getServices from '../../Features/getServices/getServices';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import PackageCard from '../../components/packageCard/packageCard';
import getPackages from '../../Features/getPackages/getPackages';

export default function HomeScreen({navigation}) {
  const [services, SetServices] = useState([]);
  const [specialOffers, SetSpecialOffers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getServices();
      const packages = await getPackages();
      SetServices(data.all_service_arr.service_arr);
      setPackages(packages.packages);
      SetSpecialOffers(data.all_service_arr.extra_service_arr);
      localStorage.setItemObject('services', data.all_service_arr);
    };
    fetchData();
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View style={{paddingTop: insets.top + 70}} className="px-4">
        <SearchInput
          placeholder={Lang_chg.what_looking_for_placholder[config.language]}
          onChange={t => setSearchText(t)}
          value={searchText}
        />
      </View>
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
          horizontal
          className="px-3 mt-3"
          showsHorizontalScrollIndicator>
          {specialOffers?.map(offer => {
            return (
              <SaleBox
                key={offer.extra_service_id}
                navigation={navigation}
                offer={offer}
              />
            );
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
              navigation.navigate('PackageScreen');
            }}>
            {Lang_chg.see_all[config.language]}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          className="pl-3 mt-3"
          showsHorizontalScrollIndicator={false}>
          {packages.map(pack => {
            return (
              <View key={pack.id} className="w-[350px]">
                <PackageCard pack={pack} navigation={navigation} />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View className={'p-4'}>
        <View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image className="w-10 h-6" source={locationIcon} />
              <Text className="font-bold text-lg">
                {Lang_chg.location_text[config.language]}
              </Text>
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
          <Text className="text-[#000] text-xl ">
            {Lang_chg.wash_services[config.language]}
          </Text>
          <Text
            className="text-mainColor flex-1 text-right"
            onPress={() => {
              navigation.navigate('WashServicesScreen');
            }}>
            {Lang_chg.see_all[config.language]}
          </Text>
        </View>
        <FlatList
          data={services.concat(specialOffers)}
          horizontal={true}
          renderItem={({item, index}) => (
            <WashServicesCard
              // key={item.service_id}
              navigation={navigation}
              id={index}
              keyObj=""
              service={item}
            />
          )}
        />
        {/* <ScrollView
          className="px-3 mt-3"
          horizontal
          showsHorizontalScrollIndicator>
          {services?.map((service, index) => {
            return (
              <WashServicesCard
                key={service.service_id}
                navigation={navigation}
                id={index}
                service={service}
              />
            );
          })}
        </ScrollView> */}
      </View>
    </KeyboardAwareScrollView>
  );
}
