import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { Image, View } from "react-native-ui-lib";

const ContactUsInput = ({ icon, placeholder }) => {
    return (
        <View className={"bg-transparent border border-[#c3c3c3] px-4 flex-row overflow-hidden items-center rounded-xl mt-5"}>
            <Image source={icon} className={'w-[20px] h-[20px]'} />
            <TextInput placeholderTextColor={"#000"} placeholder={placeholder} className={"w-full px-3 text-black"} />
        </View>
    );
};

export default ContactUsInput;
