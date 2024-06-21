import React, {useEffect, useState} from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';

export default function RadioButton({buttons, currentActive, set, onPress}) {
  const [activeButton, setActiveButton] = useState(currentActive);

  useEffect(() => {
    setActiveButton(currentActive);
  }, [currentActive]);

  return (
    <View>
      {buttons.map((button, key) => {
        return (
          <TouchableHighlight
            className="bg-white py-5 px-[30px] my-2 border border-[#ccc] rounded-md"
            underlayColor={'white'}
            key={key}
            onPress={() => {
              if (onPress) {
                onPress(key);
              }
              setActiveButton(button.title);
              if (set) {
                set(button.title);
              }
            }}>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                {button.icon && <Image source={button.icon} />}
                <Text>{button.title}</Text>
              </View>
              <View
                className={`w-[25] h-[25] border border-mainColor  rounded ${
                  activeButton === button.title && 'bg-mainColor'
                }`}
              />
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}
