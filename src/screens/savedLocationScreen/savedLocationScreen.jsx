import {Image, View} from 'react-native-ui-lib';
import React from 'react';
import emptyImg from '../../assets/emptyIMG.png';
import Button from '../../components/mainButton/Button';
import LocationCard from '../../components/locationComponentCard/locationComponentCard';
import {useEffect} from 'react';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {FlatList} from 'react-native';
import myLocationList, {
  fetchMyLoaction,
} from '../../atoms/locationList/myLocationList';
import {useRecoilState} from 'recoil';
import SafeAreaView from '../../components/SafeAreaView';
export default function SavedLocationScreen({navigation}) {
  const [locationList, setLocationList] = useRecoilState(myLocationList);

  useEffect(() => {
    fetchMyLoaction(setLocationList);
  }, []);
  return (
    <SafeAreaView>
      <View className="flex-1 px-4  pt-[60px]">
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
          keyExtractor={item => item.user_location_id}
          renderItem={({item}) => (
            <LocationCard location={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
