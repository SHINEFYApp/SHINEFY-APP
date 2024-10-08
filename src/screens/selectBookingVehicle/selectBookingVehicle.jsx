import {Image, Text, View} from 'react-native-ui-lib';
import React, {useState} from 'react';
import Button from '../../components/mainButton/Button';
import emptyImg from '../../assets/emptyVehicle.png';
import {useEffect} from 'react';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {FlatList} from 'react-native';
import {useRecoilState} from 'recoil';
import myCarsList, {fetchMyCars} from '../../atoms/carsList/myCarsList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SelectVehicle from '../../components/selectVehicle/SelectVehicle';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
import SubTotalBooking from '../../components/subTotalBooking/SubTotalBooking';
import {msgProvider} from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function SelectBookingVehicles({navigation , route}) {

  const [myCars, setMyCarsList] = useRecoilState(myCarsList); //user all cars
  const [isSelectAll, setIsSelectAll] = useState(false); // state if selected true
  const [selectCarID, setSelectCarsID] = useState([]); // selectedCars by id
  const [selectCarDetails, setSelectCarsDetails] = useState([]); // selectedCars by all details
  const [bookingDetails, setBookingDetails] =
    useRecoilState(bookingDetailsAtom); // booking details
  const insets = useSafeAreaInsets();
  useEffect(() => {
    fetchMyCars(setMyCarsList);
  }, []); // get user cars

  const carsId = myCars.map(car => {
    return car.vehicle_id;
  }); // get all users cars ID to check if user selected all cars
  function selectAllCars() {
    setIsSelectAll(!isSelectAll);
    if (isSelectAll) {
      setSelectCarsID([]);
    setSelectCarsDetails([])
    } else {
      setSelectCarsID(carsId);
      setSelectCarsDetails([...myCars]);
    }
  } // select all cars or remove all cars
  useEffect(() => {
    setIsSelectAll(equalsCheck(selectCarID, myCars));
    setBookingDetails({
      ...bookingDetails,
      extraData: {
        ...bookingDetails?.extraData,
        allSelectedCars: selectCarID,
        allSelectedCarsDetails: selectCarDetails,
      },
    });
  }, [selectCarID, myCars]); // to check if user selected all cars manual and add it to global state

  function equalsCheck(arr1, arr2) {
    if (arr1.length === arr2.length) {
      return true;
    } else {
      return false;
    }
  } // chack if all cars Selected after arrange carsId and selected cars to compare two arrays   // check if all cars is selected by compare length of arrays

  return (
    <View
      style={{paddingTop: insets.top }}
      className="px-4 relative flex-1">
      <TouchableOpacity
        onPress={selectAllCars}
        className="border-mainColor border p-3 mb-3 rounded-lg">
        <View className="flex-row justify-between items-center">
          <Text className="text-mainColor">{Lang_chg.selectAll_txt[config.language]}</Text>
          <View
            className={`w-[20] h-[20] border-mainColor border ${
              isSelectAll && 'bg-mainColor'
            }`}
          />
        </View>
      </TouchableOpacity>
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
              secondStyle={true}
              textColor={'#DD9923'}
              Title={Lang_chg.add_another_vehicle[config.language]}
              onPress={() => {
                navigation.push('AddCar');
              }}
            />
          </View>
        }
        keyExtractor={item => item.vehicle_id}
        renderItem={({item: car, index}) => (
          <SelectVehicle
            key={car.vehicle_id}
            car={car}
            selected={selectCarID}
            onPress={id => {
              if (!selectCarID.includes(car.vehicle_id)) {
                setSelectCarsID([...selectCarID, car.vehicle_id]);
                setSelectCarsDetails([...selectCarDetails, car]);
              } else {
                const currentIndex = selectCarID.indexOf(car.vehicle_id);
                setSelectCarsID([
                  ...selectCarID.slice(0, currentIndex),
                  ...selectCarID.slice(currentIndex + 1),
                ]);
                setSelectCarsDetails([
                  ...selectCarDetails.slice(0, currentIndex),
                  ...selectCarDetails.slice(currentIndex + 1),
                ]);
              }
            }}
          />
        )}
      />
      <SubTotalBooking
        Press={() => {
          if (bookingDetails.extraData.allSelectedCars.length == 0) {
            msgProvider.toast('Please Select Car', 'center');
          } else {
            navigation.push('SelectDateTime' , route.params);
          }
        }}
      />
    </View>
  );
}
