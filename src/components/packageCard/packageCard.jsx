import {Image, Text, View} from 'react-native-ui-lib';
import Button from '../mainButton/Button';
import React from 'react';
import timeIcon from '../../assets/icons/timeIcon2.png';
import {StyleSheet} from 'react-native';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import { useRecoilState } from 'recoil';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import { msgProvider } from '../../Provider/Messageconsolevalidationprovider/messageProvider';

export default function PackageCard({navigation, pack , isUse , route , profile}) {
  const [bookingDetails, setBookingDetails] =
    useRecoilState(bookingDetailsAtom);

    
  return (
    <View className="bg-white p-4  rounded-xl m-2" style={style.box}>
      <View className="flex-row mb-3">
        <Image
          source={{uri: pack.package_img}}
          style={{width: 50, resizeMode: 'cover'}}
        />
        <View className="flex-row w-full justify-between ml-4 flex-1">
          
          <Text
            className={
              `text-xs text-center p-1 w-[90] rounded-full ${pack?.is_expired == 1 ? "text-[#E15249] bg-[#E1524945]"  : "text-[#DD9923] bg-[#DD992345]"}  absolute right-0 `
            }>
              
            {!profile ? pack[config.language == 0 ? 'name' : 'name_ar'].split(" ").reverse().slice(2 ,4).reverse().join(" ") : pack?.is_expired == 1 ? Lang_chg.expired[config.language] :  pack?.available_from} 
          </Text>
        
          <View className="gap-2">
            <Text className="font-bold text-md  w-[40%]" numberOfLines={1}>
              {pack.name ?
                pack[config.language == 0 ? 'name' : 'name_ar'] 
                : pack.package_info[config.language == 0 ? 'name' : 'name_ar'] 
              }
            </Text>
            {/* <View className="flex-row items-center">
              <Image source={timeIcon} />
              <Text className="ml-2 font-bold">One Wash (SHINEFY Plus)</Text>
            </View> */}
            <View className="flex-row  items-center">
              <Image source={timeIcon} />
              <Text className=" w-[140] mx-2">
                {`${pack?.extra_services_count ? +pack.extra_services_count + +pack.main_services_count : 
                pack?.extra_services?.length} ${Lang_chg.other_services[config.language]}`}
              </Text>
            </View>
            {
              pack?.extra_services_count &&
            <View className="flex-row  items-center">
              <Image source={timeIcon} />
              <Text className="w-[150] mx-2">
             
                {pack.total_days} {Lang_chg.mins[config.language]}
              </Text>
            </View>
            }
          </View>
        </View>
      </View>

      <View className="absolute bottom-0 right-5">
        {
          !profile && 
        <Button
          Title={isUse ? Lang_chg.claim[config.language] :Lang_chg.buy[config.language] }
          smallButton
          onPress={() => {
            setBookingDetails({
              ...bookingDetails ,
              package_id : pack.id ,
              package_user_id :pack.package_id
            })
            if (isUse) {
              if(pack.is_expired == 1){
                msgProvider.alert(Lang_chg.packageExpired[config.language],Lang_chg.packageError[config.language])
              }else {
              navigation.navigate('PackageInfoScreen' , {...route , packID : pack.id})
              }
            } else {
            
            navigation.navigate('PackageDetailsScreen' ,pack.id)
            }
          }}
        />
        }
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    shadowColor: 'rgba(221, 153, 35, 0.3)',
    shadowOffset: {
      width: 8,
      height: 4,
    },
    shadowOpacity: 5.19,
    shadowRadius: 5.62,
    elevation: 9,
  },
});
