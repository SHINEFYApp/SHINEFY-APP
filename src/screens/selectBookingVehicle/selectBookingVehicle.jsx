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

export default function SelectBookingVehicles({navigation}) {
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
      //   setBookingDetails({
      //     ...bookingDetails,
      //     extraData: {
      //       ...bookingDetails?.extraData,
      //       allSelectedCarsID: selectCarID,
      //       allSelectedCarsDetails: selectCarDetails,
      //     },
      //   });
    } else {
      setSelectCarsID(carsId);
      setSelectCarsDetails([...myCars]);
    }
  } // select all cars or remove all cars
  useEffect(() => {
    setIsSelectAll(equalsCheck(selectCarID, carsId));
    setBookingDetails({
      ...bookingDetails,
      extraData: {
        ...bookingDetails?.extraData,
        allSelectedCars: selectCarID,
        allSelectedCarsDetails: selectCarDetails,
      },
    });
  }, [selectCarID]); // to check if user selected all cars manual and add it to global state

  function equalsCheck(arr1, arr2) {
    selectCarDetails.sort(({vehicle_id: num1}, {vehicle_id: num2}) => {
      return num1 - num2;
    });
    const a = arr1.sort((num1, num2) => {
      return num1 - num2;
    });
    const b = arr2.sort((num1, num2) => {
      return num1 - num2;
    });
    // check the length
    if (a.length != b.length) {
      return false;
    } else {
      let result = false;

      // comparing each element of array
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        } else {
          result = true;
        }
      }
      return result;
    }
  } // chack if all cars Selected after arrange carsId and selected cars to compare two arrays

  return (
    <View
      style={{paddingTop: insets.top + 70}}
      className="px-4 relative flex-1">
      <TouchableOpacity
        onPress={selectAllCars}
        className="border-mainColor border p-3 mb-3 rounded-lg">
        <View className="flex-row justify-between items-center">
          <Text className="text-mainColor">Select All</Text>
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
            navigation.push('SelectDateTime');
          }
        }}
      />
    </View>
  );
}
