import { useState } from "react";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native-ui-lib";
import messageIcon from '../../assets/icons/ContactUs/message.png'
import Button from "../mainButton/Button";

const CancelBooking = () => {
    const [activeButton, setActiveButton] = useState();
    const options = [
        {
            id: 1,
            title: 'Change in plans'
        },
        {
            id: 2,
            title: 'Unexpected words'
        },
        {
            id: 3,
            title: 'Personal reasons'
        },
        {
            id: 4,
            title: 'Other'
        }
    ]
    return <View className={'mt-[90px] mx-5'}>
        <Text className={'text-[#818181] mb-4'}>Please select the reason for cancellations:</Text>
        {options.map((button, key) => {
            return (
                <TouchableHighlight
                    className="my-2 w-fit"
                    underlayColor={"transparent"}
                    key={key}
                    onPress={() => {
                        setActiveButton(button.id);
                    }}
                >
                    <View className="flex-row gap-4 items-center">
                        <View
                            className={`w-[25] h-[25] border border-mainColor  rounded ${activeButton === button.id && 'bg-mainColor'
                                }`}
                        />
                        <Text className={'font-bold text-lg'}>{button.title}</Text>
                    </View>
                </TouchableHighlight>
            );
        })}

        <View
            className={"bg-transparent border border-[#c3c3c3] px-4 flex-row overflow-hidden items-start rounded-xl mt-5"}>
            <Image
                source={messageIcon}
                className={'w-[25px] h-[25px] mt-2'}
            />
            <TextInput
                placeholderTextColor={"#000"}
                placeholder='Enter Your Reason'
                className={"w-full px-3 text-[#818181] h-[110px]"}
                multiline={true}
                numberOfLines={10}
                style={{ height: 200, textAlignVertical: 'top', }}
            />
        </View>
        <View className={'mt-5'}>
            <Button
                Title={'Cancel Booking'}
                btnStyle={'text-lg'}
            />
        </View>
    </View>;
};

export default CancelBooking;
