import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import notfiIcon from '../../assets/icons/notifcationIcon.png';
import saveIcon from '../../assets/icons/savedLocationIcon.png';
import backIcon from '../../assets/icons/backIcon.png';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
export default function NavigationTop(props) {
  console.log(props.route)
  function handleTitle() {
    switch (props.route.name) {
      case 'Home':
        return Lang_chg.Home[config.language];
      case 'SavedLocationScreen':
       return Lang_chg.savedlocation_txt[config.language];
      case 'addLocationScreen':
          return Lang_chg.booking_location[config.language];
      case 'ProfileScreen':
          return Lang_chg.profile_txt[config.language];
      case 'Bookings':
        return Lang_chg.mybookings_txt[config.language];
      case 'AddCar':
        return Lang_chg.addvechicle_txt[config.language];
      case 'Vehicles':
        return Lang_chg.myvehicles_txt[config.language];
      case 'updateVehicle':
        return Lang_chg.editvechile_txt[config.language];
      case 'notficationScreen':
        return Lang_chg.notification_txt[config.language];
      default:
        return props.route.params ? props.route.params.name[config.language] :props.route.name  ;
    }
  }

  return (
    <View
      className={
        'flex-row  absolute w-full justify-between z-10 p-5 bg-white items-center rounded-b-2xl border-b border-l border-r border-[#C3C3C3]'
      }>
      {props.route.name == 'Home' ? (
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
          <Image
            source={backIcon}
            className={config.language === 0 ? '' : 'rotate-180'}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('HomeScreen');
        }}>
        <Text>home</Text>
      </TouchableOpacity>
      <View>
        <Text className="font-extrabold text-xl text-center w-full">{handleTitle()}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('notficationScreen');
        }}>
        <Image source={notfiIcon} />
      </TouchableOpacity>
    </View>
  );
}
