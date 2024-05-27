import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';

export default function SelectCarCategoryCard({
  title,
  img,
  color,
  active,
  ele,
  onPress,
}) {
  return (
    <View
      className={`p-3 mx-2 border border-[#ccc] rounded-lg w-[45%] mb-[10%] ${
        active && 'bg-mainColor'
      }`}>
      <TouchableOpacity
        onPress={() => {
          onPress({
            ...newCar,
            car_category: ele,
            car_category_id: ele.car_category_id,
          });
        }}>
        <View className="items-center">
          <Text className="text-xl font-bold mb-3 ">{title}</Text>
          {color ? (
            <View
              className="h-[100] w-[100] rounded-full"
              style={{backgroundColor: color}}
            />
          ) : (
            img?.includes('.') && (
              <Image
                source={{
                  uri: `${'https://shinefy.co/app-test/webservice/images/'}${img}`,
                }}
                style={{
                  width: '100%',
                  height: 100,
                  resizeMode: 'contain',
                }}
              />
            )
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
