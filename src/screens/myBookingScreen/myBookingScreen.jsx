import { useEffect, useState } from "react";
import { StyleSheet, Touchable, TouchableHighlight } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "react-native-ui-lib";
import EmptyBooking from "../../components/emptyBooking/emptyBooking";
import ProgressBooking from "../../components/ProgressBooking/progressBooking";
import PendingBooking from "../../components/pendingBooking/pendingBooing";
import CompleteBooking from "../../components/completeBooking/completeBooking";
import getBookking from "../../Features/getBooking/getBooking";

export default function MyBookingScreen({ navigation }) {
    const [data , setData] = useState([])
    const [currentPage, setCurrentPage] = useState("pending")

    console.log(data?.pending_booking )

    useEffect(()=>{
        let fetchData = async ()=>{
            let data = await getBookking()
            console.log(data.booking_arr)
            setData(data.booking_arr)
        } 
        fetchData()
    },[currentPage])
    
    return (
        <View className="pt-[80] px-5 flex-1">
            <View className="bg-[#FFFAF2] py-3 px-8 flex-row justify-between rounded-xl" style={style.tabStyle}>
                <TouchableOpacity onPress={() => { setCurrentPage("pending") }}><Text className={currentPage == "pending" && "text-mainColor font-bold"}>Pending</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setCurrentPage("in progress") }}><Text className={currentPage == "in progress" && "text-mainColor font-bold"}>In Progess</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setCurrentPage("complete") }}><Text className={currentPage == "complete" && "text-mainColor font-bold"}>Complete</Text></TouchableOpacity>
            </View>
            {
                currentPage === "pending"
                    ? 
                     <PendingBooking bookings={data?.pending_booking} navigation={navigation}/>
                        
                    :
                    currentPage === "in progress"
                        ?
                        <ProgressBooking />
                        :
                        <CompleteBooking navigation={navigation} />

            }
        </View>
    )
}

const style = StyleSheet.create({

    tabStyle: {
        shadowColor: "#dd9923",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.19,
        shadowRadius: 5.62,
        elevation: 9
    }
}
)