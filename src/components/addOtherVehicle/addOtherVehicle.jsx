import {Image, View} from 'react-native-ui-lib';
import img from '../../assets/other.png';
import Button from '../mainButton/Button';
import globalStyle from '../../assets/globalStyle';
export default function AddOtherVehicle({navigation}) {
  return (
    <View
      className="self-start bg-white justify-center items-center py-7 px-4 rounded-lg mx-2"
      style={globalStyle.boxShadow}>
      <Image source={img} />
      <Button
        Title={'ADD Other'}
        smallButton={true}
        onPress={() => {
          navigation.navigate('AddCar');
        }}
      />
    </View>
  );
}
