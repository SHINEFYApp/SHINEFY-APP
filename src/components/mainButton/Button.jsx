import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
export default function Button({
  Title,
  secondStyle,
  textColor,
  onPress,
  smallButton,
  buttonColor,
  icon,
  btnStyle,
  isLoading
}) {
  return (
    <View>
      <TouchableOpacity
        disabled = {isLoading}
        onPress={onPress}
        style={[
          styles.button,
          secondStyle && styles.secondButton,
          textColor && {borderColor: textColor},
          smallButton && styles.smallButton,
          buttonColor && {backgroundColor: buttonColor},
        ]}>
        <View className="flex-row justify-center items-center gap-2">
          {icon && <Image source={icon} />}
          {
            isLoading ? 
            <ActivityIndicator color={textColor} />
            :
            <Text
            style={[styles.text, textColor && {color: textColor}]}
            className={smallButton ? 'text-xs' : btnStyle}>
            {Title}
          </Text>
          }
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 5,
    backgroundColor: '#DD9923',
    fontSize: 16,
    marginVertical: 10,
    width: '100%',
  },
  secondButton: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    fontSize: 12,
    borderRadius: 7,
  },
  text: {
    fontWeight: 600,
    color: 'white',
    gap: 10,
    textAlign: 'center',
  },
});
