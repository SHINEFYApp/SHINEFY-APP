import React, { useEffect } from 'react';
import {
  Checkbox,
  KeyboardAwareScrollView,
  Text,
  View,
} from 'react-native-ui-lib';
import Input from '../../inputs/input';
import Button from '../../mainButton/Button';
import phoneIcon from '../../../assets/icons/phoneIcon.png';
import keyIcon from '../../../assets/icons/Keypng.png';
import userIcon from '../../../assets/icons/userIcon.png';
import {useState} from 'react';
import signupAuth from '../../../Features/signup/signup';
import {Lang_chg} from '../../../Provider/Language_provider';
import {config} from '../../../Provider/configProvider';

export default function SignupModal({openLogin, navigation, closeSignup , userDataSocial}) {
  const [isCompany, setIsCompany] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [isLoading , setIsLoading] = useState(false)
  const [userData, setUserData] = useState({});

  function handleUserData(data) {
    setUserData(prev => {
      return {...prev, ...data};
    });
  }
  
  useEffect(()=>{
    setUserData(prev => {
      return {...prev, ...userDataSocial};
    });
  },[])

  return (
    <View className="absolute transition-all left-0 right-0 -bottom-5 bg-white w-full p-5 rounded-xl h-full">
      <KeyboardAwareScrollView>
        <View className="pb-5 relative">
          <View>
            <Text className={'text-3xl font-bold text-center p-5'}>
              {Lang_chg.create_new_account[config.language]}
            </Text>
          </View>
          <View className="flex flex-row gap-4 ">
            <View className={'flex-1'}>
              <Input
                onChange={e => {
                  handleUserData({
                    firstName: e.nativeEvent.text,
                  });
                }}
                value={userData.firstName}
                placeholder={Lang_chg.firstname_txt[config.language]}
                icon={userIcon}
              />
            </View>
            <View className={'flex-1'}>
              <Input
                onChange={e => {
                  handleUserData({
                    lastName: e.nativeEvent.text,
                  });
                }}
                placeholder={Lang_chg.lastname_txt[config.language]}
                icon={userIcon}
                  value={userData.lastName}
              />
            </View>
          </View>
          <View>
            <Input
              onChange={e => {
                handleUserData({
                  email: e.nativeEvent.text,
                });
              }}
              placeholder={Lang_chg.email_txt[config.language]}
                value={userData.email}
              icon={phoneIcon}
            />
          </View>
          {isCompany && (
            <View>
              <Text className="text-green-700 font-bold">
                {Lang_chg.verifyEmailDesc[config.language]}
              </Text>
              <Text className="text-red-700 my-3">
                {Lang_chg.donthaveDomainEmail[config.language]}
              </Text>
              <Input
                onChange={e => {
                  handleUserData({
                    companyCode: e.nativeEvent.text,
                  });
                }}
                placeholder={'Company Code (Optional)'}
                icon={keyIcon}
              />
            </View>
          )}
          <View className="flex flex-row items-center gap-2 mb-2">
            <Checkbox value={isCompany} onValueChange={setIsCompany} />
            <Text className="font-bold">
              {Lang_chg.company_email_txt[config.language]}
            </Text>
          </View>
          <View>
            <Input
              onChange={e => {
                handleUserData({
                  phone_number: e.nativeEvent.text,
                });
              }}
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
            <Input
              secureTextEntry={true}
              placeholder={Lang_chg.confirmpassword[config.language]}
              icon={keyIcon}
              isBorder={true}
              type={'passowrd'}
              onChange={e => {
                handleUserData({
                  con_password: e.nativeEvent.text,
                });
              }}
            />
          </View>
          <View className="flex flex-row items-center gap-2 mb-2">
            <Checkbox value={isSelected} onValueChange={setSelection} />
            <Text className="font-bold">
              {Lang_chg.accept_all_terms[config.language]}
            </Text>
          </View>
          <View className="my-2">
            <Button
            isLoading={isLoading}
              textColor={'#fff'}
              Title={Lang_chg.signup[config.language]}
              onPress={() => {
                // navigation.navigate("Signup")
                // closeSignup()
                
                signupAuth(userData, navigation, closeSignup, isSelected , isCompany , setIsLoading);
              }}
            />
          </View>
          <View>
            <Text className="text-center">
              {Lang_chg.Message_signup_page[config.language]}
              <Text className="underline text-mainColor" onPress={openLogin}>
                {''} {Lang_chg.login[config.language]}
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
