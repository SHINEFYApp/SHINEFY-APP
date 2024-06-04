import {Image, Switch, Text} from 'react-native-ui-lib';
import React from 'react';
import arrowIcon from '../../assets/icons/arrowIcon.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react';
import {config} from '../../Provider/configProvider';

export default function SelectVechileCard({
  icon,
  text,
  screen,
  navigation,
  arrow,
  isSwitch,
  Press,
  screenTitle = '',
  img,
  brandID,
  isSwitchEnabled,
  onChangeSwitch,
  location: bookingType,
}) {
  const [isEnabled, setIsEnable] = useState(isSwitchEnabled);

  function toggleSwitch() {
    setIsEnable(!isEnabled);
  }

  function handleNavigate() {
    if (screenTitle.includes('Model')) {
      if (brandID) {
        navigation.navigate(screen, {screenTitle});
      }
    } else {
      navigation.navigate(screen, {screenTitle, bookingType});
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        if (!isSwitch && !Press) {
          handleNavigate();
        } else if (Press) {
          Press();
        } else {
          toggleSwitch();
        }
      }}
      className="flex-row items-center bg-white px-3 py-5 mb-3 border-[#ccc] border rounded-lg">
      <Image source={icon} className="mr-3" />
      <Text>{text}</Text>
      {!arrow && (
        <Image
          source={arrowIcon}
          className={`ml-auto ${config.language === 0 ? '' : 'rotate-180'}`}
        />
      )}
      {isSwitch && (
        <Switch
          className="ml-auto"
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#DD9923"
          onColor="#DD9923"
          value={isEnabled}
          onValueChange={onChangeSwitch}
        />
      )}
    </TouchableOpacity>
  );
}
