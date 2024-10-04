import {Image, Text, View} from 'react-native-ui-lib';
import React, { useState } from 'react';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import Button from '../../components/mainButton/Button';
import emptyImg from '../../assets/emptyVehicle.png';
import {useEffect} from 'react';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {FlatList} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import myCarsList, {fetchMyCars} from '../../atoms/carsList/myCarsList';
import addNewCar from '../../atoms/addNewCar/addNewCar';
import updateCar from '../../atoms/currentCar/currentCar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PackageCardSkeleton from '../../components/packageCard/packageCardSkeleton';

export default function VehiclesScreen({navigation}) {
  const setNewCar = useSetRecoilState(addNewCar);
  const setUpdateCar = useSetRecoilState(updateCar);
  const [isLoading , setIsLoading] = useState(false) 
  const [myCars, setMyCarsList] = useRecoilState(myCarsList);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    let fetchData = async () =>{
      await fetchMyCars(setMyCarsList);
      setIsLoading(true)
    }
    fetchData()
  }, []);
  return (
    <View
      style={{paddingTop: insets.top + 10}}
      className="px-4 relative flex-1">
        {
          isLoading ?
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
                    setUpdateCar({});
                    setNewCar({});
                    navigation.push('AddCar');
                  }}
                />
              </View>
            }
            keyExtractor={item => item.vehicle_id}
            renderItem={({item}) => (
              <VehicleCard car={item} navigation={navigation} />
            )}
          /> :
          <FlatList
           data={[...Array(5).keys()]}
           renderItem={({item, index}) => (
             <View key={item.id} className="w-[350px] h-[190px] m-2">
                 <PackageCardSkeleton/>
               </View>
           )}
         />  
        }
    </View>
  );
}
