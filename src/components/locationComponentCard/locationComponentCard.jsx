import React from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import locationIcon from '../../assets/icons/currenLocation.png';
import editIcon from '../../assets/icons/editIcon.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import ConfirmationPopUp from '../confirmationPopUp/ConfirmationPopUp';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react';
import deleteLocation from '../../Features/deleteLocation/deleteLocation';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import myLocationList, {
  fetchMyLoaction,
} from '../../atoms/locationList/myLocationList';
import {useRecoilState, useSetRecoilState} from 'recoil';
import checkLocation from '../../Features/checkLocation/checkLocation';
import editBookingLocation from '../../Features/editBookingLocation/editBookingLocation';
import bookingDetailsAtom from '../../atoms/bookingDetails/bookingDetails.atom';
export default function LocationCard({location, navigation ,isEdit ,bookingId}) {
  const [isPopUpOpenDelete, setIsPopUpOpenDelete] = useState(false);
  const setLocationList = useSetRecoilState(myLocationList);
  const [bookingDetails, setBookingDetails] =
  useRecoilState(bookingDetailsAtom);
  return (
    <TouchableOpacity
      onPress={async() => {
    //      setBookingDetails({
    //   ...bookingDetails,
    //   address_loc: route.params.bookingType.params.location,
    //   longitude: route.params.bookingType.params.longitude,
    //   latitude: route.params.bookingType.params.latitude,
    // });
        if (isEdit) {
          editBookingLocation({
            bookingId ,
            lat : location.latitude,
            lon : location.longitude,
            address_loc : location.location 
          },navigation)
        }else {
          const state = await checkLocation(location)
          state && navigation.replace('BookingTypeScreen', location);
        }
      }}>
      <View className="flex-row items-center my-2 pb-3 justify-between border-b border-[#c3c3c3] relative">
        <Modal
          avoidKeyboard={true}
          hasBackdrop={true}
          isVisible={isPopUpOpenDelete}>
          <ConfirmationPopUp
            closePopUp={() => {
              setIsPopUpOpenDelete(false);
            }}
            onConfirm={async () => {
              await deleteLocation(location.user_location_id);
              fetchMyLoaction(setLocationList);
            }}
            heading={Lang_chg.delete_location[config.language]}
            p={`${Lang_chg.delete_location_confirmation[config.language]} ${
              config.language === 0 ? '' : ' الموقع'
            } ${location.user_address_name} ${
              config.language === 0 ? 'Location ?' : '؟'
            } `}
            buttonTitle={Lang_chg.delete[config.language]}
          />
        </Modal>
        <View className="flex-row items-center gap-5">
          <View>
            <Image source={locationIcon} />
          </View>
          <View>
            <Text className="font-bold text-lg">
              {location.user_address_name}
            </Text>
            <Text className={'whitespace-nowrap overflow-hidden h-5'}>
              {location.location.length > 45
                ? location.location.split(' ').slice(0, 8).join(' ') + '.....'
                : location.location}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-2 absolute right-0 top-0">
          <TouchableOpacity
            onPress={() => {
              setIsPopUpOpenDelete(true);
            }}
            source={editIcon}>
            <Image source={deleteIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('addLocationScreen', {...location , isEdit:true});
            }}
            source={editIcon}>
            <Image source={editIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
