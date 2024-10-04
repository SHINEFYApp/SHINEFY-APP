import {SocialLogin} from '../../Provider/Apicallingprovider/SocialLoginProvider';
import {localStorage} from '../../Provider/localStorageProvider';

const googleLogin = async (navigation , setSignUp) => {

    SocialLogin.Socialfunction(navigation, 'google' , null , setSignUp);

};

export default googleLogin;
