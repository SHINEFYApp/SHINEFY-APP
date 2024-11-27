import {create} from 'apisauce';
import {Platform} from 'react-native';
import base64 from 'react-native-base64';

const apiSauce = create({
  baseURL: __DEV__ ? 'https://mobile.shinefy.co/admin/api/' : 'https://shinefy.co/app/admin/api/',
  headers: {
    Authorization: `Basic ${base64.encode(
      base64.encode('mario') + ':' + base64.encode('carbonell'),
    )}`,
    'app-type': Platform.OS,
    'app-version': Platform.OS === 'ios' ? '19' : '19',
    'user-type': 'user',
  },
});

export default apiSauce;
