import {atom} from 'recoil';
import getSavedLocation from '../../Features/getSavedLocation/getSavedLocation';
const myLocationList = atom({
  key: 'myLocationList',
  default: [],
});

export const fetchMyLoaction = async setMyLocationList => {
  const data = await getSavedLocation();
  if (data === 'NA') {
    setMyLocationList([]);
  } else {
    setMyLocationList(data);
  }
};

export default myLocationList;
