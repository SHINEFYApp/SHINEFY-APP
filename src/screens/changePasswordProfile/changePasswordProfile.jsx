import {Text, View} from 'react-native-ui-lib';
import Input from '../../components/inputs/input';
import keyIcon from '../../assets/icons/Keypng.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import forgotPassword from '../../Features/forgotPassword/forgotPassword';
import {useRecoilValue} from 'recoil';
import {useState} from 'react';
import profileData from '../../atoms/profileData/profileData';
import Button from '../../components/mainButton/Button';
import changePassword from '../../Features/changePassword/changePassword';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';

export default function ChangePasswordProfile({navigation}) {
  const data = useRecoilValue(profileData);
  const [pass, setPass] = useState({});

  return (
    <View className="pt-[120] flex-1 relative px-5">
      <View className="absolute top-[120] w-full ml-5">
        <Input
          secureTextEntry={true}
          placeholder={Lang_chg.oldPassword_txt[config.language]}
          icon={keyIcon}
          isBorder={true}
          type={'passowrd'}
          onChange={e => {
            setPass({
              ...pass,
              old_password: e.nativeEvent.text,
            });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            forgotPassword(navigation, data.phone_number);
          }}>
          <Text
            className={`text-mainColor mb-3 ${
              config.language === 0 ? 'ml-auto' : 'mr-auto'
            }`}>
            {Lang_chg.Forgot_password[config.language]}
          </Text>
        </TouchableOpacity>
        <Input
          secureTextEntry={true}
          placeholder={Lang_chg.New_password_placeholder[config.language]}
          icon={keyIcon}
          isBorder={true}
          type={'passowrd'}
          onChange={e => {
            setPass({
              ...pass,
              new_password: e.nativeEvent.text,
            });
          }}
        />
        <Input
          secureTextEntry={true}
          placeholder={Lang_chg.confirm_password_placeholder[config.language]}
          icon={keyIcon}
          isBorder={true}
          type={'passowrd'}
          onChange={e => {
            setPass({
              ...pass,
              con_password: e.nativeEvent.text,
            });
          }}
        />
        <Button
          Title={Lang_chg.password1_txt[config.language]}
          onPress={() => {
            changePassword(pass,navigation);
            // navigation.navigate("OTPScreen")
          }}
        />
      </View>
    </View>
  );
}
