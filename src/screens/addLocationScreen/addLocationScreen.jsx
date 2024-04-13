import { Text, View } from "react-native-ui-lib";
import MapComponent from "../../components/mapComponent/mapComponent";

export default function AddLocationScreen() {
    return (
        <View className="flex-1">
            <MapComponent isNewLocation={true}/>
        </View>
    )
}