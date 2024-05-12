import {useState} from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import img from '../../assets/extraService.png';
import globalStyle from '../../assets/globalStyle';
import {config} from '../../Provider/configProvider';
export default function SelectMainService({selected, service, onPress}) {
  console.log(service);
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
        <Image source={img} className="mr-2" />
        <View>
          <Text className="font-bold text-md">
            {service.service_name[config.language]}
          </Text>
          <View className="flex-row gap-3 items-center mt-[1px]">
            <Text
              className={`${
                selected === service.service_id
                  ? 'text-white'
                  : 'text-mainColor'
              } font-bold`}>
              {service.service_price} EGP
            </Text>
            <View className="flex-row items-center">
              <Text
                className={`text-xs text-center p-1 rounded-full ${
                  selected === service.service_id
                    ? 'text-white'
                    : 'text-mainColor'
                } bg-[#DD992345]  `}>
                {service.service_label[config.language]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
