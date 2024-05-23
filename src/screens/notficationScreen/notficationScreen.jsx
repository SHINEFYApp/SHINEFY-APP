import {Image, Text, View} from 'react-native-ui-lib';
import emptyImg from '../../assets/icons/notficationEmpty.png';
import NotficationCard from '../../components/notficationCard/notficationCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import { useEffect, useState } from 'react';
import getNotification from '../../Features/getNotfication/getNotfication';

export default function NotficationScreen() {
  const [notfi , setNotfi] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
     let res  = await getNotification()
      setNotfi(res.notification_arr)
    } 
    fetchData()
  },[])

  return (
    <View className="flex-1 pt-[80px]">
      {!notfi.length && (
        <View className="w-full items-center p-10">
          <Image source={emptyImg} />
        </View>
      )}
      <ScrollView>
        {/* <View className="mt-2 flex-row items-center px-4">
          <Text className="text-[#000] text-xl ">
            {Lang_chg.today_txt[config.language]}
          </Text>
          <Text className="text-mainColor flex-1 text-right">
            {Lang_chg.see_all[config.language]}
          </Text>
        </View> */}
        {
          notfi.map((notfi)=>{
            return (
              <NotficationCard notfi={notfi} />
            )
          })
        }
        {/* <View className="mt-2 flex-row items-center px-4">
          <Text className="text-[#000] text-xl ">
            {Lang_chg.today_txt[config.language]}
          </Text>
          <Text className="text-mainColor flex-1 text-right">
            {Lang_chg.see_all[config.language]}
          </Text>
        </View> */}
      </ScrollView>
    </View>
  );
}
