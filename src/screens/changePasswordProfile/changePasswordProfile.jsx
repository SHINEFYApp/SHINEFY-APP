import { View } from "react-native-ui-lib";
import Input from "../../components/inputs/input";
import keyIcon from '../../assets/icons/Keypng.png';

export default function ChangePasswordProfile() {
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