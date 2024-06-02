import {StyleSheet, View} from 'react-native';
import React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../Provider/Colorsfont';

const CustomTabBar = props => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        backgroundColor: Colors.whiteColor,
      }}>
      <View style={styles.tabBar} />
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    height: '100%',
    bottom: 0,
  },
});
