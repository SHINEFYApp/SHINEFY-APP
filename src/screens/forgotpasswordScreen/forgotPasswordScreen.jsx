import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import background from '../../assets/backgroundImage.png';
import phoneIcon from '../../assets/icons/phoneIcon.png';
import Button from '../../components/mainButton/Button';
import Input from '../../components/inputs/input';
import BackButton from '../../components/backButton/backButton';
export default function ForgotPasswordScreen({navigation}) {
  return (
    <View className={'flex-1'}>
      <BackButton navigation={navigation}/>
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.container}>
          <View className="bg-white rounded-2xl w-full py-10 px-5 absolute">
            <View>
                <Text className="font-bold text-2xl text-center mb-5">
                  Forgot Password
                </Text>
            </View>
            <View>
              <Input
                keyboardType={'numeric'}
                placeholder={'Mobile'}
                icon={phoneIcon}
                text={'+20'}
                isBorder={true}
              />
            </View>
            <View>
                <Button Title={'SENT'} onPress={()=>{
                  navigation.navigate("OTPScreen")
                }}/>
            </View>
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
    justifyContent:'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});
