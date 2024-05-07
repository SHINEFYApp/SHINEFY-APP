import { ScrollView, View } from "react-native";
import SaleBox from "../../components/saleBox/saleBox";
import { useEffect, useState } from "react";
import getServices from "../../Features/getServices/getServices";

export default function SpecialOffersScreen() {
  const [specialOffers , SetSpecialOffers] = useState([])


    useEffect(()=>{
    const fetchData = async () => {
    const data =await getServices()
    SetSpecialOffers(data.all_service_arr.extra_service_arr)
  }
  fetchData()
  },[])


    return(
        <View className="mt-[80px] px-2">
            <ScrollView>
                  {
                specialOffers?.map((offer)=>{
                  return(
                    <SaleBox offer={offer} />
                  )
                })
              }
            </ScrollView>
        </View>
    )
}