import {SocialLogin} from '../../Provider/Apicallingprovider/SocialLoginProvider';
import {localStorage} from '../../Provider/localStorageProvider';

const facebookLogin = async navigation => {
 
    SocialLogin.Socialfunction(navigation, 'facebook');
  
};

export default facebookLogin;
