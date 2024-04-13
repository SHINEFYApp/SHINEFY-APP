import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
export default function Button({Title, secondStyle, textColor, onPress}) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, secondStyle && styles.secondButton , textColor && {borderColor : textColor}]}>
        <Text style={[styles.text, textColor && {color: textColor}]}>
          {Title}
        </Text>
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
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: 600,
    color: 'white',
    gap: 10,
    textAlign: 'center',
  },
});
