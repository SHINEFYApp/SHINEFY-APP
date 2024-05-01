import { Image, Switch, Text, View } from "react-native-ui-lib";
import arrowIcon from '../../assets/icons/arrowIcon.png'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";


export default function SelectVechileCard({ icon, text, screen, navigation , arrow , isSwitch , Press }) {
    function handleNavigate() {
        navigation.navigate(screen , text)
    }
    const [isEnabled , setIsEnable] = useState(false)

    function toggleSwitch () {
        setIsEnable(!isEnabled)
    }

    return (
        <TouchableOpacity onPress={()=>{
            if(!isSwitch && !Press) {
                handleNavigate()
            } else if(Press) {
                Press()
            } else {
                toggleSwitch()
            }
             
        }} className="flex-row items-center bg-white px-3 py-5 mb-3 border-[#ccc] border rounded-lg">
            <Image source={icon} className="mr-3" />
            <Text>
                {text}
            </Text>
            {
                !arrow  &&
                <Image source={arrowIcon} className="ml-auto" />
            }
            {

            isSwitch && 
              <Switch
              className="ml-auto"
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#DD9923"
              onColor="#DD9923"
              value={isEnabled}
              />
            }
        </TouchableOpacity>
    )
}