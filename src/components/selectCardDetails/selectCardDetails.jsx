import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useRecoilState } from "recoil";
import addNewCar from "../../atoms/addNewCar/addNewCar";

export default function SelectCardDetails({title , img , color ,active, id , onPress , keyObj , ele}) {
    const [newCar , setNewCar] = useRecoilState(addNewCar)
    console.log(ele)
    return(
        <View className={`p-3 border border-[#ccc] rounded-lg w-[45%] mb-[10%] ${active==id &&"bg-mainColor"}`}>
            <TouchableOpacity onPress={()=>{
                onPress()
                setNewCar({
                    ...newCar ,
                    [keyObj] : ele
                })
            }}>
            <View className="items-center">
            <Text className="text-xl font-bold mb-3 ">{title}</Text>
            {
                 
                color ?
                <View className="h-[100] w-[100] rounded-full" style={{backgroundColor:color}}></View>
                :
                img.includes(".")&& 
                <Image source={{uri:`${"https://shinefy.co/app-test/webservice/images/"}${img}`}} style={{
                    width: "100%",
                    height: 100,
                    resizeMode: 'contain',
                }} />
            }
            </View>
            </TouchableOpacity>
        </View>
    )
}