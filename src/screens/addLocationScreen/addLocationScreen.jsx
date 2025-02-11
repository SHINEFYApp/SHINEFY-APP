import {View} from 'react-native-ui-lib';
import MapComponent from '../../components/mapComponent/mapComponent';
import React, { useState } from 'react';
import SearchInput from '../../components/searchInput/searchInput';
import { Lang_chg } from '../../Provider/Language_provider';
import { config } from '../../Provider/configProvider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from 'react-native-gesture-handler';
export default function AddLocationScreen({ navigation, route }) {

  const [searchResult, setSearchResult] = useState();

  return (
    <View className="flex-1">
     

      <ScrollView className="absolute z-[99999] w-full">
           <GooglePlacesAutocomplete
            placeholder='Search'
            onNotFound={(error) => console.error(error)}
            fetchDetails={true}
            onPress={(data, details = null) => {
            setSearchResult({
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
          })
          }}
          query={{
            key: 'AIzaSyD-i3evXVnWK6RfhrfGMzyLAxS8CmpdorQ',
            language: 'en',
            }}
          />
     </ScrollView>
      
       

      <MapComponent searchLoaction={searchResult} isNewLocation navigation={navigation} isEditLocation={route.params?.isEdit} editLocaiton={route.params}/>
    </View>
  );
}
