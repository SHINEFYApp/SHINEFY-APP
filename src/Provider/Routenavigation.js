import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../Splash';
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
import Setting from '../Setting';

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

//------------------------------------Hariom-------------------
import Otp_verify from '../Otp_verify';
import New_password from '../New_password';
import Reason_message from '../Reason_message';
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

const Stack = createStackNavigator();

const Stacknav = navigation => {
  return (
    <Stack.Navigator initialRouteName={'Splash'}>
      {/* Starting from here  */}
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* Login screen  */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* forgot password page */}
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{headerShown: false}}
      />
      {/* Register from here */}
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* My_Vehicles to see your vehicle*/}
      <Stack.Screen
        name="My_Vehicles"
        component={My_Vehicles}
        options={{headerShown: false}}
      />
      {/* Edit_Vechicle to edit your vehicle */}
      <Stack.Screen
        name="Edit_Vechicle"
        component={Edit_Vechicle}
        options={{headerShown: false}}
      />
      {/* Profile to see your profile */}
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      {/* Edit your profile */}
      <Stack.Screen
        name="Edit_Profile"
        component={Edit_Profile}
        options={{headerShown: false}}
      />
      {/* Saved our location */}
      <Stack.Screen
        name="Saved_Location"
        component={Saved_Location}
        options={{headerShown: false}}
      />
      {/* My_Wallet to see your amount */}
      <Stack.Screen
        name="My_Wallet"
        component={My_Wallet}
        options={{headerShown: false}}
      />
      {/* Language */}
      <Stack.Screen
        name="Language"
        component={Language}
        options={{headerShown: false}}
      />
      {/*Setting is shows more options */}
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
      {/* Change your Password  */}
      <Stack.Screen
        name="Change_Password"
        component={Change_Password}
        options={{headerShown: false}}
      />
      {/*To Contact for help */}
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
      {/* Faqs Questions    */}
      <Stack.Screen
        name="Faqs"
        component={Faqs}
        options={{headerShown: false}}
      />
      {/* Terms about policy  */}
      <Stack.Screen
        name="Terms_about_policy"
        component={Terms_about_policy}
        options={{headerShown: false}}
      />
      {/* Home */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* My_Bookings */}
      <Stack.Screen
        name="My_Bookings"
        component={My_Bookings}
        options={{headerShown: false}}
      />
      {/* Bookings_Details */}
      <Stack.Screen
        name="Bookings_Details"
        component={Bookings_Details}
        options={{headerShown: false}}
      />
      {/* Track_Booking */}
      <Stack.Screen
        name="Track_Booking"
        component={Track_Booking}
        options={{headerShown: false}}
      />
      {/* Select_Date */}
      <Stack.Screen
        name="Select_Date"
        component={Select_Date}
        options={{headerShown: false}}
      />
      {/* Success */}
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false, gestureEnabled: false}}
      />

      {/* ------------------------------ Hariom------------------------- */}
      {/* Otp_verify */}
      <Stack.Screen
        name="Otp_verify"
        component={Otp_verify}
        options={{headerShown: false}}
      />
      {/* New_password */}
      <Stack.Screen
        name="New_password"
        component={New_password}
        options={{headerShown: false}}
      />
      {/* Reason_message */}
      <Stack.Screen
        name="Reason_message"
        component={Reason_message}
        options={{headerShown: false}}
      />
      {/* Delete_success */}
      <Stack.Screen
        name="Delete_success"
        component={Delete_success}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* Search_Location */}
      <Stack.Screen
        name="Search_Location"
        component={Search_Location}
        options={{headerShown: false}}
      />
      {/* Notification */}
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      {/* Rate_Now to give rating */}
      <Stack.Screen
        name="Rate_Now"
        component={Rate_Now}
        options={{headerShown: false}}
      />
      {/* Booking_overview1 */}
      <Stack.Screen
        name="Booking_overview1"
        component={Booking_overview1}
        options={{headerShown: false}}
      />
      {/* Payment_option */}
      <Stack.Screen
        name="Payment_option"
        component={Payment_option}
        options={{headerShown: false}}
      />
      {/* Select_Service */}
      <Stack.Screen
        name="Select_Service"
        component={Select_Service}
        options={{headerShown: false}}
      />
      {/* Service_details */}
      <Stack.Screen
        name="Service_details"
        component={Service_details}
        options={{headerShown: false}}
      />
      {/* Home_save_location */}
      <Stack.Screen
        name="Home_save_location"
        component={Home_save_location}
        options={{headerShown: false}}
      />
      {/* Select_Vehicles */}
      <Stack.Screen
        name="Select_Vehicles"
        component={Select_Vehicles}
        options={{headerShown: false}}
      />
      {/* Add_your_vehicle */}
      <Stack.Screen
        name="Add_your_vehicle"
        component={Add_your_vehicle}
        options={{headerShown: false}}
      />
      {/* Select_date_reschedule */}
      <Stack.Screen
        name="Select_date_reschedule"
        component={Select_date_reschedule}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Stacknav;
