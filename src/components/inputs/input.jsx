import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {config, mobileW} from '../../Provider/utilslib/Utils';
import eyeIcon from '../../assets/icons/eyeIcon.png';
export default function Input({
  secureTextEntry,
  keyboardType,
  placeholder,
  icon,
  isBorder,
  className,
  text,
  onChange,
  value,
}) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.inputStyle} className={'mb-5 flex-1'}>
      {icon && (
        <View style={[styles.imageContainer, isBorder && styles.borderStyle]}>
          <Image source={icon} style={styles.image} />
          <Text className="text-[#C3C3C3]">{text}</Text>
        </View>
      )}
      <TextInput
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
        placeholder={placeholder}
        onChange={onChange}
        value={value && value}
        placeholderTextColor={'#C3C3C3'}
        className={`text-black w-full ${
          config.language === 0
            ? 'placeholder:text-left'
            : 'placeholder:text-right'
        }`}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => {
            setIsSecure(!isSecure);
          }}
          className={'absolute right-5'}>
          <Image source={eyeIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: '#C3C3C3',
    borderStyle: 'solid',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    height: (mobileW * 6.5) / 100,
    width: (mobileW * 6.5) / 100,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderStyle: {
    gap: 10,
    paddingRight: 5,
    borderRightWidth: 2,
    borderColor: '#C3C3C3',
    borderStyle: 'solid',
  },
});
