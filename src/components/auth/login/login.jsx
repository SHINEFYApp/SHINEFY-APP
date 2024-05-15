/* eslint-disable react/react-in-jsx-scope */

import {Text, View} from 'react-native-ui-lib';
import Input from '../../inputs/input';
import Button from '../../mainButton/Button';
import phoneIcon from '../../../assets/icons/phoneIcon.png';
import keyIcon from '../../../assets/icons/Keypng.png';
import loginAuth from '../../../Features/login/login';
import {useState} from 'react';
import {Lang_chg} from '../../../Provider/Language_provider';
import {config} from '../../../Provider/configProvider';

export default function LoginModal({openSignup, navigation, closeLogin}) {
  const [userData, setUserData] = useState({});

  function handleUserData(data) {
    setUserData(prev => {
      return {...prev, ...data};
    });
  }

  return (
    <View className="absolute transition-all right-0 bottom-0 bg-white w-full p-5 rounded-xl">
      <View className="pb-5 relative">
        <View>
          <Text className={'text-3xl font-bold text-center p-5'}>
            {Lang_chg.welcome_back[config.language]}
          </Text>
        </View>
        <View>
          <Input
            onChange={e => {
              handleUserData({
                phone_number: e.nativeEvent.text,
              });
            }}
            keyboardType={'numeric'}
            placeholder={Lang_chg.mobile_txt[config.language]}
            icon={phoneIcon}
            text={'+20'}
            isBorder={true}
          />
          <Input
            onChange={e => {
              handleUserData({
                password: e.nativeEvent.text,
              });
            }}
            secureTextEntry={true}
            placeholder={Lang_chg.password_placeholder[config.language]}
            icon={keyIcon}
            isBorder={true}
            type={'passowrd'}
          />
        </View>
        <View className="my-10">
          <Button
            textColor={'#fff'}
            Title={Lang_chg.login[config.language]}
            onPress={() => {
              loginAuth(userData, navigation, closeLogin);
            }}
          />
          <Text
            onPress={() => {
              navigation.navigate('ForgotPassword');
              closeLogin();
            }}
            className="underline text-center">
            {Lang_chg.Forgot_password[config.language]}
          </Text>
        </View>
        <View>
          <Text className="text-center">
            {Lang_chg.Message[config.language]}{' '}
            <Text className="underline text-mainColor" onPress={openSignup}>
              {Lang_chg.signup[config.language]}
            </Text>{' '}
          </Text>
        </View>
      </View>
    </View>
  );
}
