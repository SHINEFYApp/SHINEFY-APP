import React, {useEffect, useState} from 'react';
import {Image, Text, View, KeyboardAwareScrollView} from 'react-native-ui-lib';
import {BackHandler, FlatList, ScrollView} from 'react-native';
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
import getSavedLocation from '../../Features/getSavedLocation/getSavedLocation';
import { useRecoilState } from 'recoil';
import currentMapAtom from '../../atoms/currentMap/currentMapAtom';
import PackageCardSkeleton from '../../components/packageCard/packageCardSkeleton';
import getHome from '../../Features/getHome/getHome';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import getAds from '../../Features/getAds/getAds';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import checkCodeCompanyc from '../../Features/checkCodeCompany/checkCodeCompany';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';




export default function HomeScreen({navigation}) {
  const [services, SetServices] = useState([]);
  const [specialOffers, SetSpecialOffers] = useState([]);
  const [ads, setAds] = useState([]);
  const [isPackagesLoading , setIsPackagesLoading] = useState(false)
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();
  const [packages, setPackages] = useState([]);
  const [_, setCurrentMap] = useRecoilState(currentMapAtom);
  useEffect(() => {
    const fetchData = async () => {
      const ads = await getAds()
      const data = await getServices();
      const packages = await getPackages();
     
      setAds(ads)

      // const myLocations = await getSavedLocation();
      SetServices(data.all_service_arr.sorted_main_services);
      setPackages(packages.packages);
      setIsPackagesLoading(true)
      SetSpecialOffers(data.all_service_arr.sorted_extra_services);
      localStorage.setItemObject('services', data.all_service_arr);
    };
    fetchData();
  }, []);

  

 useEffect(() => {
     const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      
    });
  }, []);


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', (e) => {
     
    });
    return BackHandler.removeEventListener('hardwareBackPress');
  }, []);


  useEffect(()=>{
    const fetchData = async ()=>{
      
      const isRating = await getHome()
        if (isRating.isRate) {
          navigation.navigate("Review" , {...isRating})
        }
    }

    fetchData()
  },[navigation])



  useEffect(()=>{

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
       PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.localNotification({
  /* Android Only Properties */
   channelId: "channel-id",
title: remoteMessage?.notification?.title, // (optional)
  message: remoteMessage?.notification?.body, // (required)      
  })
    })
  return unsubscribe;
  })

  useEffect(()=>{
     const fetchData = async ()=>{
      
      const isRating = await checkCodeCompanyc()
    
    }

    fetchData()
  },[])

  return (
    <KeyboardAwareScrollView>
      <View className="px-4">
        {/* <SearchInput
          placeholder={Lang_chg.what_looking_for_placholder[config.language]}
          onChange={t => setSearchText(t)}
          value={searchText}
        /> */}
      </View>
      <View className="mt-3">
        <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      data={ads}
      renderItem={({ item }) => (
        <SaleBox
                key={item.extra_service_id}
                navigation={navigation}
                offer={item}
              />
      )}
    />
        {/* <View className="mt-2 flex-row items-center px-4">
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
        </View>  */}
        {
        //   isPackagesLoading ? 
        //   <FlatList
        //   className="px-3 mt-3"
        //     data={ads}
        //     horizontal={true}
        //     renderItem={({item, index}) => {
        //         console.log(item)
        //       return(
        //       <SaleBox
        //         key={item.extra_service_id}
        //         navigation={navigation}
        //         offer={item}
        //       />
             
        //     )}}
        //   /> 
        //   :
        //    <FlatList
        //    data={[...Array(5).keys()]}
        //    horizontal={true}
        //    renderItem={({item, index}) => (
        //      <View key={item.id} className="w-[350px] h-[90] mx-2">
        //          <PackageCardSkeleton/>
        //        </View>
        //    )}
        //  />   
        }
       
      </View>
      {
        packages.length > 0 &&
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
            {
              isPackagesLoading ? 
              <FlatList
              data={packages}
              horizontal={true}
              renderItem={({item, index}) => (
                <View key={item.id} className="w-[350px] mx-2">
                    <PackageCard pack={item} navigation={navigation} isButton={true} />
                  </View>
              )}
            /> :  <FlatList
              data={[...Array(5).keys()]}
              horizontal={true}
              renderItem={({item, index}) => (
                <View key={item.id} className="w-[350px] h-[90] mx-2">
                    <PackageCardSkeleton/>
                  </View>
              )}
            /> 
            }
          </View>
      }
      <View className={'p-4'}>
        <View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image className="w-10 h-6" source={locationIcon} />
              <Text className="font-bold text-lg">
                {Lang_chg.location_text[config.language]}
              </Text>
            </View>
            {/* <Text className="text-red-500">Cairo,Egypt  </Text> */}
          </View>

          <View className="h-[165px] mt-1 rounded-lg overflow-hidden">
            <MapComponent isMove={false}/>
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
        {
          isPackagesLoading ? 
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
          :
           <FlatList
           data={[...Array(5).keys()]}
           horizontal={true}
           renderItem={({item, index}) => (
             <View key={item.id} className="w-[350px] h-[90] mx-2">
                 <PackageCardSkeleton/>
               </View>
           )}
         /> 
        }
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
