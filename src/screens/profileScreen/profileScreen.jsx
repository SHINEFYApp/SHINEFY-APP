import {Image, Text, View} from 'react-native-ui-lib';
import SelectVechileCard from '../../components/selectVechileCard.jsx/selectVechileCard';
import userIcon from '../../assets/icons/profile/user.png';
import locationIcon from '../../assets/icons/profile/location.png';
import walletIcon from '../../assets/icons/profile/wallet.png';
import packageIcon from '../../assets/icons/profile/package.png';
import SubIcon from '../../assets/icons/profile/Subscreption.png';
import SettingIcon from '../../assets/icons/profile/setting.png';
import LanguageIcon from '../../assets/icons/profile/Language.png';
import pic from '../../assets/icons/profile/pic.png';
import {ScrollView} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import getProfile from '../../Features/getProfile/getProfile';
import {useRecoilState} from 'recoil';
import profileData from '../../atoms/profileData/profileData';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
export default function ProfileScreen({navigation}) {
  const [data, setData] = useRecoilState(profileData);
  useEffect(() => {
    const fetchData = async () => {
      setData(await getProfile());
    };
    fetchData();
  }, [navigation]);

  console.log(data)

  return (
    <View className="pt-[80px] px-6 ">
      <View className="my-10 ">
        <View className="items-center relative border-2 border-mainColor w-[110px] p-1 rounded-full mx-auto">
          <Image
            source={pic ? pic : {uri:`${"https://shinefy.co/app-test/webservice/images/"}${data.img}`}}
            className="p-4 border w-[100] h-[100] rounded-full"
          />
        </View>
        <View className="items-center ">
          <Text className="font-bold text-2xl">{data?.name}</Text>
          <Text>0{data?.phone_number}</Text>
        </View>
      </View>

      <ScrollView
        className="h-[calc(55vh)]"
        showsVerticalScrollIndicator={false}>
        <SelectVechileCard
          icon={userIcon}
          text={Lang_chg.editprofile_txt[config.language]}
          screen="EditProfileScreen"
          navigation={navigation}
        />
        <SelectVechileCard
          icon={locationIcon}
          text={Lang_chg.savedlocation[config.language]}
          screen="SavedLocationScreen"
          navigation={navigation}
        />
        <SelectVechileCard
          icon={walletIcon}
          text={Lang_chg.mywallet_txt[config.language]}
          screen="MyWallet"
          navigation={navigation}
        />
        <SelectVechileCard
          icon={packageIcon}
          text={Lang_chg.packages[config.language]}
          screen="PackageScreen"
          navigation={navigation}
        />
        <SelectVechileCard
          icon={SubIcon}
          text={Lang_chg.mySubscriptions[config.language]}
          screen="MySubscreptionScreen"
          navigation={navigation}
        />
        <SelectVechileCard
          icon={SettingIcon}
          text={Lang_chg.setting_txt[config.language]}
          screen="SettingScreen"
          navigation={navigation}
        />
        <SelectVechileCard
          icon={LanguageIcon}
          text={Lang_chg.language_txt[config.language]}
          screen="LanguageScreen"
          navigation={navigation}
        />
        <View className={'mb-16'} />
      </ScrollView>
    </View>
  );
}
