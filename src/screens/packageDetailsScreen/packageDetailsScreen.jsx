import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import img from '../../assets/detailsCar.png';
import Button from '../../components/mainButton/Button';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {ScrollView} from 'react-native-gesture-handler';
import apiSauce from '../../API/apiSauce';
import PayTabs from '../../components/payTabs/payTabs';

export default function PackageDetailsScreen({navigation, route}) {
  const [data, setData] = useState();
  const [isPayment, setIsPayment] = useState(false);

  useEffect(() => {
    apiSauce.get(`/get_package_details/${route.params}`).then(res => {
      setData(res.data.data);
    });
  }, []);

  console.log(data);

  return (
    <View className="flex-1">
      {isPayment && (
        <PayTabs
          amount={data.package.price}
          webView={isPayment}
          setWebView={setIsPayment}
        />
      )}
      <ScrollView>
        <Image source={img} className="w-full" />
        <View className="bg-white flex-1 rounded-3xl px-5 py-10 -mt-2 justify-between">
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-semibold">
                {config.language == 0
                  ? data?.package?.name
                  : data?.package?.name_ar}
              </Text>
              <Text className="bg-mainColor text-white py-1 px-2 rounded-lg font-bold text-xl">
                {data?.package?.price} EGP
              </Text>
            </View>
            <View className="items-start">
              <Text className="text-mainColor  bg-[#DD992345] py-1 px-2 mt-3 rounded-lg font-bold ">
                Car Detailng
              </Text>
            </View>
            <View className="py-2 border-y border-[#ccc] my-5">
              <Text>{data?.package?.description}</Text>
            </View>
            <View>
              <Text className="text-xl font-bold mb-5">
                {data?.extra_services?.length}{' '}
                {Lang_chg.extraservice_txt[config.language]}
              </Text>
              {data?.extra_services?.map(service => {
                console.log(service);
                return (
                  <Text>
                    {config.language == 0
                      ? service.service_name
                      : service.service_name_ar}
                  </Text>
                );
              })}
            </View>
            <View className="gap-3 mt-5">
              <Text className="text-xl font-bold">
                {data?.main_services?.length}{' '}
                {Lang_chg.mainservice_txt[config.language]}
              </Text>
              {data?.main_services?.map(service => {
                console.log(service);
                return (
                  <Text>
                    {config.language == 0
                      ? service.service_name
                      : service.service_name_ar}
                  </Text>
                );
              })}
            </View>
          </View>
          <Button
            Title={Lang_chg.claim[config.language]}
            onPress={() => {
              setIsPayment(true);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
