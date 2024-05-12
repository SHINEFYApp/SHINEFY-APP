import {Image, Text, View} from 'react-native-ui-lib';
import walletIcon from '../../assets/icons/profile/walletIcon.png';
import {useEffect, useState} from 'react';
import getWallet from '../../Features/getWallet/getWallet';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
export default function WalletScreen() {
  const [amount, setAmount] = useState();

  useEffect(() => {
    let fetchData = async () => {
      let data = await getWallet();
      setAmount(data);
    };
    fetchData();
  }, []);

  return (
    <View className="pt-[80] px-5">
      <View className="bg-[#FFCC73EB] rounded-xl px-4 py-9 flex-row justify-between">
        <View>
          <Text className="text-black mb-2 text-lg">
            {Lang_chg.wallet_balance[config.language]}
          </Text>
          <Text className="font-bold">{amount} EGP</Text>
        </View>
        <Image source={walletIcon} />
      </View>
    </View>
  );
}
