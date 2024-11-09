import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native-ui-lib';
import React from 'react';
import PackageCard from '../../components/packageCard/packageCard';
import {useEffect, useState} from 'react';
import getPackages from '../../Features/getPackages/getPackages';
import SafeAreaView from '../../components/SafeAreaView';
import EmptyBooking from '../../components/emptyBooking/emptyBooking';
import { Lang_chg } from '../../Provider/Language_provider';
import { config } from '../../Provider/configProvider';

export default function PackageScreen({navigation}) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let res = await getPackages();
      setData(res.packages);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {
        data?.length > 0 ? 
      <ScrollView>
        <View className="pt-[10] px-4">
          {data?.map(pack => {
            return <PackageCard navigation={navigation} pack={pack} isButton={true}/>;
          })}
          
        </View>
      </ScrollView>
      : 
        <View className="items-center h-screen">
          <EmptyBooking title={Lang_chg.emptyPackage[config.language]}/>
        </View>
      }
    </SafeAreaView>

  );
}
