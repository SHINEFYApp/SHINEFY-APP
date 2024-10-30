import {useState} from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import img from '../../assets/extraService.png';
import globalStyle from '../../assets/globalStyle';
import {config} from '../../Provider/configProvider';
import { Lang_chg } from '../../Provider/Language_provider';
export default function SelectMainService({selected, service, onPress,isPackage}) {


  return (
    <TouchableHighlight
      underlayColor={'white'}
      onPress={() => {
        onPress(service.service_id);
      }}>
      <View
        style={globalStyle.boxShadow}
        className={`${
          selected === service.service_id ? 'bg-mainColor' : 'bg-white'
        } rounded-lg p-2 mb-3 flex-row`}>
        <Image  source={{uri : config.img_url3 + service?.service_image}} className="mr-2 w-[70px] h-[70px]" resizeMode='contain'/>
        <View>
          <Text className="font-bold text-md ">
            {service.service_name[config.language]}
          </Text>
          <View className="flex-row gap-3 items-center mt-[1px]">
            {
              isPackage ? 
                <Text
                  className={`${
                    selected === service.service_id
                      ? 'text-white'
                      : 'text-mainColor'
                  } font-bold`}>
                  {service.remind_quantity} {Lang_chg.of_txt[config.language]} {service.quantity} 
                </Text>
              : 
              <View>
                {
                  service.service_discount != null &&
                <Text
                  className={`${
                    selected === service.service_id
                    ? 'text-white'
                    : 'text-mainColor'
                  } font-bold`}>
                  {service.service_price} EGP
                </Text>
                }
                <Text
                  className={`${
                    selected === service.service_id
                    ? 'text-white'
                    : 'text-mainColor'
                  } font-bold ${service.service_discount != null && "line-through"} `}>
                  {service.service_price_before_discount} EGP
                </Text>
              </View>
            }
            {
              !isPackage &&
                <View className="flex-row items-center">
                  <Text
                    className={`text-xs text-center p-1 rounded-full ${
                      selected === service.service_id
                        ? 'text-white'
                        : 'text-mainColor'
                    } bg-[#DD992345] w-[150] `}>
                    {service?.service_label[config.language]}
                  </Text>
                </View>
            }
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
