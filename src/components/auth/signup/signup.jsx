import React from 'react';
import {Checkbox, Text, View} from 'react-native-ui-lib';
import Input from '../../inputs/input';
import Button from '../../mainButton/Button';
import phoneIcon from '../../../assets/icons/phoneIcon.png';
import keyIcon from '../../../assets/icons/Keypng.png';
import userIcon from '../../../assets/icons/userIcon.png';
import {useState} from 'react';
import signupAuth from '../../../Features/signup/signup';

export default function SignupModal({openLogin , navigation , closeSignup}) {
  const [isCompany, setIsCompany] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const [userData, setUserData] = useState({});

  function handleUserData(data) {
    console.log(data)
    setUserData(prev => {
      return {...prev, ...data};
    });
  }

  return (
    <View className="absolute transition-all right-0 -bottom-5 bg-white w-full p-5 rounded-xl">
      <View className="pb-5 relative">
        <View>
          <Text className={'text-3xl font-bold text-center p-5'}>
            Create account
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
              placeholder={'First Name'}
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
              placeholder={'Last Name'}
              icon={userIcon}
            />
          </View>
        </View>
        <View>
          <Input onChange={e => {
              handleUserData({
                email: e.nativeEvent.text,
              });
            }} placeholder={'Email'} icon={phoneIcon} />
        </View>
        {
          isCompany &&
           <View>
            <Text className="text-green-700 font-bold">
              Please check if you are an empoyee of an authroize company . Then enter the company's email and check to enjoy unprecedente discounts .
            </Text>
            <Text className="text-red-700 my-3">
              If your Company don't have domain registered please enter company code
            </Text>
          <Input onChange={e => {
              handleUserData({
                companyCode: e.nativeEvent.text,
              });
            }} placeholder={'Company Code (Optional)'} icon={keyIcon} />
        </View>
        }
        <View className="flex flex-row items-center gap-2 mb-2">
          <Checkbox value={isCompany} onValueChange={setIsCompany} />
          <Text className="font-bold">Company Email?</Text>
        </View>
        <View>
          <Input
           onChange={e => {
              handleUserData({
                phone_number: e.nativeEvent.text,
              });
            }}
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
          <Input
            secureTextEntry={true}
            placeholder={'Password'}
            icon={keyIcon}
            isBorder={true}
            type={'passowrd'}
          />
        </View>
        <View className="flex flex-row items-center gap-2 mb-2">
          <Checkbox value={isSelected} onValueChange={setSelection} />
          <Text className="font-bold">
            I accept all <Text>Terms & Conditions</Text> and{' '}
            <Text>Privacy</Text>{' '}
          </Text>
        </View>
        <View className="my-2">
          <Button textColor={'#fff'} Title={'SIGNUP'} onPress={()=>{
            // navigation.navigate("Signup")
            // closeSignup()
            signupAuth(userData , navigation ,closeSignup)
            
          }}/>
        </View>
        <View>
          <Text className="text-center">
            Already have an account?
            <Text className="underline text-mainColor" onPress={openLogin}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}