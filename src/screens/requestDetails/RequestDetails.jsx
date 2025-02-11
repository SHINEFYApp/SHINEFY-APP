import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import SelectExtraService from '../../components/selectExtraService/selectExtraService';
import SelectMainService from '../../components/selectMainService/selectMainService';
import {useEffect, useState} from 'react';
import SelectVehicle from '../../components/selectVehicle/SelectVehicle';
import {ScrollView} from 'react-native-gesture-handler';
import AddOtherVehicle from '../../components/addOtherVehicle/addOtherVehicle';
import {localStorage} from '../../Provider/localStorageProvider';
import locationMark from '../../assets/icons/bookingOverview/locationMark.png';
import {useRecoilState} from 'recoil';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import SubTotalBooking from '../../components/subTotalBooking/SubTotalBooking';
import myCarsList, {fetchMyCars} from '../../atoms/carsList/myCarsList';
import sortDate from '../../utlites/sortDate';

export default function RequestDetails({navigation, route}) {
  const [services, setServices] = useState();
  const [bookingDetails, setBookingDetails] =
  useRecoilState(bookingDetailsAtom);
  const [selectMain, setSelectMain] = useState("");
  useEffect(() => {
    let fetchData = async () => {
      setServices(await localStorage.getItemObject('services'));
    };
    let date = new Date();

    setBookingDetails({
             booking_date: sortDate(date.toLocaleDateString("en-us")),

      address_loc: route.params.bookingType.params.location,
      longitude: route.params.bookingType.params.longitude,
      latitude: route.params.bookingType.params.latitude,
    });
    fetchData();
  }, []);

  return (
    <>
      <View className=" pt-[10] flex-1">
        <ScrollView className="px-2 w-[95%] flex-1 mx-auto">
          <View>
            <Text className="text-xl mb-3" >
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
                  {route.params.bookingType.params.location}
                </Text>
              </View>
          
          </View>
          {/* <View>
            <Text className="text-xl mb-3 mt-2">
              {Lang_chg.SelectVehicles[config.language]}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className={'py-3 overflow-visible'}>
              {cars?.map(car => {
                return (
                  <SelectVehicle
                    key={car.vehicle_id}
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
          </View> */}
          <View>
            <Text className="text-xl mb-3 mt-2">
              {Lang_chg.select_main_service[config.language]}
            </Text>
            {services?.sorted_main_services?.map(service => {
              return (
                <SelectMainService
                  key={service.service_id}
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
                        extraServices : null
                      },
                    });
                  }}
                />
              );
            })}
          </View>
          <View>
            <Text className="text-xl my-3">
              {Lang_chg.select_extra_service[config.language]}
            </Text>
            {services?.sorted_extra_services?.map(extra => {
              return (
                <SelectExtraService
                  key={extra.extra_service_id}
                  extraService={extra}
          
                />
              );
            })}
          </View>
        </ScrollView>
        <SubTotalBooking
          Press={() => {
            if (!bookingDetails.service_id) {
              msgProvider.toast('Please Select Service', 'center');
            } else {
              navigation.replace('selectBookingvehicle');
            }
          }}
        />
      </View>
    </>
  );
}
