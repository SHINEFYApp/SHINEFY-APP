import { ScrollView } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native-ui-lib";
import RadioButton from "../../components/RadioButton/RadioButton";
import SelectVechileCard from "../../components/selectVechileCard.jsx/selectVechileCard";
import { useState } from "react";
import Button from "../../components/mainButton/Button";
import appleIcon from '../../assets/icons/appleIcon.png'
import googleIcon from '../../assets/icons/googleIcon.png'
import paypalIcon from '../../assets/icons/paypalIcon.png'
import cashIcon from '../../assets/icons/cashIcon.png'
import creditIcon from '../../assets/icons/creditIcon.png'
import packageIcon from '../../assets/icons/profile/package.png'
import walletIcon from '../../assets/icons/profile/wallet.png'
export default function PaymentMethod({ navigation }) {

    const [activePayment, setActivePayment] = useState(0)

    const paymentMethodsOptions = [
        {
            id: 1,
            title: "Paypal",
            icon: paypalIcon
        
        },
        {
            id: 2,
            title: "Apple Pay",
                icon :appleIcon 
        },
        {
            id: 3,
            title: "Google Pay",
            icon : googleIcon
        },
    ]

    return (
        <View className="pt-[80] px-5">
            <ScrollView>
                <View>
                    <Text>Cash</Text>
                    <RadioButton buttons={[{ id: 1, title: "Cash" , icon: cashIcon}]} currentActive={activePayment} set={setActivePayment} />
                </View>
                <View>
                    <Text>Packages</Text>
                    <SelectVechileCard text={"Packages"} navigation={navigation} icon={packageIcon}/>
                </View>
                <View>
                    <Text>Wallet</Text>
                    <RadioButton buttons={[{ id: 1, title: "Wallet", icon: walletIcon }]} currentActive={activePayment} set={setActivePayment} />
                </View>
                <View>
                    <Text>Credit & Debit Card</Text>
                    <SelectVechileCard text={"Add Card"} navigation={navigation} screen={"AddCardScreen"} icon={creditIcon}/>

                </View>
                <View>
                    <Text>More Payment Options</Text>
                 
                    <RadioButton buttons={paymentMethodsOptions} currentActive={activePayment} set={setActivePayment} />
                </View>
                <Button Title={"Confirm Payment"} />
            </ScrollView>
        </View>
    )
}