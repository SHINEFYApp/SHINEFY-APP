import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {useRecoilState} from 'recoil';
import addNewCar from '../../atoms/addNewCar/addNewCar';
import { config } from '../../Provider/configProvider';

export default function SelectCarCategoryCard({
  title,
  img,
  color,
  active,
  keyObj,
  idKey,
  ele,
}) {
  const [newCar, setNewCar] = useRecoilState(addNewCar);

  return (
    <View
      className={`p-3 mx-2 border border-[#ccc] rounded-lg w-[45%] mb-[10%] ${
        active && 'bg-mainColor'
      }`}>
      <TouchableOpacity
        onPress={() => {
          setNewCar({
            ...newCar,
            [keyObj]: ele,
            [idKey]: ele[idKey],
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
                  uri: `${config.img_url3 + img}`,
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
