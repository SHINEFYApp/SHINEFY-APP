import React from "react";
import { Text, View } from "react-native-ui-lib";

const BookingOverviewTextDetails = ({ title, value, price }) => {
    return <View>
        <Text className={'mb-2 text-mainColor font-semibold text-lg capitalize'}>{title}</Text>
        <View className={'w-full flex flex-row items-center justify-between'}>
            <Text className={'text-lg ml-4'}>{value}</Text>
            <Text className={'text-lg font-semibold'}>{price}</Text>
        </View>
    </View>;
};

export default BookingOverviewTextDetails;
