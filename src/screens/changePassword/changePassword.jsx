import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import background from '../../assets/backgroundImage.png';
import keyIcon from '../../assets/icons/Keypng.png';
import Button from '../../components/mainButton/Button';
import Input from '../../components/inputs/input';
import BackButton from '../../components/backButton/backButton';

export default function ChangePassword({navigation}) {
  return (
    <View className={'flex-1'}>
      <BackButton navigation={navigation} />
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.container}>
          <View className="bg-white rounded-2xl w-full py-10 px-5 absolute">
            <View>
              <Text className="font-bold text-2xl text-center mb-5">
                New Password
              </Text>
            </View>
            <View>
              <Input
                secureTextEntry={true}
                placeholder={'Password'}
                icon={keyIcon}
                isBorder={true}
                type={'passowrd'}
              />
              <Input
                secureTextEntry={true}
                placeholder={'Confirm Password'}
                icon={keyIcon}
                isBorder={true}
                type={'passowrd'}
              />
            </View>
            <View>
              <Button
                Title={'CHANGE'}
                onPress={() => {
                  navigation.navigate('OTPScreen');
                }}
              />
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
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});
