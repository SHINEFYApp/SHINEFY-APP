import { Colors, Text, View } from "react-native-ui-lib";
import SelectDateBox from "../../components/selectDateBox/selectDateBox";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { mobileW } from "../../Provider/utilslib/Utils";
import DateTimePicker from "react-native-ui-datepicker";
import { StyleSheet } from "react-native";
import Button from "../../components/mainButton/Button";

export default function SelectDateTime({ navigation }) {

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [selectDate, setSelectDate] = useState(new Date());
    function handleSelectDate(selectedDate) {
        setDate(selectedDate)
    }
    function handleSelectTime(selectedTime) {
        setTime(selectedTime)
    }

    return (
        <View className="pt-[80] px-5 relative h-full" >
            <View>
                <Text>Select Date</Text>
                <View className="flex-row justify-between">
                    <SelectDateBox title={"Today"} onPress={handleSelectDate} selected={date} />
                    <SelectDateBox title={"tomorrow"} onPress={handleSelectDate} selected={date} />
                    <SelectDateBox title={"Select Date"} onPress={handleSelectDate} selected={date} />
                </View>
                {
                    date === "Select Date" &&
                    <View className="mt-8 bg-white p-5 rounded-2xl" style={style.box}>
                        <DateTimePicker
                            mode="single"
                            date={selectDate}
                            onChange={(prams) => { setSelectDate(prams.date) }}
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
                    <SelectDateBox title={"09:00 AM"} onPress={setTime} selected={time} />
                    <SelectDateBox title={"10:45 AM"} onPress={setTime} selected={time} />
                    <SelectDateBox title={"12:30 PM"} onPress={setTime} selected={time} />
                    <SelectDateBox title={"04:00 PM"} onPress={setTime} selected={time} />
                    <SelectDateBox title={"07:30 PM"} onPress={setTime} selected={time} />
                    <SelectDateBox title={"09:15 PM"} onPress={setTime} selected={time} />
                </View>
            </View>
            <View className="flex-row bg-white justify-between absolute bottom-0 right-0 w-[100vw] rounded-t-3xl p-5">
                <View>
                    <Text className="text-md">SubTotal</Text>
                    <Text className="font-bold text-xl">200 EGP</Text>
                </View>
                <Button Title={"continue"} smallButton onPress={() => navigation.navigate('Booking Overview')} />
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