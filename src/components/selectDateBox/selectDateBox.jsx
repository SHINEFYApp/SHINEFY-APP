import {StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Text} from 'react-native-ui-lib';

export default function SelectDateBox({title, selected, onPress}) {
  return (
    <TouchableHighlight
      onPress={() => {
        onPress(title);
      }}
      underlayColor={'white'}
      className={`bg-white rounded-lg px-3 py-2 m-2  ${
        title === selected ? 'bg-mainColor' : 'bg-white'
      }`}
      style={title !== selected && style.box}>
      <Text className={`${title === selected && 'text-white'}`}>{title}</Text>
    </TouchableHighlight>
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
