import {Image, Text, View} from 'react-native-ui-lib';
import MapView, {Marker} from 'react-native-maps';
import indectorIcon from '../../assets/icons/mapIndecator.png';
import {useEffect, useState} from 'react';
import Input from '../inputs/input';
import Button from '../mainButton/Button';
import addLocation from '../../Features/addLocation/addLocation';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
export default function MapComponent({isNewLocation, navigation}) {
  const [currentlocation, setCurrentLocation] = useState({
    latitude: 29.96073734024412,
    latitudeDelta: 0.001162180276701008,
    longitude: 31.25663409009576,
    longitudeDelta: 0.0006581470370328191,
  });
  const [name, setName] = useState('');
  return (
    <View className="flex-1 relative">
      <MapView
        customMapStyle={mapStyle}
        provider="google"
        minZoomLevel={0}
        maxZoomLevel={30}
        scrollEnabled={isNewLocation ? true : false}
        className="h-full w-full"
        onRegionChangeComplete={e => {
          setCurrentLocation(e);
        }}
        g
        region={currentlocation}
        cameraZoomRange={15}>
        {!isNewLocation && (
          <Marker draggable coordinate={currentlocation}>
            <Image source={indectorIcon} />
          </Marker>
        )}
      </MapView>
      {isNewLocation && (
        <Image
          source={indectorIcon}
          className="absolute w-10 h-10 top-1/2 left-1/2 -mt-10 -ml-5"
        />
      )}
      {isNewLocation && (
        <View className="absolute bottom-16 mx-5 p-5 rounded-xl bg-[#FFFAF2]">
          <Text className="text-xl text-center mb-5 font-bold">
            {Lang_chg.booking_location[config.language]}
          </Text>
          <Input
            placeholder={Lang_chg.confirm_booking_location[config.language]}
            onChange={e => {
              setName(e.nativeEvent.text);
            }}
          />
          <Button
            Title={Lang_chg.confirm_booking[config.language]}
            onPress={async () => {
              let res = await addLocation(currentlocation, name);
              res && navigation.goBack()
            }}
          />
        </View>
      )}
    </View>
  );
}

const mapStyle = [
  {
    featureType: 'administrative.country',
    elementType: 'labels.text',
    stylers: [
      {
        lightness: '29',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '-12',
      },
      {
        color: '#796340',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '15',
      },
      {
        saturation: '15',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#fbf5ed',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#fbf5ed',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
      {
        lightness: '30',
      },
      {
        saturation: '-41',
      },
      {
        gamma: '0.84',
      },
    ],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.medical',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fbd3da',
      },
    ],
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#b0e9ac',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        hue: '#68ff00',
      },
      {
        lightness: '-24',
      },
      {
        gamma: '1.59',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry',
    stylers: [
      {
        saturation: '10',
      },
      {
        color: '#c3eb9a',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        lightness: '30',
      },
      {
        color: '#e7ded6',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
      {
        saturation: '-39',
      },
      {
        lightness: '28',
      },
      {
        gamma: '0.86',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffe523',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        saturation: '0',
      },
      {
        gamma: '1.44',
      },
      {
        color: '#fbc28b',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
      {
        saturation: '-40',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fed7a5',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        gamma: '1.54',
      },
      {
        color: '#fbe38b',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        visibility: 'on',
      },
      {
        gamma: '2.62',
      },
      {
        lightness: '10',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        weight: '0.50',
      },
      {
        gamma: '1.04',
      },
    ],
  },
  {
    featureType: 'transit.station.airport',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dee3fb',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        saturation: '46',
      },
      {
        color: '#a4e1ff',
      },
    ],
  },
];
