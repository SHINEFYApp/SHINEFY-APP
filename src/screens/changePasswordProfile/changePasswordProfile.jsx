import { Text, View } from "react-native-ui-lib";
import Input from "../../components/inputs/input";
import keyIcon from '../../assets/icons/Keypng.png';
import { TouchableOpacity } from "react-native-gesture-handler";
import forgotPassword from "../../Features/forgotPassword/forgotPassword";
import { useRecoilValue } from "recoil";

export default function ChangePasswordProfile({navigation}) {
    const data  = useRecoilValue(profileData)
    return (
        <View className="pt-[80] flex-1 relative px-5">
            <View className="absolute top-[120] w-full ml-5">

                <Input
                    secureTextEntry={true}
                    placeholder={'Old Password'}
                    icon={keyIcon}
                    isBorder={true}
                    type={'passowrd'}
                />
                <TouchableOpacity onPress={()=>{
                    forgotPassword(navigation , data.phone_number)
                }}>
                    <Text className="text-mainColor ml-auto mb-3">Forget password ?</Text>
                </TouchableOpacity>
                <Input
                    secureTextEntry={true}
                    placeholder={'New Password'}
                    icon={keyIcon}
                    isBorder={true}
                    type={'passowrd'}
                />
                <Input
                    secureTextEntry={true}
                    placeholder={'Confirm New Password'}
                    icon={keyIcon}
                    isBorder={true}
                    type={'passowrd'}
                />
            </View>
        </View>
    )
}