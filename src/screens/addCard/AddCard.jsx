import { Checkbox, Image, Text, View } from "react-native-ui-lib";
import creditCard from '../../assets/creditCard.png'
import AddCardInput from "../../components/addCard/AddCardInput";
import { TextInput } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useState } from "react";
import Button from "../../components/mainButton/Button";

const AddCard = () => {
    const [activeButton, setActiveButton] = useState();

    const toggleCheckBox = () => setActiveButton((prev) => !prev)

    return <View className={'mt-[90px] mx-5'}>
        <Image source={creditCard} className={'h-[230px] w-[95%] mx-auto mb-4'} />
        <AddCardInput label={'Card Holder Name'} />
        <AddCardInput label={'Card Number'} />
        <View className={'flex flex-row items-center justify-center w-full'}>
            <View className={`mb-4 w-[49%] mr-2`}>
                <Text className={'font-bold text-base mb-2'}>
                    Expiry Date
                </Text>
                <TextInput className={'border-[2px] border-[#C3C3C3] rounded-lg w-full bg-white px-2'} />
            </View>
            <View className={`mb-4 w-[49%] ml-2`}>
                <Text className={'font-bold text-base mb-2'}>
                    CVV
                </Text>
                <TextInput className={'border-[2px] border-[#C3C3C3] rounded-lg w-full bg-white px-2'} />
            </View>
        </View>
        <TouchableHighlight
            className="mt-3 mb-24 w-fit"
            underlayColor={"transparent"}
            onPress={toggleCheckBox}
        >
            <View className="flex-row gap-3 items-center">
                <View
                    className={`w-[25] h-[25] border border-mainColor  rounded ${activeButton && 'bg-mainColor'
                        }`}
                />
                <Text className={'font-bold text-base'}>Save Card</Text>
            </View>
        </TouchableHighlight>
        <Button Title={'Add Card'} btnStyle={'font-semibold text-base'} />
    </View>;
};

export default AddCard; 
