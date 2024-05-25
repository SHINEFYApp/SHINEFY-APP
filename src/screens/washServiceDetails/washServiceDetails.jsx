import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import img from '../../assets/detailsCar.png';
import timeIcon from '../../assets/icons/timeIcon.png';
import Button from '../../components/mainButton/Button';
import {useEffect, useState} from 'react';
import getServiceDetails from '../../Features/getServiceDetails/getServiceDetails';
import {config} from '../../Provider/configProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';
export default function WashServiceDetails({navigation, route}) {
  const [data, setData] = useState({});

  useEffect(() => {
    let fetchData = async () => {
      setData(await getServiceDetails(route.params.id));
    };
    fetchData();
  }, []);

  return (
    <KeyboardAwareScrollView className="flex-1">
      <Image source={img} className="w-full" />
      <View className="bg-white flex-1 rounded-3xl px-5 py-10 -mt-2 justify-between">
        <View>
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-semibold">
              {data &&
                data[
                  `${
                    config.language === 0
                      ? 'service_name'
                      : 'service_name_arabic'
                  }`
                ]}
            </Text>
            <Text className="text-mainColor bg-[#DD992345] p-2 rounded-full font-bold">
              {data &&
                data[
                  `${
                    config.language === 0
                      ? 'service_label'
                      : 'service_label_arabic'
                  }`
                ]}
            </Text>
          </View>
          <View className="flex-row justify-between items-center my-5 border-b border-[#ccc] pb-2">
            <View className="flex-row items-center gap-2">
              <Image source={timeIcon} />
              <Text className="text-lg">
                {' '}
                {data?.service_time} {Lang_chg.mins[config.language]}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-xl">{data?.service_price}EGP </Text>
              <Text>/{Lang_chg.services[config.language]}</Text>
            </View>
          </View>
          <View className="pb-2 border-b border-[#ccc] mb-5">
            <Text className="text-xl font-bold mb-3">
              {Lang_chg.description[config.language]} :
            </Text>
            <Text>
              {
                data[
                  `${
                    config.language === 0
                      ? 'service_description'
                      : 'service_description_arabic'
                  }`
                ]
              }
            </Text>
          </View>
          <View className="gap-3">
            <Text className="text-xl font-bold">
              {Lang_chg.services[config.language]} :
            </Text>
            <Text>Car Detailing</Text>
            <Text>Exterior Cleaning</Text>
            <Text>Vacuum Cleaning</Text>
          </View>
        </View>
        <Button Title={Lang_chg.Book[config.language]} />
      </View>
    </KeyboardAwareScrollView>
  );
}
