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

export default function AddVechileScreen({navigation, route}) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [currentCar, setCurrentCar] = useRecoilState(updateCar);
  const setMyCarsList = useSetRecoilState(myCarsList);
 const [isLoading , setIsLoading] = useState(false)
  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }

  const [newCar, setNewCar] = useRecoilState(addNewCar);

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
      setNewCar(cC => ({
        ...cC,
        carID: currentCar.vehicle_id,
      }));
      let res = await updateVehicle(newCar , setIsLoading);
      res && handleSuccess()
    } else {
      setIsLoading(true)
      let res = await addVehicle(newCar ,setIsLoading);
      res && handleSuccess()
    }
    
  };
  function handleSuccess() {
    setIsLoading(false)
    setIsPopUpOpen(true);
    fetchMyCars(setMyCarsList);
    setTimeout(() => {

      setNewCar({});
      setCurrentCar({});
      navigation.goBack();
    }, 1000);
    
  }
  return (
    <KeyboardAwareScrollView className="pt-[120px] px-4">
      <Modal
        swipeDirection={'down'}
        onSwipeMove={handleClosePopUp}
        avoidKeyboard={true}
        hasBackdrop={true}
        isVisible={isPopUpOpen}>
        <SuccessAddVehicle closePopUp={handleClosePopUp} title={Lang_chg.vehicle_added_success_msg[config.language]} />
      </Modal>
      <SelectVechileCard
        screenTitle={'Select Category'}
        text={`${
          newCar[handleTitleData('Category')]
            ? newCar[handleTitleData('Category')][handleTitleData('Category')][
                config.language
              ]
            : currentCar.vehicle_name
            ? currentCar.vehicle_name[config.language]
            : Lang_chg.selectcategory_txt[config.language]
        }`}
        icon={categoryIcon}
        img={
          newCar[handleTitleData('Category')]
            ? newCar[handleTitleData('Category')][
                `${handleTitleData('Category')}_image`
              ]
            : currentCar.vehicle_image && currentCar.vehicle_image
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
      isLoading={isLoading}
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
