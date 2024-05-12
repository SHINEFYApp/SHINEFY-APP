import {Image, Text, View} from 'react-native-ui-lib';
import SelectExtraService from '../../components/selectExtraService/selectExtraService';
import SelectMainService from '../../components/selectMainService/selectMainService';
import {useEffect, useState} from 'react';
import SelectVehicle from '../../components/selectVehicle/SelectVehicle';
import {ScrollView} from 'react-native-gesture-handler';
import AddOtherVehicle from '../../components/addOtherVehicle/addOtherVehicle';
import Button from '../../components/mainButton/Button';
import {localStorage} from '../../Provider/localStorageProvider';
import locationMark from '../../assets/icons/bookingOverview/locationMark.png';
import {useRecoilState} from 'recoil';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function RequestDetails({navigation, route}) {
  const [selectMain, setSelectMain] = useState('');
  const [selectLocation, setSelectLocation] = useState('');
  const [cars, setCars] = useState([]);
  const [selectCar, setSelectCars] = useState();
  const [services, setServices] = useState();
  const [bookingDetails, setBookingDetails] =
    useRecoilState(bookingDetailsAtom);
  useEffect(() => {
    let fetchData = async () => {
      setCars(await localStorage.getItemObject('userCars'));
      setServices(await localStorage.getItemObject('services'));
    };
    setBookingDetails({
      ...bookingDetails,
      address_loc: route.params.location,
      longitude: route.params.longitude,
      latitude: route.params.latitude,
    });
    fetchData();
  }, []);

  console.log(bookingDetails);

  const data = [
    {key: '1', value: 'Mobiles', disabled: true},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
    {key: '4', value: 'Computers', disabled: true},
    {key: '5', value: 'Vegetables'},
    {key: '6', value: 'Diary Products'},
    {key: '7', value: 'Drinks'},
  ];

  return (
    <ScrollView>
      <ScrollView className="pt-[80px] pr-5 overflow-y-scroll h-fit">
        <View>
          <Text className="text-xl mb-3">
            {Lang_chg.wash_location[config.language]}
          </Text>
          <View
            className={
              'bg-white py-4 px-3 w-full rounded my-2 flex flex-row items-center overflow-hidden'
            }>
            <Image source={locationMark} className={'w-6 h-6 mr-4'} />
            <Text className={'font-bold text-lg mr-2'}>
              {config.language === 0 ? 'Location' : 'الموقع'}:
            </Text>
            <Text className={'text-mainColor'}>
              {route.params.location.length > 45
                ? route.params.location.split(' ').slice(0, 6).join(' ') +
                  '.....'
                : route.params.location}
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-xl mb-3">
            {Lang_chg.SelectVehicles[config.language]}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cars?.map(car => {
              return (
                <SelectVehicle
                  car={car}
                  selected={selectCar}
                  onPress={() => {
                    setBookingDetails({
                      ...bookingDetails,
                      vehicle_id: car.vehicle_id,
                      extraData: {
                        ...bookingDetails?.extraData,
                        car,
                      },
                    });
                    setSelectCars(car.vehicle_id);
                  }}
                />
              );
            })}
            <AddOtherVehicle navigation={navigation} />
          </ScrollView>
        </View>
        <View>
          <Text className="text-xl mb-3">
            {Lang_chg.select_main_service[config.language]}
          </Text>
          {services?.service_arr?.map(service => {
            return (
              <SelectMainService
                service={service}
                selected={selectMain}
                onPress={id => {
                  setSelectMain(id);
                  setBookingDetails({
                    ...bookingDetails,
                    service_id: service.service_id,
                    service_price: service.service_price,
                    service_time: service.service_time,
                    extraData: {
                      ...bookingDetails?.extraData,
                      service,
                    },
                  });
                }}
              />
            );
          })}
        </View>
        <View>
          <Text className="text-xl mb-3">
            {Lang_chg.select_extra_service[config.language]}
          </Text>
          {services?.extra_service_arr?.map(extra => {
            return <SelectExtraService extraService={extra} />;
          })}
        </View>
      </ScrollView>
      <View className="flex-row bg-white justify-between absolute bottom-0 w-full rounded-t-3xl p-5">
        <View>
          <Text className="text-md">{Lang_chg.subTotal[config.language]}</Text>
          <Text className="font-bold text-xl">200 EGP</Text>
        </View>
        <Button
          Title={Lang_chg.continue[config.language]}
          smallButton
          onPress={() => {
            if (!bookingDetails['vehicle_id']) {
              msgProvider.toast('Please Select Car', 'center');
            } else if (!bookingDetails['service_id']) {
              msgProvider.toast('Please Select Service', 'center');
            } else {
              navigation.navigate('SelectDateTime');
            }
          }}
        />
      </View>
    </ScrollView>
  );
}
