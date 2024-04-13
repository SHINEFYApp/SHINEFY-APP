import { Image, View } from "react-native-ui-lib";
import dataIcon from '../../assets/icons/dateIcon.png'
import { Text } from "react-native";

export default function NotficationCard() {
    
    
    return (
        <View className="flex-row items-center mx-4 my-2 pb-3 justify-between relative border-b border-[#c3c3c3]">
            <Image source={dataIcon} className='mr-5'/>
            <View>
                <Text ellipsizeMode="tail" className="text-lg font-bold">Service Booked Successfully</Text>
                <Text className="text-xs flex-col pr-16" numberOfLines={3} ellipsizeMode="tail">Lorem ipsum dolor sit amet consectetur. Felis enim et adipiscing augue facilisi aenean sit. Massa porttitor condimentum risus duis cras. </Text>
                <Text className='absolute right-[50px] top-0'>1h</Text>
            </View>
        </View>
    )
}