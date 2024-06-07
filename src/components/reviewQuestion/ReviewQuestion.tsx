import React, { useEffect, useState } from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Text, View } from 'react-native-ui-lib'

const ReviewQuestion = ({ question }) => {
  const [activeButton, setActiveButton] = useState('');

  const options = [
    {
      title: 'Yes'
    },
    {
      title: 'No'
    }
  ]

  return (
    <View className={'my-4'}>
      <Text className={`text-[#787575] text-xs`}>{question}</Text>
      <View className={'flex flex-row mt-5'}>
        {options.map((button, key) => {
          return <TouchableHighlight
            key={key}
            className="w-fit mx-5"
            underlayColor={'transparent'}
            onPress={() => {
              setActiveButton(button.title);
            }}>
            <View className="flex-row gap-4 items-center">
              <View
                className={`w-[25] h-[25] border border-mainColor  rounded ${activeButton === button.title && 'bg-mainColor'
                  }`}
              />
              <Text className={'font-bold text-sm'}>{button.title}</Text>
            </View>
          </TouchableHighlight>
        })}
      </View>
    </View>
  )
}

export default ReviewQuestion