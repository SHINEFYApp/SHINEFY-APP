import {Text, View} from 'react-native-ui-lib';
import SelectVechileCard from '../../components/selectVechileCard.jsx/selectVechileCard';
import categoryIcon from '../../assets/icons/categoryIcon.png';
import brandIcon from '../../assets/icons/brandIcon.png';
import plateIcon from '../../assets/icons/plateIcon.png';
import modelIcon from '../../assets/icons/modelIcon.png';
import colorIcon from '../../assets/icons/colorCarIcon.png';
import Button from '../../components/mainButton/Button';
import Modal from 'react-native-modal';
import { useState } from 'react';
import SuccessAddVehicle from '../../components/successAddVehicle/successAddVehicle';
export default function AddVechileScreen({navigation}) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }

  return (
    <View className="pt-[80px] px-4">
      <Modal swipeDirection={"down"} onSwipeMove={handleClosePopUp} avoidKeyboard={true} hasBackdrop={true} isVisible={isPopUpOpen}>
        <SuccessAddVehicle
          closePopUp={handleClosePopUp}
        />
      </Modal>
      <SelectVechileCard
        text={'Select Category'}
        icon={categoryIcon}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
        text={'Select Brand'}
        icon={brandIcon}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
        text={'Select Model'}
        icon={modelIcon}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
        text={'Select Color'}
        icon={colorIcon}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
        text={'Plate Number'}
        icon={plateIcon}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <Button Title={'ADD Vechile'} onPress={()=>{
        setIsPopUpOpen(true)
      }} />
    </View>
  );
}
