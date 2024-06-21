import {ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text} from 'react-native-ui-lib';
import {config} from '../../Provider/configProvider';
export default function WashServicesCard({page, navigation, service}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('WashServiceDetails', {
          id: service?.service_id
            ? service.service_id
            : service.extra_service_id,
          name: service.service_name,
        });
      }}
      className={`h-[152px] w-full overflow-hidden rounded-lg mr-2 ${
        page ? 'w-full' : 'w-[125px]'
      } mb-3`}>
      <ImageBackground
        source={{
          uri: `${config.img_url3}${
            service.service_image
              ? service.service_image
              : service.extra_service_image
          }`,
        }}
        className={'flex-1 justify-end'}
        resizeMode="contain">
        <Text
          className={
            'text-md text-white pl-1 pr-4 leading-5 pb-2 bg-[#00000087]'
          }>
          {service.service_name
            ? service.service_name[config.language]
            : service.extra_service_name[config.language]}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
