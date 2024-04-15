import { Image, Text, View } from "react-native-ui-lib";
import arrowIcon from '../../assets/icons/arrowIcon.png'
import { TouchableOpacity } from "react-native-gesture-handler";
export default function SelectVechileCard({ icon, text, screen, navigation }) {
    function handleNavigate() {
        navigation.navigate(screen)
    }

    return (
        <TouchableOpacity onPress={handleNavigate} className="flex-row items-center bg-white px-3 py-5 mb-3 border-[#ccc] border rounded-lg">
            <Image source={icon} className="mr-3" />
            <Text>
                {text}
            </Text>
            <Image source={arrowIcon} className="ml-auto" />
        </TouchableOpacity>
    )
}