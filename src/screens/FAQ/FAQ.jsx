import React from "react";
import { Text, View } from "react-native-ui-lib";
import FAOComponent from "../../components/FAO/FAOComponent";

const FAQ = () => {
    return <View className={'mt-[90px] mx-5'}>
        <FAOComponent
            question={'1-How to book an appointment?'}
            content={'How to book: 1- Add your car 2-Choose your location 3-Choose date and time 4-Choose services 5-Check your booking 6- Choose payment method 7-Confirm your booking'}
        />
        <FAOComponent
            question={'2-How to book an appointment?'}
            content={'How to book: 1- Add your car 2-Choose your location 3-Choose date and time 4-Choose services 5-Check your booking 6- Choose payment method 7-Confirm your booking'}
        />
    </View>;
};

export default FAQ;
