import { Image, View } from "react-native-ui-lib";
import dataIcon from '../../assets/icons/dateIcon.png'
import { Text } from "react-native";
import { config } from "../../Provider/configProvider";

export default function NotficationCard({notfi}) {
    
    
    return (
        <View className="flex-row items-center mx-4 my-2 pb-3 relative border-b border-[#c3c3c3]">
            <Image source={dataIcon} className='mr-5'/>
            <View>
                <Text ellipsizeMode="tail" className="text-lg font-bold">{config.language == 0 ? notfi.title : notfi.title_2}</Text>
                <Text className={`text-xs flex-col ${config.language ? "pr-20" : "pl-20"}`} numberOfLines={3} ellipsizeMode="tail">{config.language == 0 ? notfi.message :notfi.message_2 }</Text>
            </View>
                <Text className='absolute right-[0] top-0'>{notfi.createtime}</Text>
        </View>
    )
}