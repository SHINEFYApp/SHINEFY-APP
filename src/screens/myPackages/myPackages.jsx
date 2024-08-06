import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";
import PackageCard from "../../components/packageCard/packageCard";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import getUserPackages from "../../Features/getUserPackages/getUserPackages";

export default function MyPackages ({navigation , route}) {

    console.log(route.params)

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
       const myPackage = await getUserPackages();
        setData(myPackage.packageSubscription);
    };
    fetchData();
  }, []);

    return (
            <SafeAreaView>
      <ScrollView>
        <View className="pt-[80] px-4">
          {data?.map(pack => {
            return <PackageCard navigation={navigation} pack={pack} isUse={true} route={route.params}/>;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
    )
}