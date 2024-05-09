import { Image, Text, View } from "react-native-ui-lib";
import walletIcon from '../../assets/icons/profile/walletIcon.png'
import { useEffect, useState } from "react";
import getWallet from "../../Features/getWallet/getWallet";
export default function WalletScreen() {

        const [amount , setAmount] = useState()

    useEffect(()=>{
        
        let fetchData = async () => {
            let data = await getWallet()
            setAmount(data)
        }
        fetchData()
    },[])

    return (
        <View className="pt-[80] px-5">
            <View className="bg-[#FFCC73EB] rounded-xl px-4 py-9 flex-row justify-between">
                <View>
                    <Text className="text-black mb-2 text-lg">Wallet Balance</Text>
                    <Text className="font-bold">{amount} EGP</Text>
                </View>
                <Image source={walletIcon} />
            </View>
        </View>
    )
}