import {create} from 'apisauce';
import {Platform} from 'react-native';
import base64 from 'react-native-base64';

const apiSauce = create({
  baseURL: 'https://shinefy.co/app-test/admin/api',
  headers: {
    Authorization: `Basic ${base64.encode(
      base64.encode('mario') + ':' + base64.encode('carbonell'),
    )}`,
    'app-type': Platform.OS,
    'app-version': '4',
    'user-type': 'user',
  },
});

export default apiSauce;
