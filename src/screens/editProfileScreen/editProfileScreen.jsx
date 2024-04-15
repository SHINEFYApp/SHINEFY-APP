import { Image, Text, View } from "react-native-ui-lib";
import pic from '../../assets/icons/profile/pic.png'
import Input from "../../components/inputs/input";
import userIcon from '../../assets/icons/userIcon.png';
import phoneIcon from '../../assets/icons/phoneIcon.png';
import Button from "../../components/mainButton/Button";

export default function EditProfileScreen() {
    return (
        <View className="pt-[80] px-8 flex-1">
            <View className="my-10">
                <View className="items-center relative border-2 border-mainColor w-[110px] p-1 rounded-full mx-auto">
                    <Image source={pic} className="p-4 border w-[100] h-[100] rounded-full" />
                </View>
            </View>
            <View className="relative">
                <View className="absolute w-full">
                    <View className="flex-row gap-4">
                        <View className={'flex-1'}>
                            <Input
                                placeholder={'Youssif'}
                                icon={userIcon}
                            />
                        </View>
                        <View className={'flex-1'}>
                            <Input
                                placeholder={'Elhelaly'}
                                icon={userIcon}
                            />
                        </View>
                    </View>

                    <View>
                        <Input placeholder={'youssifelhelaly@gmail.com'} icon={phoneIcon} />

                    </View>
                    <View>
                        <Input
                            placeholder={'Mobile'}
                            icon={phoneIcon}
                            text={'+20'}
                            isBorder={true}
                        />
                    </View>
                    <Button Title={"UPDATE"} />
                </View>
            </View>

        </View>
    )
}