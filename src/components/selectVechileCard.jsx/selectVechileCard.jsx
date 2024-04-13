import { Image, Text, View } from "react-native-ui-lib";
import arrowIcon from '../../assets/icons/arrowIcon.png'
import { TouchableOpacity } from "react-native-gesture-handler";
export default function SelectVechileCard({icon , text }) {
    return(
        <TouchableOpacity className="flex-row items-center bg-white p-3 mb-3 border-[#ccc] border rounded-lg">
            <Image source={icon} className="mr-3"/>
            <Text>
                {text}
            </Text>
            <Image source={arrowIcon} className="ml-auto"/>
        </TouchableOpacity>
    )
}