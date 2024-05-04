import React from 'react';
import { Image, View } from 'react-native-ui-lib';
import { TextInput } from 'react-native-gesture-handler';
import userIcon from '../../assets/icons/ContactUs/user.png'
import emailIcon from '../../assets/icons/ContactUs/email.png'
import messageIcon from '../../assets/icons/ContactUs/message.png'
import ContactUsInput from '../../components/contactUsInput/ContactUsInput';
import Button from '../../components/mainButton/Button';

const ContactUsScreen = () => {
  return (
    <View className="pt-[80px] px-5">
      <ContactUsInput
        icon={userIcon}
        placeholder={'Your Name'}
      />
      <ContactUsInput
        icon={emailIcon}
        placeholder={'Your Email'}
      />
      <View
        className={"bg-transparent border border-[#c3c3c3] px-4 flex-row overflow-hidden items-start rounded-xl mt-5"}>
        <Image
          source={messageIcon}
          className={'w-[25px] h-[25px] mt-2'}
        />
        <TextInput
          placeholderTextColor={"#000"}
          placeholder='Message'
          className={"w-full px-3 text-black h-[110px]"}
          multiline={true}
          numberOfLines={10}
          style={{ height: 200, textAlignVertical: 'top', }}
        />
      </View>
      <View className={'mt-5'}>
        <Button
          Title={'Submit'}
          btnStyle={'text-lg'}
        />
      </View>
    </View>
  );
};
export default ContactUsScreen;