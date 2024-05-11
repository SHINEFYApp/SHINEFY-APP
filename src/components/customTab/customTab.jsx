import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {COLORS} from '../constants';

const CustomTabBar = props => {
  return (
    <View>
      <View style={styles.tabBar} />
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    position:"absolute",
    backgroundColor: "transparent",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width:"100%",
    height : "100%",
    bottom: 0,
  },
});