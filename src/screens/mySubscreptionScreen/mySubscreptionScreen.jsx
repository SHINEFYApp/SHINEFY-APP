import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import SaleBox from '../../components/saleBox/saleBox';
import PackageCard from '../../components/packageCard/packageCard';

export default function MySubscreptionScreen({navigation}) {
  return (
    <View className="pt-[80]">
      <View>
        <View className="mt-2 flex-row items-center px-4">
          <Text className="text-[#000] text-xl ">Special Offers </Text>
          <Text
            className="text-mainColor flex-1 text-right"
            onPress={() => {
              navigation.navigate('specialOffersScreen');
            }}>
            See All
          </Text>
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
      <View>
         <View className="mt-2 flex-row items-center px-4">
          <Text className="text-[#000] text-xl ">My Packages </Text>
          <Text
            className="text-mainColor flex-1 text-right"
            onPress={() => {
              navigation.navigate('specialOffersScreen');
            }}>
            See All
          </Text>
        </View>
         <ScrollView
          horizontal={true}
          className="pl-3 mt-3"
          showsHorizontalScrollIndicator={false}>
            <View className="w-[350px]">
            <PackageCard />
            </View>
            <View className="w-[350px]">
            <PackageCard />
            </View>
            <View className="w-[350px]">
            <PackageCard />
            </View>
          </ScrollView>
      </View>
    </View>
  );
}
