import {LoginManager} from 'react-native-fbsdk-next';
import {localStorage} from '../../Provider/localStorageProvider';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default async function AppLogout(navigation) {
  const language = await localStorage.getItemObject('language');
  const languagecathc = await localStorage.getItemObject('languagecathc');
  const languagesetenglish = await localStorage.getItemObject(
    'languagesetenglish',
  );

  try {
    LoginManager.logOut();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (e) {}
  await localStorage.clear();
  localStorage.setItemObject('language', language);
  localStorage.setItemObject('languagecathc', languagecathc);
  localStorage.setItemObject('languagesetenglish', languagesetenglish);

  navigation.replace('WelcomeScreen');
}
