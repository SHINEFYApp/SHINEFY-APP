import {Image, Text, View} from 'react-native-ui-lib';
import Button from '../mainButton/Button';
import Img from '../../assets/cardCar.png';
import timeIcon from '../../assets/icons/timeIcon2.png';
import {StyleSheet} from 'react-native';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function PackageCard({navigation , pack}) {
  return (
    <View className="bg-white py-4 px-5 rounded-xl m-2" style={style.box}>
      <View className="flex-row mb-3">
        <Image source={{uri:pack.package_img}} style={{width:"50" , resizeMode:"cover" }} />
        <View className="flex-row justify-between ml-4 flex-1">
          <Text
            className={`text-xs text-center p-1 rounded-full text-[#DD9923] bg-[#DD992345] absolute right-0 `}>
            Car Detailing
          </Text>
          <View className="gap-2">
            <Text className="font-bold text-xl">{pack[config.language == 0 ? "name" : "name_ar"]}</Text>
            {/* <View className="flex-row items-center">
              <Image source={timeIcon} />
              <Text className="ml-2 font-bold">One Wash (SHINEFY Plus)</Text>
            </View> */}
            <View className="flex-row items-center">
              <Image source={timeIcon} />
              <Text className="ml-2">
                {+pack.extra_services_count + +pack.main_services_count} {Lang_chg.other_services[config.language]}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Image source={timeIcon} />
              <Text className="ml-2">{pack.total_days} {Lang_chg.mins[config.language]}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="absolute bottom-0 right-5">
        <Button
          Title={Lang_chg.claim[config.language]}
          smallButton
          onPress={() => {
            navigation.navigate('PackageDetailsScreen', 2);
          }}
        />
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
