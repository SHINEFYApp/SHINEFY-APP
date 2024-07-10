import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Colors,
  Font,
  mobileH,
  mobileW,
  config,
  Lang_chg,
} from '../Provider/utilslib/Utils';

export default ({onPress}: {onPress: () => void}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.continueButton}
    onPress={onPress}>
    <Text style={styles.continueText}>
      {Lang_chg.continue_txt[config.language]}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  continueText: {
    color: Colors.whiteColor,
    alignSelf: 'center',
    fontSize: (mobileW * 4) / 100,
    fontFamily: Font.fontmedium,
    paddingVertical: (mobileW * 2) / 100,
  },
  continueButton: {
    backgroundColor: Colors.appColor,
    width: (mobileW * 80) / 100,
    borderRadius: 25,
    marginTop: (mobileH * 3) / 100,
    alignSelf: 'center',
  },
});
