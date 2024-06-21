import {ScrollView, View} from 'react-native';
import React from 'react';
import WashServicesCard from '../../components/washServicesCard/washServicesCard';
import {useEffect, useState} from 'react';
import getServices from '../../Features/getServices/getServices';
import SafeAreaView from '../../components/SafeAreaView';

export default function WashServicesScreen({navigation}) {
  const [services, SetServices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getServices();
      SetServices(data.all_service_arr.service_arr);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mt-[80px] px-4">
          {services?.map((service, index) => {
            return (
              <WashServicesCard
                key={service.service_id}
                page
                navigation={navigation}
                id={index}
                service={service}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
