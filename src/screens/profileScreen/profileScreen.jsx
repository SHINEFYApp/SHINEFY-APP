import { Image, Text, View } from "react-native-ui-lib";
import SelectVechileCard from "../../components/selectVechileCard.jsx/selectVechileCard";
import userIcon from '../../assets/icons/profile/user.png'
import locationIcon from '../../assets/icons/profile/location.png'
import walletIcon from '../../assets/icons/profile/wallet.png'
import packageIcon from '../../assets/icons/profile/package.png'
import SubIcon from '../../assets/icons/profile/Subscreption.png'
import SettingIcon from '../../assets/icons/profile/setting.png'
import LanguageIcon from '../../assets/icons/profile/Language.png'
import pic from '../../assets/icons/profile/pic.png'
import { ScrollView } from "react-native-gesture-handler";
export default function ProfileScreen() {
    return (
        <View className="pt-[80px] px-6">

            <View className="my-10">
                <View className="items-center relative border-2 border-mainColor w-[110px] p-1 rounded-full mx-auto">
                    <Image source={pic} className="p-4 border w-[100] h-[100] rounded-full"/>
                </View>
                <View className="items-center ">
                    <Text className="font-bold text-2xl">Youssif Elhelaly</Text>
                    <Text>012314567899</Text>
                </View>
            </View>

            <ScrollView>
                <SelectVechileCard icon={userIcon} text={"Edit Profile"}/>
                <SelectVechileCard icon={locationIcon} text={"Saved Location"}/>
                <SelectVechileCard icon={walletIcon} text={"My Wallet"}/>
                <SelectVechileCard icon={packageIcon} text={"Packages"}/>
                <SelectVechileCard icon={SubIcon} text={"My Subscriptions"}/>
                <SelectVechileCard icon={SettingIcon} text={"Setting"}/>
                <SelectVechileCard icon={LanguageIcon} text={"Languages"}/>
            </ScrollView>
        </View>
    )
}