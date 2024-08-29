import {create} from 'apisauce';
import {Platform} from 'react-native';
import base64 from 'react-native-base64';

const apiSauce = create({
  baseURL: 'https://mobile.shinefy.co/admin/api',
  headers: {
    Authorization: `Basic ${base64.encode(
      base64.encode('mario') + ':' + base64.encode('carbonell'),
    )}`,
    'app-type': Platform.OS,
    'app-version': Platform.OS === 'ios' ? '13' : '13',
    'user-type': 'user',
  },
});

export default apiSauce;
