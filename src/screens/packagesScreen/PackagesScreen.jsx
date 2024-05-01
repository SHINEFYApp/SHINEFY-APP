import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native-ui-lib";
import PackageCard from "../../components/packageCard/packageCard";

export default function PackageScreen({navigation}) {
    return(
        <View className="pt-[80] px-5">
            <ScrollView>
                <PackageCard navigation={navigation}/>
            </ScrollView>
        </View>
    )
}