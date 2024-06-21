import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../../screens/homeScreen/homeScreen';
import { Image, Text, View } from 'react-native-ui-lib';
import homeIcon from '../../assets/icons/HomeIcon.png'

export default function BottomTabs(props) {

  return (
    <>
    
    <View className="flex-row justify-between p-5">
        <View className="justify-center items-center">
        <Image source={homeIcon}/>
            <Text>Home</Text>
        </View>
        <View className="items-center">
        <Image source={homeIcon}/>
            <Text>vechils</Text>
        </View>
        <View className="items-center">
        <Image source={homeIcon}/>
            <Text>add</Text>
            </View>
        <View className="items-center">
        <Image source={homeIcon}/>
            <Text>prodile</Text>
            </View>
        <View className="items-center">
        <Image source={homeIcon}/>
            <Text>prodile</Text>
            </View>
    </View>
    </>
  );
}
