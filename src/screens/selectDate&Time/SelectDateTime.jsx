import { Colors, Text, View } from "react-native-ui-lib";
import SelectDateBox from "../../components/selectDateBox/selectDateBox";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { mobileW, msgProvider } from "../../Provider/utilslib/Utils";
import DateTimePicker from "react-native-ui-datepicker";
import { StyleSheet } from "react-native";
import Button from "../../components/mainButton/Button";
import bookingDetailsAtom from "../../atoms/bookingDetails/bookingDetails.atom";
import { useRecoilState } from "recoil";
import getTimeSlots from "../../Features/getTimeSlots/getTimeSlots";
import sortDate from "../../utlites/sortDate";

export default function SelectDateTime({ navigation }) {
    const [date, setDate] = useState("today")
    const [time, setTime] = useState("")
    const [isCustomDate , setIsCustomDate] = useState(false)
    const [slots , setSlots] = useState([])
    const [selectDate, setSelectDate] = useState(new Date());
    const [bookingDetails , setBookingDetails] = useRecoilState(bookingDetailsAtom)

    function handleSelectDate(selectedDate) {
        setDate(selectedDate)
        let date = new Date()
        if(selectedDate == "Today") {
            if(isCustomDate) {
                setIsCustomDate(false)
            }
            setBookingDetails({
                ...bookingDetails , 
                booking_date : date.toLocaleDateString().split("/").join("-")
            })
        }else if (selectedDate == "tomorrow") {
            if(isCustomDate) {
                setIsCustomDate(false)
            }
            setBookingDetails({
                ...bookingDetails , 
                booking_date : date.toLocaleDateString(date.setDate(date.getDate() + 1)).split("/").join("-")
            })
        } else {
            setBookingDetails({
                ...bookingDetails , 
            booking_date : selectedDate.split("/").join("-")
           })
            
        }
    }
    function handleSelectTime(selectedTime) {
        
        setTime(selectedTime)
          setBookingDetails({
                ...bookingDetails , 
            booking_time : selectedTime
           })
    }


    useEffect(()=>{
        const fetchDate = async()=>{
            setSlots(await getTimeSlots(bookingDetails))
        }
        fetchDate()
    },[date])

    return (
        <View className="pt-[80] px-5 relative h-full" >
            <View>
                <Text>Select Date</Text>
                <View className="flex-row justify-between">
                    <SelectDateBox title={"Today"} onPress={handleSelectDate} selected={date} />
                    <SelectDateBox title={"tomorrow"} onPress={handleSelectDate} selected={date} />
                    <SelectDateBox title={"Select Date"} onPress={()=>{
                        setIsCustomDate(true)
                    }} selected={date} />
                </View>
                {
                    isCustomDate &&
                    <View className="mt-8 bg-white p-5 rounded-2xl" style={style.box}>
                        <DateTimePicker
                            mode="single"
                            date={selectDate}
                            onChange={(prams) => {
                            let x = new Date(prams.date)
                                handleSelectDate(x.toLocaleDateString())
                                setSelectDate(prams.date)
                            }}
                            selectedItemColor="#DD9923"
                            headerButtonsPosition="right"
                            headerButtonColor="#DD9923"
                            minDate={new Date()}
                            headerTextStyle={{
                                color: "#DD9923"
                            }}

                            calendarTextStyle={{
                                color: "#DD9923",
                                fontSize: 18
                            }}
                            selectedTextStyle={{
                                fontSize: 18,
                            }}
                            height={mobileW - 80}
                        />

                    </View>
                }
            </View>
            <View>
                <Text>Select Time</Text>
                <View className="flex-row  flex-wrap">
                    {
                        slots?.map((slot)=>{ 
                            return <SelectDateBox title={slot.time} onPress={handleSelectTime} selected={time} />
                        })
                    }
                </View>
            </View>
            <View className="flex-row bg-white justify-between absolute bottom-0 right-0 w-[100vw] rounded-t-3xl p-5">
                <View>
                    <Text className="text-md">SubTotal</Text>
                    <Text className="font-bold text-xl">200 EGP</Text>
                </View>
                <Button Title={"continue"} smallButton onPress={() =>{
                    if(!bookingDetails.booking_date){
                        msgProvider.toast("Please Select Date", 'center');
                    } else if(!bookingDetails.booking_time){
                        msgProvider.toast("Please Select Time", 'center');
                    } else {
                        navigation.navigate('Booking Overview')
                    }
                     
                    }} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    box: {
        shadowColor: "#dd9923",
        shadowOffset: {
            width: 8,
            height: 4,
        },
        shadowOpacity: 5.19,
        shadowRadius: 5.62,
        elevation: 9,

    }
})