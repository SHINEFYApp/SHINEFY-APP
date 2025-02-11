import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import background from '../../assets/backgroundImage.png';
import Button from '../../components/mainButton/Button';
import LoginModal from '../../components/auth/login/login';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import SignUpModal from '../../components/auth/signup/signup';
import logo from '../../assets/logo-2.png';
import Modal from 'react-native-modal';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {localStorage} from '../../Provider/utilslib/Utils';
import SafeAreaView from '../../components/SafeAreaView';
import {TouchableOpacity} from 'react-native-gesture-handler';
import googleLogin from '../../Features/googleLogin/googleLogin';
import googleIcon from '../../assets/icons/googleLoginIcon.webp';
import facebookIcon from '../../assets/icons/facebookIcon.png';
import appleIcon from '../../assets/Contact.png';
import facebookLogin from '../../Features/facebookLogin/facebookLogin';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';
import callsocailweb from '../../Features/socialLogin/socialLogin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import getHome from '../../Features/getHome/getHome';
import appleLogin from '../../Features/appleLogin/appleLogin';
import appleAuth from '@invertase/react-native-apple-authentication';
import { useRecoilState } from 'recoil';
import isGuestAtom from '../../atoms/isGuest';
export default function WelcomeScreen({navigation}) {
  const logoScale = useSharedValue(1);
  const logoTranslateY = useSharedValue(0);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisivle, setIsSignupModalVisible] = useState(false);
  const [userData , setUserData] = useState({})
  useEffect(() => {
    const getIsLoggedIn = async () => {
      const user_details = await localStorage.getItemObject('user_arr');
      if (user_details != null) {
        navigation.replace('HomeScreen', {home_status: 1});
      }
    };
    language_fun();
    getIsLoggedIn();
  },[]);
  const handleLoginPress = () => {
    setIsSignupModalVisible(false);
    logoScale.value = withTiming(1);
    logoTranslateY.value = withTiming(0);
    setTimeout(() => setIsLoginModalVisible(true), 500);
  };

  const handleSignupPress = () => {
    setIsLoginModalVisible(false);
    logoScale.value = withTiming(0.6);
    logoTranslateY.value = withTiming(-150);
    setTimeout(() => setIsSignupModalVisible(true), 500);
  };

  const handleCloseSignup = () => {
    logoScale.value = withTiming(1);
    logoTranslateY.value = withTiming(0);
    setIsSignupModalVisible(false);
  };

  const language_fun = async () => {
    let textalign = await localStorage.getItemObject('language');
    if (textalign != null) {
      if (textalign == 1) {
        config.textalign = 'right';

        config.language = 1;
        localStorage.setItemObject('languagesetenglish', 3);
        localStorage.setItemObject('languagecathc', 0);
        this.setState({loanguage: 1});
      } else {
        config.textalign = 'left';

        config.language = 0;
      }
    } else {
      config.textalign = 'left';

      config.language = 0;
      localStorage.setItemObject('language', 0);
    }
  };

  useEffect(() => {
     const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      
    });
  }, []);

  useEffect(()=>{
    if(userData.signUp === true) {
      setIsSignupModalVisible(true)
    }
  },[userData])

  const [isGuest , setIsGuest] = useRecoilState(isGuestAtom)


  return (
    <View className="flex-1">
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
                Title={Lang_chg.login[config.language]}
                textColor={'black'}
              />
              <Button
                onPress={handleSignupPress}
                Title={Lang_chg.create_new_account[config.language]}
                secondStyle={true}
              />
              <Button
                onPress={async()=>{
                    setIsGuest(true)
                    localStorage.setItemObject('user_arr', "0000");
                   localStorage.setItemObject('user_arr', {user_id : "0000"})
                  //  await localStorage.setItemObject('isGust', true)
                   
                   navigation.navigate('HomeScreen', {home_status: 1});
                }}
                Title={Lang_chg.continueWithout[config.language]}
                secondStyle={true}
              />
              <View className="flex-row justify-center">
                {
                  Platform.OS == "android" &&
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        googleLogin(navigation , setUserData);
                      
                      }}>
                      <Image source={googleIcon} width={70} height={50} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        facebookLogin(navigation , setUserData);
                      }}>

                      <Image
                        source={facebookIcon}
                        width={70}
                        height={50}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </>
                }
                {/* {
                     appleAuth.isSupported &&
                        <TouchableOpacity
                          onPress={() => {
                            appleLogin(navigation , setUserData);
                          }}>

                          <Image
                            source={appleIcon}
                            width={70}
                            height={50}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                } */}
              </View>
            </View>
            <View className="absolute bottom-5">
              <Text className="text-white z-1 text-center">
                {Lang_chg.continue_agreement[config.language]}
              </Text>
              <View className="flex flex-row gap-2 mt-1">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Lang_chg.tearmsetting[config.language])
                  }>
                  <Text className="z-1 text-white text-center underline">
                    {Lang_chg.terms_of_service[config.language]}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      Lang_chg.privacypolicy_txt[config.language],
                    )
                  }>
                  <Text className="z-1 text-white text-center underline">
                    {Lang_chg.privacy_policy[config.language]}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              isVisible={isLoginModalVisible}
              hasBackdrop
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
              hasBackdrop
              isVisible={isSignupModalVisivle}
              onBackdropPress={handleCloseSignup}
              onBackButtonPress={handleCloseSignup}>
              <SignUpModal
                userDataSocial = {userData}
                closeSignup={handleCloseSignup}
                navigation={navigation}
                openLogin={handleLoginPress}
              />
            </Modal>
          </View>
        </SafeAreaView>
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
