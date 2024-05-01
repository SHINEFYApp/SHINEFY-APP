import { Text, View } from "react-native-ui-lib";
import SearchInput from "../searchInput/searchInput";
import { ScrollView } from "react-native-gesture-handler";
import img from '../../assets/icons/selectIcon.png'
import SelectCardDetails from "../selectCardDetails/selectCardDetails";
import Button from "../mainButton/Button";
import Input from "../inputs/input";
export default function SelectDetailsVeicles ({title}) {

    console.log(title.includes("plate"))
    return (
        <View className={"bg-white p-4 rounded border border-[#ccc] rounded-lg"}>
            <View>
                <Text className="text-xl font-bold text-center mb-4">{title}</Text>
            
            </View>
            {

                title.includes("plate") ?
                <>
                    <SearchInput placeholder={title}/>
                    <ScrollView className="mt-5 h-[calc(60vh)]" showsVerticalScrollIndicator={false}>
                        <View className="flex-row flex-wrap justify-between">
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        <SelectCardDetails title={"Category"} img={img}/>
                        </View>
                    </ScrollView>
                </>
                :
                <View className="h-[80]"> 
                <Input placeholder={"Enter Your Plate Number Car"} />
                </View>
                

            }
        </View>
    )
}