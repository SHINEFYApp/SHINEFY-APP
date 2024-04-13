import { Image, Text, View } from "react-native-ui-lib";
import emptyImg from '../../assets/icons/notficationEmpty.png'
import NotficationCard from "../../components/notficationCard/notficationCard";
import { ScrollView } from "react-native-gesture-handler";

export default function NotficationScreen() {
    const notfi  = [1]



    return(
        <View className="flex-1 pt-[80px]">
            {
                !notfi.length &&
                <View className='w-full items-center p-10'>
                    <Image source={emptyImg}/>
                </View>
            }
            <ScrollView>
                 <View className="mt-2 flex-row items-center px-4">
            <Text className="text-[#000] text-xl ">TODAY</Text>
            <Text className="text-mainColor flex-1 text-right">See All</Text>
          </View>
                <NotficationCard />
                <NotficationCard />
                <NotficationCard />
                <NotficationCard />
                 <View className="mt-2 flex-row items-center px-4">
            <Text className="text-[#000] text-xl ">TODAY</Text>
            <Text className="text-mainColor flex-1 text-right">See All</Text>
          </View>
                <NotficationCard />
                <NotficationCard />
                <NotficationCard />
                <NotficationCard />
                <NotficationCard />
                <NotficationCard />
            
            </ScrollView>
        </View>
    )
}