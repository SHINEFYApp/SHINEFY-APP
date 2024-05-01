import { Text, View } from "react-native-ui-lib";
import SearchInput from "../searchInput/searchInput";
import { ScrollView } from "react-native-gesture-handler";
import img from '../../assets/icons/selectIcon.png'
import SelectCardDetails from "../selectCardDetails/selectCardDetails";
import Button from "../mainButton/Button";
import Input from "../inputs/input";
import getBrand from "../../Features/getBrandCar/getBrandCar";
import { useEffect, useMemo, useState } from "react";
export default function SelectDetailsVeicles ({title}) {
    const [data , setDate] = useState([])
    const [search , setSearch] = useState("")
    const searchResult = useMemo(()=>{
        return data.filter((ele)=>{
            return ele[handleTitleData()][0].toLowerCase().includes(search)
        })
    },[search,data])
    function handleApiData() {
        switch(title){
           case "Select Brand" :
            return "make_arr" 
            case "Select Category" :
                return "category_arr"
            
        }
    }
    function handleTitleData() {
        switch(title){
           case "Select Brand" :
            return "car_make" 
            case "Select Category" :
                return "car_category"
            
        }
    }


    useEffect(()=>{
        handleApiData()
        const fetchData = async ()=>{
            let data = await getBrand() 
            console.log(data.car_arr)
            setDate(data.car_arr[handleApiData()])
        }


    fetchData()

    },[])


    console.log(title.includes("plate"))
    return (
        <View className={"bg-white p-4 rounded border border-[#ccc] rounded-lg"}>
            <View>
                <Text className="text-xl font-bold text-center mb-4">{title}</Text>
            
            </View>
            {

                title.includes("plate") ?
                <View className="h-[80]"> 
                <Input placeholder={"Enter Your Plate Number Car"} />
                </View>
                :
                <>
                    <SearchInput placeholder={title} onChange={setSearch}/>
                    <ScrollView className="mt-5 h-[calc(60vh)]" showsVerticalScrollIndicator={false}>
                        <View className="flex-row flex-wrap justify-between">
                            {
                                searchResult.map((ele)=>{
                                    return (
                                        <SelectCardDetails title={ele[handleTitleData()][0]} img={img}/>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </>
                
                

            }
        </View>
    )
}