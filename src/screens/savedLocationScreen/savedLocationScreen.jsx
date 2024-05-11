import { Image, Text, View } from "react-native-ui-lib"
import emptyImg from '../../assets/emptyIMG.png'
import Button from "../../components/mainButton/Button"
import LocationCard from "../../components/locationComponentCard/locationComponentCard"
import { ScrollView } from "react-native-gesture-handler"
import getSavedLocation from "../../Features/getSavedLocation/getSavedLocation"
import { useEffect, useState } from "react"
export default function SavedLocationScreen({navigation}) {
    const [data , setData] = useState([])
    const locations = [1]
    
    console.log(data)

    useEffect(()=>{
        const fetchData = async () =>{
            setData(await getSavedLocation())
        }
        fetchData()
    },[])

    return(
        <View className="flex-1 pt-[80px]">
            {
                data?.length == 0 || data == "NA" ?
            <View className='w-full items-center p-10'>
                <Image source={emptyImg}/>
                <View className="w-full mt-10">
                    <Button Title={"Add Location"} onPress={()=>{
                    
                    navigation.navigate("addLocationScreen")
                }} secondStyle={true} textColor={"#DD9923"}/>
                </View>
            </View> :
            <View>
            <ScrollView className="px-2">
                {
                    data?.map((location)=>{
                        return (
                            <LocationCard location={location} navigation={navigation}/>
                        )
                    })
                }
                <Button onPress={()=>{
                    navigation.navigate("addLocationScreen")    
                }} Title={"Add New Location"} secondStyle={true} textColor={"#DD9923"}/>
            </ScrollView>
                </View>
            }
        </View>
    )
}