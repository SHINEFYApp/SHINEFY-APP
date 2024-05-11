import React, { useEffect, useState } from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';
import background from '../../assets/backgroundImage.png';
import OTPTextInput from 'react-native-otp-textinput';
import {mobileW} from '../../Provider/utilslib/Utils';
import Button from '../../components/mainButton/Button';
import BackButton from '../../components/backButton/backButton';
import { sendOTP } from '../../Features/verifyOTP/verifyOTP';


export default function OTPScreen({navigation, route}) {
  const [otp , setOTP] = useState("")


  return (
    <View className={'flex-1'}>
      <BackButton navigation={navigation} />
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.container}>
          <View className="bg-white rounded-lg w-full p-5 ">
            <Text className="font-bold text-2xl text-center">
              OTP Verfication
            </Text>
            <View>
              <Text className="text-center mt-2 text-xs">
                Please type the verification code sent to you
              </Text>
              <Text className="text-center mb-2">+20 {route.params.phone_number} <Text className="underline font-bold">Back</Text></Text>
            </View>
            <OTPTextInput
              containerStyle={styles.textInputContainer}
              textInputStyle={styles.roundedTextInput}
              numberOfInputs={4}
              cellTextLength={1}
              tintColor="#ccc"
              offTintColor="#ccc"
              keyboardType={'number-pad'}
              handleTextChange={(text)=>{
                setOTP(text)
              }}
            />
            <Button
              Title={'VERIFY'}
              onPress={async () => {
                await sendOTP(otp , route.params.phone_number , route.params.user_id , navigation)
              }}
            />
            <Text className={'text-center'}>
              Don’t receive the OTP?{' '}
              <Text className={'text-mainColor underline'}>Resend</Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  container_otp: {
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: (mobileW * 3) / 100,
  },
  textInputContainer: {
    alignSelf: 'center',
    width: (mobileW * 60) / 100,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    color: "black",
    height: (mobileW * 10) / 100,
    fontSize: (mobileW * 4.2) / 100,
    width: (mobileW * 10) / 100,
  },
});
