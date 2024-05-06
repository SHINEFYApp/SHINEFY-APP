import React from "react";
import { Text, View } from "react-native-ui-lib";

const CrossoverElement = ({ title, value, color }) => {
    return <View className={'flex flex-row w-full mb-4 items-center'}>
        <Text className={'text-[#585858] w-[90px] mr-2 capitalize'}>{title}</Text>
        {color ? <View className={'w-4 h-4 rounded-full mr-2'} style={{ backgroundColor: color }}></View> : null}
        <Text className={'font-semibold w-full'}>{value}</Text>
    </View>;
};

export default CrossoverElement;
