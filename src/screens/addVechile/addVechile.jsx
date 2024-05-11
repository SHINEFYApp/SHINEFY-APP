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
import addNewCar from '../../atoms/addNewCar/addNewCar';
import { useRecoilState, useRecoilValue } from 'recoil';
import addVehicle from '../../Features/addVehicle/addVehicle';
import updateVehicle from '../../Features/updateVehicle/updateVehicle';
export default function AddVechileScreen({navigation , route}) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const currentCar = useRecoilValue(updateCar)
  console.log(currentCar)
  console.log(route.params)
  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }
  
    const [newCar , setNewCar] = useRecoilState(addNewCar) 

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

  return (
    <View className="pt-[80px] px-4">
      <Modal swipeDirection={"down"} onSwipeMove={handleClosePopUp} avoidKeyboard={true} hasBackdrop={true} isVisible={isPopUpOpen}>
        <SuccessAddVehicle
          closePopUp={handleClosePopUp}
        />
      </Modal>
      <SelectVechileCard
      screenTitle={'Select Category'}
        text={`${newCar[handleTitleData("Category")] ?newCar[handleTitleData("Category")][handleTitleData("Category")][0]  :currentCar.vehicle_name ? currentCar.vehicle_name[0] :'Select Category'}`}
        icon={categoryIcon}
        img={newCar[handleTitleData("Category")] ? newCar[handleTitleData("Category")][`${handleTitleData("Category")}_image`] : currentCar.vehicle_image && currentCar.vehicle_image }
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
      screenTitle={'Select Brand'}
       text={`${newCar[handleTitleData("Brand")] ?newCar[handleTitleData("Brand")][handleTitleData("Brand")][0] :'Select Brand'}`}
        icon={brandIcon}
        img={newCar[handleTitleData("Brand")]&&newCar[handleTitleData("Brand")].image} 
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
      screenTitle={'Select Model'}
         text={`${newCar.modal ?newCar.modal.modal[0] : currentCar.model_name ? currentCar.model_name[0] : 'Select Model'}`}
         brandID={newCar.car_make && newCar.car_make.make_id}
        icon={modelIcon}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
      screenTitle={'Select Color'}
        text={`${newCar[handleTitleData("Color")] ?newCar[handleTitleData("Color")][handleTitleData("Color")][0] :'Select Color'}`}
        icon={colorIcon}
        img={newCar[handleTitleData("Color")]&&newCar[handleTitleData("Color")][`${handleTitleData("Color")}_image`]}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <SelectVechileCard
      screenTitle={'Plate Number'}
        text={'Plate Number'}
        icon={`${plateIcon}`}
        screen={'addVehiclesDetails'}
        navigation={navigation}
      />
      <Button Title={`${route.params ? "Update Vehicle" : "ADD Vehicle"}`} onPress={async()=>{
        // setIsPopUpOpen(true)
        setIsPopUpOpen(await addVehicle(newCar))
        setNewCar({})
        navigation.navigate('HomeScreen')
        
      }} />
    </View>
  );
}
