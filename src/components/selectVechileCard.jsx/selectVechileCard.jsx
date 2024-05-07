import { Image, Switch, Text, View } from "react-native-ui-lib";
import arrowIcon from '../../assets/icons/arrowIcon.png'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";


<<<<<<< Updated upstream
export default function SelectVechileCard({ icon, text, screen, navigation, arrow, isSwitch, Press }) {
    function handleNavigate() {
        navigation.navigate(screen, text)
=======
export default function SelectVechileCard({ icon, text, screen, navigation , arrow , isSwitch , Press ,screenTitle="",img , brandID }) {
    function handleNavigate() {
        if(screenTitle.includes("Model")){
            if(brandID) {
                navigation.navigate(screen , screenTitle)
                
            }
        }else {
            navigation.navigate(screen , screenTitle)
        }
>>>>>>> Stashed changes
    }
    const [isEnabled, setIsEnable] = useState(false)

    function toggleSwitch() {
        setIsEnable(!isEnabled)
    }

    return (
<<<<<<< Updated upstream
        <TouchableOpacity onPress={navigation} className="flex-row items-center bg-white px-3 py-5 mb-3 border-[#ccc] border rounded-lg">
            <Image source={icon} className="mr-3" />
=======
        <TouchableOpacity onPress={()=>{
            if(!isSwitch && !Press) {
                handleNavigate()
            } else if(Press) {
                Press()
            } else {
                toggleSwitch()
            }
             
        }} className="flex-row items-center bg-white px-3 py-5 mb-3 border-[#ccc] border rounded-lg">
            <Image source={img ? {uri:`${"https://shinefy.co/app-test/webservice/images/"}${img}`} : icon} className="mr-3"  style={img&&{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                }} />
>>>>>>> Stashed changes
            <Text>
                {text}
            </Text>
            {
                !arrow &&
                <Image source={arrowIcon} className="ml-auto" />
            }
            {

                isSwitch &&
                <Switch
                    className="ml-auto"
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#DD9923"
                    onColor="#DD9923"
                    value={isEnabled}
                />
            }
        </TouchableOpacity>
    )
}