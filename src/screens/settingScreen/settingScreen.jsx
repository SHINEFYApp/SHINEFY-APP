import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native-ui-lib";
import SelectVechileCard from "../../components/selectVechileCard.jsx/selectVechileCard";

export default function SettingScreen({ navigation }) {
    return (
        <View className="pt-[80] px-5">
            <ScrollView>
                <SelectVechileCard text={"Change Password"} screen={"ChangePasswordProfile"} navigation={navigation} />
                <SelectVechileCard text={"Contact Us"} screen={"AboutUsScreen"} navigation={navigation} />
                <SelectVechileCard text={"FAQ's"} screen={"AboutUsScreen"} navigation={navigation} />
                <SelectVechileCard text={"Terms & Conditions"} screen={"AboutUsScreen"} navigation={navigation} />
                <SelectVechileCard text={"Privacy Policy"} screen={"AboutUsScreen"} navigation={navigation} />
                <SelectVechileCard text={"About Us"} screen={"AboutUsScreen"} navigation={navigation} />
            </ScrollView>
        </View>
    )
}