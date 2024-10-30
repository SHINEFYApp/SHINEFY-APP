import { Image, Text, View } from "react-native-ui-lib";
import MapComponent from "../../components/mapComponent/mapComponent";
import { Lang_chg } from "../../Provider/Language_provider";
import { config } from "../../Provider/configProvider";
import rightIconGrey from '../../assets/icons/rightIconGrey.png'
import rightIconWhite from '../../assets/icons/rightIconWhite.png'
export default function ServiceTracking ({navigation , route}) {

    return (
        <View className="flex-1">
            <View className="w-full h-[50vh]">

                <MapComponent navigation={navigation} isMove={false} isEditLocation={true} editLocaiton={route.params}/>
            </View>
            <View className="bg-white h-[55vh] rounded-[30px] py-5 absolute right-0 bottom-0 w-full">
                <Text className="px-5 font-bold text-xl mb-4">{Lang_chg.order_id[config.language]} : {route.params.bookingId}</Text>
                <View className="px-5 flex-row items-center">
                    <View className="relative">
                        <View className="bg-mainColor p-2 self-start rounded-full">
                            <Image className="w-[15px] h-[15px]" source={rightIconWhite} />
                        </View>
                        <View className="h-[40px] -z-10 w-[5px] bg-mainColor absolute left-[13px] top-[20px]">

                        </View>
                    </View>
                    <Text className="mx-3">{Lang_chg.pending_txt[config.language]}</Text>
                </View>
                <View className="px-5 flex-row items-center mt-[25px]">
                    <View className="relative">
                        <View className={`${route.params.status >= 1 ? "bg-mainColor" : "bg-[#e1e1e1]"} p-2 self-start rounded-full`}>
                            <Image className="w-[15px] h-[15px]" source={ route.params.status >= 1 ? rightIconWhite :rightIconGrey} />
                        </View>
                        <View className={`h-[40px] -z-10 w-[5px] ${route.params.status >= 1 ? "bg-mainColor" : "bg-[#e1e1e1]"} absolute left-[13px] top-[20px]`}>

                        </View>
                    </View>
                    <Text className="mx-3">{Lang_chg.accepted_txt[config.language]}</Text>
                </View>
                <View className="px-5 flex-row items-center mt-[25px]">
                    <View className="relative">
                        <View className={`${route.params.arrive == 1 ? "bg-mainColor" : "bg-[#e1e1e1]"} p-2 self-start rounded-full`}>
                            <Image className="w-[15px] h-[15px]" source={ route.params.arrive == 1 ? rightIconWhite :rightIconGrey} />
                        </View>
                        <View className={`h-[40px] -z-10 w-[5px] ${route.params.arrive == 1 ? "bg-mainColor" : "bg-[#e1e1e1]"} absolute left-[13px] top-[20px]`}>

                        </View>
                    </View>
                    <Text className="mx-3">{Lang_chg.washer_txt[config.language]}</Text>
                </View>
                <View className="px-5 flex-row items-center mt-[25px]">
                    <View className="relative">
                        <View className={`${route.params.washingStatus == 1 ? "bg-mainColor" : "bg-[#e1e1e1]"} p-2 self-start rounded-full`}>
                            <Image className="w-[15px] h-[15px]" source={ route.params.washingStatus == 1 ? rightIconWhite :rightIconGrey} />
                        </View>
                        <View className={`h-[40px] -z-10 w-[5px] ${route.params.washingStatus == 1 ? "bg-mainColor" : "bg-[#e1e1e1]"} absolute left-[13px] top-[20px]`}>

                        </View>
                    </View>
                    <Text className="mx-3">{Lang_chg.inprogress_txt[config.language]}</Text>
                </View>
                <View className="px-5 flex-row items-center mt-[25px]">
                    <View className="relative">
                        <View className={`${route.params.status == 2 ? "bg-mainColor" : "bg-[#e1e1e1]"} p-2 self-start rounded-full`}>
                            <Image className="w-[15px] h-[15px]" source={ route.params.status == 2 ? rightIconWhite :rightIconGrey} />
                        </View>
                      
                    </View>
                    <Text className="mx-3">{Lang_chg.jobDone[config.language]}</Text>
                </View>
                <View className="bg-[#FFF3DF] ml-auto rounded-l-[20px] h-[80px]  border-l-2 border-b-2 border-mainColor mt-4 p-4 w-[150px] absloute right-0 bottom-0">
                    <Text className="font-bold">{Lang_chg.totalamount_txt[config.language]}</Text>
                    <Text className="text-mainColor font-bold text-xl text-right">{route.params.price}</Text>
                </View>
            </View>
        </View>
    )
}