import { Text, View } from "react-native-ui-lib";
import MapComponent from "../../components/mapComponent/mapComponent";

export default function AddLocationScreen({navigation}) {
    return (
        <View className="flex-1">
            <MapComponent isNewLocation={true} navigation={navigation}/>
        </View>
    )
}