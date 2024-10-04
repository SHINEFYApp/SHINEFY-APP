import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import SelectVechileCard from '../../components/selectVechileCard.jsx/selectVechileCard';
import userIcon from '../../assets/icons/profile/user.png';
import locationIcon from '../../assets/icons/profile/location.png';
import walletIcon from '../../assets/icons/profile/wallet.png';
import packageIcon from '../../assets/icons/profile/package.png';
import SubIcon from '../../assets/icons/profile/Subscreption.png';
import SettingIcon from '../../assets/icons/profile/setting.png';
import LanguageIcon from '../../assets/icons/profile/Language.png';
import pic from '../../assets/icons/profile/pic.png';
import {useEffect} from 'react';
import {ScrollView} from 'react-native';
import getProfile from '../../Features/getProfile/getProfile';
import {useRecoilState} from 'recoil';
import profileData from '../../atoms/profileData/profileData';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export default function ProfileScreen({navigation}) {
  const [data, setData] = useRecoilState(profileData);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const fetchData = async () => {
      setData(await getProfile());
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1 px-4 bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top+ 20,
          paddingBottom: insets.bottom,
        }}>
        <View className="my-10 ">
          <View className="items-center relative border-2 border-mainColor w-[110px] p-1 rounded-full mx-auto">
            <Image
              source={
               data?.image == "NA"
                  ? pic
                  : {
                      uri: `${
                         config.img_url3 + data?.image
                      }`,
                    }
              }
              className="p-4 border w-[100] h-[100] rounded-full"
            />
          </View>
          <View className="items-center ">
            <Text className="font-bold text-2xl">{data?.name}</Text>
            <Text>0{data?.phone_number}</Text>
          </View>
        </View>
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
      </ScrollView>
    </View>
  );
}
