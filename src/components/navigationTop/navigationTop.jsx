import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React, { useEffect } from 'react';
import notfiIcon from '../../assets/icons/notifcationIcon.png';
import saveIcon from '../../assets/icons/savedLocationIcon.png';
import backIcon from '../../assets/icons/backIcon.png';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import getHome from '../../Features/getHome/getHome';
import { Platform } from 'react-native';
export default function NavigationTop(props) {
 const insets = useSafeAreaInsets();

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
      case 'SelectDateTime':
        return Lang_chg.Selectdatetime_txt[config.language];
      case 'EditProfileScreen':
        return Lang_chg.editprofile_txt[config.language];
      case 'MyWallet':
        return Lang_chg.mywallet_txt[config.language];
      case 'PackageScreen':
        return Lang_chg.packages[config.language];
      case 'MySubscreptionScreen':
        return Lang_chg.mySubscriptions[config.language];
      case 'SettingScreen':
        return Lang_chg.Setting[config.language];
      case 'ChangePasswordProfile':
        return Lang_chg.password1_txt[config.language];
      case "FAQ's":
        return Lang_chg.faqs_txt[config.language];
      case 'AboutUsScreen':
        return Lang_chg.about_txt[config.language];
      case 'LanguageScreen':
        return Lang_chg.language_change[config.language];
      case 'addVehiclesDetails':
        return Lang_chg.cardetails_txt[config.language];
      case 'Contact Us':
        return Lang_chg.contactus_txt[config.language];
      case 'Cancel Booking':
        return Lang_chg.cancelBooking_txt[config.language];
      case 'Review':
        return Lang_chg.review_txt[config.language];
      case 'RequestDetails':
        return Lang_chg.Booking_request[config.language];
      case 'Booking Overview':
        return Lang_chg.Booking_overview[config.language];
      case 'PaymentMethod':
        return Lang_chg.select_payment_method[config.language];
      case 'WashServiceDetails':
        return Lang_chg.wash_services[config.language];
      case 'AddBooking':
        return Lang_chg.select_Location[config.language];
      case 'PackageDetailsScreen':
        return Lang_chg.package_details[config.language];
      default:
        return props.route.name;
    }
  }

  return (
    <View
      style={{paddingTop:insets.top}}
      className={
        `  flex-row w-full  justify-between z-10 p-5  bg-white items-center rounded-b-2xl border-b border-l border-r border-[#C3C3C3]`
      }>
      {props.route.name == 'Home' ? (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SavedLocationScreen');
          }}>
          <Image source={saveIcon} />
        </TouchableOpacity>
      ) : !props.route?.params?.isRate && (
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
      <View className="mx-auto">
        <Text className="font-extrabold text-xl text-center w-full">
          {handleTitle()}
        </Text>
      </View>
      {
        !props.route?.params?.isRate &&
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('notficationScreen');
        }}>
        <Image source={notfiIcon} />
      </TouchableOpacity>
      }
    </View>
  );
}
