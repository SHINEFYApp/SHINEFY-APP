import { Image, TouchableOpacity, View } from "react-native-ui-lib"
import leftArrow from '../../assets/icons/leftArrow.png'
export default function BackButton({navigation}) {
    return (
            <TouchableOpacity onPress={()=>{navigation.goBack()}} className={"h-[30px] w-[30px] rounded-full left-4 top-4 items-center justify-center border-[#ccc] border absolute z-10"}>
                <View>
                    <Image source={leftArrow} />
                </View>
            </TouchableOpacity>

    )
}