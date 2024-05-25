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
export default function SavedLocationScreen({navigation}) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setData(await getSavedLocation());
    };
    fetchData();
  }, [refreshing]);

  return (
    <View className="flex-1 pt-[80px]">
      {data?.length === 0 || data === 'NA' ? (
        <View className="w-full items-center p-10">
          <Image source={emptyImg} />
          <View className="w-full mt-10">
            <Button
              Title={Lang_chg.add_location[config.language]}
              onPress={() => {
                navigation.navigate('addLocationScreen');
              }}
              secondStyle={true}
              textColor={'#DD9923'}
            />
          </View>
        </View>
      ) : (
        <View>
          <ScrollView
            className="px-2"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {data?.map(location => {
              return (
                <LocationCard
                  key={location.location_id}
                  location={location}
                  navigation={navigation}
                />
              );
            })}
            <Button
              onPress={() => {
                navigation.navigate('addLocationScreen');
              }}
              Title={Lang_chg.add_new_location[config.language]}
              secondStyle={true}
              textColor={'#DD9923'}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
}
