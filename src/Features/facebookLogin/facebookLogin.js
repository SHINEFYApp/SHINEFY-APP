import {SocialLogin} from '../../Provider/Apicallingprovider/SocialLoginProvider';
import {localStorage} from '../../Provider/localStorageProvider';

const facebookLogin = async navigation => {
  let data = await localStorage.getItemObject('socialdata');
  if (data == null) {
    SocialLogin.Socialfunction(navigation, 'facebook');
  }
};

export default facebookLogin;
