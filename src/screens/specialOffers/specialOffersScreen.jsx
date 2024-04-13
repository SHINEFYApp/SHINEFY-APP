import { ScrollView, View } from "react-native";
import SaleBox from "../../components/saleBox/saleBox";

export default function SpecialOffersScreen() {
    return(
        <View className="mt-[80px] px-2">
            <ScrollView>
                <SaleBox />
                <SaleBox />
                <SaleBox />
                <SaleBox />
                <SaleBox />
                <SaleBox />
            </ScrollView>
        </View>
    )
}