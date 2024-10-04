import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View } from "react-native-ui-lib";
import PackageCard from "../../components/packageCard/packageCard";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import getUserPackages from "../../Features/getUserPackages/getUserPackages";
import EmptyBooking from "../../components/emptyBooking/emptyBooking";
import { Lang_chg } from "../../Provider/Language_provider";
import { config } from "../../Provider/configProvider";

export default function MyPackages ({navigation , route}) {

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
       const myPackage = await getUserPackages();
        setData(myPackage.packageSubscription);
    };

    fetchData();
  }, []);


    return (
      <View>
        {
        data?.length > 0 ?
        <ScrollView>
          <View className=" px-4">
            {data?.map(pack => {
              return <PackageCard navigation={navigation} pack={pack} isUse={true} route={route.params}/>;
            })}
          </View>
        </ScrollView>
        :
        <View className="items-center h-screen">
          <EmptyBooking title={Lang_chg.emptyPackageSubscribe[config.language]}/>
        </View>
        }
      </View>
    )
}