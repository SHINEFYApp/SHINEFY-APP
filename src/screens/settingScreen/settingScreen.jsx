import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native-ui-lib';
import SelectVechileCard from '../../components/selectVechileCard.jsx/selectVechileCard';
import Button from '../../components/mainButton/Button';
import AppLogout from '../../Features/logout/Logout';
import Modal from 'react-native-modal';
import logoutIcon from '../../assets/icons/logoutIcon.png';
import ConfirmationPopUp from '../../components/confirmationPopUp/ConfirmationPopUp';
import { useState } from 'react';
import deleteIcon from '../../assets/icons/deleteIcon.png'
import keyIcon from '../../assets/icons/setting/keyIcon.png'
import aboutIcon from '../../assets/icons/setting/aboutIcon.png'
import fileIcon from '../../assets/icons/setting/fileIcon.png'
import notifyIcon from '../../assets/icons/setting/notifyIcon.png'
import phoneIcon from '../../assets/icons/setting/phoneIcon.png'
import privateIcon from '../../assets/icons/setting/privateIcon.png'
import qIcon from '../../assets/icons/setting/qIcon.png'
import rateIcon from '../../assets/icons/setting/rateIcon.png'
import shareIcon from '../../assets/icons/setting/shareIcon.png'


export default function SettingScreen({ navigation }) {
  const [isPopUpOpenDelete, setIsPopUpOpenDelete] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }
  function handleClosePopUpDelete() {
    setIsPopUpOpenDelete(false);
  }

  return (
    <View className="pt-[80] px-5">
      <Modal avoidKeyboard={true} hasBackdrop={true} isVisible={isPopUpOpenDelete}>
        <ConfirmationPopUp
          closePopUp={handleClosePopUpDelete}
          onConfirm={() => { }}
          heading={'Delete Account ?'}
          p={'Are you sure , you want to Delete Account ?'}
          buttonTitle={'Delete'}
          icon={logoutIcon}
        />
      </Modal>
      <Modal avoidKeyboard={true} hasBackdrop={true} isVisible={isPopUpOpen}>
        <ConfirmationPopUp
          closePopUp={handleClosePopUp}
          onConfirm={() => AppLogout(navigation)}
          heading={'Logout'}
          p={'Are you sure , you want to logout ?'}
          buttonTitle={'LOG OUT'}
          icon={logoutIcon}
        />
      </Modal>
      <ScrollView>
        <SelectVechileCard
          text={'Notfication'}
          screen={null}
          navigation={navigation}
          isSwitch
          arrow
          icon={notifyIcon}
        />
        <SelectVechileCard
          text={'Change Password'}
          screen={'ChangePasswordProfile'}
          navigation={navigation}
          icon={keyIcon}
        />
        <SelectVechileCard
          text={'Contact Us'}
          screen={'Contact Us'}
          navigation={navigation}
          icon={phoneIcon}

        />
        <SelectVechileCard
          text={"FAQ's"}
          screen={'AboutUsScreen'}
          navigation={navigation}
          icon={qIcon}
        />
        <SelectVechileCard
          text={'Terms & Conditions'}
          screen={'AboutUsScreen'}
          navigation={navigation}
          icon={fileIcon}
        />
        <SelectVechileCard
          text={'Privacy Policy'}
          screen={'AboutUsScreen'}
          navigation={navigation}
          icon={privateIcon}
        />
        <SelectVechileCard
          text={'About Us'}
          screen={'AboutUsScreen'}
          navigation={navigation}
          icon={aboutIcon}
        />
        <View className="border-t border-[#ccc] pt-3">
          <SelectVechileCard
            text={'Rate App'}
            screen={'AboutUsScreen'}
            navigation={navigation}
            arrow
            icon={rateIcon}
          />
          <SelectVechileCard
            text={'Share App'}
            screen={'AboutUsScreen'}
            navigation={navigation}
            arrow
            icon={shareIcon}
          />
          <SelectVechileCard
            text={'Delete Account'}
            navigation={navigation}
            arrow
            icon={deleteIcon}
            Press={() => { setIsPopUpOpenDelete(true) }}
          />

        </View>
        <Button
          buttonColor={'#D04E46'}
          onPress={() => {
            setIsPopUpOpen(true);
          }}
          Title={'LOG OUT'}
          icon={logoutIcon}
        />
      </ScrollView>
    </View>
  );
}
