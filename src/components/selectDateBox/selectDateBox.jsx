import {StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import { msgProvider } from '../../Provider/Messageconsolevalidationprovider/messageProvider';
import { Lang_chg } from '../../Provider/Language_provider';
import { config } from '../../Provider/configProvider';

export default function SelectDateBox({title, selected, onPress ,classStyle , backendKey}) {


  return (
    <View className={` p-2 w-1/3 ${classStyle}`}>
    <TouchableHighlight
      onPress={() => {
        if(backendKey?.includes("Waiting")) {
          msgProvider.alert(Lang_chg.waiting_time_slot[config.language] , Lang_chg.waiting_time_msg[config.language])
        }
        onPress(title ,backendKey);
      }}
      underlayColor={'white'}
      className={`bg-white rounded-lg px-3 py-2  ${
        title === selected || selected === true ? 'bg-mainColor' : 'bg-white'
    
      } w-full`}
      style={title !== selected && style.box}>
      <Text className={`${title === selected || selected === true ? 'text-white' : 'text-black'} text-center`}>{title}</Text>
    </TouchableHighlight>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    shadowColor: 'rgba(221, 153, 35, 0.3)',
    shadowOffset: {
      width: 8,
      height: 4,
    },
    shadowOpacity: 5.19,
    shadowRadius: 5.62,
    elevation: 9,
  },
});
