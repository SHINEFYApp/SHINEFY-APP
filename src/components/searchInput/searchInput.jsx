import {Image, View} from 'react-native-ui-lib';
import searchIcon from '../../assets/icons/searchIcon.png';
import { TextInput } from 'react-native';
export default function SearchInput({placeholder}) {
  return (
    <View  className={"bg-white border border-[#c3c3c3] px-4 flex-row overflow-hidden items-center rounded-xl"}>
      <Image source={searchIcon} />
      <TextInput placeholderTextColor={"#c3c3c3"} placeholder={placeholder} className={"w-full px-3 text-black"} />
    </View>
  );
}
