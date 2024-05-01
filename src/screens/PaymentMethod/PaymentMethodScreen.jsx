import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "react-native-ui-lib";
import RadioButton from "../../components/RadioButton/RadioButton";
import SelectVechileCard from "../../components/selectVechileCard.jsx/selectVechileCard";
import { useState } from "react";

export default function PaymentMethod({navigation}) {

    const [activePayment , setActivePayment] = useState(0)

    console.log(activePayment)

    const paymentMethodsOptions = [
        {
        id: 1 ,
        title : "Paypal", 
    },
        {
        id: 2 ,
        title : "Apple Pay", 
    },
        {
        id: 3 ,
        title : "Google Pay", 
    },
]

    return (
        <View className="pt-[80] px-5">
            <ScrollView>
                <View>
                    <Text>Cash</Text>
                    <RadioButton buttons={[{id:1 , title:"Cash"}]} currentActive={activePayment} set={setActivePayment}/>
                </View>
                <View>
                    <Text>Packages</Text>
                    <SelectVechileCard text={"Packages"} navigation={navigation} />
                </View>
                <View>
                    <Text>Wallet</Text>
                    <RadioButton buttons={[{id:1 , title:"Wallet"}]} currentActive={activePayment} set={setActivePayment}/>
                </View>
                <View>
                    <Text>Credit & Debit Card</Text>
                    <SelectVechileCard text={"Add Card"} navigation={navigation} />
                
                </View>
                  <View>
                    <Text>More Payment Options</Text>
                    <RadioButton buttons={paymentMethodsOptions} currentActive={activePayment} set={setActivePayment}/>
                </View>
            </ScrollView>
        </View>
    )
}