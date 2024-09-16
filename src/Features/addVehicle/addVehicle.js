import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {config} from '../../Provider/configProvider';
import { Lang_chg } from '../../Provider/Language_provider';
import {localStorage} from '../../Provider/localStorageProvider';
import { msgProvider } from '../../Provider/Messageconsolevalidationprovider/messageProvider';

export default async function addVehicle(newCar , setIsLoading) {
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
  if (newCar.car_category == undefined) {
    msgProvider.toast(Lang_chg.emptyCarCategory[config.language] , "center")
  } 
  else if (newCar.car_make == undefined) {
    msgProvider.toast(Lang_chg.emptyCarMake[config.language] , "center")
  } 
  else if (newCar.modal == undefined) {
    msgProvider.toast(Lang_chg.emptyCarModal[config.language] , "center")
  } 
  else if (newCar.car_color == undefined) {
    msgProvider.toast(Lang_chg.emptyCarColor[config.language] , "center")
  } 
  else if (newCar.plate_number == undefined) {
    msgProvider.toast(Lang_chg.emptyPlateNo[config.language] , "center")
  } else {
    
    const fd = new FormData();
    fd.append('car_category_id', newCar.car_category.car_category_id);
    fd.append('model_id', newCar.modal.model_id);
    fd.append('make_id', newCar.car_make.make_id);
    fd.append('color_id', newCar.car_color.color_id);
    fd.append('plate_number', newCar.plate_number);
    fd.append('user_id', user_id);
    let url = config.baseURL + 'add_vehicle';
    
    try {
        let res = await apifuntion.postApi(url, fd);
        return res.success;
      } catch (err) {}
    }
  }
    