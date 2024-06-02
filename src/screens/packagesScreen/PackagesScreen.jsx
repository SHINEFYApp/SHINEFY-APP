import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native-ui-lib';
import React from 'react';
import PackageCard from '../../components/packageCard/packageCard';
import {useEffect, useState} from 'react';
import getPackages from '../../Features/getPackages/getPackages';
import SafeAreaView from '../../components/SafeAreaView';

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
      <ScrollView>
        <View className="pt-[80] px-4">
          {data?.map(pack => {
            return <PackageCard navigation={navigation} pack={pack} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
