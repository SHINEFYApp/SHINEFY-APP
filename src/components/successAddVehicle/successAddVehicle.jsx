import {Image, Text, View} from 'react-native-ui-lib';
import img from '../../assets/addVehicle.png';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
export default function SuccessAddVehicle({closePopUp , title}) {
  return (
    <View className="bg-white w-11/12 mx-auto p-4 rounded-2xl">
      <View className="items-center">
        <Text className=" text-3xl font-bold mt-5">
          {Lang_chg.Congratulations[config.language]}
        </Text>
        <Text className=" text-xl  my-5">
          {title}
          
        </Text>
        <Image className="my-4" source={img} />
      </View>
    </View>
  );
}
