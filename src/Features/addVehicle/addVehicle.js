import {apifuntion} from '../../Provider/Apicallingprovider/apiProvider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/localStorageProvider';

export default async function addVehicle(newCar) {
  let user_arr = await localStorage.getItemObject('user_arr');
  let user_id = user_arr.user_id;
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
