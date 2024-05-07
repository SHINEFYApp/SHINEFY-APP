import { Image, Text, View } from "react-native-ui-lib";
import pic from '../../assets/icons/profile/pic.png'
import Input from "../../components/inputs/input";
import userIcon from '../../assets/icons/userIcon.png';
import phoneIcon from '../../assets/icons/phoneIcon.png';
import Button from "../../components/mainButton/Button";
import { useRecoilValue } from "recoil";
import profileData from "../../atoms/profileData/profileData";
import { useState } from "react";
import editProfile from "../../Features/editProfile/editProfile";
export default function EditProfileScreen({navigation}) {

    const data  = useRecoilValue(profileData)
    const [newData , setNewData] = useState({
        firstname:data.f_name ,
        lastname:data.l_name,
        phone_number:data.phone_number ,    
        email : data.email ,
    })
    console.log(newData)
    return (
        <View className="pt-[80] px-8 flex-1">
            <View className="my-10">
                <View className="items-center relative border-2 border-mainColor w-[110px] p-1 rounded-full mx-auto">
                    <Image source={pic} className="p-4 border w-[100] h-[100] rounded-full" />
                </View>
            </View>
            <View className="relative">
                <View className="absolute w-full">
                    <View className="flex-row gap-4">
                        <View className={'flex-1'}>
                            <Input
                                placeholder={data.f_name}
                                icon={userIcon}
                                onChange={(e)=>{
                                    setNewData({
                                        ...newData , 
                                        firstname : e.nativeEvent.text 
                                    })
                                }}
                            />
                        </View>
                        <View className={'flex-1'}>
                            <Input
                                placeholder={data.l_name}
                                icon={userIcon}
                                 onChange={(e)=>{
                                    setNewData({
                                        ...newData , 
                                        lastname : e.nativeEvent.text 
                                    })
                                }}
                            />
                        </View>
                    </View>

                    <View>
                        <Input value={data.email} icon={phoneIcon} />

                    </View>
                    <View>
                        <Input
                            value={`${data.phone_number}`}
                            icon={phoneIcon}
                            text={'+20'}
                            isBorder={true}
                        />
                    </View>
                    <Button Title={"UPDATE"} onPress={async()=>{
                        console.log(navigation.navigate("profileScreen"))
                    //    await editProfile(newData)
                    //    console.log("jhfgjn")
                    }}/>
                </View>
            </View>

        </View>
    )
}