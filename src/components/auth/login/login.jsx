/* eslint-disable react/react-in-jsx-scope */

import {Text, View} from 'react-native-ui-lib';
import Input from '../../inputs/input';
import Button from '../../mainButton/Button';
import phoneIcon from '../../../assets/icons/phoneIcon.png';
import keyIcon from '../../../assets/icons/Keypng.png';
import loginAuth from '../../../Features/login/login';
import {useState} from 'react';

export default function LoginModal({openSignup, navigation, closeLogin}) {
  const [userData, setUserData] = useState({});

  function handleUserData(data) {
    setUserData(prev => {
      return {...prev, ...data};
    });
  }

  console.log(userData);

  return (
    <View className="absolute transition-all right-0 bottom-0 bg-white w-full p-5 rounded-xl">
      <View className="pb-5 relative">
        <View>
          <Text className={'text-3xl font-bold text-center p-5'}>
            Welcome Back
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
            placeholder={'Mobile'}
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
            placeholder={'Password'}
            icon={keyIcon}
            isBorder={true}
            type={'passowrd'}
          />
        </View>
        <View className="my-10">
          <Button
            textColor={'#fff'}
            Title={'LOGIN'}
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
            Forgot Password?
          </Text>
        </View>
        <View>
          <Text className="text-center">
            Don't have an account?{' '}
            <Text className="underline text-mainColor" onPress={openSignup}>
              Signup
            </Text>{' '}
          </Text>
        </View>
      </View>
    </View>
  );
}
