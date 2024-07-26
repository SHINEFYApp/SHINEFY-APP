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
import {useSetRecoilState} from 'recoil';
import checkLocation from '../../Features/checkLocation/checkLocation';
export default function LocationCard({location, navigation}) {
  const [isPopUpOpenDelete, setIsPopUpOpenDelete] = useState(false);
  const setLocationList = useSetRecoilState(myLocationList);

  return (
    <TouchableOpacity
      onPress={async() => {
        const state = await checkLocation(location)
        state && navigation.push('BookingTypeScreen', location);
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
        </View>
      </View>
    </TouchableOpacity>
  );
}
