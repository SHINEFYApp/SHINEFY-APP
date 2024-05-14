import {TextInput} from 'react-native';
import {Text, View} from 'react-native-ui-lib';

const AddCardInput = ({label, className}) => {
  return (
    <View className={`mb-4 ${className} w-full`}>
      <Text className={'font-bold text-base mb-2'}>{label}</Text>
      <TextInput
        className={
          'border-[2px] border-[#C3C3C3] rounded-lg w-full bg-white px-2 h-8'
        }
      />
    </View>
  );
};

export default AddCardInput;
