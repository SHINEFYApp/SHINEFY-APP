import {Image, Text, View} from 'react-native-ui-lib';
import pic from '../../assets/icons/profile/pic.png';
import Input from '../../components/inputs/input';
import userIcon from '../../assets/icons/userIcon.png';
import phoneIcon from '../../assets/icons/phoneIcon.png';
import Button from '../../components/mainButton/Button';
import {useRecoilValue} from 'recoil';
import profileData from '../../atoms/profileData/profileData';
import {useState} from 'react';
import editProfile from '../../Features/editProfile/editProfile';
import {Lang_chg} from '../../Provider/Language_provider';
import editIcon from '../../assets/icons/editIconVehicle.png';
import {config} from '../../Provider/configProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function EditProfileScreen({navigation}) {
  const data = useRecoilValue(profileData);
  const [newData, setNewData] = useState({
    firstname: data.f_name,
    lastname: data.l_name,
    phone_number: data.phone_number,
    email: data.email,
  });

  async function updateProfilePic() {
    // let image = await DocumentPicker.Picker({
    //   multi
    // })
  }

  return (
    <View className="pt-[80] px-8 flex-1">
      <View className="my-10">
        <TouchableOpacity onPress={updateProfilePic}>

          <View className="items-center relative border-2 border-mainColor w-[110px] p-1 rounded-full mx-auto">
            <Image
              source={pic}
              className="p-4 border w-[100] h-[100] rounded-full"
              />
            <View className="bg-mainColor absolute -right-3 -top-2 rounded-full">
              <Image source={editIcon}/>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View className="relative h-full">
        <View className="absolute w-full">
          <View className="flex-row gap-4">
            <View className={'flex-1'}>
              <Input
                placeholder={data.f_name}
                icon={userIcon}
                onChange={e => {
                  setNewData({
                    ...newData,
                    firstname: e.nativeEvent.text,
                  });
                }}
              />
            </View>
            <View className={'flex-1'}>
              <Input
                placeholder={data.l_name}
                icon={userIcon}
                onChange={e => {
                  setNewData({
                    ...newData,
                    lastname: e.nativeEvent.text,
                  });
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
          <Button
            Title={Lang_chg.editprofile_txt[config.language]}
            onPress={async () => {
              await editProfile(newData);
              navigation.navigate('HomeScreen');
          
            }}
          />
        </View>
      </View>
    </View>
  );
}
