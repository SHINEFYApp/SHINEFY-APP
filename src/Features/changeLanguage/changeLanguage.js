import {Alert} from 'react-native';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function changeLanguage(value) {
  Alert.alert(
    Lang_chg.language_change[config.language],
    Lang_chg.Lang_change_msg[config.language],
    [
      {
        text: Lang_chg.no_txt[config.language],
        onPress: () => {},
        tyle: 'Yes',
      },
      {
        text: Lang_chg.yes_txt[config.language],
        onPress: () => {
          Lang_chg.language_set(value);
        },
      },
    ],
    {
      cancelable: false,
    },
  );
  return true;
}
