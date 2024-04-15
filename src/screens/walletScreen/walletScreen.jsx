import { Image, Text, View } from "react-native-ui-lib";
import walletIcon from '../../assets/icons/profile/walletIcon.png'
export default function WalletScreen() {
    return (
        <View className="pt-[80] px-5">
            <View className="bg-[#FFCC73EB] rounded-xl px-4 py-9 flex-row justify-between">
                <View>
                    <Text className="text-black mb-2 text-lg">Wallet Balance</Text>
                    <Text className="font-bold">12,657 EGP</Text>
                </View>
                <Image source={walletIcon} />
            </View>
        </View>
    )
}