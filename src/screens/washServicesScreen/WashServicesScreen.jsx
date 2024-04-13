import { ScrollView, View } from "react-native";
import WashServicesCard from "../../components/washServicesCard/washServicesCard";

export default function WashServicesScreen() {
    return (
        <View className="mt-[80px] px-2">
            <ScrollView>
                <WashServicesCard page />
                <WashServicesCard page />
                <WashServicesCard page />
                <WashServicesCard page />
                <WashServicesCard page />
                <WashServicesCard page />
                <WashServicesCard page />
            </ScrollView>
        </View>
    )
}