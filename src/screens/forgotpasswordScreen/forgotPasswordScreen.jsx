import React, {useState} from 'react';
import {ImageBackground, StatusBar, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import background from '../../assets/backgroundImage.png';
import phoneIcon from '../../assets/icons/phoneIcon.png';
import Button from '../../components/mainButton/Button';
import Input from '../../components/inputs/input';
import BackButton from '../../components/backButton/backButton';
import forgotPassword from '../../Features/forgotPassword/forgotPassword';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import SafeAreaView from '../../components/SafeAreaView';
export default function ForgotPasswordScreen({navigation}) {
  const [phone_number, setPhoneNumber] = useState('');
  return (
    <View className={'flex-1'}>
      <StatusBar
        hidden={false}
        StatusBarStyle="light-content"
        backgroundColor={'#00000010'}
        translucent
        networkActivityIndicatorVisible
        barStyle="light-content"
      />
      <ImageBackground source={background} style={styles.image}>
        <SafeAreaView>
          <>
            <BackButton navigation={navigation} />
            <View style={styles.container}>
              <View className="bg-white rounded-2xl w-full py-10 px-5 absolute">
                <View>
                  <Text className="font-bold text-2xl text-center mb-5">
                    {Lang_chg.Forgot_password_2[config.language]}
                  </Text>
                </View>
                <View>
                  <Input
                    keyboardType={'numeric'}
                    placeholder={Lang_chg.mobile_placeholder[config.language]}
                    icon={phoneIcon}
                    text={'+20'}
                    isBorder={true}
                    onChange={e => {
                      setPhoneNumber(e.nativeEvent.text);
                    }}
                  />
                </View>
                <View>
                  <Button
                    Title={Lang_chg.send[config.language]}
                    onPress={() => {
                      forgotPassword(navigation, phone_number);
                    }}
                  />
                </View>
              </View>
            </View>
          </>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});
