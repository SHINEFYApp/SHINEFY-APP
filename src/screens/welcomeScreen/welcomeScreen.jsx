import React, {useEffect, useState} from 'react';
import {BackHandler, ImageBackground, KeyboardAvoidingViewBase, StyleSheet} from 'react-native';
import {Image, KeyboardAwareScrollView, Text, View} from 'react-native-ui-lib';
import background from '../../assets/backgroundImage.png';
import Button from '../../components/mainButton/Button';
import LoginModal from '../../components/auth/login/login';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import SignupModal from '../../components/auth/signup/signup';
import logo from '../../assets/logo-2.png';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';

export default function WelcomeScreen({navigation}) {
  const logoScale = useSharedValue(1);
  const logoTranslateY = useSharedValue(0);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisivle, setIsSignupModalVisivle] = useState(false);

  const handleLoginPress = () => {
    logoScale.value = withTiming(1);
    logoTranslateY.value = withTiming(0);
    setIsLoginModalVisible(true);
    setIsSignupModalVisivle(false);
  };

  const handleSignupPress = () => {
    setIsSignupModalVisivle(true);
    setIsLoginModalVisible(false);
    logoScale.value = withTiming(0.6);
    logoTranslateY.value = withTiming(-150);
  };

  const handleCloseSignup = () => {
    logoScale.value = withTiming(1);
    logoTranslateY.value = withTiming(0);
    setIsSignupModalVisivle(false);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }, [isSignupModalVisivle, isLoginModalVisible, logoScale, logoTranslateY]);

  return (
    <View className="flex-1">      
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.container}>
          <Animated.View
            style={{
              transform: [{translateY: logoTranslateY}, {scale: logoScale}],
            }}>
            <Image source={logo} />
          </Animated.View>
          <View width={'100%'}>
            <Button
              onPress={handleLoginPress}
              Title={'Login To SHINEFY'}
              textColor={'black'}
            />
            <Button
              onPress={handleSignupPress}
              Title={'Create New Account'}
              secondStyle={true}
            />
          </View>
          <View className="absolute bottom-5">
            <Text className="text-white z-1 text-center">
              By Continuing, you agree to our
            </Text>
            <View className="flex flex-row gap-2 mt-1">
              <Text className="z-1 text-white text-center underline">
                Terms of Service
              </Text>
              <Text className="z-1 text-white text-center underline">
                Privacy Policy
              </Text>
              <Text className="z-1 text-white text-center underline">
                Content Policy
              </Text>
            </View>
          </View>
          <Modal
            isVisible={isLoginModalVisible}
            hasBackdrop={false}
            avoidKeyboard={true}
            onBackdropPress={() => {
              setIsLoginModalVisible(false);
            }}
            onBackButtonPress={() => {
              setIsLoginModalVisible(false);
            }}>
            <LoginModal
              closeLogin={() => {
                setIsLoginModalVisible(false);
              }}
              navigation={navigation}
              openSignup={handleSignupPress}
            />
          </Modal>
          <Modal
            avoidKeyboard={true}
            hasBackdrop={false}
            isVisible={isSignupModalVisivle}
            onBackdropPress={handleCloseSignup}
            onBackButtonPress={handleCloseSignup}>
            <SignupModal closeSignup={handleCloseSignup} navigation={navigation} openLogin={handleLoginPress} />
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});
