import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
export default function Button({ Title, secondStyle, textColor, onPress, smallButton, buttonColor }) {

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, secondStyle && styles.secondButton, textColor && { borderColor: textColor }, smallButton && styles.smallButton, buttonColor && { backgroundColor: buttonColor }]}>
        <Text style={[styles.text, textColor && { color: textColor }]} className={smallButton && "text-xs"}>
          {Title}
        </Text>
      </TouchableOpacity>
    </View >
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
    borderRadius: 7
  },
  text: {
    fontWeight: 600,
    color: 'white',
    gap: 10,
    textAlign: 'center',
  },
});
