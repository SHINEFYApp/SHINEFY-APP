import {Image, KeyboardAwareScrollView, View} from 'react-native-ui-lib';
import React from 'react';
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
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
export default function EditProfileScreen({navigation}) {
  const data = useRecoilValue(profileData);
  const [newData, setNewData] = useState({
    name: data.name,
    phone_number: data.phone_number,
    email: data.email,
  });
  const [currentIMG , setCurrentIMG] = useState()
  function updateProfilePic() {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        setNewData({...newData, profile_image : image.path});
        setCurrentIMG(image.path)
      });
  }


  return (
    <KeyboardAwareScrollView>
      <View className="pt-[120] px-8 flex-1">
        <View className="my-10">
          <TouchableOpacity onPress={updateProfilePic}>
            <View className="items-center relative border-2 border-mainColor w-[110px] p-1 rounded-full mx-auto">
              <Image
                source={{uri:currentIMG}}
                className="p-4 border w-[100] h-[100] rounded-full"
              />
              <View className="bg-mainColor absolute -right-3 -top-2 rounded-full">
                <Image source={editIcon} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="relative h-full">
          <View className="w-full">
            <View>
              <Input
                value={newData.name}
                icon={userIcon}
                onChange={e => {
                  setNewData(d => ({
                    ...d,
                    name: e.nativeEvent.text,
                  }));
                }}
              />
            </View>

            <View>
              <Input value={data.email} icon={phoneIcon} />
            </View>
            <View>
              <Input
                placeholder={`${data.phone_number}`}
                icon={phoneIcon}
                text={'+20'}
                isBorder
              />
            </View>
            <Button
              Title={Lang_chg.editprofile_txt[config.language]}
              onPress={async () => {
                await editProfile(newData , navigation);
              }}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
