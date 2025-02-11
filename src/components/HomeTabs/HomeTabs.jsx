import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../../screens/homeScreen/homeScreen';
import VehiclesScreen from '../../screens/vehiclesScreen/vehiclesScreen';
import NavigationTop from '../navigationTop/navigationTop';
import CustomTabBarButton from '../customButtonTab/customButtonTab';
import CustomTabBar from '../customTab/customTab';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native-ui-lib';
import homeIcon from '../../assets/icons/HomeIcon.png';
import homeActiveIcon from '../../assets/icons/HomeIconActive.png';
import vechileIcon from '../../assets/icons/vechileIcon.png';
import vechileActiveIcon from '../../assets/icons/vechileIconAvtive.png';
import profileIcon from '../../assets/icons/profileIcon.png';
import profileIconActive from '../../assets/icons/userIconActive.png';
import bookingIcon from '../../assets/icons/BookingIcon.png';
import BookingIconActive from '../../assets/icons/BookingIconActive.png';
import addIcon from '../../assets/icons/Add_roundIcon.png';
import AddVechileScreen from '../../screens/addVechile/addVechile';
import ProfileScreen from '../../screens/profileScreen/profileScreen';
import MyBookingScreen from '../../screens/myBookingScreen/myBookingScreen';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import SelectLocation from '../../screens/selectLocation/selectLocation';
import isGuestAtom from '../../atoms/isGuest';
import { useRecoilValue } from 'recoil';
const Tab = createBottomTabNavigator();

export default function MyTabs(parentProps) {

  const isGuest = useRecoilValue(isGuestAtom)

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: '#FFFAF2',
      }}
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        header: props => <NavigationTop {...props} />,
        headerShown: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
    
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen} 

        options={{
          gestureEnabled: false,
          tabBarLabel: 'Home TEST',
          tabBarIcon: () => <Image source={homeIcon} />,
          tabBarButton: props => (
            <CustomTabBarButton
              {...props}
              screenName={Lang_chg.home1_txt[config.language]}
              activeIcon={homeActiveIcon}
            />
          ),
        }}
      />
      {
        !isGuest &&
        <>
          <Tab.Screen
            name="Vehicles"
            component={VehiclesScreen}
            options={{
              tabBarIcon: () => <Image source={vechileIcon} />,
              tabBarButton: props => (
                <CustomTabBarButton
                  {...props}
                  screenName={Lang_chg.Vehicles_txt[config.language]}
                  activeIcon={vechileActiveIcon}
                />
              ),
            }}
          />

        </>

      }
      {
        !isGuest &&
        <>
                <Tab.Screen
        name="AddBooking"
        component={SelectLocation}
        options={{
          tabBarIcon: () => <Image source={addIcon} />,
          tabBarButton: props => <CustomTabBarButton {...props} float={true} navigation={parentProps.navigation} />,
          tabBarLabel: () => {},
        }}
      />

        </>

      }
      {
        !isGuest &&
        <>
      
      <Tab.Screen
        name="Bookings"
        component={MyBookingScreen}
        options={{
          tabBarIcon: () => <Image source={bookingIcon} />,
          tabBarButton: props => (
            <CustomTabBarButton
              {...props}
              screenName={Lang_chg.bookings_txt[config.language]}
              activeIcon={BookingIconActive}
            />
          ),
        }}
      />
        </>

      }
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Image source={profileIcon} />,
          tabBarButton: props => (
            <CustomTabBarButton
              {...props}
              screenName={Lang_chg.profile_txt[config.language]}
              activeIcon={profileIconActive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'transparent',
    position: 'relative',
    width: '100%',
    shadowColor: 'transparent',
    borderRadius: 20,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});
