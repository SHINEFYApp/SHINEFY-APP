import {SocialLogin} from '../../Provider/Apicallingprovider/SocialLoginProvider';
import {localStorage} from '../../Provider/localStorageProvider';

const appleLogin = async (navigation , setSignUp) => {
 
    await SocialLogin.Socialfunction(navigation, 'apple' , null , setSignUp);
  
};

export default appleLogin;
