import {Image, View} from 'react-native-ui-lib';
import React from 'react';
import emptyImg from '../../assets/emptyIMG.png';
import Button from '../../components/mainButton/Button';
import LocationCard from '../../components/locationComponentCard/locationComponentCard';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import getSavedLocation from '../../Features/getSavedLocation/getSavedLocation';
import {useCallback, useEffect, useState} from 'react';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {FlatList} from 'react-native';
import myLocationList, {
  fetchMyLoaction,
} from '../../atoms/locationList/myLocationList';
import {useRecoilState} from 'recoil';
export default function SavedLocationScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [locationList, setLocationList] = useRecoilState(myLocationList);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchMyLoaction(setLocationList);
  }, [refreshing]);

  console.log(locationList);

  return (
    <View className="flex-1 pt-[80px]">
      <FlatList
        ListEmptyComponent={
          <View className="w-full items-center p-10">
            <Image source={emptyImg} />
            <View className="w-full mt-10" />
          </View>
        }
        data={locationList}
        ListFooterComponent={
          <Button
            Title={Lang_chg.add_location[config.language]}
            onPress={() => {
              navigation.navigate('addLocationScreen');
            }}
            secondStyle={true}
            textColor={'#DD9923'}
          />
        }
        keyExtractor={item => item.location_id}
        renderItem={({item}) => (
          <LocationCard location={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
