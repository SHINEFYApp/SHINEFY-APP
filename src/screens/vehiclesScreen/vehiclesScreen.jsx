import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import Button from '../../components/mainButton/Button';
import emptyImg from '../../assets/emptyVehicle.png';
import {useEffect} from 'react';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {FlatList} from 'react-native';
import {useRecoilState} from 'recoil';
import myCarsList, {fetchMyCars} from '../../atoms/carsList/myCarsList';

export default function VehiclesScreen({navigation}) {
  const [myCars, setMyCarsList] = useRecoilState(myCarsList);
  useEffect(() => {
    fetchMyCars(setMyCarsList);
  }, []);
  return (
    <View className="pt-[80] px-5 relative flex-1">
      <FlatList
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-10">
            <Text>{Lang_chg.no_vehicles_yet[config.language]}</Text>
            <Image source={emptyImg} />
          </View>
        }
        data={myCars}
        ListFooterComponent={
          <View>
            <Button
              Title={Lang_chg.addvechicle_txt[config.language]}
              onPress={() => {
                navigation.push('AddCar');
              }}
            />
          </View>
        }
        keyExtractor={item => item.vehicle_id}
        renderItem={({item}) => (
          <VehicleCard car={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
