import {atom} from 'recoil';
import getMyVehicles from '../../Features/getVehicles/getVehicles';
const myCarsList = atom({
  key: 'myCarsList',
  default: [],
});

export const fetchMyCars = async setMyCarsList => {
  const data = await getMyVehicles();
  if (data.vehicle_arr === 'NA') {
    setMyCarsList([]);
  } else {
    setMyCarsList(data.vehicle_arr);
  }
};

export default myCarsList;
