import {Image, Text, View} from 'react-native-ui-lib';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/mainButton/Button';
import emptyImg from '../../assets/emptyVehicle.png';
import {useEffect, useState} from 'react';
import getMyVehicles from '../../Features/getVehicles/getVehicles';
import {localStorage} from '../../Provider/localStorageProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function VehiclesScreen({navigation}) {
  const cars = [1];

  const [myCars, setMyCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyVehicles();
      localStorage.setItemObject('userCars', data.vehicle_arr);
      setMyCars(data.vehicle_arr);
    };
    fetchData();
  }, []);

  return (
    <View className="pt-[80] px-5 relative flex-1">
      {myCars == 'NA' ? (
        <View className="flex-1 justify-center items-center p-10">
          <Text>{Lang_chg.no_vehicles_yet[config.language]}</Text>
          <Image source={emptyImg} />
          <View className="w-full mt-10">
            <Button Title={Lang_chg.addvechicle_txt[config.language]} />
          </View>
        </View>
      ) : (
        <ScrollView>
          {myCars?.map(car => {
            return <VehicleCard car={car} navigation={navigation} />;
          })}
          <View>
            <Button
              Title={Lang_chg.addvechicle_txt[config.language]}
              onPress={() => {
                navigation.navigate('AddCar');
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
