import { Image, Text, View } from "react-native-ui-lib"
import emptyImg from '../../assets/emptyIMG.png'
import Button from "../../components/mainButton/Button"
import LocationCard from "../../components/locationComponentCard/locationComponentCard"
import { ScrollView } from "react-native-gesture-handler"
import getSavedLocation from "../../Features/getSavedLocation/getSavedLocation"
export default function SavedLocationScreen({navigation}) {
    
    const locations = [1]
    
    getSavedLocation()
    
    return(
        <View className="flex-1 pt-[80px]">
            {
                locations.length == 0 ?
            <View className='w-full items-center p-10'>
                <Image source={emptyImg}/>
                <View className="w-full mt-10">
                    <Button Title={"Add Location"} secondStyle={true} textColor={"#DD9923"}/>
                </View>
            </View> :
            <View>
            <ScrollView className="px-2">
                <LocationCard />
                <LocationCard />
                <LocationCard />
                <LocationCard />
                <LocationCard />
                <LocationCard />
                <Button onPress={()=>{
                    navigation.navigate("addLocationScreen")
                }} Title={"Add New Location"} secondStyle={true} textColor={"#DD9923"}/>
            

            </ScrollView>

                </View>
            
            
            }
        </View>
    )
}