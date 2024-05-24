import {LoginManager} from 'react-native-fbsdk-next';
import {localStorage} from '../../Provider/localStorageProvider';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default async function AppLogout(navigation) {
  try {
    LoginManager.logOut();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (e) {}
  await localStorage.clear();

  navigation.replace('WelcomeScreen');
}
