import {ScrollView, View} from 'react-native';
import React from 'react';
import SaleBox from '../../components/saleBox/saleBox';
import {useEffect, useState} from 'react';
import getServices from '../../Features/getServices/getServices';
import SafeAreaView from '../../components/SafeAreaView';

export default function SpecialOffersScreen({navigation}) {
  const [specialOffers, SetSpecialOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServices();
      SetSpecialOffers(data.all_service_arr.extra_service_arr);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mt-[80px] px-2">
          {specialOffers?.map(offer => {
            // console.log(offer); TODO: need to get the offer id from the backend response
            return (
              <SaleBox
                key={offer.extra_service_id}
                offer={offer}
                navigation={navigation}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
