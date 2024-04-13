import { Text, View } from "react-native-ui-lib";
import SelectVechileCard from "../../components/selectVechileCard.jsx/selectVechileCard";
import categoryIcon from '../../assets/icons/categoryIcon.png'
import brandIcon from '../../assets/icons/brandIcon.png'
import plateIcon from '../../assets/icons/plateIcon.png'
import modelIcon from '../../assets/icons/modelIcon.png'
import colorIcon from '../../assets/icons/colorCarIcon.png'
import Button from "../../components/mainButton/Button";
export default function AddVechileScreen() {
    return(
        <View className="pt-[80px] px-4">
            <SelectVechileCard text={"Select Category"} icon={categoryIcon}/>
            <SelectVechileCard text={"Select Brand"} icon={brandIcon}/>
            <SelectVechileCard text={"Select Model"} icon={modelIcon}/>
            <SelectVechileCard text={"Select Color"} icon={colorIcon}/>
            <SelectVechileCard text={"Plate Number"} icon={plateIcon}/>
            <Button Title={"ADD Vechile"}/>
        </View>
    )
}