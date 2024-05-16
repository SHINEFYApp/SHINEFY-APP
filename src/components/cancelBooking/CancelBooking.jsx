import {useState} from 'react';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import messageIcon from '../../assets/icons/ContactUs/message.png';
import Button from '../mainButton/Button';
import cancelBooking from '../../Features/cancelBooking/cancelBooking';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

const CancelBooking = ({route}) => {
  const [activeButton, setActiveButton] = useState("");
  const [reason , setReason] = useState("")
  const options = [
    {
      id: 1,
      title: Lang_chg.change_in_plans[config.language],
    },
    {
      id: 2,
      title: Lang_chg.unexpected_words[config.language],
    },
    {
      id: 3,
      title: Lang_chg.personal_reason[config.language],
    },
    {
      id: 4,
      title: Lang_chg.other_reason[config.language],
    },
  ];

  console.log(activeButton)
  return (
    <View className={'mt-[90px] mx-5'}>
      <Text className={'text-[#818181] mb-4'}>
        {Lang_chg.Cancellation_Reason[config.language]}:
      </Text>
      {options.map((button, key) => {
        return (
          <TouchableHighlight
            className="my-2 w-fit"
            underlayColor={'transparent'}
            key={key}
            onPress={() => {
              setActiveButton(button.title);
            }}>
            <View className="flex-row gap-4 items-center">
              <View
                className={`w-[25] h-[25] border border-mainColor  rounded ${
                  activeButton === button.title && 'bg-mainColor'
                }`}
              />
              <Text className={'font-bold text-lg'}>{button.title}</Text>
            </View>
          </TouchableHighlight>
        );
      })}

    {
      activeButton == Lang_chg.other_reason[config.language] &&
        <View
          className={
            'bg-transparent border border-[#c3c3c3] px-4 flex-row overflow-hidden items-start rounded-xl mt-5'
          }>
          <Image source={messageIcon} className={'w-[25px] h-[25px] mt-2'} />
          
          <TextInput
            placeholderTextColor={'#000'}
            placeholder={Lang_chg.write_reason[config.language]}
            className={`w-full px-3 text-[#818181] h-[110px] ${
            config.language === 0 ? 'text-left' : 'text-right'
            }`}
            onChange={(e)=>{
              setReason(e.nativeEvent.text)
            }}
          multiline={true}
          numberOfLines={10}
          style={{height: 200, textAlignVertical: 'top'}}
          />
      </View>
        } 
      <View className={'mt-5'}>
        <Button
          Title={Lang_chg.cancelBooking_txt[config.language]}
          btnStyle={'text-lg'}
          onPress={async () => {
            let res = await cancelBooking(route.params.book_id, activeButton == Lang_chg.other_reason[config.language] ? reason : activeButton);
          }}
        />
      </View>
    </View>
  );
};

export default CancelBooking;
