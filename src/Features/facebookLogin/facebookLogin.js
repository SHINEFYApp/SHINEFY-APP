import {SocialLogin} from '../../Provider/Apicallingprovider/SocialLoginProvider';
import {localStorage} from '../../Provider/localStorageProvider';

const facebookLogin = async (navigation , setSignUp) => {
 
    await SocialLogin.Socialfunction(navigation, 'facebook' , null , setSignUp);
  
};

export default facebookLogin;
