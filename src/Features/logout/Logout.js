import {LoginManager} from 'react-native-fbsdk-next';
import {localStorage} from '../../Provider/localStorageProvider';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default async function AppLogout(navigation) {
    //   this.setState({modalVisible: false});
    var language = await localStorage.getItemObject('language');
    var languagecathc = await localStorage.getItemObject('languagecathc');
    var languagesetenglish = await localStorage.getItemObject(
        'languagesetenglish',
    );
    localStorage.clear();
    let user_arr = localStorage.getItemObject('user_arr');
    localStorage.setItemObject('language', language);
    localStorage.setItemObject('languagecathc', languagecathc);
    localStorage.setItemObject('languagesetenglish', languagesetenglish);
    navigation.navigate('WelcomeScreen');

  if (login_type == 'facebook') {
    LoginManager.logOut();
    localStorage.clear();
    localStorage.setItemObject('user_arr', null);
    localStorage.setItemObject('user_value', null);
    localStorage.setItemObject('facebookdata', null);
    localStorage.setItemObject('socialdata', null);
    localStorage.setItemString('remember_me', 'no');
    localStorage.setItemObject('language', language);
    localStorage.setItemObject('languagecathc', languagecathc);
    localStorage.setItemObject('languagesetenglish', languagesetenglish);
   navigation.navigate('Login');
  } else if (this.state.login_type == 'google') {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      localStorage.clear();
      localStorage.setItemObject('user_arr', null);
      localStorage.setItemObject('user_value', null);
      localStorage.setItemObject('facebookdata', null);
      localStorage.setItemObject('socialdata', null);
      localStorage.setItemString('remember_me', 'no');
      localStorage.setItemObject('language', language);
      localStorage.setItemObject('languagecathc', languagecathc);
      localStorage.setItemObject('languagesetenglish', languagesetenglish);
      this.props.navigation.navigate('Login');
    } catch (error) {}
    localStorage.clear();
    localStorage.setItemObject('user_arr', null);
    localStorage.setItemObject('user_value', null);
    localStorage.setItemObject('facebookdata', null);
    localStorage.setItemObject('socialdata', null);
    localStorage.setItemString('remember_me', 'no');
    localStorage.setItemObject('language', language);
    localStorage.setItemObject('languagecathc', languagecathc);
    localStorage.setItemObject('languagesetenglish', languagesetenglish);
    this.props.navigation.navigate('Login');
  } else {
   
  }
}
