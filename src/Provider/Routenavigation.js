import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../Splash';
import WelcomeScreen from '../screens/welcomeScreen/welcomeScreen';
import Login from '../Login';
import Forgot from '../Forgot';
import Signup from '../Signup';
import My_Vehicles from '../My_Vehicles';
import Edit_Vechicle from '../Edit_Vechicle';
import Profile from '../Profile';
import Edit_Profile from '../Edit_Profile';
import Saved_Location from '../Saved_Location';
import My_Wallet from '../My_Wallet';
import Language from '../Language';
import Change_Password from '../Change_Password';
import Contact from '../Contact';
import Faqs from '../Faqs';
import Terms_about_policy from '../Terms_about_policy';
import Home from '../Home';
import My_Bookings from '../My_Bookings';
import Bookings_Details from '../Bookings_Details';
import Track_Booking from '../Track_Booking';
import Select_Date from '../Select_Date';
import Success from '../Success';
import Otp_verify from '../Otp_verify';
import New_password from '../New_password';
// import Reason_message from '../Reason_message';
import Delete_success from '../Delete_success';
import Search_Location from '../Search_Location';
import Notification from '../Notification';
import Rate_Now from '../Rate_Now';
import Booking_overview1 from '../Booking_overview1';
import Payment_option from '../Payment_option';
import Select_Service from '../Select_Service';
import Service_details from '../Service_details';
import Home_save_location from '../Home_save_location';
import Select_Vehicles from '../Select_Vehicles';
import Add_your_vehicle from '../Add_your_vehicle';
import Select_date_reschedule from '../Select_date_reschedule';
import ForgotPasswordScreen from '../screens/forgotpasswordScreen/forgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen/OTPScreen';
import ChangePassword from '../screens/changePassword/changePassword';
import NavigationTop from '../components/navigationTop/navigationTop';
import HomeScreen from '../screens/homeScreen/homeScreen';
import Test from '../components/test/test';
import SavedLocationScreen from '../screens/savedLocationScreen/savedLocationScreen';
import AddLocationScreen from '../screens/addLocationScreen/addLocationScreen';
import NotficationScreen from '../screens/notficationScreen/notficationScreen';
import MyTabs from '../components/test/test';
import SpecialOffersScreen from '../screens/specialOffers/specialOffersScreen';
import WashServicesScreen from '../screens/washServicesScreen/WashServicesScreen';
import ProfileScreen from '../screens/profileScreen/profileScreen';
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

const Stack = createStackNavigator();

const Stacknav = navigation => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <NavigationTop {...props} />,
        cardStyle: {backgroundColor: '#FFFAF2'},
      }}
      initialRouteName={'Splash'}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen name="HomeScreen" component={MyTabs} options={{headerShown: false}}/>
      <Stack.Screen
        name="SavedLocationScreen"
        component={SavedLocationScreen}
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
        name="Add Card"
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
      <Stack.Screen name="WashServiceDetails" component={WashServiceDetails} />
      <Stack.Screen
        name="MyWallet"
        component={WalletScreen}
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
      <Stack.Screen name="addLocationScreen" component={AddLocationScreen} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="updateVehicle"
        component={AddVechileScreen}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="My_Vehicles"
        component={My_Vehicles}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Edit_Vechicle"
        component={Edit_Vechicle}
        options={{headerShown: true}}
      />
      <Stack.Screen 
        name="Profile"
        component={Profile}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Edit_Profile"
        component={Edit_Profile}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Saved_Location"
        component={Saved_Location}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="My_Wallet"
        component={My_Wallet}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{headerShown: true}}
      />
      {/* <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: true}}
      /> */}
      <Stack.Screen
        name="Change_Password"
        component={Change_Password}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Faqs"
        component={Faqs}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Terms_about_policy"
        component={Terms_about_policy}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="My_Bookings"
        component={My_Bookings}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Bookings_Details"
        component={Bookings_Details}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Track_Booking"
        component={Track_Booking}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Select_Date"
        component={Select_Date}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: true, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Otp_verify"
        component={Otp_verify}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="New_password"
        component={New_password}
        options={{headerShown: true}}
      />
      {/* <Stack.Screen
        name="Reason_message"
        component={Reason_message}
        options={{headerShown: true}}
      /> */}
      <Stack.Screen
        name="Delete_success"
        component={Delete_success}
        options={{headerShown: true, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Search_Location"
        component={Search_Location}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Rate_Now"
        component={Rate_Now}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Booking_overview1"
        component={Booking_overview1}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Payment_option"
        component={Payment_option}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Select_Service"
        component={Select_Service}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Service_details"
        component={Service_details}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Home_save_location"
        component={Home_save_location}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Select_Vehicles"
        component={Select_Vehicles}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Add_your_vehicle"
        component={Add_your_vehicle}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Select_date_reschedule"
        component={Select_date_reschedule}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};
export default Stacknav;
