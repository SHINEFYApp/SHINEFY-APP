import React, {useState } from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';

export default function RadioButton({buttons , currentActive , set}) {
  const [activeButton, setActiveButton] = useState(currentActive);

  console.log(buttons[0].title , currentActive)

  return (
    <View>
      {buttons.map((button, key) => {
        return (
          <TouchableHighlight
          className="bg-white p-5 my-2 border border-[#ccc] rounded-md"
          underlayColor={"white"}
            key={key}
            onPress={() => {
              setActiveButton(button.id);
              set(null)
            }}>
                <View className="flex-row justify-between items-center">

            <Text>{button.title}</Text>
            <View
              className={`w-[25] h-[25] border border-mainColor  rounded ${
                  activeButton === button.id && 'bg-mainColor' 
                }`}
                />
                </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}
