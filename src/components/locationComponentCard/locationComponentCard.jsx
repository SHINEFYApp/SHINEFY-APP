import { Image, Text, View } from "react-native-ui-lib";
import locationIcon from '../../assets/icons/currenLocation.png'
import editIcon from '../../assets/icons/editIcon.png'
import deleteIcon from '../../assets/icons/deleteIcon.png'

export default function LocationCard() {
    return (
        <View className='flex-row items-center mx-4 my-2 pb-3 justify-between border-b border-[#c3c3c3]'> 
                <View className='flex-row items-center gap-5'>

                <View>
                    <Image source={locationIcon}/>
                </View>
                <View>
                    <Text className="font-bold text-lg">Home</Text>
                    <Text>19st , cairo , egypt</Text>
                </View>
                </View>
                <View className="flex-row gap-2">
                    <Image source={editIcon}/>
                    <Image source={deleteIcon}/>
                </View>
            </View>
    )
}