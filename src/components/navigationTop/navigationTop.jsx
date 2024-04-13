import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import notfiIcon from '../../assets/icons/notifcationIcon.png';
import saveIcon from '../../assets/icons/savedLocationIcon.png';
import backIcon from '../../assets/icons/backIcon.png';
export default function NavigationTop(props) {
  function handleTitle() {
    switch (props.route.name) {
      case 'HomeScreen':
        return 'SHINEFY';
      case 'SavedLocationScreen':
        return 'Saved Location';
      case 'addLocationScreen':
        return 'Booking Location';
      default:
        return props.route.name;
    }
  }

  return (
    <View
      className={
        'flex-row absolute w-full justify-between z-10 p-5 bg-white items-center rounded-b-2xl border-b border-l border-r border-[#C3C3C3]'
      }>
      {props.route.name == 'HomeScreen' ? (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SavedLocationScreen');
          }}>
          <Image source={saveIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={backIcon} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('HomeScreen');
        }}>
        <Text>home</Text>
      </TouchableOpacity>
      <View>
        <Text className="font-extrabold text-xl">{handleTitle()}</Text>
      </View>
      <TouchableOpacity onPress={()=>{
        props.navigation.navigate("notficationScreen")
      }}>
        <Image source={notfiIcon} />
      </TouchableOpacity>
    </View>
  );
}
