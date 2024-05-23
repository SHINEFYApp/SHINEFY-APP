import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native-ui-lib";
import PackageCard from "../../components/packageCard/packageCard";
import { useEffect, useState } from "react";
import getPackages from "../../Features/getPackages/getPackages";

export default function PackageScreen({navigation}) {

    const [data , setData] = useState()

    useEffect(()=>{
        const fetchData = async()=>{
            let res = await getPackages()
            setData(res.packages) 
        }
        fetchData()
    },[])

    console.log(data)

    return(
        <View className="pt-[80] px-5">
            <ScrollView>
            {
                data?.map((pack)=>{
                    return(
                        <PackageCard navigation={navigation} pack={pack}/>
                    )
                }) 
            }
            </ScrollView>
        </View>
    )
}