import React from 'react';
import {Text, View} from 'react-native-ui-lib';

export default function CarFromFormItemLayout({children, title}) {
  return (
    <View className={'bg-white p-4 border border-[#ccc] rounded-lg'}>
      <View>
        <Text className="text-xl font-bold text-center mb-4">{title}</Text>
      </View>
      <View className="h-[80]">{children}</View>
    </View>
  );
}
