import {SocialLogin} from '../../Provider/Apicallingprovider/SocialLoginProvider';
import {localStorage} from '../../Provider/localStorageProvider';

const googleLogin = async navigation => {
  let data = await localStorage.getItemObject('socialdata');
  if (data == null) {
    SocialLogin.Socialfunction(navigation, 'google');
  }
};

export default googleLogin;
