import { ScrollView, View } from "react-native";
import WashServicesCard from "../../components/washServicesCard/washServicesCard";
import { useEffect, useState } from "react";
import getServices from "../../Features/getServices/getServices";

export default function WashServicesScreen({navigation}) {
  const [services , SetServices] = useState([])
      useEffect(()=>{
    const fetchData = async () => {
    const data =await getServices()
    SetServices(data.all_service_arr.service_arr)
  }
  fetchData()
  },[])

    return (
        <View className="mt-[80px] px-2">
            <ScrollView>
             {
              services?.map((service , index)=> {
                return (
                  <WashServicesCard page navigation={navigation} id={index} service={service}/>
                )
              })
            }
            </ScrollView>
        </View>
    )
}