import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import walletIcon from '../../assets/icons/profile/walletIcon.png';
import {useEffect, useState} from 'react';
import getWallet from '../../Features/getWallet/getWallet';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import SafeAreaView from '../../components/SafeAreaView';
import { FlatList } from 'react-native-gesture-handler';
import { localimag, mobileW } from '../../Provider/utilslib/Utils';
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
  
      <View className="pt-[10] px-5">
        <View className="bg-[#FFCC73EB] rounded-xl px-4 py-9 flex-row justify-between">
          <View>
            <Text className="text-black mb-2 text-lg">
              {Lang_chg.wallet_balance[config.language]}
            </Text>
            <Text className="font-bold">{amount?.userwallet} EGP</Text>
          </View>
          <Image source={walletIcon} />
        </View>
  
          <FlatList 
          className=" mb-[150px]"
            data={amount?.wallet_arr.reverse()}
            renderItem={({item})=>{
         
              return ( 
                <>
                  <View className="bg-white my-2 rounded-xl p-5 "> 
                    <Text className="text-black mb-2">{item.createtime}</Text>
                    
                    <View className="flex-row items-center justify-between">

                  <Image
                  className={`${item.amount_type == 1 ?"bg-red-200" : "bg-green-200" } rounded`}
                    source={item.amount_type == 1 ? localimag.trans_unsucc_icon : localimag.trans_succ_icon}
                    style={{
                      height: (mobileW * 8) / 100,
                      width: (mobileW * 8) / 100,
                    }}
                    />
                    <Text className={`${item.amount_type == 1 ? "text-red-400" : "text-green-600"}`}>{item.amount_type == 1 ? "-" : "+"} {item.amount}</Text>
                    </View>
                  </View>
                </>
              )
            }}
          />
   

      </View>
  
  );
}
