import { Text, View } from "react-native-ui-lib";

export default function AboutUsScreen() {
    return (
        <View className="pt-[80] px-5">
            <View className="mb-6">
                <Text className="text-lg font-bold mb-2"> About Us :</Text>
                <Text>With the advancement of services and emergence of the urgent need for mobile car wash as one of the services that match users' needs.</Text>
            </View>
            <View className="mb-6">
                <Text className="text-lg font-bold mb-2">SHINIFY App :</Text>
                <Text>It is a mobile App that was designed to keep up with our users' needs, and it allows users to simply place orders through the App. SHINEFY provides users with various services and features that simplify the journey of users when booking an appointment.</Text>
            </View>
            <View className="mb-6">
                <Text className="text-lg font-bold mb-2">Our Values :</Text>
                <Text>
                    Quality: high quality services.
                </Text>
                <Text>
                    Efficiency: Trained crew that utilize latest technological features.
                </Text>
                <Text>
                    Integrity: We take care of every detail of the car when providing the service.
                </Text>
            </View>
        </View>
    )
}