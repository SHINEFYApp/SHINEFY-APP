import { Text, View } from "react-native-ui-lib";
import SelectExtraService from "../../components/selectExtraService/selectExtraService";
import SelectMainService from "../../components/selectMainService/selectMainService";
import { useState } from "react";
import SelectVehicle from "../../components/selectVehicle/SelectVehicle";
import { ScrollView } from "react-native-gesture-handler";
import AddOtherVehicle from "../../components/addOtherVehicle/addOtherVehicle";
import Button from "../../components/mainButton/Button";
import { SelectList } from "react-native-dropdown-select-list";

export default function RequestDetails({ navigation }) {

    const [selectMain, setSelectMain] = useState("")
    const [selectLocation, setSelectLocation] = useState("")

    const data = [
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]

    return (
        <>
            <ScrollView className="pt-[80] px-5 overflow-y-scroll h-fit">
                <View>
                    <Text className="text-xl mb-3">Select Car wash location</Text>
                    <SelectList data={data} placeholder="Select Location" boxStyles={{ backgroundColor: "white" }} />
                </View>
                <View>
                    <Text className="text-xl mb-3">Select Vehicle</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <SelectVehicle />
                        <AddOtherVehicle />
                    </ScrollView>
                </View>
                <View>

                    <Text className="text-xl mb-3">Select Main Services</Text>
                    <SelectMainService title={"car wash"} selected={selectMain} onPress={setSelectMain} />
                    <SelectMainService title={"car wash2"} selected={selectMain} onPress={setSelectMain} />
                </View>
                <View>
                    <Text className="text-xl mb-3">Select Extra Services</Text>
                    <SelectExtraService />
                </View>
                <View>
                    <Text className="text-xl mb-3">Select Package</Text>
                    <SelectExtraService />
                </View>

            </ScrollView>
            <View className="flex-row bg-white justify-between absolute bottom-0 w-full rounded-t-3xl p-5">
                <View>
                    <Text className="text-md">SubTotal</Text>
                    <Text className="font-bold text-xl">200 EGP</Text>
                </View>
                <Button Title={"continue"} smallButton onPress={() => navigation.navigate('SelectDateTime')} />
            </View>
        </>

    )
}