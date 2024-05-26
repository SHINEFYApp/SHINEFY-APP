import {KeyboardAwareScrollView, View} from 'react-native-ui-lib';
import React from 'react';
import SelectVechileCard from '../../components/selectVechileCard.jsx/selectVechileCard';
import categoryIcon from '../../assets/icons/categoryIcon.png';
import brandIcon from '../../assets/icons/brandIcon.png';
import plateIcon from '../../assets/icons/plateIcon.png';
import modelIcon from '../../assets/icons/modelIcon.png';
import colorIcon from '../../assets/icons/colorCarIcon.png';
import Button from '../../components/mainButton/Button';
import Modal from 'react-native-modal';
import {useEffect, useState} from 'react';
import SuccessAddVehicle from '../../components/successAddVehicle/successAddVehicle';
import addNewCar from '../../atoms/addNewCar/addNewCar';
import {useRecoilState, useSetRecoilState} from 'recoil';
import addVehicle from '../../Features/addVehicle/addVehicle';
import updateVehicle from '../../Features/updateVehicle/updateVehicle';
import {config} from '../../Provider/configProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import updateCar from '../../atoms/currentCar/currentCar';
import myCarsList, {fetchMyCars} from '../../atoms/carsList/myCarsList';
export default function UpdateVechileScreen({navigation, route, params}) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [currentCar, setCurrentCar] = useRecoilState(updateCar);
  const setMyCarsList = useSetRecoilState(myCarsList);

  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }

  function handleTitleData(title) {
    switch (title) {
      case 'Brand':
        return 'car_make';
      case 'Category':
        return 'car_category';
      case 'Color':
        return 'car_color';
    }
  }

  const createOrUpdateVehicle = async () => {
    if (route.params === 'updateVehicle') {
      await updateVehicle(currentCar);
    setIsPopUpOpen(true);
    setCurrentCar({});
    fetchMyCars(setMyCarsList);
    setTimeout(() => {
      setIsPopUpOpen(false);
      navigation.goBack();
    }, 1000);
  };
  return (
    <KeyboardAwareScrollView className="pt-[80px] px-4">
      <Modal
        swipeDirection={'down'}
        onSwipeMove={handleClosePopUp}
        avoidKeyboard={true}
        hasBackdrop={true}
        isVisible={isPopUpOpen}>
        <SuccessAddVehicle closePopUp={handleClosePopUp} />
      </Modal>
      <SelectVechileCard
        screenTitle={'Select Category'}
        text={`${currentCar.vehicle_name
            ? currentCar.vehicle_name[config.language]
            : Lang_chg.selectcategory_txt[config.language]
        }`}
        icon={categoryIcon}
        img={currentCar.vehicle_image && currentCar.vehicle_image
        }
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
        screenTitle={'Select Brand'}
        text={`${
          newCar[handleTitleData('Brand')]
            ? newCar[handleTitleData('Brand')][handleTitleData('Brand')][
                config.language
              ]
            : currentCar.make_name
            ? currentCar.make_name[config.language]
            : Lang_chg.selectmake_txt[config.language]
        }`}
        icon={brandIcon}
        img={
          newCar[handleTitleData('Brand')] &&
          newCar[handleTitleData('Brand')].image
        }
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
        screenTitle={'Select Model'}
        text={`${
          newCar.modal
            ? newCar.modal.modal[config.language]
            : currentCar.model_name
            ? currentCar.model_name[config.language]
            : Lang_chg.selectmodel_txt[config.language]
        }`}
        brandID={newCar.car_make && newCar.car_make.make_id}
        icon={modelIcon}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
        screenTitle={'Select Color'}
        text={`${
          newCar[handleTitleData('Color')]
            ? newCar[handleTitleData('Color')][handleTitleData('Color')][
                config.language
              ]
            : currentCar.color_name
            ? currentCar.color_name[config.language]
            : Lang_chg.selectcolor_txt[config.language]
        }`}
        icon={colorIcon}
        img={
          newCar[handleTitleData('Color')] &&
          newCar[handleTitleData('Color')][`${handleTitleData('Color')}_image`]
        }
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
        screenTitle={'Plate Number'}
        text={
          newCar.plate_number
            ? newCar.plate_number
            : currentCar.plate_number
            ? currentCar.plate_number
            : Lang_chg.platenumber_txt[config.language]
        }
        icon={`${plateIcon}`}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <Button
        Title={`${
          route.params
            ? Lang_chg.update_vechile[config.language]
            : Lang_chg.addvechicle_txt[config.language]
        }`}
        onPress={createOrUpdateVehicle}
      />
    </KeyboardAwareScrollView>
  );
}
