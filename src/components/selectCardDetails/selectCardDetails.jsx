import { Image, Text, View } from "react-native-ui-lib";

export default function SelectCardDetails({title , img}) {
    return(
        <View className={"p-3 border border-[#ccc] rounded-lg w-[45%] items-center mb-[10%]"}>
            <Text className="text-xl font-bold mb-3 ">{title}</Text>
            <Image source={img} />
        </View>
    )
}