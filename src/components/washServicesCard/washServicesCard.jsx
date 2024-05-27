import {ImageBackground} from 'react-native';
import React from 'react';
import {Text} from 'react-native-ui-lib';
import img from '../../assets/carWashing.png';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {config} from '../../Provider/configProvider';
export default function WashServicesCard({page, navigation, service}) {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate('WashServiceDetails', {
          id: service.service_id,
          name: service.service_name,
        });
      }}
      className={`h-[152px] w-full overflow-hidden rounded-lg mr-2 ${
        page ? 'w-full' : 'w-[125px]'
      } mb-3`}>
      <ImageBackground
        source={{uri: `${config.img_url3}${service.service_image}`}}
        className={'flex-1 justify-end'}>
        <Text
          className={
            'text-md text-white pl-1 pr-4 leading-5 pb-2 bg-[#00000087]'
          }>
          {service.service_name[config.language]}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
}