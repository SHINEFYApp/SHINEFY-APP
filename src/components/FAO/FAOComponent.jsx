import React, { useState } from "react";
import { Image, Text, View } from "react-native-ui-lib";
import icon from '../../assets/icons/FAO/FAOIcon.png'
import { TouchableOpacity } from "react-native-gesture-handler";

const FAOComponent = ({ question, content }) => {
    const [openDetails, setOpenDetails] = useState(false)

    return <View className={'w-full mb-4 pb-6 border-b border-b-[#D2D2D2]'}>
        <TouchableOpacity onPress={() => setOpenDetails((prev) => !prev)} className={'flex flex-row items-center justify-between '}>
            <Text className={'font-bold text-sm'}>{question}</Text>
            <Image source={icon} className={'w-7 h-7'} />
        </TouchableOpacity>
        <View className={`${openDetails ? 'flex' : 'hidden '}  bg-mainColor rounded-[10px] w-full p-3 mt-3 flow-row justify-center`}>
            <Text className={'font-bold text-sm'}>
                {content}
            </Text>
        </View>
    </View>;
};

export default FAOComponent;
