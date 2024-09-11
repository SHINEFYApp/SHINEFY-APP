import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function PackageCardSkeleton() {
  return (
    <View className="">
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item width={"100%"} height={"100%"} borderRadius={10} />
    </SkeletonPlaceholder>
    </View>
  );
}
