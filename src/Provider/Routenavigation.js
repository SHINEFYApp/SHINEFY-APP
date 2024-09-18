import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcomeScreen/welcomeScreen';
import ForgotPasswordScreen from '../screens/forgotpasswordScreen/forgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen/OTPScreen';
import ChangePassword from '../screens/changePassword/changePassword';
import NavigationTop from '../components/navigationTop/navigationTop';
import SavedLocationScreen from '../screens/savedLocationScreen/savedLocationScreen';
import AddLocationScreen from '../screens/addLocationScreen/addLocationScreen';
import NotficationScreen from '../screens/notficationScreen/notficationScreen';
import HomeTabs from '../components/HomeTabs/HomeTabs';
import SpecialOffersScreen from '../screens/specialOffers/specialOffersScreen';
import WashServicesScreen from '../screens/washServicesScreen/WashServicesScreen';
import EditProfileScreen from '../screens/editProfileScreen/editProfileScreen';
import WalletScreen from '../screens/walletScreen/walletScreen';
import SettingScreen from '../screens/settingScreen/settingScreen';
import AboutUsScreen from '../screens/aboutUsScreen/aboutUsScreen';
import ChangePasswordProfile from '../screens/changePasswordProfile/changePasswordProfile';
import WashServiceDetails from '../screens/washServiceDetails/washServiceDetails';
import AddVehiclesDetails from '../screens/addVehiclesDetails/AddVehiclesDetails';
import PackageScreen from '../screens/packagesScreen/PackagesScreen';
import PackageDetailsScreen from '../screens/packageDetailsScreen/packageDetailsScreen';
import LanguageScreen from '../screens/languageScreen/LanguageScreen';
import MySubscreptionScreen from '../screens/mySubscreptionScreen/mySubscreptionScreen';
import PaymentMethod from '../screens/PaymentMethod/PaymentMethodScreen';
import SelectDateTime from '../screens/selectDate&Time/SelectDateTime';
import RequestDetails from '../screens/requestDetails/RequestDetails';
import ContactUsScreen from '../screens/contactUs/ContactUs';
import FAQ from '../screens/FAQ/FAQ';
import CancelBooking from '../components/cancelBooking/CancelBooking';
import BookingOverview from '../screens/bookingOverview/BookingOverview';
import AddCard from '../screens/addCard/AddCard';
import ReviewScreen from '../screens/reviewScreen/ReviewScreen';
import AddVechileScreen from '../screens/addVechile/addVechile';
import CarPlateNumberScreen from '../screens/CarPlateNumberScreen';
import { Lang_chg } from './Language_provider';
import { config } from './configProvider';
import TermsConditions from '../screens/termsConditions/TermsConditions';
import PrivacyPolicy from '../screens/privacyPolicy/PrivacyPolicy';
import BookingType from '../screens/BookingType/BookingType';
import SelectBookingVehicles from '../screens/selectBookingVehicle/selectBookingVehicle';
import BookingDetails from '../screens/bookingDetails/bookingDetails';
import MyPackages from '../screens/myPackages/myPackages';
import PackageInfo from '../screens/packgesInfo/packagesInfo';
import PaymentMethodPackage from '../screens/PaymentMethodPackage/PaymentMethodScreenPackage';

const Stack = createStackNavigator();

const Stacknav = navigation => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <NavigationTop {...props} />,
        cardStyle: { backgroundColor: '#FFFAF2' },
      }}
      initialRouteName={'WelcomeScreen'}>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeTabs}
        options={{ headerShown: false , gestureEnabled: false}}
      />
      <Stack.Screen
        name="SavedLocationScreen"
        component={SavedLocationScreen}
      />
      <Stack.Screen
        name="PaymentMethodPackage"
        component={PaymentMethodPackage}
      />
      <Stack.Screen
        name="MyPackagesScreen"
        component={MyPackages}
      />
      <Stack.Screen
        name="PackageInfoScreen"
        component={PackageInfo}
      />
      <Stack.Screen
        name="BookingDetailsScreen"
        component={BookingDetails}
      />
      <Stack.Screen
        name="PackageScreen"
        component={PackageScreen}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
      />
      <Stack.Screen
        name="Booking Overview"
        component={BookingOverview}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
      />
      <Stack.Screen
        name="AddCardScreen"
        component={AddCard}
      />
      <Stack.Screen
        name="PackageDetailsScreen"
        component={PackageDetailsScreen}
      />
      <Stack.Screen
        name="addVehiclesDetails"
        component={AddVehiclesDetails}
      />
      <Stack.Screen
        name="CarPlateNumberScreen"
        component={CarPlateNumberScreen}
        title="Car Plate Number"
      />
      <Stack.Screen
        name="MySubscreptionScreen"
        component={MySubscreptionScreen}
      />
      <Stack.Screen
        name="Cancel Booking"
        component={CancelBooking}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
      />
      <Stack.Screen
        name="LanguageScreen"
        component={LanguageScreen}
      />
      <Stack.Screen
        name="WashServiceDetails"
        component={WashServiceDetails}
      />
      <Stack.Screen
        name="MyWallet"
        component={WalletScreen}
      />
      <Stack.Screen
        name="AddCar"
        component={AddVechileScreen}
      />
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetails}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
      />
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
      />
      <Stack.Screen
        name={Lang_chg.tearmsetting[config.language]}
        component={TermsConditions}
      />
      <Stack.Screen
        name={Lang_chg.privacypolicy_txt[config.language]}
        component={PrivacyPolicy}
      />
      <Stack.Screen
        name="ChangePasswordProfile"
        component={ChangePasswordProfile}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="Contact Us"
        component={ContactUsScreen}
      />
      <Stack.Screen
        name="FAQ's"
        component={FAQ}
      />
      <Stack.Screen
        name="specialOffersScreen"
        component={SpecialOffersScreen}
      />
      <Stack.Screen
        name="WashServicesScreen"
        component={WashServicesScreen}
      />
      <Stack.Screen
        name="notficationScreen"
        component={NotficationScreen}
      />
      <Stack.Screen
        name="BookingTypeScreen"
        component={BookingType}
      />
      <Stack.Screen
        name="addLocationScreen"
        component={AddLocationScreen}
      />
      <Stack.Screen
        name="selectBookingvehicle"
        component={SelectBookingVehicles}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="updateVehicle"
        component={AddVechileScreen}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
export default Stacknav;
